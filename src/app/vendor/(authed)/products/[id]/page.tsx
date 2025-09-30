
import { notFound } from 'next/navigation';
import { getProducts } from '@/lib/firebase-services';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Edit, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

export default async function ViewProductPage({ params }: { params: { id: string } }) {
    const products = await getProducts();
    const product = products.find(p => p.id === params.id);

    if (!product) {
        notFound();
    }
    
    const formatCurrency = (amount: number | undefined) => {
        if (amount === undefined) return 'N/A';
        return `KES ${amount.toLocaleString('en-US')}`;
    }

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
                            <div className="space-y-1">
                                <p className="text-sm font-medium text-muted-foreground">Status</p>
                                <Badge variant={product.status === 'Active' ? 'default' : 'secondary'}>
                                    {product.status}
                                </Badge>
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

