
'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Loader2, UploadCloud, DollarSign, Trash2, X } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';
import { handleAddProduct } from '@/app/vendor/(authed)/products/actions';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export default function AddProductPage() {
    const router = useRouter();
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const [wholesaleRows, setWholesaleRows] = useState([{ minQty: '', price: '' }]);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleAddWholesaleRow = () => {
        setWholesaleRows([...wholesaleRows, { minQty: '', price: '' }]);
    };
    
    const handleRemoveWholesaleRow = (index: number) => {
        const newRows = wholesaleRows.filter((_, i) => i !== index);
        setWholesaleRows(newRows);
    };

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };
    
    const removeImage = () => {
        setImageFile(null);
        setImagePreview(null);
        if(fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    }


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        const formData = new FormData(e.currentTarget);
        
        // For this prototype, we'll use a placeholder path for the image.
        // In a real app, you'd upload the imageFile to a cloud storage service
        // and get a URL back to save in the database.
        const imageUrl = imageFile ? `/mall/${imageFile.name}` : '/mall/placeholder.jpg';

        const productData = {
            title: formData.get('title') as string,
            category: formData.get('category') as string,
            price: Number(formData.get('price')),
            discountPrice: Number(formData.get('discountPrice')) || undefined,
            image: imageUrl, 
            vendor: 'SGNEST SUPER VENDOR',
            rating: 0,
        };

        try {
            await handleAddProduct(productData);
            toast({
                title: 'Product Added!',
                description: `${productData.title} has been added to your store.`,
            });
            router.push('/vendor/products');
        } catch (error) {
            toast({
                title: 'Error',
                description: 'Could not add the product. Please try again.',
                variant: 'destructive',
            });
            setIsLoading(false);
        }
    };

    return (
        <div className="flex-1">
            <form onSubmit={handleSubmit}>
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                        <Button variant="outline" size="icon" asChild>
                            <Link href="/vendor/products">
                                <ArrowLeft className="h-4 w-4" />
                            </Link>
                        </Button>
                        <h1 className="text-2xl font-bold">Add New Product</h1>
                    </div>
                     <Button type="submit" disabled={isLoading}>
                        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Save Product
                    </Button>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Basic Information</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="title">Product Name</Label>
                                    <Input id="title" name="title" placeholder="e.g., Hand-woven Kiondo Bag" required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="description">Description</Label>
                                    <Textarea id="description" name="description" placeholder="Describe your product in detail..." />
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle>Images</CardTitle>
                                <CardDescription>Upload a high-quality image for your product.</CardDescription>
                            </CardHeader>
                             <CardContent>
                                <Input 
                                  type="file" 
                                  className="hidden"
                                  ref={fileInputRef}
                                  onChange={handleImageChange}
                                  accept="image/*"
                                />
                                {!imagePreview ? (
                                    <div 
                                        onClick={() => fileInputRef.current?.click()}
                                        className="border-2 border-dashed border-muted-foreground/50 rounded-lg p-10 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-muted/50"
                                    >
                                        <UploadCloud className="h-10 w-10 text-muted-foreground mb-4"/>
                                        <p className="font-semibold mb-2">Click to upload an image</p>
                                        <p className="text-sm text-muted-foreground">PNG, JPG, or WEBP. 800x800px recommended.</p>
                                    </div>
                                ) : (
                                    <div className="relative w-full max-w-sm mx-auto">
                                        <Image 
                                            src={imagePreview} 
                                            alt="Product preview" 
                                            width={400} 
                                            height={400}
                                            className="rounded-lg object-cover aspect-square"
                                        />
                                        <Button
                                            type="button"
                                            variant="destructive"
                                            size="icon"
                                            className="absolute top-2 right-2 h-7 w-7"
                                            onClick={removeImage}
                                        >
                                            <X className="h-4 w-4"/>
                                        </Button>
                                    </div>
                                )}
                             </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle>Pricing</CardTitle>
                            </CardHeader>
                            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                               <div className="space-y-2">
                                    <Label htmlFor="price">Standard Price (KES)</Label>
                                    <Input id="price" name="price" type="number" placeholder="e.g., 2500" required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="discountPrice">Discounted Price (KES)</Label>
                                    <Input id="discountPrice" name="discountPrice" type="number" placeholder="e.g., 2200 (optional)" />
                                </div>
                            </CardContent>
                        </Card>
                         <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2"><DollarSign className="h-5 w-5" />Wholesale Pricing (Optional)</CardTitle>
                                <CardDescription>Offer discounts for bulk purchases.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Minimum Quantity</TableHead>
                                            <TableHead>Price per Item (KES)</TableHead>
                                            <TableHead></TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {wholesaleRows.map((row, index) => (
                                            <TableRow key={index}>
                                                <TableCell>
                                                    <Input type="number" placeholder="e.g., 10" />
                                                </TableCell>
                                                <TableCell>
                                                    <Input type="number" placeholder="e.g., 2000" />
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <Button type="button" variant="ghost" size="icon" onClick={() => handleRemoveWholesaleRow(index)}>
                                                        <Trash2 className="h-4 w-4 text-destructive"/>
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                                <Button type="button" variant="outline" className="mt-4" onClick={handleAddWholesaleRow}>Add Tier</Button>
                            </CardContent>
                        </Card>
                    </div>
                    <div className="lg:col-span-1 space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Organization</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="category">Category</Label>
                                    <Select name="category" required>
                                        <SelectTrigger id="category">
                                            <SelectValue placeholder="Select a category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Electronics">Electronics</SelectItem>
                                            <SelectItem value="Fashion">Fashion</SelectItem>
                                            <SelectItem value="Home & Living">Home & Living</SelectItem>
                                            <SelectItem value="Groceries">Groceries</SelectItem>
                                            <SelectItem value="Auto Parts">Auto Parts</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                 <div className="space-y-2">
                                    <Label htmlFor="tags">Tags (comma-separated)</Label>
                                    <Input id="tags" name="tags" placeholder="e.g., bag, leather, handmade" />
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </form>
        </div>
    );
}

    