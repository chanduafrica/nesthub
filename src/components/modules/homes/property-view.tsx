
'use client';

import { notFound } from 'next/navigation';
import { Property } from '@/lib/mock-data';
import Link from 'next/link';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MediaGallery } from '@/components/modules/homes/media-gallery';
import { MortgageCalculator } from '@/components/modules/homes/mortgage-calculator';
import { InsuranceEstimator } from '@/components/modules/homes/insurance-estimator';
import { Bed, Bath, Landmark, MapPin, Phone, MessageSquare, ShieldCheck, Verified, ArrowLeft, Heart, Share2, Printer, Calendar as CalendarIcon, Banknote, Shield, Quote, HomeIcon, Building, Plane, Briefcase, LayoutGrid, Ticket, CheckCircle } from 'lucide-react';
import './theme.css';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';
import { format } from 'date-fns';

// This is a new Client Component to handle all interactive UI
export function PropertyView({ property }: { property: Property }) {
    const { toast } = useToast();

    const formatPrice = (price: number) => {
        return `Ksh ${price.toLocaleString()}`;
    };
    
    const handleSave = () => {
        toast({
            title: "Property Saved!",
            description: `${property.title} has been added to your favorites.`,
        });
    };

    const Header = () => {
        return (
            <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container flex h-14 items-center">
                    <div className="mr-4 hidden md:flex">
                        <Link href="/modules/homes" className="mr-6 flex items-center space-x-2">
                            <span className="hidden font-bold sm:inline-block">
                               NestHomes
                            </span>
                        </Link>
                        <nav className="flex items-center space-x-4 text-sm font-medium">
                            <Link href="/modules/homes/properties" className="flex items-center gap-2 text-foreground transition-colors hover:text-foreground/80"><HomeIcon className="h-4 w-4" />Properties</Link>
                            <Link href="/modules/homes/build" className="flex items-center gap-2 text-foreground/60 transition-colors hover:text-foreground/80"><Building className="h-4 w-4" />Build My Own</Link>
                            <Link href="/modules/travel" className="flex items-center gap-2 text-foreground/60 transition-colors hover:text-foreground/80"><Plane className="h-4 w-4" />Travel</Link>
                            <Link href="/modules/stays" className="flex items-center gap-2 text-foreground/60 transition-colors hover:text-foreground/80"><Briefcase className="h-4 w-4" />Stays</Link>
                            <Link href="/modules/mall" className="flex items-center gap-2 text-foreground/60 transition-colors hover:text-foreground/80"><LayoutGrid className="h-4 w-4" />Marketplace</Link>
                            <Link href="/modules/events" className="flex items-center gap-2 text-foreground/60 transition-colors hover:text-foreground/80"><Ticket className="h-4 w-4" />Events</Link>
                            <Link href="/" className="flex items-center gap-2 text-foreground/60 transition-colors hover:text-foreground/80">DigitalNest</Link>
                        </nav>
                    </div>
                    <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
                         <Button variant="secondary">Contact Agent</Button>
                         <Button variant="outline" asChild>
                            <Link href="/modules/homes/properties">
                                <ArrowLeft className="mr-2 h-4 w-4" /> Back
                            </Link>
                        </Button>
                    </div>
                </div>
            </header>
        );
    };

    return (
        <div className="flex flex-col min-h-screen bg-background nesthomes-theme">
            <Header />
            <main className="container py-8 md:py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: Media and Description */}
                    <div className="lg:col-span-2 space-y-8">
                        <MediaGallery title={property.title} />

                        <Card>
                            <CardHeader>
                                <CardTitle>Property Description</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4 text-muted-foreground">
                                <p>Discover the epitome of modern living in this stunning {property.beds}-bedroom {property.category.toLowerCase()} located in the heart of {property.location}. Spanning {property.area.toLocaleString()} sqft, this property offers a perfect blend of elegance and comfort.</p>
                                <p>The spacious living area is perfect for entertaining guests, while the master bedroom provides a serene retreat with its own en-suite bathroom. The kitchen is fully equipped with modern appliances, ready for your culinary adventures. Enjoy breathtaking views from the balcony and take advantage of the building's premium amenities.</p>
                                <p>With its prime location, you'll have easy access to shopping centers, schools, and recreational facilities. This is an exceptional opportunity for those seeking a luxurious and convenient lifestyle.</p>
                            </CardContent>
                        </Card>
                         <Card>
                            <CardHeader>
                                <CardTitle>Property Details</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                                    <div className="flex items-center gap-2"><span className="font-semibold">Type:</span><span>{property.category}</span></div>
                                    <div className="flex items-center gap-2"><span className="font-semibold">Status:</span><span>{property.type}</span></div>
                                    <div className="flex items-center gap-2"><span className="font-semibold">Bedrooms:</span><span>{property.beds}</span></div>
                                    <div className="flex items-center gap-2"><span className="font-semibold">Bathrooms:</span><span>{property.baths}</span></div>
                                    <div className="flex items-center gap-2"><span className="font-semibold">Area:</span><span>{property.area.toLocaleString()} sqft</span></div>
                                    <div className="flex items-center gap-2"><span className="font-semibold">Year Built:</span><span>2020</span></div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right Column: Key Info, Calculators, Agent */}
                    <div className="lg:col-span-1 space-y-8">
                        <Card className="sticky top-20">
                             <CardHeader>
                                <div className="flex justify-between items-start">
                                    <div>
                                        <Badge>{property.type}</Badge>
                                        <h1 className="text-2xl font-bold text-primary mt-2">{property.title}</h1>
                                        <div className="flex items-center gap-2 text-muted-foreground mt-1">
                                            <MapPin className="h-4 w-4" />
                                            <span>{property.location}</span>
                                        </div>
                                    </div>
                                     <div className="flex gap-2">
                                        <Button variant="outline" size="icon" onClick={handleSave}><Heart className="h-4 w-4" /></Button>
                                        <Button variant="outline" size="icon"><Share2 className="h-4 w-4" /></Button>
                                        <Button variant="outline" size="icon"><Printer className="h-4 w-4" /></Button>
                                    </div>
                                </div>
                             </CardHeader>
                             <CardContent>
                                <Separator className="my-4" />
                                <div className="flex justify-between items-center">
                                    <p className="text-3xl font-bold text-primary">{formatPrice(property.price)}</p>
                                    {property.shariaCompliant && <Badge variant="secondary"><ShieldCheck className="mr-1 h-4 w-4" />Sharia Compliant</Badge>}
                                </div>
                                <div className="grid grid-cols-3 gap-4 text-center my-4">
                                    <div className="flex flex-col items-center gap-1"><Bed className="h-6 w-6 text-muted-foreground" /> <span className="text-sm">{property.beds} Beds</span></div>
                                    <div className="flex flex-col items-center gap-1"><Bath className="h-6 w-6 text-muted-foreground" /> <span className="text-sm">{property.baths} Baths</span></div>
                                    <div className="flex flex-col items-center gap-1"><Landmark className="h-6 w-6 text-muted-foreground" /> <span className="text-sm">{property.area.toLocaleString()} sqft</span></div>
                                </div>
                                <Separator className="my-4" />

                                <div className="space-y-2">
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button size="lg" className="w-full"><CalendarIcon className="mr-2 h-4 w-4"/> Book Viewing</Button>
                                        </DialogTrigger>
                                        <BookViewingDialog property={property} />
                                    </Dialog>
                                     <Dialog>
                                        <DialogTrigger asChild>
                                           <Button size="lg" variant="secondary" className="w-full"><Banknote className="mr-2 h-4 w-4"/> Start Mortgage Application</Button>
                                        </DialogTrigger>
                                        <MortgageLeadDialog property={property} />
                                    </Dialog>
                                     <Dialog>
                                        <DialogTrigger asChild>
                                            <Button size="lg" variant="outline" className="w-full"><Shield className="mr-2 h-4 w-4"/> Get Insurance Quote</Button>
                                        </DialogTrigger>
                                        <InsuranceLeadDialog property={property} />
                                    </Dialog>
                                </div>
                                
                                <Separator className="my-4" />
                                
                                <div className="space-y-4">
                                    <h3 className="font-semibold">Agent Information</h3>
                                    <div className="flex items-center gap-4">
                                        <Avatar className="h-16 w-16">
                                            <AvatarImage src={property.agent.avatarUrl} alt={property.agent.name} />
                                            <AvatarFallback>{property.agent.name.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <p className="font-bold">{property.agent.name}</p>
                                            <div className="flex items-center gap-1 text-sm text-yellow-500">4.8/5.0 ★★★★☆</div>
                                             <div className="flex items-center gap-1 text-xs text-green-600 font-semibold mt-1">
                                                <Verified className="h-4 w-4" /> KYC Verified
                                            </div>
                                        </div>
                                    </div>
                                     <div className="flex gap-2">
                                        <Button variant="outline" className="flex-1"><Phone className="mr-2 h-4 w-4" /> Call</Button>
                                        <Button variant="outline" className="flex-1"><MessageSquare className="mr-2 h-4 w-4" /> Chat</Button>
                                    </div>
                                </div>
                             </CardContent>
                        </Card>
                        
                        <MortgageCalculator propertyPrice={property.type === 'For Sale' ? property.price : 0} />
                        <InsuranceEstimator propertyValue={property.type === 'For Sale' ? property.price : 0} />
                        
                    </div>
                </div>
            </main>
        </div>
    );
}

function BookViewingDialog({ property }: { property: Property }) {
    const [date, setDate] = useState<Date | undefined>(new Date(2025, 6, 28)); // July 28, 2025
    const [time, setTime] = useState<string>('10:00');
    const [submitted, setSubmitted] = useState(false);
    const { toast } = useToast();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = {
            propertyId: property.id,
            propertyTitle: property.title,
            agentName: property.agent.name,
            date: date ? format(date, "yyyy-MM-dd") : '',
            time: time,
            name: formData.get('name'),
            phone: formData.get('phone')
        };
        
        try {
            const response = await fetch('/api/leads', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ leadType: 'viewing', data }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            setSubmitted(true);
        } catch (error) {
            console.error('Failed to submit viewing request:', error);
            toast({
                title: "Submission Failed",
                description: "Could not save your viewing request. Please try again.",
                variant: "destructive"
            });
        }
    };

    if (submitted) {
        return (
            <DialogContent>
                <div className="flex flex-col items-center justify-center text-center p-8">
                    <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
                    <h3 className="text-xl font-bold mb-2">Booking Request Sent!</h3>
                    <p className="text-muted-foreground">
                        Your request to view "{property.title}" has been sent to the agent.
                        You will receive an SMS/email confirmation shortly.
                    </p>
                </div>
            </DialogContent>
        );
    }
    
    return (
        <DialogContent className="max-w-md">
            <DialogHeader>
                <DialogTitle>Book a Viewing</DialogTitle>
                <DialogDescription>
                    Schedule a visit for "{property.title}" with {property.agent.name}.
                </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <div className="space-y-2">
                        <Label htmlFor="date">Date</Label>
                        <Popover>
                            <PopoverTrigger asChild>
                            <Button
                                variant={"outline"}
                                className="w-full justify-start text-left font-normal"
                            >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {date ? format(date, "PPP") : <span>Pick a date</span>}
                            </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                                <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                            </PopoverContent>
                        </Popover>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="time">Time</Label>
                        <Select value={time} onValueChange={setTime}>
                            <SelectTrigger id="time">
                                <SelectValue placeholder="Select a time slot" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="10:00">10:00 AM</SelectItem>
                                <SelectItem value="11:00">11:00 AM</SelectItem>
                                <SelectItem value="14:00">2:00 PM</SelectItem>
                                <SelectItem value="15:00">3:00 PM</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                 </div>
                 <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" name="name" placeholder="e.g., Juma Omondi" required />
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" name="phone" type="tel" placeholder="+254 712 345 678" required />
                </div>
                <DialogFooter>
                    <Button type="submit" className="w-full">Request Booking</Button>
                </DialogFooter>
            </form>
        </DialogContent>
    );
}

function MortgageLeadDialog({ property }: { property: Property }) {
    const [step, setStep] = useState(1);
    const [submitted, setSubmitted] = useState(false);
    const { toast } = useToast();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = {
            propertyId: property.id,
            propertyTitle: property.title,
            propertyPrice: property.price,
            fullName: formData.get('lead-name'),
            phone: formData.get('lead-phone'),
            email: formData.get('lead-email'),
            employmentStatus: formData.get('employment'),
            monthlyIncome: formData.get('income'),
            preferredBank: formData.get('bank'),
        };

        try {
             const response = await fetch('/api/leads', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ leadType: 'mortgage', data }),
            });
            if (!response.ok) throw new Error('Network response was not ok');
            setSubmitted(true);
        } catch (error) {
            console.error('Failed to submit mortgage lead:', error);
            toast({
                title: "Submission Failed",
                description: "Could not save your mortgage application. Please try again.",
                variant: "destructive"
            });
        }
    };

    if (submitted) {
         return (
            <DialogContent>
                <div className="flex flex-col items-center justify-center text-center p-8">
                    <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
                    <h3 className="text-xl font-bold mb-2">Application Submitted!</h3>
                    <p className="text-muted-foreground">
                       Your mortgage application for "{property.title}" has been submitted. A representative from your selected bank will contact you shortly.
                    </p>
                </div>
            </DialogContent>
        );
    }
    
    return (
        <DialogContent className="max-w-lg">
             <DialogHeader>
                <DialogTitle>Start Mortgage Application</DialogTitle>
                 <DialogDescription>
                    {step === 1 ? "Estimate your payments, then proceed to send your details to our partner banks." : "Please provide your details for the mortgage pre-application."}
                </DialogDescription>
            </DialogHeader>
            {step === 1 ? (
                <div>
                    <MortgageCalculator propertyPrice={property.type === 'For Sale' ? property.price : 0} />
                     <DialogFooter className="pt-4">
                        <Button onClick={() => setStep(2)} className="w-full">Next</Button>
                    </DialogFooter>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-4 pt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="lead-name">Full Name</Label>
                            <Input id="lead-name" name="lead-name" placeholder="Juma Omondi" required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="lead-phone">Phone Number</Label>
                            <Input id="lead-phone" name="lead-phone" type="tel" placeholder="+254 712 345 678" required />
                        </div>
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="lead-email">Email Address</Label>
                        <Input id="lead-email" name="lead-email" type="email" placeholder="j.omondi@example.com" required />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="employment">Employment Status</Label>
                            <Select name="employment" defaultValue="employed">
                                <SelectTrigger id="employment"><SelectValue /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="employed">Employed</SelectItem>
                                    <SelectItem value="self-employed">Self-Employed</SelectItem>
                                    <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="income">Monthly Income (KES)</Label>
                            <Select name="income" defaultValue="100k-200k">
                                <SelectTrigger id="income"><SelectValue /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="<50k">&lt; 50,000</SelectItem>
                                    <SelectItem value="50k-100k">50,000 - 100,000</SelectItem>
                                    <SelectItem value="100k-200k">100,001 - 200,000</SelectItem>
                                    <SelectItem value=">200k">&gt; 200,000</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="bank">Preferred Bank</Label>
                        <Select name="bank" defaultValue="kcb">
                             <SelectTrigger id="bank"><SelectValue /></SelectTrigger>
                             <SelectContent>
                                <SelectItem value="kcb">KCB Bank</SelectItem>
                                <SelectItem value="equity">Equity Bank</SelectItem>
                                <SelectItem value="coop">Co-operative Bank</SelectItem>
                                <SelectItem value="stanbic">Stanbic Bank</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <DialogFooter className="flex-col-reverse sm:flex-row gap-2 pt-4">
                        <Button type="button" variant="outline" onClick={() => setStep(1)}>Back</Button>
                        <Button type="submit">Submit Application</Button>
                    </DialogFooter>
                </form>
            )}
        </DialogContent>
    );
}

function InsuranceLeadDialog({ property }: { property: Property }) {
    const [step, setStep] = useState(1);
    const [submitted, setSubmitted] = useState(false);
    const { toast } = useToast();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = {
            propertyId: property.id,
            propertyTitle: property.title,
            propertyValue: property.price,
            fullName: formData.get('ins-name'),
            email: formData.get('ins-email'),
            phone: formData.get('ins-phone'),
            preferredInsurer: formData.get('insurer'),
        };

        try {
            const response = await fetch('/api/leads', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ leadType: 'insurance', data }),
            });
            if (!response.ok) throw new Error('Network response was not ok');
            setSubmitted(true);
        } catch (error) {
            console.error('Failed to submit insurance quote request:', error);
            toast({
                title: "Submission Failed",
                description: "Could not save your insurance quote request. Please try again.",
                variant: "destructive"
            });
        }
    };

    if (submitted) {
         return (
            <DialogContent>
                <div className="flex flex-col items-center justify-center text-center p-8">
                    <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
                    <h3 className="text-xl font-bold mb-2">Quote Request Sent!</h3>
                    <p className="text-muted-foreground">
                       Your insurance quote request for "{property.title}" has been sent. A representative from your selected insurer will contact you shortly.
                    </p>
                </div>
            </DialogContent>
        );
    }
    
    return (
        <DialogContent className="max-w-lg">
             <DialogHeader>
                <DialogTitle>Get Insurance Quote</DialogTitle>
                 <DialogDescription>
                    {step === 1 ? "Estimate your premium, then proceed to request a formal quote." : "Please provide your details to receive a quote."}
                </DialogDescription>
            </DialogHeader>
            {step === 1 ? (
                <div>
                    <InsuranceEstimator propertyValue={property.type === 'For Sale' ? property.price : 0} />
                     <DialogFooter className="pt-4">
                        <Button onClick={() => setStep(2)} className="w-full">Next</Button>
                    </DialogFooter>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-4 pt-4">
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="ins-name">Full Name</Label>
                            <Input id="ins-name" name="ins-name" placeholder="Wanjiku Kamau" required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="ins-email">Email Address</Label>
                            <Input id="ins-email" name="ins-email" type="email" placeholder="w.kamau@example.com" required />
                        </div>
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="ins-phone">Phone Number</Label>
                        <Input id="ins-phone" name="ins-phone" type="tel" placeholder="+254 712 345 678" required />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="insurer">Preferred Insurer</Label>
                        <Select name="insurer" defaultValue="jubilee">
                             <SelectTrigger id="insurer"><SelectValue /></SelectTrigger>
                             <SelectContent>
                                <SelectItem value="jubilee">Jubilee Insurance</SelectItem>
                                <SelectItem value="britam">Britam</SelectItem>
                                <SelectItem value="uap">UAP Old Mutual</SelectItem>
                                <SelectItem value="best-match">Best Match for Me</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <DialogFooter className="flex-col-reverse sm:flex-row gap-2 pt-4">
                        <Button type="button" variant="outline" onClick={() => setStep(1)}>Back</Button>
                        <Button type="submit">Request Quote</Button>
                    </DialogFooter>
                </form>
            )}
        </DialogContent>
    );
}

// Add the new theme file import
import './property-view.css';
