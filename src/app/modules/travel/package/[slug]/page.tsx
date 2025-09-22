
'use client';

import { notFound, useParams } from 'next/navigation';
import { HolidayPackage } from '@/lib/mock-data';
import { getPackageBySlug } from '@/lib/firebase-services';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Calendar, Check, Clock, Globe, MapPin, Minus, Plus, Star, Users } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { DatePicker } from '@/components/ui/date-picker';
import { Skeleton } from '@/components/ui/skeleton';

export default function PackageDetailPage() {
    const params = useParams();
    const slug = params.slug as string;
    const [pkg, setPackage] = useState<HolidayPackage | null>(null);
    const [loading, setLoading] = useState(true);
    const [adults, setAdults] = useState(2);
    const [children, setChildren] = useState(0);

    useEffect(() => {
        if (slug) {
            getPackageBySlug(slug).then(data => {
                if (data) {
                    setPackage(data);
                }
                setLoading(false);
            });
        }
    }, [slug]);

    if (loading) {
        return <PackageDetailSkeleton />;
    }

    if (!pkg) {
        notFound();
    }
    
    const totalPrice = pkg.price * adults;

    return (
        <div className="bg-muted/40">
            <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
                <div className="container flex h-14 items-center justify-between">
                    <Link href="/modules/travel/packages" className="flex items-center gap-2 font-semibold">
                        <ArrowLeft className="h-5 w-5"/>
                        Back to Packages
                    </Link>
                    <Button>Login to Book</Button>
                </div>
            </header>

            <main className="container py-8">
                <div className="grid lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-8">
                        {/* Image Gallery */}
                        <Card>
                            <CardContent className="p-2">
                                <div className="relative w-full aspect-[16/9] rounded-lg overflow-hidden">
                                     <Image
                                        src={pkg.image}
                                        alt={pkg.title}
                                        fill
                                        className="object-cover"
                                        data-ai-hint={pkg.hint}
                                    />
                                </div>
                            </CardContent>
                        </Card>
                        
                        {/* Title and Meta */}
                        <div>
                             <div className="flex gap-2 mb-2">
                                {pkg.tags.map((tag:string) => <Badge key={tag}>{tag}</Badge>)}
                             </div>
                            <h1 className="text-4xl font-bold text-primary">{pkg.title}</h1>
                             <div className="flex items-center gap-6 text-muted-foreground mt-2">
                                <div className="flex items-center gap-1 font-semibold">
                                    <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                                    <span>{pkg.rating}</span>
                                </div>
                                <div className="flex items-center gap-2"><MapPin className="h-5 w-5" />{pkg.location}</div>
                                <div className="flex items-center gap-2"><Clock className="h-5 w-5" />{pkg.duration}</div>
                            </div>
                        </div>

                        {/* Description */}
                        <Card>
                            <CardHeader><CardTitle>About this Experience</CardTitle></CardHeader>
                            <CardContent className="prose max-w-none text-muted-foreground">
                                <p>{(pkg as any).description}</p>
                            </CardContent>
                        </Card>

                         {/* Highlights */}
                        <Card>
                            <CardHeader><CardTitle>Package Highlights</CardTitle></CardHeader>
                            <CardContent>
                                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                   {pkg.highlights.map((highlight: string) => (
                                        <li key={highlight} className="flex items-start gap-3">
                                            <Check className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                                            <span>{highlight}</span>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>

                    </div>
                    <div className="lg:col-span-1">
                        <Card className="sticky top-24">
                            <CardHeader>
                                <CardTitle className="text-2xl">Book Your Trip</CardTitle>
                                <CardDescription>Select your dates and number of guests.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label>Travel Dates</Label>
                                    <DatePicker placeholder="Select your start date" />
                                </div>
                                <div className="space-y-2">
                                     <Label>Guests</Label>
                                     <Card className="p-3">
                                        <div className="flex justify-between items-center mb-2">
                                            <span>Adults</span>
                                            <div className="flex items-center gap-2">
                                                <Button size="icon" variant="outline" className="h-7 w-7" onClick={() => setAdults(p => Math.max(1, p - 1))}><Minus className="h-4 w-4"/></Button>
                                                <span className="w-4 text-center">{adults}</span>
                                                <Button size="icon" variant="outline" className="h-7 w-7" onClick={() => setAdults(p => p + 1)}><Plus className="h-4 w-4"/></Button>
                                            </div>
                                        </div>
                                         <div className="flex justify-between items-center">
                                            <span>Children</span>
                                            <div className="flex items-center gap-2">
                                                <Button size="icon" variant="outline" className="h-7 w-7" onClick={() => setChildren(p => Math.max(0, p - 1))}><Minus className="h-4 w-4"/></Button>
                                                <span className="w-4 text-center">{children}</span>
                                                <Button size="icon" variant="outline" className="h-7 w-7" onClick={() => setChildren(p => p + 1)}><Plus className="h-4 w-4"/></Button>
                                            </div>
                                        </div>
                                     </Card>
                                </div>
                                <Separator />
                                <div>
                                     <div className="flex justify-between items-baseline">
                                        <span className="text-muted-foreground">Total Price</span>
                                        <span className="text-2xl font-bold text-primary">KES {totalPrice.toLocaleString()}</span>
                                    </div>
                                    <p className="text-xs text-muted-foreground text-right">for {adults} adult(s)</p>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button size="lg" className="w-full">Reserve Now</Button>
                            </CardFooter>
                        </Card>
                    </div>
                </div>
            </main>
        </div>
    );
}

function PackageDetailSkeleton() {
    return (
        <div className="bg-muted/40">
             <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
                <div className="container flex h-14 items-center justify-between">
                    <Skeleton className="h-8 w-40" />
                    <Skeleton className="h-10 w-28" />
                </div>
            </header>
            <main className="container py-8">
                <div className="grid lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-8">
                        <Skeleton className="w-full aspect-[16/9] rounded-lg" />
                         <div className="space-y-3">
                            <Skeleton className="h-10 w-3/4" />
                            <Skeleton className="h-6 w-1/2" />
                        </div>
                         <Card>
                            <CardHeader><CardTitle><Skeleton className="h-8 w-48" /></CardTitle></CardHeader>
                            <CardContent className="space-y-2">
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-5/6" />
                            </CardContent>
                        </Card>
                    </div>
                    <div className="lg:col-span-1">
                        <Card className="sticky top-24">
                           <CardHeader>
                                <Skeleton className="h-8 w-1/2" />
                                <Skeleton className="h-4 w-3/4" />
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <Skeleton className="h-10 w-full" />
                                <Skeleton className="h-20 w-full" />
                                <Skeleton className="h-10 w-full" />
                            </CardContent>
                            <CardFooter>
                                <Skeleton className="h-12 w-full" />
                            </CardFooter>
                        </Card>
                    </div>
                </div>
            </main>
        </div>
    );
}
