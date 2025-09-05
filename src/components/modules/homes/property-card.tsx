
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Bed, Bath, Landmark, MapPin, Heart, PlusCircle } from 'lucide-react';
import type { Property } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { useMemo } from 'react';

interface PropertyCardProps {
  property: Property;
  layout?: 'grid' | 'list';
}

function createSlug(title: string) {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

const localImages = [
    '/property/1.jpg',
    '/property/2.jpg',
    '/property/3.jpg',
    '/property/4.jpg',
    '/property/5.jpg',
    '/property/6.jpg',
    '/property/7.jpg',
    '/property/8.jpg',
];


export function PropertyCard({ property, layout = 'grid' }: PropertyCardProps) {
  const formatPrice = (price: number) => {
    if (property.type === 'For Rent') {
        return `Ksh ${price.toLocaleString()}/mo`;
    }
    return `Ksh ${price.toLocaleString()}`;
  };
  
  const propertySlug = createSlug(property.title);

  const randomImage = useMemo(() => localImages[Math.floor(Math.random() * localImages.length)], [property.id]);


  if (layout === 'list') {
    return (
        <Card className="overflow-hidden transition-shadow hover:shadow-lg group w-full">
            <div className="flex flex-col md:flex-row">
                <div className="relative md:w-1/3">
                    <Link href={`/modules/homes/properties/${propertySlug}`} className="block">
                        <Image
                            src={randomImage}
                            alt={property.title}
                            width={400}
                            height={250}
                            className="object-cover w-full h-full"
                            data-ai-hint="house exterior"
                        />
                    </Link>
                    <div className="absolute top-4 left-4">
                        <span className="bg-primary/80 text-white text-xs font-semibold px-3 py-1 rounded-full">{property.type}</span>
                    </div>
                </div>
                <div className="md:w-2/3">
                    <CardContent className="p-4 flex flex-col justify-between h-full">
                        <div>
                            <p className="text-xl font-bold text-primary mb-2">{formatPrice(property.price)}</p>
                            <h3 className="text-lg font-semibold leading-tight truncate">
                                <Link href={`/modules/homes/properties/${propertySlug}`} className="hover:text-primary">{property.title}</Link>
                            </h3>
                            <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                                <MapPin className="h-4 w-4" />
                                <span>{property.location}</span>
                            </div>
                            <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                                A beautiful and spacious property located in a prime area, perfect for families or professionals looking for comfort and convenience.
                            </p>
                        </div>
                        <div className="mt-4 flex justify-between items-center gap-4 text-sm text-muted-foreground border-t pt-4">
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-1.5">
                                    <Bed className="h-4 w-4 text-primary"/>
                                    <span>{property.beds}</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <Bath className="h-4 w-4 text-primary"/>
                                    <span>{property.baths}</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <Landmark className="h-4 w-4 text-primary"/>
                                    <span>{property.area.toLocaleString()} sqft</span>
                                </div>
                            </div>
                            <div className="flex gap-2">
                               <Button size="icon" variant="outline" className="rounded-full h-8 w-8"><Heart className="h-4 w-4"/></Button>
                               <Button size="icon" variant="outline" className="rounded-full h-8 w-8"><PlusCircle className="h-4 w-4"/></Button>
                            </div>
                        </div>
                    </CardContent>
                </div>
            </div>
        </Card>
    );
  }


  return (
    <Card className="overflow-hidden transition-shadow hover:shadow-lg group">
        <div className="relative">
             <Link href={`/modules/homes/properties/${propertySlug}`} className="block">
                <Image
                    src={randomImage}
                    alt={property.title}
                    width={400}
                    height={250}
                    className="object-cover w-full h-56"
                    data-ai-hint="house exterior"
                />
             </Link>
            <div className="absolute top-4 left-4 flex gap-2">
                 <span className="bg-primary/80 text-white text-xs font-semibold px-3 py-1 rounded-full">{property.type}</span>
            </div>
            <div className="absolute bottom-4 left-4">
                 <p className="text-xl font-bold text-white bg-black/50 px-3 py-1 rounded-md">{formatPrice(property.price)}</p>
            </div>
             <div className="absolute top-4 right-4 flex gap-2">
                <Button size="icon" variant="ghost" className="bg-white/80 hover:bg-white rounded-full h-8 w-8"><Heart className="h-4 w-4 text-primary"/></Button>
                <Button size="icon" variant="ghost" className="bg-white/80 hover:bg-white rounded-full h-8 w-8"><PlusCircle className="h-4 w-4 text-primary"/></Button>
            </div>
        </div>
      <CardContent className="p-4">
        <h3 className="mt-1 text-lg font-semibold leading-tight truncate">
          <Link href={`/modules/homes/properties/${propertySlug}`} className="hover:text-primary">{property.title}</Link>
        </h3>
        <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4" />
          <span>{property.location}</span>
        </div>
        <div className="mt-4 flex justify-start items-center gap-4 text-sm text-muted-foreground border-t pt-4">
            <div className="flex items-center gap-1.5">
                <Bed className="h-4 w-4 text-primary"/>
                <span>{property.beds}</span>
            </div>
            <div className="flex items-center gap-1.5">
                <Bath className="h-4 w-4 text-primary"/>
                <span>{property.baths}</span>
            </div>
            <div className="flex items-center gap-1.5">
                <Landmark className="h-4 w-4 text-primary"/>
                <span>{property.area.toLocaleString()} sqft</span>
            </div>
        </div>
      </CardContent>
    </Card>
  );
}
