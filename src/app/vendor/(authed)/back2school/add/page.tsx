'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Loader2, UploadCloud, PlusCircle, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';
import { RichTextEditor } from '@/components/ui/rich-text-editor';
import { handleAddBack2SchoolListing } from '../actions';
import { Checkbox } from '@/components/ui/checkbox';

const categories = ['Uniforms', 'Books & Stationery', 'Electronics', 'School Furniture', 'Art & Music Supplies'];
const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
const colors = ['Blue', 'White', 'Grey', 'Black', 'Red', 'Green'];
const grades = ['Playgroup', 'PP1', 'PP2', 'Grade 1-3', 'Grade 4-6', 'Junior Sec', 'Senior Sec', 'University'];

export default function AddBack2SchoolPage() {
    const router = useRouter();
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const [description, setDescription] = useState('');
    const [discounts, setDiscounts] = useState([{ quantity: 10, discount: 5 }, { quantity: 50, discount: 10 }]);

    const handleDiscountChange = (index: number, field: 'quantity' | 'discount', value: string) => {
        const newDiscounts = [...discounts];
        newDiscounts[index][field] = Number(value);
        setDiscounts(newDiscounts);
    };

    const addDiscountRow = () => setDiscounts([...discounts, { quantity: 0, discount: 0 }]);
    const removeDiscountRow = (index: number) => setDiscounts(discounts.filter((_, i) => i !== index));

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        
        const formData = new FormData(e.currentTarget);
        const data = {
            title: formData.get('title') as string,
            category: formData.get('category') as any,
            brand: formData.get('brand') as string,
            description,
            pricing: {
                unitPrice: Number(formData.get('unitPrice')),
                bulkDiscounts: discounts,
            },
            stock: {
                quantity: Number(formData.get('stock')),
                restockAlertThreshold: Number(formData.get('restockAlert')),
            },
            variations: {
                size: sizes.filter(s => formData.has(`size-${s}`)),
                color: colors.filter(c => formData.has(`color-${c}`)),
                gradeLevel: grades.filter(g => formData.has(`grade-${g}`)),
            },
            delivery: {
                method: formData.get('deliveryMethod') as any,
                estimatedTime: formData.get('deliveryTime') as string,
                returnPolicy: formData.get('returnPolicy') as any,
            },
        };

        try {
            await handleAddBack2SchoolListing(data);
            toast({
                title: 'Product Submitted!',
                description: `${data.title} has been submitted for review.`,
            });
            router.push('/vendor/back2school');
        } catch (error) {
            toast({
                title: 'Error',
                description: 'Could not add the product. Please try again.',
                variant: 'destructive',
            });
            setIsLoading(false);
        }
    };

    return (
        <div className="flex-1">
            <form onSubmit={handleSubmit}>
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                        <Button variant="outline" size="icon" asChild><Link href="/vendor/back2school"><ArrowLeft className="h-4 w-4" /></Link></Button>
                        <h1 className="text-2xl font-bold">Add School Product</h1>
                    </div>
                     <Button type="submit" disabled={isLoading}>
                        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Submit for Review
                    </Button>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-6">
                        <Card>
                            <CardHeader><CardTitle>Product Information</CardTitle></CardHeader>
                            <CardContent className="space-y-4">
                                <Input name="title" placeholder="Product Title" required />
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <Select name="category"><SelectTrigger><SelectValue placeholder="Select Category"/></SelectTrigger><SelectContent>{categories.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent></Select>
                                    <Input name="brand" placeholder="Brand/Publisher (Optional)" />
                                </div>
                                <RichTextEditor description={description} onChange={setDescription} />
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader><CardTitle>Product Variations</CardTitle></CardHeader>
                            <CardContent className="space-y-4">
                                <div><Label>Size (for uniforms)</Label><div className="flex flex-wrap gap-4 mt-2">{sizes.map(s => <div key={s} className="flex items-center gap-2"><Checkbox id={`size-${s}`} name={`size-${s}`}/><Label htmlFor={`size-${s}`}>{s}</Label></div>)}</div></div>
                                <div><Label>Color</Label><div className="flex flex-wrap gap-4 mt-2">{colors.map(c => <div key={c} className="flex items-center gap-2"><Checkbox id={`color-${c}`} name={`color-${c}`}/><Label htmlFor={`color-${c}`}>{c}</Label></div>)}</div></div>
                                <div><Label>Grade/Level</Label><div className="flex flex-wrap gap-4 mt-2">{grades.map(g => <div key={g} className="flex items-center gap-2"><Checkbox id={`grade-${g}`} name={`grade-${g}`}/><Label htmlFor={`grade-${g}`}>{g}</Label></div>)}</div></div>
                            </CardContent>
                        </Card>
                        
                         <Card>
                            <CardHeader><CardTitle>Media</CardTitle></CardHeader>
                            <CardContent>
                                <div className="border-2 border-dashed p-6 text-center">
                                    <UploadCloud className="mx-auto h-8 w-8 text-muted-foreground mb-2"/>
                                    <Label htmlFor="images" className="text-primary font-semibold cursor-pointer">Click to upload images</Label>
                                    <Input id="images" name="images" type="file" multiple className="hidden"/>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="lg:col-span-1 space-y-6">
                        <Card>
                            <CardHeader><CardTitle>Pricing & Stock</CardTitle></CardHeader>
                            <CardContent className="space-y-4">
                                <Input name="unitPrice" type="number" placeholder="Unit Price (KES)" required/>
                                <Input name="stock" type="number" placeholder="Stock Quantity" required />
                                <Input name="restockAlert" type="number" placeholder="Restock Alert at (quantity)" />
                                <div>
                                    <Label>Bulk Discounts</Label>
                                    {discounts.map((d, i) => (
                                        <div key={i} className="flex items-end gap-2 mt-2">
                                            <Input type="number" placeholder="10+" value={d.quantity} onChange={e => handleDiscountChange(i, 'quantity', e.target.value)} />
                                            <Input type="number" placeholder="5%" value={d.discount} onChange={e => handleDiscountChange(i, 'discount', e.target.value)} />
                                            <Button type="button" variant="ghost" size="icon" onClick={() => removeDiscountRow(i)}><Trash2 className="h-4 w-4 text-destructive"/></Button>
                                        </div>
                                    ))}
                                    <Button type="button" variant="outline" size="sm" onClick={addDiscountRow} className="mt-2"><PlusCircle className="mr-2 h-4 w-4"/>Add Discount Tier</Button>
                                </div>
                            </CardContent>
                        </Card>
                         <Card>
                            <CardHeader><CardTitle>Shipping & Delivery</CardTitle></CardHeader>
                            <CardContent className="space-y-4">
                               <Select name="deliveryMethod"><SelectTrigger><SelectValue placeholder="Delivery Method"/></SelectTrigger><SelectContent><SelectItem value="Courier">Courier</SelectItem><SelectItem value="Pickup">Pickup</SelectItem><SelectItem value="Partner School Distribution">Partner School Distribution</SelectItem></SelectContent></Select>
                               <Input name="deliveryTime" placeholder="Est. Delivery Time (e.g., 2-3 days)" />
                               <Select name="returnPolicy"><SelectTrigger><SelectValue placeholder="Return Policy"/></SelectTrigger><SelectContent><SelectItem value="No Returns">No Returns</SelectItem><SelectItem value="7-Day Return">7-Day Return</SelectItem><SelectItem value="Exchange Only">Exchange Only</SelectItem></SelectContent></Select>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </form>
        </div>
    );
}
