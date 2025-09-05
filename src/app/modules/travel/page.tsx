
'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DatePicker } from '@/components/ui/date-picker';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Autoplay from "embla-carousel-autoplay";
import {
    BedDouble,
    Briefcase,
    Bus,
    Car,
    ChevronDown,
    Facebook,
    Headset,
    Home,
    HomeIcon,
    Hotel,
    Instagram,
    LayoutGrid,
    LifeBuoy,
    MapPin,
    Package,
    Plane,
    Sailboat,
    ShieldCheck,
    Star,
    Ticket,
    Train,
    Twitter,
    Users,
    Wallet,
} from 'lucide-react';
import { NestIcon } from '@/components/icons';

const Header = () => {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 items-center">
                <div className="mr-4 hidden lg:flex">
                     <Link href="/modules/travel" className="mr-6 flex items-center space-x-2">
                        <Plane className="h-6 w-6 text-primary" />
                        <span className="font-bold sm:inline-block">
                           NestTravel
                        </span>
                    </Link>
                    <nav className="flex items-center space-x-4 text-sm font-medium">
                        <Link href="/modules/travel" className="flex items-center gap-2 text-foreground transition-colors hover:text-foreground/80"><Plane className="h-4 w-4" />Travel</Link>
                        <Link href="/modules/stays" className="flex items-center gap-2 text-foreground/60 transition-colors hover:text-foreground/80"><Home className="h-4 w-4" />Stays</Link>
                        <Link href="#" className="flex items-center gap-2 text-foreground/60 transition-colors hover:text-foreground/80"><Plane className="h-4 w-4" />Flights</Link>
                        <Link href="#" className="flex items-center gap-2 text-foreground/60 transition-colors hover:text-foreground/80"><Hotel className="h-4 w-4" />Hotels</Link>
                        <Link href="/modules/travel/packages" className="flex items-center gap-2 text-foreground/60 transition-colors hover:text-foreground/80"><Package className="h-4 w-4" />Holidays</Link>
                        <Link href="/modules/homes" className="flex items-center gap-2 text-foreground/60 transition-colors hover:text-foreground/80"><HomeIcon className="h-4 w-4" />Properties</Link>
                        <Link href="/modules/mall" className="flex items-center gap-2 text-foreground/60 transition-colors hover:text-foreground/80"><LayoutGrid className="h-4 w-4" />Marketplace</Link>
                        <Link href="/modules/events" className="flex items-center gap-2 text-foreground/60 transition-colors hover:text-foreground/80"><Ticket className="h-4 w-4" />Events</Link>
                        <Link href="/" className="text-foreground/60 transition-colors hover:text-foreground/80">DigitalNest</Link>
                    </nav>
                </div>
                <div className="flex flex-1 items-center justify-end space-x-2">
                     <Button>Partner with Us</Button>
                </div>
            </div>
        </header>
    );
};

const SearchWidget = () => {
    const [searchType, setSearchType] = useState('flights');

    return (
        <Card className="shadow-2xl border-none">
            <CardContent className="p-4">
                <div className="flex justify-center mb-4">
                     <Select value={searchType} onValueChange={setSearchType}>
                        <SelectTrigger className="w-auto border-none bg-muted font-semibold">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="flights"><div className="flex items-center gap-2"><Plane /><span>Flights</span></div></SelectItem>
                            <SelectItem value="sgr"><div className="flex items-center gap-2"><Train /><span>SGR</span></div></SelectItem>
                            <SelectItem value="buses"><div className="flex items-center gap-2"><Bus /><span>Buses</span></div></SelectItem>
                            <SelectItem value="hotels"><div className="flex items-center gap-2"><Hotel /><span>Hotels</span></div></SelectItem>
                            <SelectItem value="stays"><div className="flex items-center gap-2"><Home /><span>Stays</span></div></SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
                    <div className="lg:col-span-2 grid grid-cols-2 gap-2">
                         <div className="space-y-1">
                            <label className="text-xs font-medium">From</label>
                            <Input placeholder="Origin" />
                        </div>
                         <div className="space-y-1">
                             <label className="text-xs font-medium">To</label>
                            <Input placeholder="Destination" />
                        </div>
                    </div>
                     <div className="grid grid-cols-2 gap-2">
                         <div className="space-y-1">
                            <label className="text-xs font-medium">Departure</label>
                            <DatePicker placeholder="Select date" />
                        </div>
                         <div className="space-y-1">
                            <label className="text-xs font-medium">Return</label>
                            <DatePicker placeholder="Select date" />
                        </div>
                    </div>
                     <div className="grid grid-cols-1">
                        <div className="space-y-1">
                            <label className="text-xs font-medium">{searchType === 'hotels' || searchType === 'stays' ? 'Guests & Rooms' : 'Passengers'}</label>
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="1 Adult" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="1">1 Adult</SelectItem>
                                    <SelectItem value="2">2 Adults</SelectItem>
                                    <SelectItem value="3">3 Adults</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                     </div>
                </div>
                <div className="mt-4">
                    <Button size="lg" className="w-full">Search Now</Button>
                </div>
            </CardContent>
        </Card>
    );
};

const HeroSection = () => {
    return (
        <section className="relative h-[70vh] flex items-center justify-center text-white">
             <Image
                src="/images/maasaimara.jpg"
                alt="Maasai Mara sunrise with an airplane taking off"
                layout="fill"
                objectFit="cover"
                className="brightness-50"
                data-ai-hint="maasai mara sunrise airplane"
            />
            <div className="relative z-10 container text-center flex flex-col items-center">
                <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                    Discover Africa, Your Way.
                </h1>
                <p className="mt-4 text-lg md:text-xl max-w-3xl">
                    Flights, Stays, Holidays & More – Book with Confidence.
                </p>
                <div className="mt-8 w-full max-w-6xl">
                    <SearchWidget />
                </div>
            </div>
        </section>
    );
};


const FeaturedCategories = () => {
    const categories = [
        { icon: <Plane className="h-8 w-8 text-primary" />, title: "Flights", description: "Book flights across Africa.", href: "#" },
        { icon: <Hotel className="h-8 w-8 text-primary" />, title: "Hotels", description: "Find & book trusted stays.", href: "#" },
        { icon: <Home className="h-8 w-8 text-primary" />, title: "NestStays", description: "Airbnb-style rentals by locals.", href: "/modules/stays" },
        { icon: <Sailboat className="h-8 w-8 text-primary" />, title: "Holiday Packages", description: "Safaris, coast retreats, adventure tours.", href: "/modules/travel/packages" },
    ];
    return (
         <section className="py-16 bg-muted/50">
            <div className="container">
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {categories.map(cat => (
                        <Link href={cat.href} key={cat.title}>
                            <Card className="text-center hover:shadow-lg transition-shadow h-full">
                                <CardContent className="p-6 flex flex-col items-center gap-4">
                                    {cat.icon}
                                    <h3 className="text-lg font-semibold">{cat.title}</h3>
                                    <p className="text-sm text-muted-foreground">{cat.description}</p>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    )
}

const SpecialOffersSection = () => {
    const offers = [
        {
            title: "Mombasa Coast Getaway",
            duration: "3 Days",
            price: 20000,
            image: "/travel/mombasa.jpg",
            hint: "mombasa beach"
        },
        {
            title: "Naivasha Weekend Retreat",
            duration: "2 Days",
            price: 12000,
            image: "/travel/naivasha.jpg",
            hint: "lake naivasha"
        },
        {
            title: "Amboseli Safari Adventure",
            duration: "3 Days, 2 Nights",
            price: 35000,
            image: "/travel/amboseli.jpg",
            hint: "amboseli elephant"
        },
        {
            title: "SGR + Hotel Combo",
            duration: "From Nairobi",
            price: 25000,
            image: "/travel/sgr.jpg",
            hint: "kenya railway train"
        },
         {
            title: "Diani Beach Bliss",
            duration: "4 Days",
            price: 40000,
            image: "/travel/diani.jpg",
            hint: "diani beach kenya"
        }
    ];

    return (
        <section className="py-16">
            <div className="container">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold tracking-tight text-primary">Special Offers</h2>
                    <p className="mt-2 text-lg text-muted-foreground">Unbeatable deals for your next adventure.</p>
                </div>
                 <Carousel
                    opts={{ align: "start", loop: true }}
                    plugins={[Autoplay({ delay: 5000 })]}
                    className="w-full"
                >
                    <CarouselContent>
                        {offers.map((offer, index) => (
                        <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                            <div className="p-1">
                            <Card className="overflow-hidden group">
                                <CardContent className="p-0">
                                    <div className="relative">
                                        <Image
                                            src={offer.image}
                                            alt={offer.title}
                                            width={400}
                                            height={250}
                                            className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-105"
                                            data-ai-hint={offer.hint}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                        <div className="absolute bottom-0 left-0 p-4 text-white">
                                            <h3 className="text-xl font-bold">{offer.title}</h3>
                                            <p className="text-sm">{offer.duration}</p>
                                        </div>
                                    </div>
                                    <div className="p-4 flex justify-between items-center">
                                        <div>
                                            <p className="text-xs text-muted-foreground">From</p>
                                            <p className="text-xl font-bold text-primary">KES {offer.price.toLocaleString()}</p>
                                        </div>
                                        <Button>Book Now</Button>
                                    </div>
                                </CardContent>
                            </Card>
                            </div>
                        </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className="absolute left-[-1rem]" />
                    <CarouselNext className="absolute right-[-1rem]" />
                </Carousel>
            </div>
        </section>
    );
};

const TrustSection = () => {
    const features = [
        { icon: <ShieldCheck className="h-6 w-6 text-green-600" />, text: "Verified Hotels & Hosts" },
        { icon: <Wallet className="h-6 w-6 text-green-600" />, text: "Mpesa, Airtel Money & Card Payments" },
        { icon: <Star className="h-6 w-6 text-green-600" />, text: "Flexible Cancellations & Wallet Credits" },
        { icon: <Headset className="h-6 w-6 text-green-600" />, text: "24/7 Local Support" },
    ];
    return (
        <section className="py-16 bg-muted/50">
            <div className="container">
                <div className="text-center mb-12">
                     <h2 className="text-3xl font-bold tracking-tight text-primary">Why Book with NestTravel?</h2>
                     <p className="mt-2 text-lg text-muted-foreground">Your peace of mind is our priority.</p>
                </div>
                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-4">
                            {feature.icon}
                            <span className="font-semibold">{feature.text}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

const Footer = () => (
    <footer className="border-t bg-background">
        <div className="container py-12">
            <div className="grid gap-8 grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
                <div className="col-span-2 lg:col-span-1">
                     <Link href="/modules/travel" className="flex items-center space-x-2 mb-4">
                        <Plane className="h-6 w-6 text-primary" />
                        <span className="font-bold sm:inline-block">
                           NestTravel
                        </span>
                    </Link>
                    <p className="text-sm text-muted-foreground">Your gateway to unforgettable African adventures.</p>
                </div>
                 <div>
                    <h3 className="font-semibold mb-4">Quick Links</h3>
                    <nav className="flex flex-col gap-2 text-sm">
                        <Link href="#" className="text-muted-foreground hover:text-primary">Travel</Link>
                        <Link href="/modules/stays" className="text-muted-foreground hover:text-primary">Stays</Link>
                        <Link href="#" className="text-muted-foreground hover:text-primary">Flights</Link>
                        <Link href="#" className="text-muted-foreground hover:text-primary">Hotels</Link>
                        <Link href="/modules/travel/packages" className="text-muted-foreground hover:text-primary">Packages</Link>
                        <Link href="#" className="text-muted-foreground hover:text-primary">Car Hire</Link>
                    </nav>
                </div>
                 <div>
                    <h3 className="font-semibold mb-4">Ecosystem</h3>
                    <nav className="flex flex-col gap-2 text-sm">
                        <Link href="/modules/homes" className="text-muted-foreground hover:text-primary">Properties</Link>
                        <Link href="/modules/mall" className="text-muted-foreground hover:text-primary">Marketplace</Link>
                        <Link href="/modules/events" className="text-muted-foreground hover:text-primary">Events</Link>
                        <Link href="/" className="text-muted-foreground hovertext-primary">DigitalNest</Link>
                    </nav>
                </div>
                <div>
                    <h3 className="font-semibold mb-4">Support</h3>
                    <nav className="flex flex-col gap-2 text-sm">
                        <Link href="#" className="text-muted-foreground hover:text-primary">Contact</Link>
                        <Link href="#" className="text-muted-foreground hover:text-primary">FAQ</Link>
                        <Link href="#" className="text-muted-foreground hover:text-primary">Refunds</Link>
                        <Link href="#" className="text-muted-foreground hover:text-primary">Partner with Us</Link>
                    </nav>
                </div>
                <div className="col-span-2 md:col-span-1">
                    <h3 className="font-semibold mb-4">Follow Us</h3>
                     <div className="flex space-x-4">
                        <Link href="#" className="text-muted-foreground hover:text-primary"><Facebook className="h-5 w-5" /></Link>
                        <Link href="#" className="text-muted-foreground hover:text-primary"><Twitter className="h-5 w-5" /></Link>
                        <Link href="#" className="text-muted-foreground hover:text-primary"><Instagram className="h-5 w-5" /></Link>
                    </div>
                </div>
            </div>
            <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
                <p>&copy; {new Date().getFullYear()} NestTravel by DigitalNest. All rights reserved.</p>
            </div>
        </div>
    </footer>
);

export default function NestTravelPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <FeaturedCategories />
        <SpecialOffersSection />
        <TrustSection />
      </main>
      <Footer />
    </div>
  );
}
