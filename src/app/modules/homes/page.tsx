
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { PropertyCard } from '@/components/modules/homes/property-card';
import { mockProperties } from '@/lib/mock-data';
import Link from 'next/link';
import Image from 'next/image';
import { SearchForm } from '@/components/modules/homes/search-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"

import './theme.css';


export default function NestHomesPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background nesthomes-theme">
      <Header />
      <main>
        <HeroSection />
        <FeaturedPropertiesSection />
        <NewsSection />
      </main>
      <Footer />
    </div>
  );
}

const Header = () => {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background">
           <div className="container mx-auto">
             <div className="flex h-24 items-center justify-between">
                <Link href="/modules/homes" className="mr-6 flex items-center gap-2 text-2xl font-bold">
                    <span style={{ color: 'hsl(var(--nesthomes-primary))' }}>Nest</span>
                    <span style={{ color: 'hsl(var(--nesthomes-accent))' }}>Homes</span>
                </Link>

                <div className="hidden md:flex items-center gap-6 text-sm font-medium flex-1">
                    <Link href="/" className="text-foreground/80 transition-colors hover:text-primary">DigitalNest</Link>
                     <Link href="/modules/homes" className="text-foreground/80 transition-colors hover:text-primary font-bold">Home</Link>
                    <Link href="/modules/homes/properties" className="text-foreground/80 transition-colors hover:text-primary">Properties</Link>
                    <Link href="/modules/travel" className="text-foreground/80 transition-colors hover:text-primary">Travel & Stays</Link>
                    <Link href="#" className="text-foreground/80 transition-colors hover:text-primary">Car Hire & Tours</Link>
                    <Link href="/modules/mall" className="text-foreground/80 transition-colors hover:text-primary">Market Place</Link>
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
      <section className="relative hero-slider-section bg-background py-24">
        <div className="container mx-auto flex flex-col justify-center items-center text-center px-4">
          <div className="w-full max-w-4xl">
            <h1 className="text-5xl font-bold text-foreground mb-8">Find An Amazing Property</h1>
            <SearchForm />
          </div>
        </div>
      </section>
    );
};


const FeaturedPropertiesSection = () => {
    return (
        <section className="py-16 md:py-24 bg-background">
            <div className="container mx-auto">
                <div className="text-left max-w-2xl">
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl" style={{ color: 'hsl(var(--nesthomes-primary))' }}>Discover Latest Properties</h2>
                    <p className="mt-2 text-lg text-muted-foreground">Newest Properties Around You</p>
                </div>
                <div className="mt-12">
                   <Carousel
                        opts={{
                            align: "start",
                            loop: true,
                        }}
                        plugins={[
                           Autoplay({
                             delay: 3000,
                           }),
                        ]}
                        className="w-full"
                    >
                        <CarouselContent>
                            {mockProperties.map((property) => (
                            <CarouselItem key={property.id} className="md:basis-1/2 lg:basis-1/3">
                                <div className="p-1">
                                    <PropertyCard property={property} />
                                </div>
                            </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious />
                        <CarouselNext />
                    </Carousel>
                </div>
            </div>
        </section>
    );
};

const NewsCard = ({ article }: { article: any }) => (
    <Card className="h-full overflow-hidden">
        <Image
            src={article.image}
            alt={article.title}
            width={400}
            height={250}
            className="w-full h-56 object-cover"
            data-ai-hint={article.hint}
        />
        <CardContent className="p-6">
            <p className="text-sm text-muted-foreground mb-2">{article.date}</p>
            <h3 className="text-lg font-semibold mb-4 hover:text-primary transition-colors">
                <Link href="#">{article.title}</Link>
            </h3>
            <p className="text-sm text-primary font-semibold hover:underline">
                 <Link href="#">{article.category}</Link>
            </p>
        </CardContent>
    </Card>
)

const NewsSection = () => {
    const news = [
        { title: "Real Estate Market Heats Up, Here’s How First-time Buyers Can Keep Their Cool", date: "27 February 2025", category: "Luxury", image: "https://picsum.photos/400/250?random=10", hint: "modern kitchen" },
        { title: "As The Real Estate Market Heats Up, Here’s How First-time Buyers Can Keep Their Cool", date: "27 February 2025", category: "Luxury", image: "https://picsum.photos/400/250?random=11", hint: "living room" },
        { title: "Here’s How First-time Buyers Can Keep Their Cool As The Real Estate Market Heats Up", date: "27 February 2025", category: "Market Trends", image: "https://picsum.photos/400/250?random=12", hint: "house exterior" },
        { title: "Keeping Your Cool in a Hot Real Estate Market: A Guide for First-Timers", date: "27 February 2025", category: "Market Trends", image: "https://picsum.photos/400/250?random=13", hint: "happy couple" },
    ]
    return (
        <section className="py-16 md:py-24 bg-secondary/50">
            <div className="container mx-auto">
                <div className="text-center max-w-2xl mx-auto">
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl" style={{ color: 'hsl(var(--nesthomes-primary))' }}>Latest News & Update</h2>
                    <p className="mt-2 text-lg text-muted-foreground">Latest News About Eastleigh Properties</p>
                </div>
                 <div className="mt-12">
                   <Carousel
                        opts={{
                            align: "start",
                             loop: true,
                        }}
                         plugins={[
                           Autoplay({
                             delay: 4000,
                           }),
                        ]}
                        className="w-full"
                    >
                        <CarouselContent>
                            {news.map((article, index) => (
                            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                                <div className="p-1 h-full">
                                    <NewsCard article={article} />
                                </div>
                            </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious />
                        <CarouselNext />
                    </Carousel>
                </div>
            </div>
        </section>
    );
}

const Footer = () => (
    <footer className="border-t bg-primary-light mt-12">
        <div className="container py-12">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                <div>
                    <div className="flex items-center gap-2 mb-4">
                        <Link href="/modules/homes" className="mr-6 flex items-center gap-2 text-2xl font-bold">
                           <span style={{ color: 'hsl(var(--nesthomes-primary))' }}>Nest</span>
                           <span style={{ color: 'hsl(var(--nesthomes-accent))' }}>Homes</span>
                        </Link>
                    </div>
                    <p className="text-muted-foreground">Find Your Ideal Property at NestProperties – Explore the best real estate opportunities in our Trusted Real Estate Portal. Whether you’re looking to buy, sell, or rent apartments, commercial spaces, or land, we connect you with verified listings and reliable agents. Your dream property is just a click away!</p>
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
