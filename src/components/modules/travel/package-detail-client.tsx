'use client';

import { HolidayPackage } from '@/lib/mock-data';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Check, Clock, MapPin, Minus, Plus, Star } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { DatePicker } from '@/components/ui/date-picker';
import { Label } from '@/components/ui/label';

// This new component handles all the client-side interactivity
export function PackageDetailClient({ pkg }: { pkg: HolidayPackage }) {
    const [adults, setAdults] = useState(2);
    const [children, setChildren] = useState(0);

    const totalPrice = pkg.price * adults;

    return (
        <div className="bg-muted/40">
            <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
                <div className="w-[94%] mx-auto flex h-14 items-center justify-between">
                    <Button variant="outline" asChild>
                        <Link href="/modules/travel/packages" className="flex items-center gap-2 font-semibold">
                            <ArrowLeft className="h-5 w-5"/>
                            Back to Packages
                        </Link>
                    </Button>
                    <Button>Login to Book</Button>
                </div>
            </header>

            <main className="w-[94%] mx-auto py-8">
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
