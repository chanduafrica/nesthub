
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Home, Building, User, Search, MapPin, Tag, Briefcase, HeartHandshake, Award } from 'lucide-react';
import { NestIcon } from '@/components/icons';
import Link from 'next/link';
import Image from 'next/image';
import { PropertyCard } from '@/components/modules/homes/property-card';
import { mockProperties } from '@/lib/mock-data';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';


export default function NestHomesPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <FeaturedPropertiesSection />
        <HowItWorksSection />
        <MeetTheAgentsSection />
        <TestimonialsSection />
      </main>
      <Footer />
    </div>
  );
}

const Header = () => {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center">
                <Link href="/modules/homes" className="mr-6 flex items-center gap-2">
                    <Home className="h-6 w-6 text-primary" />
                    <span className="font-bold text-lg">NestHomes</span>
                </Link>
                <nav className="hidden md:flex items-center gap-6 text-sm font-medium flex-1">
                    <Link href="/" className="text-foreground/60 transition-colors hover:text-foreground/80 font-bold">DigitalNest Home</Link>
                    <Link href="#" className="text-foreground/60 transition-colors hover:text-foreground/80">For Sale</Link>
                    <Link href="#" className="text-foreground/60 transition-colors hover:text-foreground/80">For Rent</Link>
                    <Link href="#" className="text-foreground/60 transition-colors hover:text-foreground/80">Agents</Link>
                    <Link href="#" className="text-foreground/60 transition-colors hover:text-foreground/80">Blog</Link>
                    <Link href="#" className="text-foreground/60 transition-colors hover:text-foreground/80">Contact Us</Link>
                </nav>
                <div className="flex items-center gap-2 ml-auto">
                    <Button variant="ghost">Sign In</Button>
                    <Button>Add Listing</Button>
                </div>
            </div>
        </header>
    );
};


const HeroSection = () => {
    return (
        <section className="relative h-[70vh] flex items-center justify-center text-white">
            <Image
                src="https://picsum.photos/1600/900?random=hero"
                alt="Modern house exterior"
                fill
                className="object-cover"
                data-ai-hint="modern house"
            />
            <div className="absolute inset-0 bg-black/60" />
            <div className="relative z-10 container text-center">
                <h1 className="text-4xl md:text-6xl font-bold tracking-tight">Find Your Dream Home with Us</h1>
                <p className="mt-4 text-lg md:text-xl text-gray-200 max-w-3xl mx-auto">We provide a complete service for the sale, purchase or rental of real estate.</p>
                <Card className="mt-8 max-w-4xl mx-auto p-4 bg-background/20 backdrop-blur-sm border-gray-500">
                    <CardContent className="p-2">
                        <Tabs defaultValue="sale" className="w-full">
                            <TabsList className="grid w-full grid-cols-2 bg-transparent mb-4">
                                <TabsTrigger value="sale" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">For Sale</TabsTrigger>
                                <TabsTrigger value="rent" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">For Rent</TabsTrigger>
                            </TabsList>
                            <TabsContent value="sale">
                                <SearchForm />
                            </TabsContent>
                            <TabsContent value="rent">
                                <SearchForm />
                            </TabsContent>
                        </Tabs>
                    </CardContent>
                </Card>
            </div>
        </section>
    );
}

const SearchForm = () => (
    <form className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end text-left">
        <div className="md:col-span-1">
            <label className="text-sm font-medium text-white">Location</label>
            <Input type="text" placeholder="e.g. Kilimani, Nairobi" className="bg-white text-foreground" />
        </div>
        <div>
            <label className="text-sm font-medium text-white">Property Type</label>
            <Select>
                <SelectTrigger className="bg-white text-foreground">
                    <SelectValue placeholder="Select Type" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="apartment">Apartment</SelectItem>
                    <SelectItem value="villa">Villa</SelectItem>
                    <SelectItem value="townhouse">Townhouse</SelectItem>
                    <SelectItem value="office">Office</SelectItem>
                </SelectContent>
            </Select>
        </div>
        <div>
            <label className="text-sm font-medium text-white">Price Range (KES)</label>
             <Select>
                <SelectTrigger className="bg-white text-foreground">
                    <SelectValue placeholder="Select Price" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="0-100k">0 - 100,000</SelectItem>
                    <SelectItem value="100k-500k">100,000 - 500,000</SelectItem>
                    <SelectItem value="500k-1m">500,000 - 1M</SelectItem>
                    <SelectItem value="1m+">1M+</SelectItem>
                </SelectContent>
            </Select>
        </div>
        <Button type="submit" className="w-full h-10">
            <Search className="mr-2 h-4 w-4" /> Search
        </Button>
    </form>
);


const FeaturedPropertiesSection = () => {
    return (
        <section className="py-16 md:py-24 bg-secondary/50">
            <div className="container">
                <div className="text-center max-w-2xl mx-auto">
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Featured Properties</h2>
                    <p className="mt-4 text-lg text-muted-foreground">Discover our exclusive selection of properties, curated for the discerning client.</p>
                </div>
                <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {mockProperties.slice(0, 6).map(property => (
                        <PropertyCard key={property.id} property={property} />
                    ))}
                </div>
                <div className="mt-12 text-center">
                    <Button size="lg" variant="outline">View All Properties</Button>
                </div>
            </div>
        </section>
    );
};


const HowItWorksSection = () => {
    const steps = [
        { icon: MapPin, title: "Find Property", description: "Search for your dream home in your preferred location." },
        { icon: Tag, title: "View Details", description: "Get all the details about the property, including features and price." },
        { icon: Briefcase, title: "Contact Agent", description: "Connect with our professional agents to schedule a viewing." },
        { icon: HeartHandshake, title: "Get Your Keys", description: "Finalize the deal and get the keys to your new home." }
    ];

    return (
        <section className="py-16 md:py-24">
            <div className="container">
                <div className="text-center max-w-2xl mx-auto">
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Easy Steps to Find Your Home</h2>
                    <p className="mt-4 text-lg text-muted-foreground">We provide a simple, streamlined process to make your property search effortless.</p>
                </div>
                <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                    {steps.map((step, index) => (
                        <Card key={index} className="text-center p-6">
                            <div className="flex justify-center mb-4">
                                <div className="p-4 bg-primary/10 rounded-full">
                                    <step.icon className="h-8 w-8 text-primary" />
                                </div>
                            </div>
                            <h3 className="text-lg font-semibold">{step.title}</h3>
                            <p className="mt-2 text-muted-foreground">{step.description}</p>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
};


const MeetTheAgentsSection = () => {
    const agents = [
        { name: "Jane Doe", avatarUrl: "https://picsum.photos/100/100?random=a1", listings: 12 },
        { name: "John Smith", avatarUrl: "https://picsum.photos/100/100?random=a2", listings: 8 },
        { name: "Peter Jones", avatarUrl: "https://picsum.photos/100/100?random=a3", listings: 15 },
        { name: "Susan Mwangi", avatarUrl: "https://picsum.photos/100/100?random=a4", listings: 10 }
    ];
    return (
        <section className="py-16 md:py-24 bg-secondary/50">
            <div className="container">
                <div className="text-center max-w-2xl mx-auto">
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Meet Our Professional Agents</h2>
                    <p className="mt-4 text-lg text-muted-foreground">Our team of experienced agents is here to help you every step of the way.</p>
                </div>
                <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                    {agents.map(agent => (
                        <Card key={agent.name} className="text-center overflow-hidden">
                            <div className="bg-primary/10 py-6">
                                <Avatar className="h-24 w-24 mx-auto border-4 border-white">
                                    <AvatarImage src={agent.avatarUrl} alt={agent.name} />
                                    <AvatarFallback>{agent.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                            </div>
                            <CardContent className="p-6">
                                <h3 className="text-lg font-semibold">{agent.name}</h3>
                                <p className="text-primary">{agent.listings} Listings</p>
                                <Button variant="outline" className="mt-4">View Profile</Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
};

const TestimonialsSection = () => {
     const testimonials = [
        { name: "Wanjiku Kamau", role: "Home Buyer", text: "NestHomes made finding my dream home so easy! The agents were incredibly helpful and professional.", avatarUrl: "https://picsum.photos/100/100?random=t1" },
        { name: "Musa Okello", role: "Tenant", text: "I found a perfect apartment for rent in just a few days. The platform is user-friendly and the listings are top-notch.", avatarUrl: "https://picsum.photos/100/100?random=t2" }
    ];
    return (
         <section className="py-16 md:py-24">
            <div className="container">
                 <div className="text-center max-w-2xl mx-auto">
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">What Our Clients Say</h2>
                    <p className="mt-4 text-lg text-muted-foreground">We are trusted by thousands of clients. Here's what they have to say.</p>
                </div>
                 <div className="mt-12 grid gap-8 md:grid-cols-2">
                    {testimonials.map(testimonial => (
                        <Card key={testimonial.name} className="p-6">
                            <CardContent className="p-0 flex flex-col items-center text-center md:items-start md:text-left md:flex-row gap-6">
                                 <Avatar className="h-20 w-20">
                                    <AvatarImage src={testimonial.avatarUrl} alt={testimonial.name} />
                                    <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                    <p className="text-muted-foreground">"{testimonial.text}"</p>
                                    <h3 className="mt-4 text-lg font-semibold">{testimonial.name}</h3>
                                    <p className="text-sm text-primary">{testimonial.role}</p>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}

const Footer = () => (
    <footer className="border-t bg-secondary/50">
        <div className="container py-12">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                <div>
                    <div className="flex items-center gap-2 mb-4">
                         <Home className="h-6 w-6 text-primary" />
                         <span className="font-bold text-lg">NestHomes</span>
                    </div>
                    <p className="text-muted-foreground">The best place to find your dream home. We are dedicated to making your property search easy and efficient.</p>
                </div>
                 <div>
                    <h3 className="font-semibold mb-4">Quick Links</h3>
                    <nav className="flex flex-col gap-2 text-muted-foreground">
                        <Link href="#" className="hover:text-primary">About Us</Link>
                        <Link href="#" className="hover:text-primary">Contact Us</Link>
                        <Link href="#" className="hover:text-primary">Blog</Link>
                        <Link href="#" className="hover:text-primary">Terms & Conditions</Link>
                    </nav>
                </div>
                 <div>
                    <h3 className="font-semibold mb-4">Properties</h3>
                    <nav className="flex flex-col gap-2 text-muted-foreground">
                        <Link href="#" className="hover:text-primary">For Sale</Link>
                        <Link href="#" className="hover:text-primary">For Rent</Link>
                        <Link href="#" className="hover:text-primary">Featured</Link>
                        <Link href="#" className="hover:text-primary">New Listings</Link>
                    </nav>
                </div>
                <div>
                    <h3 className="font-semibold mb-4">Newsletter</h3>
                    <p className="text-muted-foreground mb-4">Subscribe to our newsletter to get the latest updates.</p>
                    <form className="flex gap-2">
                        <Input type="email" placeholder="Your Email" className="bg-background"/>
                        <Button>Subscribe</Button>
                    </form>
                </div>
            </div>
            <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
                <p>&copy; {new Date().getFullYear()} NestHomes by DigitalNest. All rights reserved.</p>
            </div>
        </div>
    </footer>
);
