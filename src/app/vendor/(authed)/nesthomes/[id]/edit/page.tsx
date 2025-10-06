
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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { RichTextEditor } from '@/components/ui/rich-text-editor';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { getProperties } from '@/lib/firebase-services';
import { Property } from '@/lib/mock-data';
import Image from 'next/image';
// Assume an update action exists, for now it's a placeholder
// import { handleUpdateProperty } from '../actions'; 

const amenitiesList = ["Parking", "Balcony", "Internet", "Water", "Security", "Gym", "Pool", "Backup Generator"];

export default function EditPropertyPage() {
    const router = useRouter();
    const params = useParams();
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const [property, setProperty] = useState<Property | null>(null);
    const [description, setDescription] = useState('');
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);
    
    useEffect(() => {
        const fetchProperty = async () => {
            setIsLoading(true);
            const allProperties = await getProperties();
            const foundProperty = allProperties.find(p => p.id === params.id);
            if (foundProperty) {
                setProperty(foundProperty);
                setDescription(foundProperty.description || '');
                setImagePreviews(foundProperty.images || (foundProperty.imageUrl ? [foundProperty.imageUrl] : []));
            } else {
                toast({ title: "Property not found", variant: "destructive" });
                router.push('/vendor/nesthomes');
            }
            setIsLoading(false);
        };
        if (params.id) {
            fetchProperty();
        }
    }, [params.id, router, toast]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!property) return;
        
        setIsLoading(true);
        // Placeholder for update logic
        setTimeout(() => {
            toast({
                title: 'Property Updated!',
                description: `${property.title} has been successfully updated.`,
            });
            router.push('/vendor/nesthomes');
        }, 1000);
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files = Array.from(e.target.files);
            const previews = files.map(file => URL.createObjectURL(file));
            setImagePreviews(prev => [...prev, ...previews].slice(0, 10));
        }
    };

    if (isLoading || !property) {
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
                            <Link href="/vendor/nesthomes">
                                <ArrowLeft className="h-4 w-4" />
                            </Link>
                        </Button>
                        <h1 className="text-2xl font-bold">Edit Property</h1>
                    </div>
                     <Button type="submit" disabled={isLoading}>
                        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Save Changes
                    </Button>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-6">
                        <Card>
                            <CardHeader><CardTitle>Property Details</CardTitle></CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="title">Property Title</Label>
                                    <Input id="title" name="title" defaultValue={property.title} required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="description">Description</Label>
                                    <RichTextEditor description={description} onChange={setDescription} />
                                </div>
                            </CardContent>
                        </Card>
                        
                        <Card>
                            <CardHeader><CardTitle>Media</CardTitle></CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <Label className="mb-2 block font-semibold">Property Images</Label>
                                    <div className="border-2 border-dashed rounded-lg p-4 text-center">
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
                                    <Input id="videoUrl" name="videoUrl" defaultValue={property.videoUrl} />
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="lg:col-span-1 space-y-6">
                        <Card className="sticky top-20">
                            <CardHeader><CardTitle>Status</CardTitle></CardHeader>
                            <CardContent>
                                <RadioGroup name="status" defaultValue={property.status}>
                                    <div className="flex items-center space-x-2"><RadioGroupItem value="Available" id="r-available" /><Label htmlFor="r-available">Available</Label></div>
                                    <div className="flex items-center space-x-2"><RadioGroupItem value="Pending" id="r-pending" /><Label htmlFor="r-pending">Pending</Label></div>
                                    <div className="flex items-center space-x-2"><RadioGroupItem value="Booked" id="r-booked" /><Label htmlFor="r-booked">Booked</Label></div>
                                    <div className="flex items-center space-x-2"><RadioGroupItem value="Sold" id="r-sold" /><Label htmlFor="r-sold">Sold</Label></div>
                                </RadioGroup>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </form>
        </div>
    );
}
