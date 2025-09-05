
'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DatePicker } from '@/components/ui/date-picker';
import {
    BedDouble,
    ChevronDown,
    Facebook,
    Home,
    Instagram,
    LayoutGrid,
    MapPin,
    Package,
    Plane,
    Sailboat,
    Star,
    Ticket,
    Twitter,
    Users,
    Heart,
    Filter,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';

const Header = () => {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 items-center">
                <div className="mr-4 hidden lg:flex">
                     <Link href="/modules/travel" className="mr-6 flex items-center space-x-2">
                        <BedDouble className="h-6 w-6 text-primary" />
                        <span className="font-bold sm:inline-block">
                           NestStays
                        </span>
                    </Link>
                    <nav className="flex items-center space-x-4 text-sm font-medium">
                        <Link href="/modules/travel" className="flex items-center gap-2 text-foreground/60 transition-colors hover:text-foreground/80"><Plane className="h-4 w-4" />Travel</Link>
                        <Link href="/modules/stays" className="flex items-center gap-2 text-foreground transition-colors hover:text-foreground/80"><Home className="h-4 w-4" />Stays</Link>
                        <Link href="/modules/travel/packages" className="flex items-center gap-2 text-foreground/60 transition-colors hover:text-foreground/80"><Package className="h-4 w-4" />Holidays</Link>
                         <Link href="/" className="text-foreground/60 transition-colors hover:text-foreground/80">DigitalNest</Link>
                    </nav>
                </div>
                <div className="flex flex-1 items-center justify-end space-x-2">
                     <Button variant="outline">Become a Host</Button>
                     <Button>Login</Button>
                </div>
            </div>
        </header>
    );
};


const StaysSearch = () => {
    return (
        <div className="bg-background p-4 rounded-lg shadow-lg border">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-center">
                 <div className="lg:col-span-1">
                    <label className="text-xs font-medium">Location</label>
                    <Input placeholder="e.g. Diani, Lamu, Naivasha" />
                </div>
                 <div className="grid grid-cols-2 gap-2">
                     <div>
                        <label className="text-xs font-medium">Check-in</label>
                        <DatePicker placeholder="Select date" />
                    </div>
                     <div>
                        <label className="text-xs font-medium">Check-out</label>
                        <DatePicker placeholder="Select date" />
                    </div>
                </div>
                <div>
                    <label className="text-xs font-medium">Guests</label>
                    <Select>
                        <SelectTrigger>
                            <SelectValue placeholder="2 Guests" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="1">1 Guest</SelectItem>
                            <SelectItem value="2">2 Guests</SelectItem>
                            <SelectItem value="3">3 Guests</SelectItem>
                             <SelectItem value="4">4 Guests</SelectItem>
                              <SelectItem value="5+">5+ Guests</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <Button size="lg" className="h-full">Search</Button>
            </div>
        </div>
    )
}

const StayCard = ({ stay }: { stay: any }) => (
    <Card className="overflow-hidden group">
        <div className="relative">
            <Image
                src={stay.image}
                alt={stay.title}
                width={400}
                height={250}
                className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-105"
                data-ai-hint={stay.hint}
            />
             <Button size="icon" variant="ghost" className="absolute top-2 right-2 bg-white/80 hover:bg-white rounded-full h-8 w-8"><Heart className="h-4 w-4 text-primary"/></Button>
             <Badge variant="secondary" className="absolute bottom-2 left-2">Verified Host</Badge>
        </div>
        <CardContent className="p-4">
             <div className="flex justify-between items-start">
                <h3 className="font-semibold text-lg leading-tight">{stay.title}</h3>
                <div className="flex items-center gap-1 font-semibold">
                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                    <span>{stay.rating}</span>
                </div>
            </div>
            <p className="text-sm text-muted-foreground mt-1">{stay.location}</p>
            <p className="text-sm text-muted-foreground mt-1">{stay.type}</p>
            <div className="mt-2">
                <span className="font-bold text-primary text-lg">KES {stay.price.toLocaleString()}</span>
                <span className="text-sm text-muted-foreground"> / night</span>
            </div>
        </CardContent>
    </Card>
);

const stays = [
    { title: "Diani Beachfront Villa", image: "/travel/stays/diani-villa.jpg", hint: "diani beach villa", rating: 4.9, location: "Diani Beach", type: "Entire Villa", price: 25000 },
    { title: "Lamu Island Swahili House", image: "/travel/stays/lamu-house.jpg", hint: "lamu swahili house", rating: 4.8, location: "Lamu Old Town", type: "Entire House", price: 15000 },
    { title: "Naivasha Lakefront Cottage", image: "/travel/stays/naivasha-cottage.jpg", hint: "naivasha cottage", rating: 4.85, location: "Lake Naivasha", type: "Entire Cottage", price: 18000 },
    { title: "Nanyuki Farm Stay", image: "/travel/stays/nanyuki-farm.jpg", hint: "kenya farm stay", rating: 4.95, location: "Nanyuki", type: "Farm Stay", price: 12000 },
    { title: "Westlands Modern Apartment", image: "/travel/stays/westlands-apt.jpg", hint: "nairobi apartment", rating: 4.7, location: "Westlands, Nairobi", type: "Entire Apartment", price: 8000 },
    { title: "Watamu Treehouse Escape", image: "/travel/stays/watamu-treehouse.jpg", hint: "watamu treehouse", rating: 4.9, location: "Watamu", type: "Treehouse", price: 22000 },
    { title: "Aberdares Cabin Retreat", image: "/travel/stays/aberdares-cabin.jpg", hint: "forest cabin", rating: 4.75, location: "Aberdare National Park", type: "Cabin", price: 16000 },
    { title: "Karen Eco-Lodge", image: "/travel/stays/karen-lodge.jpg", hint: "eco lodge kenya", rating: 4.8, location: "Karen, Nairobi", type: "Private Room", price: 9500 },
];

const FiltersSidebar = () => {
    const [priceRange, setPriceRange] = useState([5000, 50000]);

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><Filter className="h-5 w-5"/> Filters</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-2">
                    <Label>Price Range (per night)</Label>
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
                    <Label>Type of Place</Label>
                    <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                            <Checkbox id="type-any" defaultChecked />
                            <label htmlFor="type-any" className="text-sm">Any</label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox id="type-entire" />
                            <label htmlFor="type-entire" className="text-sm">Entire Place</label>
                        </div>
                         <div className="flex items-center space-x-2">
                            <Checkbox id="type-room" />
                            <label htmlFor="type-room" className="text-sm">Private Room</label>
                        </div>
                    </div>
                </div>
                 <div className="space-y-2">
                    <Label>Amenities</Label>
                    <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                            <Checkbox id="amenity-wifi" />
                            <label htmlFor="amenity-wifi" className="text-sm">Wi-Fi</label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox id="amenity-pool" />
                            <label htmlFor="amenity-pool" className="text-sm">Swimming Pool</label>
                        </div>
                         <div className="flex items-center space-x-2">
                            <Checkbox id="amenity-kitchen" />
                            <label htmlFor="amenity-kitchen" className="text-sm">Kitchen</label>
                        </div>
                         <div className="flex items-center space-x-2">
                            <Checkbox id="amenity-parking" />
                            <label htmlFor="amenity-parking" className="text-sm">Free Parking</label>
                        </div>
                    </div>
                </div>
                <Button className="w-full">Apply Filters</Button>
            </CardContent>
        </Card>
    )
}

export default function NestStaysPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="container py-8">
        <section className="mb-8">
            <h1 className="text-4xl font-bold text-primary mb-2">Find your next stay</h1>
            <p className="text-muted-foreground text-lg">Unforgettable homes, villas, and apartments hosted by locals.</p>
        </section>

        <section className="mb-8">
            <StaysSearch />
        </section>

        <div className="grid lg:grid-cols-4 gap-8">
            <aside className="lg:col-span-1">
                <div className="sticky top-24">
                   <FiltersSidebar />
                </div>
            </aside>
            <section className="lg:col-span-3">
                 <div className="mb-4">
                    <p className="text-sm text-muted-foreground">Showing {stays.length} of 2,345 available stays</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {stays.map((stay) => (
                        <StayCard key={stay.title} stay={stay} />
                    ))}
                </div>
                 <div className="flex justify-center mt-8">
                    <Button variant="outline">Load More Stays</Button>
                </div>
            </section>
        </div>

      </main>
    </div>
  );
}

