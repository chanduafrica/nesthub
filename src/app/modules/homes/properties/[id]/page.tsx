
import { notFound } from 'next/navigation';
import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import Image from 'next/image';
import { Property } from '@/lib/mock-data';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MediaGallery } from '@/components/modules/homes/media-gallery';
import { MortgageCalculator } from '@/components/modules/homes/mortgage-calculator';
import { InsuranceEstimator } from '@/components/modules/homes/insurance-estimator';
import { Bed, Bath, Landmark, MapPin, Phone, MessageSquare, ShieldCheck, Verified, ArrowLeft, Heart, Share2, Printer, Calendar, Banknote, Shield, Quote } from 'lucide-react';
import './theme.css';


async function getPropertyData(id: string): Promise<Property | undefined> {
    const filePath = path.join(process.cwd(), 'src', 'lib', 'data', 'properties.json');
    const jsonData = fs.readFileSync(filePath, 'utf-8');
    const properties: Property[] = JSON.parse(jsonData);
    return properties.find(p => p.id === id);
}

const Header = () => {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 items-center justify-between">
                <Link href="/modules/homes" className="mr-6 flex items-center space-x-2">
                    <span className="font-bold sm:inline-block">
                        NestHomes
                    </span>
                </Link>
                <div className="flex items-center gap-2">
                    <Button variant="outline" asChild>
                        <Link href="/modules/homes/properties">
                            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Listings
                        </Link>
                    </Button>
                </div>
            </div>
        </header>
    );
};


export default async function PropertyDetailsPage({ params }: { params: { id: string } }) {
    const property = await getPropertyData(params.id);

    if (!property) {
        notFound();
    }
    
    const formatPrice = (price: number) => {
        return `Ksh ${price.toLocaleString()}`;
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
                                        <Button variant="outline" size="icon"><Heart className="h-4 w-4" /></Button>
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
                                    <Button size="lg" className="w-full"><Calendar className="mr-2 h-4 w-4"/> Book Viewing</Button>
                                    <Button size="lg" variant="secondary" className="w-full"><Banknote className="mr-2 h-4 w-4"/> Start Mortgage Application</Button>
                                    <Button size="lg" variant="outline" className="w-full"><Shield className="mr-2 h-4 w-4"/> Get Insurance Quote</Button>
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
