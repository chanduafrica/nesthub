
'use client';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import type { DukaProduct } from '@/lib/mock-data';
import { useToast } from '@/hooks/use-toast';

interface ProductCardProps {
    product: DukaProduct;
}

export function ProductCard({ product }: ProductCardProps) {
    const { toast } = useToast();

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        toast({
            title: "Added to Cart",
            description: `${product.name} has been added to your cart.`,
        });
    };

    return (
        <Card className="overflow-hidden group h-full flex flex-col">
             <div className="relative h-32 w-full">
                <Image src={product.images[0]} alt={product.name} fill className="object-cover" />
            </div>
            <CardContent className="p-3 flex flex-col flex-grow">
                <p className="text-xs text-muted-foreground">{product.brand}</p>
                <h4 className="font-semibold text-sm truncate flex-grow">{product.name}</h4>
                <p className="text-xs text-muted-foreground">{product.unitSize}</p>
                <div className="mt-2 flex items-baseline justify-between">
                    <p className="font-bold text-primary">KES {product.price.toLocaleString()}</p>
                    <Button size="icon" className="h-8 w-8" onClick={handleAddToCart}>
                        <PlusCircle className="h-4 w-4" />
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
