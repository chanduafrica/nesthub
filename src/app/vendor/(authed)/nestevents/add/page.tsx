
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
import { DatePicker } from '@/components/ui/date-picker';
import { handleAddEventListing } from '../actions';

const eventCategories = ["Concert", "Exhibition", "Workshop", "Community", "Corporate", "Wedding", "Other"];

export default function AddEventPage() {
    const router = useRouter();
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const [description, setDescription] = useState('');
    const [ticketTiers, setTicketTiers] = useState([{ type: 'Regular', price: '', quantity: '' }]);

    const handleTicketTierChange = (index: number, field: keyof typeof ticketTiers[0], value: string) => {
        const newTiers = [...ticketTiers];
        newTiers[index][field] = value;
        setTicketTiers(newTiers);
    };

    const addTicketTier = () => setTicketTiers([...ticketTiers, { type: '', price: '', quantity: '' }]);
    const removeTicketTier = (index: number) => setTicketTiers(ticketTiers.filter((_, i) => i !== index));

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        
        const formData = new FormData(e.currentTarget);
        const data = {
            title: formData.get('title') as string,
            category: formData.get('category') as string,
            description,
            venue: formData.get('venue') as string,
            organizer: formData.get('organizer') as string,
            contactEmail: formData.get('contactEmail') as string,
            contactPhone: formData.get('contactPhone') as string,
            ticketTiers,
        };

        try {
            await handleAddEventListing(data);
            toast({
                title: 'Event Submitted!',
                description: `Your event "${data.title}" has been submitted for review.`,
            });
            router.push('/vendor/nestevents');
        } catch (error) {
            toast({
                title: 'Error',
                description: 'Could not add the event. Please try again.',
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
                        <Button variant="outline" size="icon" asChild><Link href="/vendor/nestevents"><ArrowLeft className="h-4 w-4" /></Link></Button>
                        <h1 className="text-2xl font-bold">Add New Event</h1>
                    </div>
                     <Button type="submit" disabled={isLoading}>
                        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Submit for Review
                    </Button>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-6">
                        <Card>
                            <CardHeader><CardTitle>Event Details</CardTitle></CardHeader>
                            <CardContent className="space-y-4">
                                <Input name="title" placeholder="Event Title" required />
                                <Select name="category"><SelectTrigger><SelectValue placeholder="Select Category"/></SelectTrigger><SelectContent>{eventCategories.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent></Select>
                                <RichTextEditor description={description} onChange={setDescription} />
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div><Label>Start Date & Time</Label><Input type="datetime-local" name="startDate" /></div>
                                    <div><Label>End Date & Time</Label><Input type="datetime-local" name="endDate" /></div>
                                </div>
                                <Input name="venue" placeholder="Venue Name & Location" />
                                <Input name="venueMap" placeholder="Google Maps Embed URL (optional)" />
                            </CardContent>
                        </Card>
                        
                         <Card>
                            <CardHeader><CardTitle>Event Media</CardTitle></CardHeader>
                            <CardContent>
                                <div className="border-2 border-dashed p-6 text-center">
                                    <UploadCloud className="mx-auto h-8 w-8 text-muted-foreground mb-2"/>
                                    <Label htmlFor="poster" className="text-primary font-semibold cursor-pointer">Click to upload Event Poster</Label>
                                    <Input id="poster" name="poster" type="file" className="hidden"/>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="lg:col-span-1 space-y-6">
                        <Card>
                            <CardHeader><CardTitle>Organizer Info</CardTitle></CardHeader>
                            <CardContent className="space-y-4">
                                <Input name="organizer" placeholder="Organizer Name" />
                                <Input name="contactEmail" type="email" placeholder="Contact Email" />
                                <Input name="contactPhone" type="tel" placeholder="Contact Phone" />
                            </CardContent>
                        </Card>
                         <Card>
                            <CardHeader><CardTitle>Ticket Tiers</CardTitle></CardHeader>
                            <CardContent className="space-y-4">
                               {ticketTiers.map((tier, i) => (
                                    <div key={i} className="flex items-end gap-2 p-2 border rounded-md">
                                        <div className="flex-1 grid grid-cols-1 gap-2">
                                            <Input placeholder="Type (e.g., Regular)" value={tier.type} onChange={e => handleTicketTierChange(i, 'type', e.target.value)} />
                                            <div className="grid grid-cols-2 gap-2">
                                                <Input type="number" placeholder="Price (KES)" value={tier.price} onChange={e => handleTicketTierChange(i, 'price', e.target.value)} />
                                                <Input type="number" placeholder="Quantity" value={tier.quantity} onChange={e => handleTicketTierChange(i, 'quantity', e.target.value)} />
                                            </div>
                                        </div>
                                        <Button type="button" variant="ghost" size="icon" onClick={() => removeTicketTier(i)}><Trash2 className="h-4 w-4 text-destructive"/></Button>
                                    </div>
                                ))}
                                <Button type="button" variant="outline" size="sm" onClick={addTicketTier}><PlusCircle className="mr-2 h-4 w-4"/>Add Tier</Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </form>
        </div>
    );
}
