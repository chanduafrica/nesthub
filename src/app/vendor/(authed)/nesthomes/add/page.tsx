
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowLeft, Loader2, UploadCloud, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { RichTextEditor } from '@/components/ui/rich-text-editor';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { handleAddProperty } from '../actions';
import Image from 'next/image';

const amenitiesList = ["Parking", "Balcony", "Internet", "Water", "Security", "Gym", "Pool", "Backup Generator"];

export default function AddPropertyPage() {
    const router = useRouter();
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const [description, setDescription] = useState('');
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);
    
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        const formData = new FormData(e.currentTarget);
        
        const data = {
            title: formData.get('title') as string,
            description: description,
            propertyType: formData.get('propertyType') as any,
            listingType: formData.get('listingType') as any,
            county: formData.get('county') as string,
            town: formData.get('town') as string,
            price: Number(formData.get('price')),
            bedrooms: Number(formData.get('bedrooms')),
            bathrooms: Number(formData.get('bathrooms')),
            size: Number(formData.get('size')),
            amenities: amenitiesList.filter(amenity => formData.has(amenity)),
            videoUrl: formData.get('videoUrl') as string,
            status: formData.get('status') as any,
            slug: formData.get('slug') as string,
            metaTitle: formData.get('metaTitle') as string,
            metaDescription: formData.get('metaDescription') as string,
            tags: (formData.get('tags') as string).split(',').map(t => t.trim()),
        };

        try {
            await handleAddProperty(data);
            toast({
                title: 'Property Listed!',
                description: `${data.title} has been successfully added.`,
            });
            router.push('/vendor/nesthomes');
        } catch (error) {
            toast({
                title: 'Error',
                description: 'Could not list the property. Please try again.',
                variant: 'destructive',
            });
            setIsLoading(false);
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files = Array.from(e.target.files);
            const previews = files.map(file => URL.createObjectURL(file));
            setImagePreviews(prev => [...prev, ...previews].slice(0, 10)); // Limit to 10
        }
    }

    return (
        <div className="flex-1">
            <form onSubmit={handleSubmit}>
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                        <Button variant="outline" size="icon" asChild>
                            <Link href="/vendor/nesthomes">
                                <ArrowLeft className="h-4 w-4" />
                            </Link>
                        </Button>
                        <h1 className="text-2xl font-bold">Add New Property</h1>
                    </div>
                     <Button type="submit" disabled={isLoading}>
                        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Save Property
                    </Button>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-6">
                        <Card>
                            <CardHeader><CardTitle>Property Details</CardTitle></CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="title">Property Title</Label>
                                    <Input id="title" name="title" placeholder="e.g., Luxury 3-Bedroom in Kilimani" required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="description">Description</Label>
                                    <RichTextEditor description={description} onChange={setDescription} />
                                </div>
                            </CardContent>
                        </Card>
                        
                         <Card>
                            <CardHeader><CardTitle>Location</CardTitle></CardHeader>
                            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="county">County</Label>
                                    <Input id="county" name="county" placeholder="e.g., Nairobi" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="town">Town/Estate</Label>
                                    <Input id="town" name="town" placeholder="e.g., Kilimani" />
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                             <CardHeader><CardTitle>Media</CardTitle></CardHeader>
                            <CardContent className="space-y-4">
                                 <div>
                                    <Label className="mb-2 block font-semibold">Property Images (up to 10)</Label>
                                    <div className="border-2 border-dashed rounded-lg p-4 text-center">
                                        <UploadCloud className="h-10 w-10 text-muted-foreground mx-auto mb-2"/>
                                        <Input id="images" name="images" type="file" multiple onChange={handleImageChange} className="mb-4"/>
                                        <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                                            {imagePreviews.map((src, i) => (
                                                <div key={i} className="relative aspect-square">
                                                    <Image src={src} alt={`preview ${i}`} layout="fill" className="object-cover rounded-md" />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="videoUrl">Video / Virtual Tour Link</Label>
                                    <Input id="videoUrl" name="videoUrl" placeholder="https://youtube.com/watch?v=..." />
                                </div>
                            </CardContent>
                        </Card>
                         <Card>
                            <CardHeader><CardTitle>SEO & Tags</CardTitle></CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="slug">URL Slug</Label>
                                    <Input id="slug" name="slug" placeholder="e.g., luxury-3-bedroom-kilimani" />
                                </div>
                                 <div className="space-y-2">
                                    <Label htmlFor="metaTitle">Meta Title</Label>
                                    <Input id="metaTitle" name="metaTitle" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="metaDescription">Meta Description</Label>
                                    <Input id="metaDescription" name="metaDescription" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="tags">Tags (comma-separated)</Label>
                                    <Input id="tags" name="tags" placeholder="e.g., apartment, kilimani, luxury" />
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="lg:col-span-1 space-y-6">
                        <Card className="sticky top-20">
                            <CardHeader><CardTitle>Publishing</CardTitle></CardHeader>
                            <CardContent>
                                <RadioGroup name="status" defaultValue="Available">
                                    <div className="flex items-center space-x-2"><RadioGroupItem value="Available" id="r-available" /><Label htmlFor="r-available">Available</Label></div>
                                    <div className="flex items-center space-x-2"><RadioGroupItem value="Pending" id="r-pending" /><Label htmlFor="r-pending">Pending</Label></div>
                                    <div className="flex items-center space-x-2"><RadioGroupItem value="Booked" id="r-booked" /><Label htmlFor="r-booked">Booked</Label></div>
                                    <div className="flex items-center space-x-2"><RadioGroupItem value="Sold" id="r-sold" /><Label htmlFor="r-sold">Sold</Label></div>
                                </RadioGroup>
                            </CardContent>
                        </Card>
                        
                         <Card>
                            <CardHeader><CardTitle>Pricing & Type</CardTitle></CardHeader>
                            <CardContent className="space-y-4">
                               <div className="space-y-2">
                                    <Label htmlFor="price">Price (KES)</Label>
                                    <Input id="price" name="price" type="number" placeholder="e.g., 150000" required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="listingType">Listing Type</Label>
                                    <Select name="listingType"><SelectTrigger><SelectValue placeholder="Select type"/></SelectTrigger><SelectContent><SelectItem value="For Sale">For Sale</SelectItem><SelectItem value="For Rent">For Rent</SelectItem><SelectItem value="Short Stay">Short Stay</SelectItem></SelectContent></Select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="propertyType">Property Type</Label>
                                    <Select name="propertyType"><SelectTrigger><SelectValue placeholder="Select type"/></SelectTrigger><SelectContent><SelectItem value="Apartment">Apartment</SelectItem><SelectItem value="Bungalow">Bungalow</SelectItem><SelectItem value="Office">Office</SelectItem><SelectItem value="Plot">Plot</SelectItem><SelectItem value="Land">Land</SelectItem><SelectItem value="Villa">Villa</SelectItem></SelectContent></Select>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader><CardTitle>Features & Amenities</CardTitle></CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                     <div className="space-y-2">
                                        <Label htmlFor="bedrooms">Bedrooms</Label>
                                        <Input id="bedrooms" name="bedrooms" type="number" defaultValue="3" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="bathrooms">Bathrooms</Label>
                                        <Input id="bathrooms" name="bathrooms" type="number" defaultValue="2" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="size">Size (sq ft)</Label>
                                    <Input id="size" name="size" type="number" placeholder="e.g., 1500" />
                                </div>
                                <div className="space-y-2">
                                    <Label>Amenities</Label>
                                    <div className="grid grid-cols-2 gap-2">
                                        {amenitiesList.map(amenity => (
                                            <div key={amenity} className="flex items-center space-x-2">
                                                <Checkbox id={amenity} name={amenity} />
                                                <label htmlFor={amenity} className="text-sm font-medium">{amenity}</label>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </form>
        </div>
    );
}
