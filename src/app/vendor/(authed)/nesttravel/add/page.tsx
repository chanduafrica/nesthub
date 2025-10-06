
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
import { DatePicker } from '@/components/ui/date-picker';
import { Textarea } from '@/components/ui/textarea';

type Step = 'type' | 'details';

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
    const [description, setDescription] = useState('');

    const handleNextStep = () => {
        if (step === 'type' && !listingType) {
            toast({ title: "Please select a listing type", variant: "destructive" });
            return;
        }
        if (step === 'type') setStep('details');
    };

    const handlePrevStep = () => {
        if (step === 'details') setStep('type');
    };
    
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        const form = e.currentTarget;
        
        const data = Object.fromEntries(new FormData(form).entries());

        const finalData = {
            ...data,
            listingType,
            description,
        };

        try {
            await handleAddTravelListing(finalData);
            toast({
                title: 'Listing Submitted!',
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

    const renderCommonFields = () => (
        <>
            <div className="space-y-2">
                <Label htmlFor="title">Listing Title</Label>
                <Input id="title" name="title" required />
            </div>
            <div className="space-y-2">
                <Label htmlFor="description">Long Description / Itinerary</Label>
                <RichTextEditor description={description} onChange={setDescription} />
            </div>
            <div className="space-y-2">
                <Label>Main Image / Banner</Label>
                <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-muted/50">
                    <UploadCloud className="h-8 w-8 text-muted-foreground mb-2"/>
                    <p className="font-semibold text-sm">Click to upload image</p>
                </div>
            </div>
        </>
    );

    const renderFlightFields = () => (
        <>
            {renderCommonFields()}
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2"><Label htmlFor="airline">Airline Name</Label><Input id="airline" name="airline" /></div>
                <div className="space-y-2"><Label htmlFor="flight-class">Class</Label><Select name="class"><SelectTrigger><SelectValue placeholder="Select Class"/></SelectTrigger><SelectContent><SelectItem value="economy">Economy</SelectItem><SelectItem value="business">Business</SelectItem><SelectItem value="first">First</SelectItem></SelectContent></Select></div>
            </div>
             <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2"><Label htmlFor="departure-airport">Departure Airport</Label><Input id="departure-airport" name="departureAirport" /></div>
                <div className="space-y-2"><Label htmlFor="arrival-airport">Arrival Airport</Label><Input id="arrival-airport" name="arrivalAirport" /></div>
            </div>
             <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2"><Label>Departure Date</Label><DatePicker /></div>
                <div className="space-y-2"><Label>Return Date (Optional)</Label><DatePicker /></div>
            </div>
             <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2"><Label htmlFor="price">Price (KES)</Label><Input id="price" name="price" type="number" required /></div>
                <div className="space-y-2"><Label htmlFor="seats">Seats Available</Label><Input id="seats" name="seats" type="number" /></div>
            </div>
        </>
    );

     const renderSGRFields = () => (
        <>
            {renderCommonFields()}
            <div className="space-y-2"><Label htmlFor="route-name">Route Name</Label><Input id="route-name" name="routeName" placeholder="e.g. Nairobi to Mombasa" /></div>
             <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2"><Label htmlFor="from-station">From Station</Label><Input id="from-station" name="fromStation" /></div>
                <div className="space-y-2"><Label htmlFor="to-station">To Station</Label><Input id="to-station" name="toStation" /></div>
            </div>
             <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2"><Label htmlFor="departure-time">Departure Time</Label><Input id="departure-time" name="departureTime" type="time"/></div>
                <div className="space-y-2"><Label htmlFor="arrival-time">Arrival Time</Label><Input id="arrival-time" name="arrivalTime" type="time" /></div>
            </div>
             <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2"><Label htmlFor="price">Ticket Price (KES)</Label><Input id="price" name="price" type="number" required /></div>
                <div className="space-y-2"><Label htmlFor="seats">Seats Available</Label><Input id="seats" name="seats" type="number" /></div>
            </div>
        </>
    );

     const renderBusFields = () => (
        <>
            {renderCommonFields()}
            <div className="space-y-2"><Label htmlFor="operator">Operator Name</Label><Input id="operator" name="operator" placeholder="e.g. Easy Coach"/></div>
             <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2"><Label htmlFor="from-point">From</Label><Input id="from-point" name="fromPoint" /></div>
                <div className="space-y-2"><Label htmlFor="to-point">To</Label><Input id="to-point" name="toPoint" /></div>
            </div>
             <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2"><Label htmlFor="departure-time">Departure Time</Label><Input id="departure-time" name="departureTime" type="time"/></div>
                <div className="space-y-2"><Label htmlFor="duration">Duration</Label><Input id="duration" name="duration" placeholder="e.g. 8 hours" /></div>
            </div>
             <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2"><Label htmlFor="price">Price per Seat (KES)</Label><Input id="price" name="price" type="number" required /></div>
                <div className="space-y-2"><Label htmlFor="seats">Available Seats</Label><Input id="seats" name="seats" type="number" /></div>
            </div>
        </>
    );

    const renderHotelFields = () => (
        <>
            {renderCommonFields()}
            <div className="space-y-2"><Label htmlFor="hotel-name">Hotel Name</Label><Input id="hotel-name" name="hotelName" /></div>
            <div className="space-y-2"><Label htmlFor="price">Price per Night (KES)</Label><Input id="price" name="price" type="number" required /></div>
            <div className="space-y-2">
                <Label>Amenities</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {["Wi-Fi", "Pool", "Parking", "Breakfast", "Gym", "Spa"].map(amenity => (
                        <div key={amenity} className="flex items-center gap-2"><Checkbox id={`amenity-${amenity}`} name="amenities" value={amenity} /><Label htmlFor={`amenity-${amenity}`}>{amenity}</Label></div>
                    ))}
                </div>
            </div>
        </>
    );

    const renderTourFields = () => (
        <>
            {renderCommonFields()}
             <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2"><Label htmlFor="duration">Duration</Label><Input id="duration" name="duration" placeholder="e.g. 3 Days, 2 Nights" /></div>
                <div className="space-y-2"><Label htmlFor="group-size">Group Size Limit</Label><Input id="group-size" name="groupSize" type="number" /></div>
            </div>
             <div className="space-y-2"><Label htmlFor="price">Price per Person (KES)</Label><Input id="price" name="price" type="number" required /></div>
            <div className="space-y-2">
                <Label>Inclusions (what is covered)</Label>
                <Textarea name="inclusions" placeholder="e.g. Park Fees, Meals, Accommodation" />
            </div>
        </>
    );

    const renderDetailsForm = () => {
        switch (listingType) {
            case 'Flight': return renderFlightFields();
            case 'SGR': return renderSGRFields();
            case 'Bus': return renderBusFields();
            case 'Hotel': return renderHotelFields();
            case 'Tour': return renderTourFields();
            default: return <p>Please select a listing type.</p>;
        }
    }
    
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
                                {renderDetailsForm()}
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
