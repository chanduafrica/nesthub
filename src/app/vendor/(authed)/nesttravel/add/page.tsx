
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowLeft, Loader2, UploadCloud, Plane, Train, Bus, Hotel, Package as PackageIcon } from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';
import { RichTextEditor } from '@/components/ui/rich-text-editor';
import { handleAddTravelListing } from '../actions';
import { TravelListingType } from '@/lib/mock-data';

type Step = 'type' | 'details' | 'media';

const listingTypes = [
    { id: 'Flight', name: 'Flight', icon: Plane },
    { id: 'SGR', name: 'SGR Train', icon: Train },
    { id: 'Bus', name: 'Bus', icon: Bus },
    { id: 'Hotel', name: 'Hotel', icon: Hotel },
    { id: 'Tour', name: 'Tour / Holiday Package', icon: PackageIcon },
];

export default function AddTravelListingPage() {
    const router = useRouter();
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const [step, setStep] = useState<Step>('type');
    const [listingType, setListingType] = useState<TravelListingType | ''>('');
    const [formData, setFormData] = useState<any>({});
    const [description, setDescription] = useState('');

    const handleNextStep = () => {
        if (step === 'type' && !listingType) {
            toast({ title: "Please select a listing type", variant: "destructive" });
            return;
        }
        if (step === 'type') setStep('details');
        if (step === 'details') setStep('media');
    };

    const handlePrevStep = () => {
        if (step === 'details') setStep('type');
        if (step === 'media') setStep('details');
    };
    
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        const form = e.currentTarget;
        
        const finalData = {
            listingType,
            title: form.title.value,
            description,
            location: form.location?.value,
            price: Number(form.price.value),
            // Add other fields based on listingType
        };

        try {
            await handleAddTravelListing(finalData);
            toast({
                title: 'Listing Added!',
                description: `${finalData.title} has been submitted for review.`,
            });
            router.push('/vendor/nesttravel');
        } catch (error) {
            toast({
                title: 'Error',
                description: 'Could not add the listing. Please try again.',
                variant: 'destructive',
            });
            setIsLoading(false);
        }
    };
    
    return (
        <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                    <Button variant="outline" size="icon" asChild>
                        <Link href="/vendor/nesttravel">
                            <ArrowLeft className="h-4 w-4" />
                        </Link>
                    </Button>
                    <h1 className="text-2xl font-bold">Add New Travel Listing</h1>
                </div>
            </div>

            {/* Progress Bar */}
            <div className="flex justify-between w-full max-w-xl mx-auto mb-8">
                 {['Type', 'Details', 'Media'].map((s, i) => {
                    const stepId = s.toLowerCase() as Step;
                    const allSteps: Step[] = ['type', 'details', 'media'];
                    const currentIndex = allSteps.indexOf(step);
                    const stepIndex = i;
                    const isCompleted = stepIndex < currentIndex;
                    const isCurrent = step === stepId;

                    return (
                        <div key={s} className="flex-1 text-center">
                            <div className={`text-sm font-semibold ${isCurrent || isCompleted ? 'text-primary' : 'text-muted-foreground'}`}>{s}</div>
                            <div className={`h-1 mt-1 mx-auto rounded-full ${isCurrent || isCompleted ? 'bg-primary' : 'bg-border'}`} style={{width: '80%'}} />
                        </div>
                    );
                })}
            </div>

            <Card className="max-w-4xl mx-auto">
                <form onSubmit={handleSubmit}>
                    {step === 'type' && (
                        <>
                            <CardHeader>
                                <CardTitle>Step 1: Choose Listing Type</CardTitle>
                                <CardDescription>Select the type of travel service you want to list.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {listingTypes.map(type => (
                                    <Label key={type.id} htmlFor={type.id} className={`flex flex-col items-center justify-center p-6 border-2 rounded-lg cursor-pointer hover:border-primary hover:bg-muted/50 ${listingType === type.id ? 'border-primary' : 'border-border'}`}>
                                        <input type="radio" id={type.id} name="listingType" value={type.id} className="sr-only" onChange={() => setListingType(type.id as TravelListingType)} />
                                        <type.icon className="h-8 w-8 mb-2" />
                                        <span className="font-semibold">{type.name}</span>
                                    </Label>
                                ))}
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button onClick={handleNextStep} className="ml-auto">Next Step</Button>
                            </CardFooter>
                        </>
                    )}

                    {step === 'details' && (
                         <>
                            <CardHeader>
                                <CardTitle>Step 2: Enter Listing Details</CardTitle>
                                <CardDescription>Provide all the necessary information for your {listingType} listing.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                 <div className="space-y-2">
                                    <Label htmlFor="title">Listing Title</Label>
                                    <Input id="title" name="title" required />
                                </div>
                                 <div className="space-y-2">
                                    <Label htmlFor="description">Long Description / Itinerary</Label>
                                    <RichTextEditor description={description} onChange={setDescription} />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                     <div className="space-y-2">
                                        <Label htmlFor="location">Location / Destination City</Label>
                                        <Input id="location" name="location" />
                                    </div>
                                     <div className="space-y-2">
                                        <Label htmlFor="price">Price (KES)</Label>
                                        <Input id="price" name="price" type="number" required />
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter className="flex justify-between">
                                <Button onClick={handlePrevStep} variant="outline">Previous Step</Button>
                                <Button onClick={handleNextStep}>Next Step</Button>
                            </CardFooter>
                        </>
                    )}

                     {step === 'media' && (
                         <>
                            <CardHeader>
                                <CardTitle>Step 3: Upload Media</CardTitle>
                                <CardDescription>Add images for your listing.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="border-2 border-dashed rounded-lg p-10 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-muted/50">
                                    <UploadCloud className="h-10 w-10 text-muted-foreground mb-4"/>
                                    <p className="font-semibold mb-2">Click to upload or drag & drop images</p>
                                    <p className="text-sm text-muted-foreground">PNG, JPG, GIF up to 10MB</p>
                                </div>
                            </CardContent>
                            <CardFooter className="flex justify-between">
                                <Button onClick={handlePrevStep} variant="outline">Previous Step</Button>
                                <Button type="submit" disabled={isLoading}>
                                     {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                    Submit Listing
                                </Button>
                            </CardFooter>
                        </>
                    )}
                </form>
            </Card>
        </div>
    );
}
