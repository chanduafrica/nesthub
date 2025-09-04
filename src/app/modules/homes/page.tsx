'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PropertyCard } from '@/components/modules/homes/property-card';
import { mockProperties } from '@/lib/mock-data';
import Link from 'next/link';
import Image from 'next/image';
import { SearchForm } from '@/components/modules/homes/search-form';
import './theme.css';

export default function NestHomesPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background nesthomes-theme">
      <Header />
      <main>
        <HeroSection />
        <FeaturedPropertiesSection />
      </main>
      <Footer />
    </div>
  );
}

const Header = () => {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-primary-light">
           <div className="container mx-auto">
             <div className="flex h-24 items-center justify-between">
                <Link href="/modules/homes" className="mr-6 flex items-center gap-2">
                    <Image src="/dnproperties.png" alt="NestHomes" width={200} height={40} />
                </Link>
                
                <div className="hidden md:flex items-center gap-6 text-sm font-medium flex-1">
                    <Link href="/" className="text-foreground/80 transition-colors hover:text-primary">DigitalNest</Link>
                     <Link href="/modules/homes" className="text-foreground/80 transition-colors hover:text-primary font-bold">Home</Link>
                    <Link href="/modules/homes/properties" className="text-foreground/80 transition-colors hover:text-primary">Properties</Link>
                    <Link href="/modules/homes/build" className="text-foreground/80 transition-colors hover:text-primary">Build My Own</Link>
                    <Link href="/modules/travel" className="text-foreground/80 transition-colors hover:text-primary">Travel</Link>
                     <Link href="/modules/stays" className="text-foreground/80 transition-colors hover:text-primary">Stays</Link>
                    <Link href="/modules/mall" className="text-foreground/80 transition-colors hover:text-primary">MarketPlace</Link>
                     <Link href="/modules/events" className="text-foreground/80 transition-colors hover:text-primary">Events</Link>
                </div>

                <div className="hidden md:flex items-center gap-4">
                     <div className="text-right">
                        <h2 className="text-xl font-bold" style={{ color: 'hsl(var(--nesthomes-primary))' }}>Need Help?</h2>
                        <p className="text-muted-foreground text-sm">Let Us Call You!</p>
                    </div>
                     <Button style={{ backgroundColor: 'hsl(var(--nesthomes-accent))' }} className="hover:bg-primary/90 text-primary-foreground">Contact</Button>
                </div>
            </div>
           </div>
        </header>
    );
};


const HeroSection = () => {
    return (
        <section className="relative bg-secondary/30">
            <div className="container mx-auto">
                 <div className="grid md:grid-cols-2 items-center py-12 md:py-24">
                    <div className="text-right pr-12">
                        <h1 className="text-5xl font-bold" style={{color:'hsl(var(--nesthomes-primary))'}}>Find An Amazing Property</h1>
                    </div>
                     <div className="bg-primary/10 p-4 rounded-xl">
                        <div className="text-center md:text-left pb-4 flex justify-between items-center">
                            <div>
                                <h2 className="text-2xl font-bold text-foreground">Need Help To Choose Your Property</h2>
                            </div>
                           
                            <Button style={{ backgroundColor: 'hsl(var(--nesthomes-accent))' }} className="hover:bg-primary/90 text-primary-foreground">Let Us Call You!</Button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container mx-auto relative z-10 -mb-24">
                <SearchForm />
            </div>
        </section>
    );
}

const FeaturedPropertiesSection = () => {
    return (
        <section className="py-16 md:py-24 bg-background pt-32">
            <div className="container mx-auto">
                <div className="text-left max-w-2xl">
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl" style={{ color: 'hsl(var(--nesthomes-primary))' }}>Discover Latest Properties</h2>
                    <p className="mt-2 text-lg text-muted-foreground">Newest Properties Around You</p>
                </div>
                <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {mockProperties.map(property => (
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


const Footer = () => (
    <footer className="border-t bg-primary-light mt-12">
        <div className="container py-12">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                <div>
                    <div className="flex items-center gap-2 mb-4">
                         <Image src="/dnproperties.png" alt="NestHomes" width={180} height={36} />
                    </div>
                    <p className="text-muted-foreground">Find Your Ideal Property at Souk Properties – Explore the best real estate opportunities in our Trusted Real Estate Portal. Whether you’re looking to buy, sell, or rent apartments, commercial spaces, or land, we connect you with verified listings and reliable agents. Your dream property is just a click away!</p>
                </div>
                 <div>
                    <h3 className="font-semibold mb-4 text-lg">Quick Links</h3>
                    <nav className="flex flex-col gap-2 text-muted-foreground">
                        <Link href="#" className="hover:text-primary">Home</Link>
                        <Link href="#" className="hover:text-primary">Properties Listing</Link>
                        <Link href="#" className="hover:text-primary">Property Talk</Link>
                        <Link href="#" className="hover:text-primary">Contact</Link>
                    </nav>
                </div>
                <div>
                    <h3 className="font-semibold mb-4 text-lg">Newsletter</h3>
                    <p className="text-muted-foreground mb-4">Subscribe to our newsletter to get the latest updates.</p>
                    <form className="flex gap-2">
                        <Input type="email" placeholder="Your Email" className="bg-background"/>
                        <Button style={{ backgroundColor: 'hsl(var(--nesthomes-accent))' }}>Subscribe</Button>
                    </form>
                </div>
            </div>
            <div className="mt-8 border-t pt-8 flex justify-between items-center text-sm text-muted-foreground">
                <p>&copy; {new Date().getFullYear()} NestHomes by DigitalNest. All rights reserved.</p>
                <p>Designed by DigitalNest</p>
            </div>
        </div>
    </footer>
);