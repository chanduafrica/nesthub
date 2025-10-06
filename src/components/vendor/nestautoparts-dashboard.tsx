
'use client';

import { useState } from 'react';
import { AutoPartListing, AutoPartListingStatus } from '@/lib/mock-data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle, List, Grid, MoreHorizontal, Edit, Trash, Eye, BarChart } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

export function NestAutoPartsDashboard({ initialListings }: { initialListings: AutoPartListing[] }) {
    const [layout, setLayout] = useState<'grid' | 'list'>('grid');
    const [listings, setListings] = useState<AutoPartListing[]>(initialListings);
    const [filter, setFilter] = useState<AutoPartListingStatus | 'All'>('All');
    const { toast } = useToast();

    const getStatusBadgeVariant = (status: AutoPartListingStatus) => {
        switch (status) {
            case 'Active': return 'default';
            case 'Pending': return 'secondary';
            case 'Out of Stock':
            case 'Archived': return 'destructive';
            default: return 'outline';
        }
    };

    const handleDelete = (listingId: string, listingTitle: string) => {
        setListings(listings.filter(l => l.id !== listingId));
        toast({
            title: "Product Archived",
            description: `"${listingTitle}" has been archived.`,
        });
    };
    
    const filteredListings = listings.filter(listing => {
        if (filter === 'All') return true;
        return listing.status === filter;
    });

    const ListingItem = ({ listing }: { listing: AutoPartListing }) => (
        <Card className={`overflow-hidden group transition-shadow hover:shadow-lg ${layout === 'list' ? 'flex flex-col md:flex-row' : 'flex flex-col'}`}>
            <div className={`relative ${layout === 'list' ? 'md:w-1/4' : 'w-full h-48'}`}>
                <Image src={listing.media.mainImage} alt={listing.name} fill className="object-cover" />
                <Badge variant="secondary" className="absolute top-2 left-2">{listing.brand}</Badge>
            </div>
            <div className={`p-4 flex flex-col flex-1 ${layout === 'list' ? 'md:w-3/4' : ''}`}>
                <div className="flex-grow">
                    <div className="flex justify-between items-start">
                        <CardTitle className="text-lg leading-tight mb-1">{listing.name}</CardTitle>
                        <Badge variant={getStatusBadgeVariant(listing.status)}>{listing.status}</Badge>
                    </div>
                    <CardDescription>KES {listing.pricing.unitPrice.toLocaleString()}</CardDescription>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground mt-2">
                        <span>Stock: {listing.stock.quantity}</span>
                        <span>Views: {listing.views || 0}</span>
                        <span>Orders: {listing.orders || 0}</span>
                    </div>
                </div>
                <div className="border-t mt-4 pt-4 flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">ID: {listing.id}</span>
                     <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0"><MoreHorizontal className="h-4 w-4" /></Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem><Eye className="mr-2 h-4 w-4"/>View Public</DropdownMenuItem>
                            <DropdownMenuItem><Edit className="mr-2 h-4 w-4"/>Edit</DropdownMenuItem>
                            <DropdownMenuItem><BarChart className="mr-2 h-4 w-4"/>Analytics</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive" onClick={() => handleDelete(listing.id, listing.name)}>
                                <Trash className="mr-2 h-4 w-4"/>Archive
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </Card>
    );

    return (
        <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold">My Auto Parts</h1>
                    <p className="text-muted-foreground">Manage your NestAutoParts product listings.</p>
                </div>
                <div className="flex items-center gap-2">
                    <div className="hidden sm:flex items-center gap-1 p-1 rounded-md border bg-background">
                        <Button variant={layout === 'grid' ? 'secondary' : 'ghost'} size="icon" onClick={() => setLayout('grid')} className="h-8 w-8"><Grid className="h-4 w-4" /></Button>
                        <Button variant={layout === 'list' ? 'secondary' : 'ghost'} size="icon" onClick={() => setLayout('list')} className="h-8 w-8"><List className="h-4 w-4" /></Button>
                    </div>
                    <Button asChild><Link href="/vendor/autoparts/add"><PlusCircle className="mr-2 h-4 w-4" /> Add Product</Link></Button>
                </div>
            </div>

            <Tabs defaultValue="All" onValueChange={(value) => setFilter(value as any)}>
                 <TabsList className="mb-4">
                    <TabsTrigger value="All">All ({listings.length})</TabsTrigger>
                    <TabsTrigger value="Active">Active</TabsTrigger>
                    <TabsTrigger value="Pending">Pending</TabsTrigger>
                    <TabsTrigger value="Out of Stock">Out of Stock</TabsTrigger>
                    <TabsTrigger value="Archived">Archived</TabsTrigger>
                </TabsList>
            </Tabs>
            
            <div className={`grid gap-6 ${layout === 'grid' ? 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'}`}>
                {filteredListings.map(listing => <ListingItem key={listing.id} listing={listing} />)}
            </div>
            {filteredListings.length === 0 && (
                <Card className="flex flex-col items-center justify-center text-center py-12">
                    <CardHeader>
                        <CardTitle>No Products Found</CardTitle>
                        <CardDescription>You have not added any auto parts yet, or none match your filter.</CardDescription>
                    </CardHeader>
                     <CardContent>
                         <Button asChild><Link href="/vendor/autoparts/add"><PlusCircle className="mr-2 h-4 w-4" /> Add Your First Product</Link></Button>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
