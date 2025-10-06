
'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowLeft, Loader2, UploadCloud, PlusCircle, Trash2, X, Wifi, ShowerHead, Tv, Utensils, Wind, ParkingCircle, Sun, Dumbbell, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';
import { RichTextEditor } from '@/components/ui/rich-text-editor';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import Image from 'next/image';
import { handleAddStayListing } from '../actions';
import { StayPropertyType } from '@/lib/mock-data';

const categoryTags = ["Family-friendly", "Romantic", "Business", "Nature", "Luxury", "Budget"];
const amenitiesList = [
    { id: 'wifi', label: 'Wi-Fi', icon: Wifi },
    { id: 'shower', label: 'Hot Shower', icon: ShowerHead },
    { id: 'tv', label: 'Smart TV', icon: Tv },
    { id: 'kitchen', label: 'Kitchen', icon: Utensils },
    { id: 'ac', label: 'Air Conditioning', icon: Wind },
    { id: 'parking', label: 'Free Parking', icon: ParkingCircle },
    { id: 'breakfast', label: 'Breakfast', icon: Sun },
    { id: 'gym', label: 'Gym', icon: Dumbbell },
];
const safetyFeaturesList = ["Fire Extinguisher", "CCTV", "First Aid Kit", "Smoke Detector"];


export default function AddStayListingPage() {
    const router = useRouter();
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const [description, setDescription] = useState('');
    const [coverImagePreview, setCoverImagePreview] = useState<string | null>(null);
    const [galleryPreviews, setGalleryPreviews] = useState<string[]>([]);
    
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        const formData = new FormData(e.currentTarget);
        
        const data = {
            title: formData.get('title') as string,
            description,
            propertyType: formData.get('propertyType') as StayPropertyType,
            categoryTags: categoryTags.filter(tag => formData.has(tag)),
            location: {
                county: formData.get('county') as string,
                town: formData.get('town') as string,
            },
            pricing: {
                perNight: Number(formData.get('pricePerNight')),
                weeklyDiscount: Number(formData.get('weeklyDiscount')),
                monthlyDiscount: Number(formData.get('monthlyDiscount')),
                cleaningFee: Number(formData.get('cleaningFee')),
            },
            amenities: amenitiesList.filter(a => formData.has(a.id)).map(a => a.label),
            safetyFeatures: safetyFeaturesList.filter(s => formData.has(s)),
            houseRules: (formData.get('houseRules') as string).split('\n'),
            bookingSettings: {
                instantBooking: formData.get('instantBooking') === 'yes',
                maxGuests: Number(formData.get('maxGuests')),
                bedrooms: Number(formData.get('bedrooms')),
                beds: Number(formData.get('beds')),
                bathrooms: Number(formData.get('bathrooms')),
                cancellationPolicy: formData.get('cancellationPolicy') as any,
            }
        };

        try {
            await handleAddStayListing(data);
            toast({
                title: 'Listing Submitted!',
                description: `${data.title} has been submitted for review.`,
            });
            router.push('/vendor/neststays');
        } catch (error) {
            toast({
                title: 'Error',
                description: 'Could not add the listing. Please try again.',
                variant: 'destructive',
            });
            setIsLoading(false);
        }
    };

    const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setCoverImagePreview(URL.createObjectURL(e.target.files[0]));
        }
    }
    
    return (
        <div className="flex-1">
            <form onSubmit={handleSubmit}>
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                        <Button variant="outline" size="icon" asChild>
                            <Link href="/vendor/neststays"><ArrowLeft className="h-4 w-4" /></Link>
                        </Button>
                        <h1 className="text-2xl font-bold">Add New Stay</h1>
                    </div>
                     <Button type="submit" disabled={isLoading}>
                        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Submit for Review
                    </Button>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-6">
                        <Card>
                            <CardHeader><CardTitle>Basic Info</CardTitle></CardHeader>
                            <CardContent className="space-y-4">
                                <Input name="title" placeholder="Listing Title e.g., Cozy Villa in Naivasha" required />
                                <RichTextEditor description={description} onChange={setDescription} />
                                <Select name="propertyType"><SelectTrigger><SelectValue placeholder="Select Property Type"/></SelectTrigger><SelectContent><SelectItem value="Home">Home</SelectItem><SelectItem value="Apartment">Apartment</SelectItem><SelectItem value="Villa">Villa</SelectItem><SelectItem value="Cottage">Cottage</SelectItem><SelectItem value="Farm Stay">Farm Stay</SelectItem><SelectItem value="Studio">Studio</SelectItem></SelectContent></Select>
                                 <div><Label>Category Tags</Label><div className="flex flex-wrap gap-2 mt-2">{categoryTags.map(tag => (<div key={tag} className="flex items-center gap-2"><Checkbox id={tag} name={tag}/><Label htmlFor={tag}>{tag}</Label></div>))}</div></div>
                            </CardContent>
                        </Card>
                         <Card>
                            <CardHeader><CardTitle>Location</CardTitle></CardHeader>
                            <CardContent className="grid grid-cols-2 gap-4">
                                <Input name="county" placeholder="County"/>
                                <Input name="town" placeholder="Town/Area"/>
                            </CardContent>
                        </Card>
                         <Card>
                            <CardHeader><CardTitle>Media Gallery</CardTitle></CardHeader>
                            <CardContent className="space-y-4">
                                 <div><Label>Cover Image</Label><div className="border-2 border-dashed p-4 text-center"><UploadCloud className="mx-auto h-8 w-8 text-muted-foreground"/><Input type="file" name="coverImage" onChange={handleCoverImageChange} className="mt-2"/></div></div>
                                 {coverImagePreview && <Image src={coverImagePreview} alt="Cover preview" width={200} height={100} className="rounded-md"/>}
                            </CardContent>
                        </Card>
                    </div>

                    <div className="lg:col-span-1 space-y-6">
                        <Card>
                            <CardHeader><CardTitle>Pricing & Fees</CardTitle></CardHeader>
                            <CardContent className="space-y-4">
                                <Input name="pricePerNight" type="number" placeholder="Price per Night (KES)" required/>
                                <Input name="weeklyDiscount" type="number" placeholder="Weekly Discount (%)"/>
                                <Input name="monthlyDiscount" type="number" placeholder="Monthly Discount (%)"/>
                                <Input name="cleaningFee" type="number" placeholder="Cleaning Fee (KES, optional)"/>
                            </CardContent>
                        </Card>
                         <Card>
                            <CardHeader><CardTitle>Amenities</CardTitle></CardHeader>
                            <CardContent className="grid grid-cols-2 gap-2">{amenitiesList.map(a => (<div key={a.id} className="flex items-center gap-2"><Checkbox id={a.id} name={a.id} /><a.icon className="h-4 w-4 text-muted-foreground"/><Label htmlFor={a.id}>{a.label}</Label></div>))}</CardContent>
                        </Card>
                        <Card>
                            <CardHeader><CardTitle>Booking Settings</CardTitle></CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-2 gap-4"><Input name="maxGuests" type="number" placeholder="Max Guests" /><Input name="bedrooms" type="number" placeholder="Bedrooms" /><Input name="beds" type="number" placeholder="Beds" /><Input name="bathrooms" type="number" placeholder="Bathrooms" /></div>
                                <div><Label>Instant Booking?</Label><RadioGroup name="instantBooking" defaultValue='yes' className="flex gap-4 mt-2"><div className="flex items-center gap-2"><RadioGroupItem value="yes" id="ib-yes"/><Label htmlFor="ib-yes">Yes</Label></div><div className="flex items-center gap-2"><RadioGroupItem value="no" id="ib-no"/><Label htmlFor="ib-no">No (Manual Approval)</Label></div></RadioGroup></div>
                                <Select name="cancellationPolicy"><SelectTrigger><SelectValue placeholder="Cancellation Policy"/></SelectTrigger><SelectContent><SelectItem value="Flexible">Flexible</SelectItem><SelectItem value="Moderate">Moderate</SelectItem><SelectItem value="Strict">Strict</SelectItem></SelectContent></Select>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </form>
        </div>
    );
}
