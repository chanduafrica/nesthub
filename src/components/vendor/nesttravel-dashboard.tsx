
'use client';

import { useState } from 'react';
import { TravelListing, TravelListingStatus } from '@/lib/mock-data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle, List, Grid, MoreHorizontal, Edit, Trash, Eye, Plane, Train, Bus, Hotel, Package } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

export function NestTravelDashboard({ initialListings }: { initialListings: TravelListing[] }) {
    const [layout, setLayout] = useState<'grid' | 'list'>('grid');
    const [listings, setListings] = useState<TravelListing[]>(initialListings);

    const getStatusBadgeVariant = (status: TravelListingStatus) => {
        switch (status) {
            case 'Active': return 'default';
            case 'Pending': return 'secondary';
            case 'Expired': return 'destructive';
            default: return 'outline';
        }
    };

    const getListingIcon = (type: TravelListing['listingType']) => {
        switch (type) {
            case 'Flight': return <Plane className="h-4 w-4" />;
            case 'SGR': return <Train className="h-4 w-4" />;
            case 'Bus': return <Bus className="h-4 w-4" />;
            case 'Hotel': return <Hotel className="h-4 w-4" />;
            case 'Tour': return <Package className="h-4 w-4" />;
            default: return <Package className="h-4 w-4" />;
        }
    }

    const handleDelete = (listingId: string) => {
        setListings(listings.filter(l => l.id !== listingId));
    };

    const ListingItem = ({ listing }: { listing: TravelListing }) => (
        <Card className={`overflow-hidden group transition-shadow hover:shadow-lg ${layout === 'list' ? 'flex flex-col md:flex-row' : 'flex flex-col'}`}>
            <div className={`relative ${layout === 'list' ? 'md:w-1/3' : 'w-full h-48'}`}>
                <Image src={listing.imageUrl} alt={listing.title} fill className="object-cover" />
                <Badge variant="secondary" className="absolute top-2 left-2 flex items-center gap-1">{getListingIcon(listing.listingType)} {listing.listingType}</Badge>
            </div>
            <div className={`p-4 flex flex-col flex-1 ${layout === 'list' ? 'md:w-2/3' : ''}`}>
                <div className="flex-grow">
                    <div className="flex justify-between items-start">
                        <CardTitle className="text-lg leading-tight mb-1">{listing.title}</CardTitle>
                        <Badge variant={getStatusBadgeVariant(listing.status)}>{listing.status}</Badge>
                    </div>
                    <CardDescription>KES {listing.price.toLocaleString()}</CardDescription>
                </div>
                <div className="border-t mt-4 pt-4 flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">ID: {listing.id}</span>
                     <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem><Eye className="mr-2 h-4 w-4"/>View</DropdownMenuItem>
                            <DropdownMenuItem><Edit className="mr-2 h-4 w-4"/>Edit</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive" onClick={() => handleDelete(listing.id)}>
                                <Trash className="mr-2 h-4 w-4"/>Delete
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
                    <h1 className="text-2xl font-bold">My Travel Listings</h1>
                    <p className="text-muted-foreground">Manage your NestTravel listings.</p>
                </div>
                <div className="flex items-center gap-2">
                     <div className="hidden sm:flex items-center gap-1 p-1 rounded-md border bg-background">
                        <Button variant={layout === 'grid' ? 'secondary' : 'ghost'} size="icon" onClick={() => setLayout('grid')} className="h-8 w-8"><Grid className="h-4 w-4" /></Button>
                        <Button variant={layout === 'list' ? 'secondary' : 'ghost'} size="icon" onClick={() => setLayout('list')} className="h-8 w-8"><List className="h-4 w-4" /></Button>
                    </div>
                    <Button asChild><Link href="/vendor/nesttravel/add"><PlusCircle className="mr-2 h-4 w-4" /> Add Listing</Link></Button>
                </div>
            </div>
            
            <div className={`grid gap-6 ${layout === 'grid' ? 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'}`}>
                {listings.map(listing => <ListingItem key={listing.id} listing={listing} />)}
            </div>
             {listings.length === 0 && (
                <Card className="flex flex-col items-center justify-center text-center py-12">
                    <CardHeader>
                        <CardTitle>No Listings Found</CardTitle>
                        <CardDescription>Get started by adding your first travel listing.</CardDescription>
                    </CardHeader>
                    <CardContent>
                         <Button asChild><Link href="/vendor/nesttravel/add"><PlusCircle className="mr-2 h-4 w-4" /> Add Travel Listing</Link></Button>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
