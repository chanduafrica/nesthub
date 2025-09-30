
'use client';

import { notFound } from 'next/navigation';
import { getProducts } from '@/lib/firebase-services';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Edit, ExternalLink, Gift, Flame, Lock, ToggleLeft, ToggleRight, Loader2 } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useToast } from '@/hooks/use-toast';
import { useState, useEffect } from 'react';
import type { Product, ProductStatus } from '@/lib/mock-data';
import { handleUpdateProductStatus, handleUpdateProduct } from '@/app/vendor/(authed)/products/actions';

// This is a new Client Component that fetches its own data
export default function ViewProductPage({ params }: { params: { id: string } }) {
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const { toast } = useToast();

    useEffect(() => {
        const fetchProduct = async () => {
            const products = await getProducts();
            const foundProduct = products.find(p => p.id === params.id);
            if (foundProduct) {
                setProduct(foundProduct);
            }
            setLoading(false);
        };
        fetchProduct();
    }, [params.id]);

    if (loading) {
        return <div className="flex justify-center items-center h-full"><Loader2 className="h-8 w-8 animate-spin" /></div>
    }
    
    if (!product) {
        notFound();
    }
    
    const formatCurrency = (amount: number | undefined) => {
        if (amount === undefined) return 'N/A';
        return `KES ${amount.toLocaleString('en-US')}`;
    }

    const discountPercentage = product.discountPrice ? ((product.price - product.discountPrice) / product.price) * 100 : 0;
    const isExplosiveDealEligible = discountPercentage >= 80;

    const toggleProductStatus = async () => {
        const newStatus = product.status === 'Active' ? 'Inactive' : 'Active';
        try {
            await handleUpdateProductStatus(product!.id, newStatus);
            setProduct(prev => prev ? { ...prev, status: newStatus } : null);
            toast({
                title: 'Status Updated',
                description: `${product!.title} has been set to ${newStatus}.`,
            });
        } catch (error) {
            toast({
                title: 'Error',
                description: 'Could not update product status.',
                variant: 'destructive',
            });
        }
    };
    
    const handlePromoFlagChange = async (flag: 'isCeoPick' | 'inMiddayVault' | 'inExplosiveDeal', value: boolean) => {
        if (!product) return;
        const updatedProductData = {
            id: product.id,
            title: product.title,
            category: product.category,
            price: product.price,
            discountPrice: product.discountPrice,
            image: product.image,
            [flag]: value,
        };

        try {
            const updatedProduct = await handleUpdateProduct(updatedProductData as any);
             setProduct(prev => prev ? { ...prev, ...updatedProduct.product } : null);
            toast({
                title: 'Promotion Flag Updated',
                description: `Product's eligibility for promotion has been updated.`,
            });
        } catch (error) {
            console.error(error);
            toast({
                title: 'Error',
                description: 'Could not update the promotion flag.',
                variant: 'destructive',
            });
        }
    };

    return (
        <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                    <Button variant="outline" size="icon" asChild>
                        <Link href="/vendor/products">
                            <ArrowLeft className="h-4 w-4" />
                        </Link>
                    </Button>
                    <h1 className="text-2xl font-bold">Product Details</h1>
                </div>
                 <div className="flex items-center gap-2">
                    <Button variant="outline" asChild>
                      <Link href={`/modules/mall/product/${product.slug}`} target="_blank">
                        <ExternalLink className="mr-2 h-4 w-4" /> View Public Page
                      </Link>
                    </Button>
                    <Button asChild>
                      <Link href={`/vendor/products/${product.id}/edit`}>
                        <Edit className="mr-2 h-4 w-4" /> Edit
                      </Link>
                    </Button>
                </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                     <Card>
                        <CardHeader>
                            <CardTitle>{product.title}</CardTitle>
                            <CardDescription>Product ID: {product.id}</CardDescription>
                        </CardHeader>
                        <CardContent>
                             <div className="prose prose-sm max-w-none text-muted-foreground">
                                <p>A general description of the product would go here, providing details on its features, benefits, and usage. This section is currently a placeholder.</p>
                             </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Pricing</CardTitle>
                        </CardHeader>
                        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                           <div className="space-y-1">
                                <p className="text-sm font-medium text-muted-foreground">Standard Price</p>
                                <p className="text-lg font-semibold">{formatCurrency(product.price)}</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-sm font-medium text-muted-foreground">Discounted Price</p>
                                <p className="text-lg font-semibold">{product.discountPrice ? formatCurrency(product.discountPrice) : 'N/A'}</p>
                            </div>
                        </CardContent>
                    </Card>
                     <Card>
                        <CardHeader>
                            <CardTitle>Promotional Settings</CardTitle>
                            <CardDescription>Nominate this product for special platform-wide deals.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between p-3 rounded-md border">
                                <Label htmlFor="ceo-pick" className="flex items-center gap-2 font-medium">
                                    <Gift className="h-5 w-5 text-primary" />
                                    Allow for C.E.O's Giveaway
                                </Label>
                                <Switch id="ceo-pick" checked={product.isCeoPick} onCheckedChange={(checked) => handlePromoFlagChange('isCeoPick', checked)} />
                            </div>
                            <div className="flex items-center justify-between p-3 rounded-md border">
                                <Label htmlFor="midday-vault" className="flex items-center gap-2 font-medium">
                                    <Lock className="h-5 w-5 text-primary" />
                                    Allow for Midday Vault
                                </Label>
                                <Switch id="midday-vault" checked={product.inMiddayVault} onCheckedChange={(checked) => handlePromoFlagChange('inMiddayVault', checked)} />
                            </div>
                            <div className="flex items-center justify-between p-3 rounded-md border">
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Label htmlFor="explosive-deal" className={`flex items-center gap-2 font-medium ${!isExplosiveDealEligible && 'cursor-not-allowed text-muted-foreground'}`}>
                                                <Flame className="h-5 w-5 text-primary" />
                                                Allow for Explosive Deals
                                            </Label>
                                        </TooltipTrigger>
                                        {!isExplosiveDealEligible && (
                                            <TooltipContent>
                                                <p>Product discount must be 80% or more to be eligible.</p>
                                            </TooltipContent>
                                        )}
                                    </Tooltip>
                                </TooltipProvider>
                                <Switch id="explosive-deal" disabled={!isExplosiveDealEligible} checked={product.inExplosiveDeal} onCheckedChange={(checked) => handlePromoFlagChange('inExplosiveDeal', checked)} />
                            </div>
                        </CardContent>
                    </Card>
                </div>
                <div className="lg:col-span-1 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Product Image</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="relative aspect-square w-full">
                                <Image
                                    src={product.image}
                                    alt={product.title}
                                    fill
                                    className="rounded-md object-cover"
                                />
                            </div>
                        </CardContent>
                    </Card>
                     <Card>
                        <CardHeader>
                            <CardTitle>Organization</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                             <div className="space-y-2">
                                <p className="text-sm font-medium text-muted-foreground">Status</p>
                                <div className="flex items-center gap-2">
                                    <Badge variant={product.status === 'Active' ? 'default' : 'secondary'}>
                                        {product.status}
                                    </Badge>
                                     <Button size="sm" variant="outline" onClick={toggleProductStatus}>
                                        {product.status === 'Active' ? (
                                            <><ToggleLeft className="mr-2 h-4 w-4" /> Deactivate</>
                                        ) : (
                                            <><ToggleRight className="mr-2 h-4 w-4" /> Activate</>
                                        )}
                                    </Button>
                                </div>
                            </div>
                            <div className="space-y-1">
                                <p className="text-sm font-medium text-muted-foreground">Category</p>
                                <p>{product.category}</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-sm font-medium text-muted-foreground">Vendor</p>
                                <p>{product.vendor}</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
