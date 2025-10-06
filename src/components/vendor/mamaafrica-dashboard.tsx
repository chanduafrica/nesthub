
'use client';

import { useState } from 'react';
import { MamaAfricaListing, MamaAfricaListingStatus } from '@/lib/mock-data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle, MoreHorizontal, Eye, Edit, Trash, Utensils, ToggleOn, ToggleOff } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

export function MamaAfricaDashboard({ initialListings }: { initialListings: MamaAfricaListing[] }) {
    const [listings, setListings] = useState<MamaAfricaListing[]>(initialListings);
    const [filter, setFilter] = useState<MamaAfricaListingStatus | 'All'>('All');
    const { toast } = useToast();

    const getStatusBadgeVariant = (status: MamaAfricaListingStatus) => {
        switch (status) {
            case 'Active': return 'default';
            case 'Pending': return 'secondary';
            case 'Sold Out':
            case 'Hidden': return 'destructive';
            default: return 'outline';
        }
    };

    const handleDelete = (listingId: string, listingName: string) => {
        setListings(listings.filter(l => l.id !== listingId));
        toast({
            title: "Listing Hidden",
            description: `"${listingName}" has been hidden from the marketplace.`,
        });
    };
    
    const filteredListings = listings.filter(listing => {
        if (filter === 'All') return true;
        return listing.status === filter;
    });

    const ListingItem = ({ listing }: { listing: MamaAfricaListing }) => (
        <Card className="overflow-hidden group transition-shadow hover:shadow-lg flex flex-col">
            <div className="relative w-full h-48">
                <Image src={listing.mainImage} alt={listing.name} fill className="object-cover" />
                <Badge variant="secondary" className="absolute top-2 left-2">{listing.category}</Badge>
            </div>
            <div className="p-4 flex flex-col flex-1">
                <div className="flex-grow">
                    <div className="flex justify-between items-start">
                        <CardTitle className="text-lg leading-tight mb-1">{listing.name}</CardTitle>
                        <Badge variant={getStatusBadgeVariant(listing.status)}>{listing.status}</Badge>
                    </div>
                    {listing.isForSale && <CardDescription>KES {listing.pricing.price?.toLocaleString()}</CardDescription>}
                    <div className="flex items-center gap-4 text-xs text-muted-foreground mt-2">
                        <span>Orders: {listing.orders || 0}</span>
                        <span>Rating: {listing.rating || 'N/A'}</span>
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
                             <DropdownMenuItem>
                                {listing.status === 'Sold Out' ? <><ToggleOn className="mr-2 h-4 w-4"/>Mark as Available</> : <><ToggleOff className="mr-2 h-4 w-4"/>Mark as Sold Out</>}
                            </DropdownMenuItem>
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
                    <h1 className="text-2xl font-bold">My Kitchen</h1>
                    <p className="text-muted-foreground">Manage your MamaAfrica recipes and meal listings.</p>
                </div>
                <Button asChild><Link href="/vendor/mamaafrica/add"><PlusCircle className="mr-2 h-4 w-4" /> Add Recipe/Meal</Link></Button>
            </div>

            <Tabs defaultValue="All" onValueChange={(value) => setFilter(value as any)}>
                 <TabsList className="mb-4">
                    <TabsTrigger value="All">All ({listings.length})</TabsTrigger>
                    <TabsTrigger value="Active">Active</TabsTrigger>
                    <TabsTrigger value="Pending">Pending</TabsTrigger>
                    <TabsTrigger value="Sold Out">Sold Out</TabsTrigger>
                    <TabsTrigger value="Hidden">Hidden</TabsTrigger>
                </TabsList>
            </Tabs>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredListings.map(listing => <ListingItem key={listing.id} listing={listing} />)}
            </div>
            {filteredListings.length === 0 && (
                <Card className="flex flex-col items-center justify-center text-center py-12 mt-4">
                    <CardHeader>
                        <Utensils className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <CardTitle>No Recipes or Meals Found</CardTitle>
                        <CardDescription>Get started by adding your first delicious creation to the marketplace.</CardDescription>
                    </CardHeader>
                     <CardContent>
                         <Button asChild><Link href="/vendor/mamaafrica/add"><PlusCircle className="mr-2 h-4 w-4" /> Add Your First Recipe/Meal</Link></Button>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
