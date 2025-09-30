

'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowLeft, Loader2, UploadCloud } from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';
import { handleUpdateProduct } from '@/app/vendor/(authed)/products/actions';
import { getProducts } from '@/lib/firebase-services';
import type { Product } from '@/lib/mock-data';
import { RichTextEditor } from '@/components/ui/rich-text-editor';

const categories = {
  "Electronics": ["Smartphones", "Laptops", "Wearables", "Audio", "Accessories"],
  "Fashion": ["Women's Clothing", "Men's Clothing", "Footwear"],
  "Home & Living": ["Furniture", "Appliances", "Decor"],
  "Groceries": ["Fresh Produce", "Pantry Staples"],
  "Auto Parts": ["Engine Parts", "Braking System"]
};

export default function EditProductPage() {
    const router = useRouter();
    const params = useParams();
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const [product, setProduct] = useState<Product | null>(null);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [description, setDescription] = useState('');

    useEffect(() => {
        const fetchProduct = async () => {
            setIsLoading(true);
            const products = await getProducts();
            const foundProduct = products.find(p => p.id === params.id);
            if (foundProduct) {
                setProduct(foundProduct);
                setSelectedCategories(foundProduct.category || []);
                setDescription(foundProduct.description || '');
            } else {
                toast({ title: "Product not found", variant: "destructive" });
                router.push('/vendor/products');
            }
            setIsLoading(false);
        };
        if (params.id) {
            fetchProduct();
        }
    }, [params.id, router, toast]);

    const handleCategoryChange = (category: string, checked: boolean) => {
      setSelectedCategories(prev => 
        checked ? [...prev, category] : prev.filter(c => c !== category)
      );
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!product) return;
        
        setIsLoading(true);

        const formData = new FormData(e.currentTarget);
        const productData = {
            id: product.id,
            title: formData.get('title') as string,
            description: description,
            category: selectedCategories,
            price: Number(formData.get('price')),
            discountPrice: Number(formData.get('discountPrice')) || undefined,
            image: product.image, // Image updates are not handled in this version
        };

        try {
            await handleUpdateProduct(productData as any);
            toast({
                title: 'Product Updated!',
                description: `${productData.title} has been successfully updated.`,
            });
            router.push('/vendor/products');
        } catch (error) {
            toast({
                title: 'Error',
                description: 'Could not update the product. Please try again.',
                variant: 'destructive',
            });
            setIsLoading(false);
        }
    };
    
    if (isLoading || !product) {
        return (
            <div className="flex items-center justify-center h-full">
                <Loader2 className="h-8 w-8 animate-spin" />
            </div>
        );
    }

    return (
        <div className="flex-1">
            <form onSubmit={handleSubmit}>
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                        <Button variant="outline" size="icon" asChild>
                            <Link href="/vendor/products">
                                <ArrowLeft className="h-4 w-4" />
                            </Link>
                        </Button>
                        <h1 className="text-2xl font-bold">Edit Product</h1>
                    </div>
                     <Button type="submit" disabled={isLoading}>
                        {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                        Save Changes
                    </Button>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Basic Information</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="title">Product Name</Label>
                                    <Input id="title" name="title" defaultValue={product.title} required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="description">Description</Label>
                                     <RichTextEditor description={description} onChange={setDescription} />
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle>Images</CardTitle>
                                <CardDescription>Upload high-quality images for your product.</CardDescription>
                            </CardHeader>
                             <CardContent>
                                <div className="border-2 border-dashed border-muted-foreground/50 rounded-lg p-10 flex flex-col items-center justify-center text-center">
                                    <UploadCloud className="h-10 w-10 text-muted-foreground mb-4"/>
                                    <p className="font-semibold mb-2">Drag & drop images here</p>
                                    <p className="text-sm text-muted-foreground mb-4">or</p>
                                    <Button type="button" variant="outline">Browse Files</Button>
                                </div>
                             </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle>Pricing</CardTitle>
                            </CardHeader>
                            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                               <div className="space-y-2">
                                    <Label htmlFor="price">Standard Price (KES)</Label>
                                    <Input id="price" name="price" type="number" defaultValue={product.price} required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="discountPrice">Discounted Price (KES)</Label>
                                    <Input id="discountPrice" name="discountPrice" type="number" defaultValue={product.discountPrice} placeholder="(optional)" />
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                    <div className="lg:col-span-1 space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Organization</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                  <Label>Categories</Label>
                                    <div className="space-y-2 rounded-md border p-4 max-h-60 overflow-y-auto">
                                        {Object.entries(categories).map(([parent, children]) => (
                                          <div key={parent}>
                                              <div className="flex items-center space-x-2">
                                                <Checkbox 
                                                  id={parent}
                                                  checked={selectedCategories.includes(parent)}
                                                  onCheckedChange={(checked) => handleCategoryChange(parent, !!checked)}
                                                />
                                                <label htmlFor={parent} className="font-semibold text-sm">{parent}</label>
                                              </div>
                                              <div className="pl-6 mt-2 space-y-2">
                                                {children.map(child => (
                                                  <div key={child} className="flex items-center space-x-2">
                                                      <Checkbox
                                                        id={child}
                                                        checked={selectedCategories.includes(child)}
                                                        onCheckedChange={(checked) => handleCategoryChange(child, !!checked)}
                                                      />
                                                      <label htmlFor={child} className="text-sm text-muted-foreground">{child}</label>
                                                  </div>
                                                ))}
                                              </div>
                                          </div>
                                        ))}
                                    </div>
                                </div>
                                 <div className="space-y-2">
                                    <Label htmlFor="tags">Tags (comma-separated)</Label>
                                    <Input id="tags" name="tags" placeholder="e.g., bag, leather, handmade" />
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </form>
        </div>
    );
}
