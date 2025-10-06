
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowLeft, Loader2, UploadCloud } from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';
import { RichTextEditor } from '@/components/ui/rich-text-editor';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { handleAddAutoPartListing } from '../actions';

export default function AddAutoPartPage() {
    const router = useRouter();
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const [description, setDescription] = useState('');
    
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        
        const formData = new FormData(e.currentTarget);
        const data = {
            name: formData.get('name') as string,
            category: formData.get('category') as string,
            brand: formData.get('brand') as string,
            condition: formData.get('condition') as 'New' | 'Used' | 'Refurbished',
            description: description,
            compatibility: {
                make: formData.get('make') as string,
                model: formData.get('model') as string,
                yearRange: formData.get('yearRange') as string,
            },
            pricing: {
                unitPrice: Number(formData.get('unitPrice')),
                bulkPrice: Number(formData.get('bulkPrice')) || undefined,
            },
            stock: {
                quantity: Number(formData.get('quantity')),
            },
            logistics: {
                deliveryOptions: ['Courier'],
                shippingCostPolicy: 'Buyer Pays' as const,
                location: {
                    county: formData.get('county') as string,
                    town: formData.get('town') as string,
                }
            }
        };

        try {
            await handleAddAutoPartListing(data);
            toast({
                title: 'Product Submitted!',
                description: `${data.name} has been submitted for review.`,
            });
            router.push('/vendor/autoparts');
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
                            <Link href="/vendor/autoparts"><ArrowLeft className="h-4 w-4" /></Link>
                        </Button>
                        <h1 className="text-2xl font-bold">Add New Auto Part</h1>
                    </div>
                     <Button type="submit" disabled={isLoading}>
                        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Submit for Review
                    </Button>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-6">
                        <Card>
                            <CardHeader><CardTitle>Basic Information</CardTitle></CardHeader>
                            <CardContent className="space-y-4">
                                <Input name="name" placeholder="Product Name (e.g., Brake Pads for Toyota Hilux)" required />
                                <Select name="category"><SelectTrigger><SelectValue placeholder="Select Category"/></SelectTrigger><SelectContent><SelectItem value="Engine Parts">Engine Parts</SelectItem><SelectItem value="Body Parts">Body Parts</SelectItem><SelectItem value="Suspension">Suspension</SelectItem><SelectItem value="Electronics">Electronics</SelectItem><SelectItem value="Tyres">Tyres</SelectItem><SelectItem value="Accessories">Accessories</SelectItem><SelectItem value="Tools">Tools</SelectItem></SelectContent></Select>
                                <Input name="brand" placeholder="Brand / Manufacturer (e.g., Bosch)" />
                                <RadioGroup name="condition" defaultValue="New" className="flex gap-4"><div className="flex items-center gap-2"><RadioGroupItem value="New" id="c-new" /><Label htmlFor="c-new">New</Label></div><div className="flex items-center gap-2"><RadioGroupItem value="Used" id="c-used" /><Label htmlFor="c-used">Used</Label></div><div className="flex items-center gap-2"><RadioGroupItem value="Refurbished" id="c-refurb" /><Label htmlFor="c-refurb">Refurbished</Label></div></RadioGroup>
                                <RichTextEditor description={description} onChange={setDescription} />
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader><CardTitle>Vehicle Compatibility</CardTitle></CardHeader>
                            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Select name="make"><SelectTrigger><SelectValue placeholder="Select Vehicle Make"/></SelectTrigger><SelectContent><SelectItem value="Toyota">Toyota</SelectItem><SelectItem value="Nissan">Nissan</SelectItem><SelectItem value="Subaru">Subaru</SelectItem><SelectItem value="Isuzu">Isuzu</SelectItem><SelectItem value="Mazda">Mazda</SelectItem></SelectContent></Select>
                                <Input name="model" placeholder="Model (e.g., Probox, Hilux)" />
                                <Input name="yearRange" placeholder="Year Range (e.g., 2010-2022)" />
                            </CardContent>
                        </Card>
                        
                         <Card>
                            <CardHeader><CardTitle>Media Gallery</CardTitle></CardHeader>
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
                                <Input name="bulkPrice" type="number" placeholder="Wholesale Price (Optional)"/>
                                <Input name="quantity" type="number" placeholder="Available Stock Quantity" required />
                            </CardContent>
                        </Card>
                         <Card>
                            <CardHeader><CardTitle>Logistics</CardTitle></CardHeader>
                            <CardContent className="space-y-4">
                               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <Input name="county" placeholder="County"/>
                                    <Input name="town" placeholder="Town/Area"/>
                                </div>
                                <div>
                                    <Label>Delivery Options</Label>
                                    <div className="flex items-center gap-2 mt-2"><Checkbox id="courier" checked disabled/><Label htmlFor="courier">Courier (NestParcel)</Label></div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </form>
        </div>
    );
}
