
'use client';

import { useState } from 'react';
import { Property, PropertyStatus } from '@/lib/mock-data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle, List, Grid, MoreHorizontal, Eye, BarChart, Trash, Edit, Share2 } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

export function NestHomesDashboard({ initialProperties }: { initialProperties: Property[] }) {
    const [layout, setLayout] = useState<'grid' | 'list'>('grid');
    const [properties, setProperties] = useState<Property[]>(initialProperties);

    const getStatusBadgeVariant = (status: PropertyStatus) => {
        switch (status) {
            case 'Available': return 'default';
            case 'Pending': return 'secondary';
            case 'Sold':
            case 'Booked': return 'destructive';
            default: return 'outline';
        }
    };

    const handleDelete = (propertyId: string) => {
        // This would be a soft delete in a real app
        setProperties(properties.filter(p => p.id !== propertyId));
    };

    const PropertyItem = ({ property }: { property: Property }) => (
        <Card className={`overflow-hidden group transition-shadow hover:shadow-lg ${layout === 'list' ? 'flex flex-col md:flex-row' : 'flex flex-col'}`}>
            <div className={`relative ${layout === 'list' ? 'md:w-1/3' : 'w-full h-48'}`}>
                <Image
                    src={property.imageUrl}
                    alt={property.title}
                    fill
                    className="object-cover"
                />
            </div>
            <div className={`p-4 flex flex-col flex-1 ${layout === 'list' ? 'md:w-2/3' : ''}`}>
                <div className="flex-grow">
                    <div className="flex justify-between items-start">
                        <CardTitle className="text-lg leading-tight mb-1">{property.title}</CardTitle>
                        <Badge variant={getStatusBadgeVariant(property.status)}>{property.status}</Badge>
                    </div>
                    <CardDescription>KES {property.price.toLocaleString()}</CardDescription>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground mt-2">
                        <span>{property.beds} Beds</span>
                        <span>{property.baths} Baths</span>
                        <span>{property.area} sqft</span>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground mt-2">
                        <span>Views: {property.views || 0}</span>
                        <span>Leads: {property.leads || 0}</span>
                    </div>
                </div>
                <div className="border-t mt-4 pt-4 flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">ID: {property.id}</span>
                     <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem asChild><Link href={`/modules/homes/properties/${property.slug}`}><Eye className="mr-2 h-4 w-4"/>View Public</Link></DropdownMenuItem>
                            <DropdownMenuItem asChild><Link href={`/vendor/nesthomes/${property.id}/edit`}><Edit className="mr-2 h-4 w-4"/>Edit</Link></DropdownMenuItem>
                            <DropdownMenuItem><BarChart className="mr-2 h-4 w-4"/>View Analytics</DropdownMenuItem>
                            <DropdownMenuItem><Share2 className="mr-2 h-4 w-4"/>Share</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive" onClick={() => handleDelete(property.id)}>
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
                    <h1 className="text-2xl font-bold">My Properties</h1>
                    <p className="text-muted-foreground">Manage your NestHomes listings.</p>
                </div>
                <div className="flex items-center gap-2">
                     <div className="hidden sm:flex items-center gap-1 p-1 rounded-md border bg-background">
                        <Button variant={layout === 'grid' ? 'secondary' : 'ghost'} size="icon" onClick={() => setLayout('grid')} className="h-8 w-8">
                            <Grid className="h-4 w-4" />
                        </Button>
                        <Button variant={layout === 'list' ? 'secondary' : 'ghost'} size="icon" onClick={() => setLayout('list')} className="h-8 w-8">
                            <List className="h-4 w-4" />
                        </Button>
                    </div>
                    <Button asChild>
                        <Link href="/vendor/nesthomes/add">
                            <PlusCircle className="mr-2 h-4 w-4" /> Add Property
                        </Link>
                    </Button>
                </div>
            </div>
            
            <div className={`grid gap-6 ${layout === 'grid' ? 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'}`}>
                {properties.map(prop => (
                    <PropertyItem key={prop.id} property={prop} />
                ))}
            </div>
        </div>
    );
}
