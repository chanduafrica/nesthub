'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Loader2, UploadCloud, PlusCircle, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';
import { RichTextEditor } from '@/components/ui/rich-text-editor';
import { handleAddDukaListing } from '../actions';
import { Checkbox } from '@/components/ui/checkbox';
import { DatePicker } from '@/components/ui/date-picker';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { format } from 'date-fns';

const categories = ["Beverages", "Food & Snacks", "Household & Cleaning", "Personal Care", "Baby Products", "Dairy", "Cooking Essentials", "Electronics (Small)"];

export default function AddDukaProductPage() {
    const router = useRouter();
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const [description, setDescription] = useState('');
    const [bulkPrices, setBulkPrices] = useState([{ quantity: 10, price: 0 }]);
    const [expiryDate, setExpiryDate] = useState<Date | undefined>();

    const handleBulkPriceChange = (index: number, field: 'quantity' | 'price', value: string) => {
        const newPrices = [...bulkPrices];
        newPrices[index][field] = Number(value);
        setBulkPrices(newPrices);
    };

    const addBulkPriceRow = () => setBulkPrices([...bulkPrices, { quantity: 0, price: 0 }]);
    const removeBulkPriceRow = (index: number) => setBulkPrices(bulkPrices.filter((_, i) => i !== index));

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        
        const formData = new FormData(e.currentTarget);
        const data = {
            name: formData.get('name') as string,
            brand: formData.get('brand') as string,
            category: formData.get('category') as any,
            description,
            unitSize: formData.get('unitSize') as string,
            price: Number(formData.get('price')),
            discountedPrice: Number(formData.get('discountedPrice')) || undefined,
            stock: Number(formData.get('stock')),
            reorderLevel: Number(formData.get('reorderLevel')) || undefined,
            expiryDate: expiryDate ? format(expiryDate, 'yyyy-MM-dd') : undefined,
            status: formData.get('status') as any,
        };

        try {
            await handleAddDukaListing(data);
            toast({
                title: 'Product Submitted!',
                description: `${data.name} has been submitted for review.`,
            });
            router.push('/vendor/duka');
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
                        <Button variant="outline" size="icon" asChild>
                            <Link href="/vendor/duka"><ArrowLeft className="h-4 w-4" /></Link>
                        </Button>
                        <h1 className="text-2xl font-bold">Add New Duka Product</h1>
                    </div>
                     <Button type="submit" disabled={isLoading}>
                        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Submit for Review
                    </Button>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-6">
                        <Card>
                            <CardHeader><CardTitle>Product Details</CardTitle></CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <Input name="name" placeholder="Product Name" required />
                                    <Input name="brand" placeholder="Brand Name (e.g., Coca-Cola)" />
                                </div>
                                <Select name="category"><SelectTrigger><SelectValue placeholder="Select Category"/></SelectTrigger><SelectContent>{categories.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent></Select>
                                <RichTextEditor description={description} onChange={setDescription} />
                                <Input name="sku" placeholder="SKU / Barcode (Optional)" />
                            </CardContent>
                        </Card>
                         <Card>
                            <CardHeader><CardTitle>Product Images</CardTitle></CardHeader>
                            <CardContent>
                                <div className="border-2 border-dashed p-6 text-center">
                                    <UploadCloud className="mx-auto h-8 w-8 text-muted-foreground mb-2"/>
                                    <Label htmlFor="images" className="text-primary font-semibold cursor-pointer">Click to upload images</Label>
                                    <Input id="images" name="images" type="file" multiple className="hidden"/>
                                </div>
                            </CardContent>
                        </Card>
                         <Card>
                            <CardHeader><CardTitle>Availability & Location</CardTitle></CardHeader>
                            <CardContent className="space-y-4">
                               <Input name="county" placeholder="County (e.g., Nairobi)" />
                               <Input name="town" placeholder="Town/Area (e.g., CBD, Westlands)" />
                                <div>
                                    <Label>Delivery Options</Label>
                                    <div className="flex flex-wrap gap-4 mt-2">
                                        <div className="flex items-center gap-2"><Checkbox id="del-vendor" /><Label htmlFor="del-vendor">Vendor Delivery</Label></div>
                                        <div className="flex items-center gap-2"><Checkbox id="del-rider" defaultChecked/><Label htmlFor="del-rider">NestDuka Partner Rider</Label></div>
                                        <div className="flex items-center gap-2"><Checkbox id="del-pickup" /><Label htmlFor="del-pickup">Customer Pickup</Label></div>
                                    </div>
                                </div>
                               <Input name="deliveryTime" placeholder="Estimated Delivery Time (e.g., 1-2 hours)" />
                            </CardContent>
                        </Card>
                    </div>

                    <div className="lg:col-span-1 space-y-6">
                        <Card>
                            <CardHeader><CardTitle>Pricing & Quantity</CardTitle></CardHeader>
                            <CardContent className="space-y-4">
                                <Input name="unitSize" placeholder="Unit Size (e.g., 500ml, 1kg)" required />
                                <div className="grid grid-cols-2 gap-4">
                                    <Input name="price" type="number" placeholder="Selling Price (KES)" required/>
                                    <Input name="discountedPrice" type="number" placeholder="Discount Price"/>
                                </div>
                                <Input name="stock" type="number" placeholder="Stock Quantity" required />
                                <Input name="reorderLevel" type="number" placeholder="Low Stock Alert Level"/>
                                <div className="space-y-2"><Label>Expiry Date (for perishables)</Label><DatePicker placeholder="Select expiry date" /></div>
                            </CardContent>
                        </Card>
                        
                        <Card>
                            <CardHeader><CardTitle>Bulk Pricing</CardTitle></CardHeader>
                            <CardContent className="space-y-4">
                               {bulkPrices.map((bp, i) => (
                                    <div key={i} className="flex items-end gap-2">
                                        <Input type="number" placeholder="10+" value={bp.quantity} onChange={e => handleBulkPriceChange(i, 'quantity', e.target.value)} />
                                        <Input type="number" placeholder="90 KES" value={bp.price} onChange={e => handleBulkPriceChange(i, 'price', e.target.value)} />
                                        <Button type="button" variant="ghost" size="icon" onClick={() => removeBulkPriceRow(i)}><Trash2 className="h-4 w-4 text-destructive"/></Button>
                                    </div>
                                ))}
                                <Button type="button" variant="outline" size="sm" onClick={addBulkPriceRow}><PlusCircle className="mr-2 h-4 w-4"/>Add Tier</Button>
                            </CardContent>
                        </Card>
                        
                        <Card>
                            <CardHeader><CardTitle>Status</CardTitle></CardHeader>
                            <CardContent>
                               <RadioGroup name="status" defaultValue="Pending">
                                    <div className="flex items-center space-x-2"><RadioGroupItem value="Published" id="s-published" /><Label htmlFor="s-published">Publish</Label></div>
                                    <div className="flex items-center space-x-2"><RadioGroupItem value="Draft" id="s-draft" /><Label htmlFor="s-draft">Save as Draft</Label></div>
                               </RadioGroup>
                            </CardContent>
                             <CardFooter>
                                <Button type="submit" className="w-full" disabled={isLoading}>
                                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                    Save Product
                                </Button>
                            </CardFooter>
                        </Card>
                    </div>
                </div>
            </form>
        </div>
    );
}
