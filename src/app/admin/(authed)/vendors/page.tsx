
'use client';

import { useState, useMemo } from 'react';
import { mockVendors, VendorStatus, mockModuleEngagement, mockTransactions } from '@/lib/mock-data';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { MoreHorizontal, Search, FileCheck, FileX, CircleHelp } from 'lucide-react';
import Link from 'next/link';
import { useCurrency } from '@/hooks/use-currency';

const conversionRates: { [key: string]: number } = {
    KES: 1, UGX: 29.45, TZS: 20.45, RWF: 10.33, BIF: 22.58, SSP: 1.22, SOS: 4.55,
};

export default function AllVendorsPage() {
    const [vendors, setVendors] = useState(mockVendors);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<VendorStatus | 'all'>('all');
    const [portalFilter, setPortalFilter] = useState<string | 'all'>('all');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const { currency } = useCurrency();

    const vendorBusiness = useMemo(() => {
        const businessMap = new Map<string, number>();
        mockTransactions.forEach(tx => {
            if (tx.vendorId && tx.status === 'Completed') {
                businessMap.set(tx.vendorId, (businessMap.get(tx.vendorId) || 0) + tx.amount);
            }
        });
        return businessMap;
    }, []);

    const convertCurrency = (amount: number) => {
        const rate = conversionRates[currency] || 1;
        return (amount * rate).toLocaleString('en-US', {
            style: 'currency', currency, minimumFractionDigits: 0, maximumFractionDigits: 0,
        });
    };

    const handleAction = (action: string, vendorId: string) => {
        console.log(`Performing '${action}' for vendor ID: ${vendorId}`);
        if (action === 'Approve') {
            setVendors(vendors.map(v => v.id === vendorId ? {...v, status: 'Active'} : v));
        } else if (action === 'Reject') {
            setVendors(vendors.map(v => v.id === vendorId ? {...v, status: 'Inactive'} : v));
        }
    }

    const filteredVendors = useMemo(() => {
        return vendors.filter(vendor => {
            const searchMatch = vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                vendor.country.toLowerCase().includes(searchTerm.toLowerCase());
            const statusMatch = statusFilter === 'all' || vendor.status === statusFilter;
            const portalMatch = portalFilter === 'all' || vendor.portal === portalFilter;
            return searchMatch && statusMatch && portalMatch;
        });
    }, [vendors, searchTerm, statusFilter, portalFilter]);

    const paginatedVendors = filteredVendors.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const totalPages = Math.ceil(filteredVendors.length / itemsPerPage);

    const getStatusBadgeVariant = (status: VendorStatus) => {
        switch (status) {
            case 'Active': return 'default';
            case 'Pending': return 'secondary';
            case 'Inactive': return 'destructive';
            default: return 'secondary';
        }
    };
    
  return (
    <Card>
      <CardHeader>
        <CardTitle>All Vendors</CardTitle>
        <CardDescription>
          Manage and monitor all vendors across all DigitalNest portals.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap items-center gap-4 mb-6">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
                placeholder="Search by vendor or country..." 
                className="pl-10" 
                value={searchTerm}
                onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                }}
            />
          </div>
            <Select value={portalFilter} onValueChange={(value) => { setPortalFilter(value); setCurrentPage(1); }}>
                <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Filter by Portal" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All Portals</SelectItem>
                    {mockModuleEngagement.map(mod => (
                        <SelectItem key={mod.name} value={mod.name}>{mod.name}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={(value) => { setStatusFilter(value as any); setCurrentPage(1); }}>
                <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Filter by Status" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                </SelectContent>
            </Select>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Vendor Name</TableHead>
                <TableHead>Portal</TableHead>
                <TableHead className="hidden md:table-cell">Country</TableHead>
                <TableHead className="hidden sm:table-cell">Total Business ({currency})</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedVendors.length > 0 ? paginatedVendors.map(vendor => (
                <TableRow key={vendor.id}>
                  <TableCell className="font-medium">{vendor.name}</TableCell>
                  <TableCell>{vendor.portal}</TableCell>
                  <TableCell className="hidden md:table-cell">{vendor.country}</TableCell>
                  <TableCell className="hidden sm:table-cell font-mono">{convertCurrency(vendorBusiness.get(vendor.id) || 0)}</TableCell>
                  <TableCell className="text-center">
                    <Badge variant={getStatusBadgeVariant(vendor.status)}>
                        {vendor.status}
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
                        <DropdownMenuItem asChild><Link href={`/admin/vendors/${vendor.id}`}>View Vendor 360</Link></DropdownMenuItem>
                        <DropdownMenuSeparator />
                        {vendor.status === 'Pending' && (
                            <>
                            <DropdownMenuItem onClick={() => handleAction('Approve', vendor.id)}>
                                <FileCheck className="mr-2 h-4 w-4" />
                                Approve
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive" onClick={() => handleAction('Reject', vendor.id)}>
                                <FileX className="mr-2 h-4 w-4" />
                                Reject
                            </DropdownMenuItem>
                            </>
                        )}
                        {vendor.status !== 'Pending' && (
                            <DropdownMenuItem disabled>
                                <CircleHelp className="mr-2 h-4 w-4" />
                                No actions available
                            </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              )) : (
                <TableRow>
                    <TableCell colSpan={6} className="text-center h-24">
                        No vendors found.
                    </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
       <CardFooter className="flex justify-between items-center">
            <div className="text-xs text-muted-foreground">
                Showing <strong>{paginatedVendors.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0}-{(currentPage - 1) * itemsPerPage + paginatedVendors.length}</strong> of <strong>{filteredVendors.length}</strong> vendors
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
