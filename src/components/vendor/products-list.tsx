
'use client';

import { useState } from 'react';
import { Product, ProductStatus } from '@/lib/mock-data';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { MoreHorizontal, Search, PlusCircle, FileUp, Edit, Trash2, Eye, ToggleLeft, ToggleRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';
import { handleUpdateProductStatus } from '@/app/vendor/(authed)/products/actions';

export function ProductsList({ initialProducts }: { initialProducts: Product[] }) {
    const [products, setProducts] = useState<Product[]>(initialProducts);
    const [searchTerm, setSearchTerm] = useState('');
    
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const { toast } = useToast();

    const filteredProducts = products.filter(product => {
        return product.title.toLowerCase().includes(searchTerm.toLowerCase());
    });

    const paginatedProducts = filteredProducts.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

    const formatCurrency = (amount: number) => {
        return `KES ${amount.toLocaleString('en-US')}`;
    }

    const toggleProductStatus = async (product: Product) => {
        const newStatus = product.status === 'Active' ? 'Inactive' : 'Active';
        try {
            await handleUpdateProductStatus(product.id, newStatus);
            setProducts(products.map(p => p.id === product.id ? { ...p, status: newStatus } : p));
            toast({
                title: 'Status Updated',
                description: `${product.title} has been set to ${newStatus}.`,
            });
        } catch (error) {
            toast({
                title: 'Error',
                description: 'Could not update product status.',
                variant: 'destructive',
            });
        }
    };


  return (
    <Card className="flex-1">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
            <CardTitle>My Products</CardTitle>
            <CardDescription>
            Manage your product listings and inventory for NestMall.
            </CardDescription>
        </div>
        <div className="flex gap-2">
            <Button variant="outline">
                <FileUp className="mr-2 h-4 w-4" />
                Import
            </Button>
             <Button asChild>
                <Link href="/vendor/products/new">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Product
                </Link>
            </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
                placeholder="Search by product name..." 
                className="pl-10" 
                value={searchTerm}
                onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1); // Reset to first page on search
                }}
            />
          </div>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">Image</TableHead>
                <TableHead>Product Name</TableHead>
                <TableHead className="hidden md:table-cell">Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedProducts.length > 0 ? paginatedProducts.map(product => (
                <TableRow key={product.id}>
                  <TableCell>
                      <Image
                        src={product.image}
                        alt={product.title}
                        width={40}
                        height={40}
                        className="rounded-md object-cover"
                      />
                  </TableCell>
                  <TableCell className="font-medium">{product.title}</TableCell>
                  <TableCell className="hidden md:table-cell">{product.category}</TableCell>
                  <TableCell>{formatCurrency(product.price)}</TableCell>
                  <TableCell className="text-center">
                    <Badge variant={product.status === 'Active' ? 'default' : 'secondary'}>
                        {product.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem asChild>
                          <Link href={`/modules/mall/product/${product.slug}`} target="_blank">
                            <Eye className="mr-2 h-4 w-4" /> View Public Page
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={`/vendor/products/${product.id}/edit`}>
                            <Edit className="mr-2 h-4 w-4" /> Edit
                          </Link>
                        </DropdownMenuItem>
                         <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => toggleProductStatus(product)}>
                            {product.status === 'Active' ? (
                                <><ToggleLeft className="mr-2 h-4 w-4 text-destructive" /> Deactivate</>
                            ) : (
                                <><ToggleRight className="mr-2 h-4 w-4 text-green-500" /> Activate</>
                            )}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              )) : (
                <TableRow>
                    <TableCell colSpan={6} className="text-center h-24">
                        No products found.
                    </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
       <CardFooter className="flex justify-between items-center">
            <div className="text-xs text-muted-foreground">
                Showing <strong>{paginatedProducts.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0}-{(currentPage - 1) * itemsPerPage + paginatedProducts.length}</strong> of <strong>{filteredProducts.length}</strong> products
            </div>
            <div className="flex items-center gap-2">
                <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                >
                    Previous
                </Button>
                <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages || totalPages === 0}
                >
                    Next
                </Button>
            </div>
      </CardFooter>
    </Card>
  );
}
