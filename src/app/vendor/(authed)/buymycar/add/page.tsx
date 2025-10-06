'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowLeft, Loader2, UploadCloud, FileUp, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';
import { RichTextEditor } from '@/components/ui/rich-text-editor';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { handleAddVehicleListing } from '../actions';
import { BuyMyCarListing } from '@/lib/mock-data';

const vehicleFeatures = ["Airbags", "Alloy Wheels", "ABS", "Bluetooth", "Reverse Camera", "Sunroof", "GPS Navigation", "Leather Seats"];
const vehicleMakes = ["Toyota", "Nissan", "Mercedes-Benz", "Subaru", "Volkswagen", "Isuzu", "Mazda", "Honda"];

export default function AddVehiclePage() {
    const router = useRouter();
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const [description, setDescription] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        const formData = new FormData(e.currentTarget);
        const data = {
            title: formData.get('title') as string,
            vehicleType: formData.get('vehicleType') as BuyMyCarListing['vehicleType'],
            make: formData.get('make') as string,
            model: formData.get('model') as string,
            year: Number(formData.get('year')),
            condition: formData.get('condition') as BuyMyCarListing['condition'],
            transmission: formData.get('transmission') as BuyMyCarListing['transmission'],
            fuelType: formData.get('fuelType') as BuyMyCarListing['fuelType'],
            mileage: Number(formData.get('mileage')),
            color: formData.get('color') as string,
            description: description,
            features: vehicleFeatures.filter(feature => formData.has(feature)),
            price: Number(formData.get('price')),
            isNegotiable: formData.get('isNegotiable') === 'on',
            location: {
                county: formData.get('county') as string,
                town: formData.get('town') as string,
            },
            availability: formData.get('availability') as BuyMyCarListing['availability'],
            useEscrow: formData.get('useEscrow') === 'on',
        };

        try {
            await handleAddVehicleListing(data as any);
            toast({
                title: 'Vehicle Submitted!',
                description: `${data.title} has been submitted for review.`,
            });
            router.push('/vendor/buymycar');
        } catch (error) {
            toast({
                title: 'Error',
                description: 'Could not add the vehicle. Please try again.',
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
                            <Link href="/vendor/buymycar"><ArrowLeft className="h-4 w-4" /></Link>
                        </Button>
                        <h1 className="text-2xl font-bold">Add New Vehicle</h1>
                    </div>
                    <Button type="submit" disabled={isLoading}>
                        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Submit for Review
                    </Button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-6">
                        <Card>
                            <CardHeader><CardTitle>Basic Vehicle Information</CardTitle></CardHeader>
                            <CardContent className="space-y-4">
                                <Input name="title" placeholder="Listing Title (e.g., 2018 Toyota Axio - Excellent Condition)" required />
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    <Select name="vehicleType"><SelectTrigger><SelectValue placeholder="Vehicle Type" /></SelectTrigger><SelectContent><SelectItem value="Sedan">Sedan</SelectItem><SelectItem value="SUV">SUV</SelectItem><SelectItem value="Pickup">Pickup</SelectItem><SelectItem value="Van">Van</SelectItem><SelectItem value="Truck">Truck</SelectItem><SelectItem value="Motorbike">Motorbike</SelectItem></SelectContent></Select>
                                    <Select name="make"><SelectTrigger><SelectValue placeholder="Make" /></SelectTrigger><SelectContent>{vehicleMakes.map(m => <SelectItem key={m} value={m}>{m}</SelectItem>)}</SelectContent></Select>
                                    <Input name="model" placeholder="Model (e.g., Axio, Hilux)" />
                                    <Select name="year"><SelectTrigger><SelectValue placeholder="Year" /></SelectTrigger><SelectContent>{Array.from({ length: 30 }, (_, i) => 2025 - i).map(y => <SelectItem key={y} value={String(y)}>{y}</SelectItem>)}</SelectContent></Select>
                                    <Select name="condition"><SelectTrigger><SelectValue placeholder="Condition" /></SelectTrigger><SelectContent><SelectItem value="New">New</SelectItem><SelectItem value="Foreign Used">Foreign Used</SelectItem><SelectItem value="Locally Used">Locally Used</SelectItem></SelectContent></Select>
                                    <Select name="transmission"><SelectTrigger><SelectValue placeholder="Transmission" /></SelectTrigger><SelectContent><SelectItem value="Automatic">Automatic</SelectItem><SelectItem value="Manual">Manual</SelectItem><SelectItem value="CVT">CVT</SelectItem></SelectContent></Select>
                                </div>
                                <div className="grid grid-cols-3 gap-4">
                                    <Select name="fuelType"><SelectTrigger><SelectValue placeholder="Fuel Type" /></SelectTrigger><SelectContent><SelectItem value="Petrol">Petrol</SelectItem><SelectItem value="Diesel">Diesel</SelectItem><SelectItem value="Hybrid">Hybrid</SelectItem><SelectItem value="Electric">Electric</SelectItem></SelectContent></Select>
                                    <Input name="mileage" type="number" placeholder="Mileage (km)" />
                                    <Input name="color" placeholder="Color" />
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader><CardTitle>Description & Features</CardTitle></CardHeader>
                            <CardContent className="space-y-4">
                                <RichTextEditor description={description} onChange={setDescription} />
                                <div><Label>Features</Label><div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">{vehicleFeatures.map(f => <div key={f} className="flex items-center gap-2"><Checkbox id={f} name={f} /><Label htmlFor={f}>{f}</Label></div>)}</div></div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader><CardTitle>Media Uploads</CardTitle></CardHeader>
                            <CardContent className="space-y-4">
                                <div className="border-2 border-dashed p-6 text-center">
                                    <UploadCloud className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                                    <Label htmlFor="images" className="text-primary font-semibold cursor-pointer">Click to upload vehicle images</Label>
                                    <Input id="images" name="images" type="file" multiple className="hidden" />
                                </div>
                                <Input name="videoUrl" placeholder="Link to YouTube or Vimeo video (optional)" />
                            </CardContent>
                        </Card>
                    </div>

                    <div className="lg:col-span-1 space-y-6">
                        <Card>
                            <CardHeader><CardTitle>Pricing & Payment</CardTitle></CardHeader>
                            <CardContent className="space-y-4">
                                <Input name="price" type="number" placeholder="Price (KES)" required />
                                <div className="flex items-center space-x-2"><Checkbox id="isNegotiable" name="isNegotiable" /><Label htmlFor="isNegotiable">Price is negotiable</Label></div>
                                <RadioGroup name="paymentMethod" defaultValue="Full"><Label>Payment Method</Label><div className="flex gap-4"><div className="flex items-center gap-2"><RadioGroupItem value="Full" id="pm-full" /><Label htmlFor="pm-full">Full</Label></div><div className="flex items-center gap-2"><RadioGroupItem value="Financing" id="pm-finance" /><Label htmlFor="pm-finance">Financing</Label></div></div></RadioGroup>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader><CardTitle>Identification & Documents</CardTitle></CardHeader>
                            <CardContent className="space-y-4">
                                <Input name="registrationNumber" placeholder="Registration Number (Optional)" />
                                <div className="space-y-2">
                                    <Label>Logbook Copy</Label>
                                    <Button type="button" variant="outline" className="w-full"><FileUp className="mr-2 h-4 w-4" /> Upload Logbook</Button>
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader><CardTitle>Location & Availability</CardTitle></CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <Input name="county" placeholder="County" />
                                    <Input name="town" placeholder="Town/Area" />
                                </div>
                                <Select name="availability" defaultValue="Immediate"><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="Immediate">Immediate</SelectItem><SelectItem value="1-3 Days">1-3 Days</SelectItem><SelectItem value="1 Week">1 Week</SelectItem></SelectContent></Select>
                                <div className="flex items-center space-x-2 pt-2">
                                    <Checkbox id="useEscrow" name="useEscrow" defaultChecked />
                                    <Label htmlFor="useEscrow" className="flex items-center gap-1"><ShieldCheck className="h-4 w-4 text-green-500" /> Sell via Secure Escrow</Label>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </form>
        </div>
    );
}
