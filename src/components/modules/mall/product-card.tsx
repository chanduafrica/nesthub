
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, ShoppingCart, Star, Eye } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ProductCardProps {
    product: any;
    layout?: 'grid' | 'list';
}

export function ProductCard({ product, layout = 'grid' }: ProductCardProps) {
    const { toast } = useToast();

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        toast({
            title: "Added to Cart",
            description: `${product.title} has been added to your cart.`,
        });
    };

    if (layout === 'list') {
        return (
            <Card className="overflow-hidden group w-full transition-shadow hover:shadow-lg">
                <Link href={`/modules/mall/product/${product.slug}`} className="flex flex-col md:flex-row no-underline">
                     <div className="relative md:w-1/4">
                        <Image
                            src={product.image}
                            alt={product.title}
                            width={250}
                            height={250}
                            className="object-cover w-full h-full"
                        />
                         {product.discountPrice && <Badge className="absolute top-2 left-2">DEAL</Badge>}
                    </div>
                    <div className="p-4 flex flex-col justify-between flex-1">
                        <div>
                            <p className="text-sm text-muted-foreground">{product.vendor}</p>
                            <h3 className="font-semibold text-lg leading-tight mt-1 group-hover:text-primary transition-colors">{product.title}</h3>
                            <div className="flex items-center gap-1 text-sm mt-1">
                                <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" /> 
                                <span className="font-semibold">{product.rating}</span>
                                <span className="text-muted-foreground">(1k+)</span>
                            </div>
                        </div>
                        <div className="mt-4 flex justify-between items-end">
                            <div>
                                {product.discountPrice ? (
                                    <>
                                        <p className="text-xl font-bold text-primary">KES {product.discountPrice.toLocaleString()}</p>
                                        <p className="text-sm text-muted-foreground line-through">KES {product.price.toLocaleString()}</p>
                                    </>
                                ) : (
                                    <p className="text-xl font-bold text-primary">KES {product.price.toLocaleString()}</p>
                                )}
                            </div>
                            <div className="flex items-center gap-2">
                                <Button size="sm" variant="outline" onClick={handleAddToCart}><ShoppingCart className="mr-2 h-4 w-4"/>Add to Cart</Button>
                                <Button size="sm">View Product</Button>
                            </div>
                        </div>
                    </div>
                </Link>
            </Card>
        );
    }


    return (
        <Card className="overflow-hidden group flex flex-col h-full transition-shadow hover:shadow-lg">
             <Link href={`/modules/mall/product/${product.slug}`} className="no-underline">
                <CardContent className="p-0">
                    <div className="relative">
                         <Image src={product.image} alt={product.title} width={300} height={300} className="w-full h-48 object-cover"/>
                         {product.discountPrice && <Badge className="absolute top-2 left-2">DEAL</Badge>}
                         <Button variant="secondary" size="icon" className="absolute top-2 right-2 h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Heart className="h-4 w-4" />
                         </Button>
                    </div>
                    <div className="p-4">
                        <p className="text-xs text-muted-foreground">{product.vendor}</p>
                        <h3 className="font-semibold truncate mt-1">{product.title}</h3>
                        <div className="flex items-center gap-1 text-sm mt-2">
                            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" /> 
                            <span>{product.rating}</span>
                        </div>
                        <div className="mt-2">
                             {product.discountPrice ? (
                                    <>
                                        <span className="text-lg font-bold text-primary">KES {product.discountPrice.toLocaleString()}</span>
                                        <span className="text-sm text-muted-foreground line-through ml-2">KES {product.price.toLocaleString()}</span>
                                    </>
                                ) : (
                                    <span className="text-lg font-bold text-primary">KES {product.price.toLocaleString()}</span>
                                )}
                        </div>
                    </div>
                </CardContent>
            </Link>
            <CardFooter className="p-4 pt-0 mt-auto">
                <Button className="w-full" onClick={handleAddToCart}><ShoppingCart className="mr-2 h-4 w-4" />Add to Cart</Button>
            </CardFooter>
        </Card>
    );
}

