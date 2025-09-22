
'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
    BedDouble,
    Facebook,
    Home,
    Instagram,
    MapPin,
    Package,
    Plane,
    Star,
    Ticket,
    Twitter,
    Users,
    Clock,
    Sun,
    Filter,
    Mountain,
    Waves
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { HolidayPackage } from '@/lib/mock-data';

interface PackagesClientProps {
    initialPackages: HolidayPackage[];
}

const Header = () => {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 items-center">
                <div className="mr-4 hidden lg:flex">
                     <Link href="/modules/travel" className="mr-6 flex items-center space-x-2">
                        <Package className="h-6 w-6 text-primary" />
                        <span className="font-bold sm:inline-block">
                           NestTravel
                        </span>
                    </Link>
                    <nav className="flex items-center space-x-4 text-sm font-medium">
                        <Link href="/modules/travel" className="flex items-center gap-2 text-foreground/60 transition-colors hover:text-foreground/80"><Plane className="h-4 w-4" />Travel</Link>
                        <Link href="/modules/stays" className="flex items-center gap-2 text-foreground/60 transition-colors hover:text-foreground/80"><Home className="h-4 w-4" />Stays</Link>
                        <Link href="/modules/travel/packages" className="flex items-center gap-2 text-foreground transition-colors hover:text-foreground/80"><Package className="h-4 w-4" />Holidays</Link>
                         <Link href="/" className="text-foreground/60 transition-colors hover:text-foreground/80">SG-Nest</Link>
                    </nav>
                </div>
                <div className="flex flex-1 items-center justify-end space-x-2">
                     <Button variant="outline">My Bookings</Button>
                     <Button>Login</Button>
                </div>
            </div>
        </header>
    );
};

const PackageCard = ({ deal }: { deal: HolidayPackage }) => (
    <Card className="overflow-hidden group flex flex-col">
        <div className="relative w-full h-48">
            <Image
                src={deal.image}
                alt={deal.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                data-ai-hint={deal.hint}
            />
             <div className="absolute top-2 left-2 flex gap-2">
                {deal.tags.map((tag:string) => <Badge key={tag}>{tag}</Badge>)}
             </div>
        </div>
        <CardContent className="p-4 flex-grow">
             <div className="flex justify-between items-start">
                <h3 className="font-semibold text-lg leading-tight">{deal.title}</h3>
                <div className="flex items-center gap-1 font-semibold whitespace-nowrap">
                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                    <span>{deal.rating}</span>
                </div>
            </div>
            <div className="text-sm text-muted-foreground mt-2 space-y-1">
                <div className="flex items-center gap-2"><MapPin className="h-4 w-4" />{deal.location}</div>
                <div className="flex items-center gap-2"><Clock className="h-4 w-4" />{deal.duration}</div>
            </div>
            <ul className="mt-3 list-disc list-inside text-sm text-muted-foreground space-y-1">
                {deal.highlights.map((h:string) => <li key={h}>{h}</li>)}
            </ul>
        </CardContent>
        <CardFooter className="flex justify-between items-center bg-muted/50 p-4">
             <div>
                <p className="text-xs text-muted-foreground">From</p>
                <p className="font-bold text-primary text-xl">KES {deal.price.toLocaleString()}</p>
             </div>
             <Button>View Package</Button>
        </CardFooter>
    </Card>
);

const PackagesFilter = () => {
    const [priceRange, setPriceRange] = useState([10000, 80000]);

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><Filter className="h-5 w-5"/> Filter Packages</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-2">
                    <Label>Price Range (per person)</Label>
                    <Slider
                        value={priceRange}
                        onValueChange={setPriceRange}
                        max={100000}
                        step={1000}
                    />
                    <div className="flex justify-between text-sm text-muted-foreground">
                        <span>KES {priceRange[0].toLocaleString()}</span>
                         <span>KES {priceRange[1].toLocaleString()}</span>
                    </div>
                </div>

                <div className="space-y-2">
                    <Label>Package Type</Label>
                    <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                            <Checkbox id="type-safari" />
                            <label htmlFor="type-safari" className="text-sm flex items-center gap-2"><Mountain className="h-4 w-4"/>Safari & Wildlife</label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox id="type-beach" />
                            <label htmlFor="type-beach" className="text-sm flex items-center gap-2"><Waves className="h-4 w-4"/>Beach Holiday</label>
                        </div>
                         <div className="flex items-center space-x-2">
                            <Checkbox id="type-adventure" />
                            <label htmlFor="type-adventure" className="text-sm">Adventure & Hiking</label>
                        </div>
                         <div className="flex items-center space-x-2">
                            <Checkbox id="type-culture" />
                            <label htmlFor="type-culture" className="text-sm">Cultural Tours</label>
                        </div>
                    </div>
                </div>
                 <div className="space-y-2">
                    <Label>Duration</Label>
                    <Select>
                        <SelectTrigger><SelectValue placeholder="Any duration"/></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="any">Any Duration</SelectItem>
                            <SelectItem value="weekend">Weekend (2-3 Days)</SelectItem>
                            <SelectItem value="short">Short (4-5 Days)</SelectItem>
                            <SelectItem value="long">Long (6+ Days)</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <Button className="w-full">Apply Filters</Button>
            </CardContent>
        </Card>
    );
}

export function PackagesClient({ initialPackages }: PackagesClientProps) {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="container py-8">
        <section className="mb-8 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2">Holiday Packages & Tours</h1>
            <p className="text-muted-foreground md:text-lg max-w-3xl mx-auto">Hand-picked adventures across Kenya, from thrilling safaris to serene beach getaways.</p>
        </section>

        <div className="grid lg:grid-cols-4 gap-8">
            <aside className="hidden lg:block lg:col-span-1">
                <div className="sticky top-24">
                    <PackagesFilter />
                </div>
            </aside>
            <section className="lg:col-span-3">
                 <div className="mb-4 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-muted-foreground w-full sm:w-auto">Showing {initialPackages.length} amazing packages</p>
                     <Select defaultValue="relevance">
                        <SelectTrigger className="w-full sm:w-[180px]"><SelectValue/></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="relevance">Sort by Relevance</SelectItem>
                            <SelectItem value="price-asc">Price: Low to High</SelectItem>
                             <SelectItem value="price-desc">Price: High to Low</SelectItem>
                              <SelectItem value="duration">Duration</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {initialPackages.map((deal) => (
                        <PackageCard key={deal.title} deal={deal} />
                    ))}
                </div>
                 <div className="flex justify-center mt-8">
                    <Button variant="outline">Load More Packages</Button>
                </div>
            </section>
        </div>

      </main>
    </div>
  );
}
