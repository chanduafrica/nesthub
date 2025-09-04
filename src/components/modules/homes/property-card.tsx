
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Bed, Bath, Landmark, MapPin } from 'lucide-react';
import type { Property } from '@/lib/mock-data';

interface PropertyCardProps {
  property: Property;
}

export function PropertyCard({ property }: PropertyCardProps) {
  const formatPrice = (price: number) => {
    if (property.type === 'For Rent') {
        return `KES ${price.toLocaleString()}/mo`;
    }
    return `KES ${price.toLocaleString()}`;
  };

  return (
    <Card className="overflow-hidden transition-shadow hover:shadow-lg">
      <Link href="#" className="block">
        <div className="relative h-56 w-full">
          <Image
            src={property.imageUrl}
            alt={property.title}
            fill
            className="object-cover"
            data-ai-hint="house exterior"
          />
          <Badge 
            className="absolute top-4 left-4"
            variant={property.type === 'For Sale' ? 'default' : 'secondary'}
          >
            {property.type}
          </Badge>
        </div>
      </Link>
      <CardContent className="p-4">
        <p className="text-lg font-bold text-primary">{formatPrice(property.price)}</p>
        <h3 className="mt-2 text-lg font-semibold leading-tight truncate">
          <Link href="#" className="hover:underline">{property.title}</Link>
        </h3>
        <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4" />
          <span>{property.location}</span>
        </div>
        <div className="mt-4 flex justify-start items-center gap-4 text-sm text-muted-foreground border-t pt-4">
            <div className="flex items-center gap-1.5">
                <Bed className="h-4 w-4"/>
                <span>{property.beds} Beds</span>
            </div>
            <div className="flex items-center gap-1.5">
                <Bath className="h-4 w-4"/>
                <span>{property.baths} Baths</span>
            </div>
            <div className="flex items-center gap-1.5">
                <Landmark className="h-4 w-4"/>
                <span>{property.area.toLocaleString()} sqft</span>
            </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 bg-secondary/50">
         <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                    <AvatarImage src={property.agent.avatarUrl} alt={property.agent.name} />
                    <AvatarFallback>{property.agent.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium">{property.agent.name}</span>
            </div>
         </div>
      </CardFooter>
    </Card>
  );
}
