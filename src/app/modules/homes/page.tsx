
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { PropertyCard } from '@/components/modules/homes/property-card';
import { Property } from '@/lib/mock-data';
import Link from 'next/link';
import Image from 'next/image';
import { SearchForm } from '@/components/modules/homes/search-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

import './theme.css';


export default function NestHomesPage() {
  const [properties, setProperties] = useState<Property[]>([]);

  useEffect(() => {
    fetch('/api/data/properties')
      .then(res => res.json())
      .then(data => setProperties(data));
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-background nesthomes-theme">
      <Header />
      <main>
        <HeroSection />
        <FeaturedPropertiesSection properties={properties} />
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
                <Link href="/modules/homes" className="mr-6 flex items-center gap-2 text-2xl font-bold no-underline">
                    <span style={{ color: 'hsl(var(--nesthomes-primary))' }}>Nest</span>
                    <span style={{ color: 'hsl(var(--nesthomes-accent))' }}>Homes</span>
                </Link>

                <div className="hidden md:flex items-center gap-6 text-sm font-medium flex-1">
                    <Link href="/" className="text-foreground/80 transition-colors hover:text-primary no-underline">DigitalNest</Link>
                    <Link href="/modules/homes" className="text-foreground/80 transition-colors hover:text-primary font-bold no-underline">Home</Link>
                    <Link href="/modules/homes/properties" className="text-foreground/80 transition-colors hover:text-primary no-underline">Properties</Link>
                    <Link href="/modules/homes/build" className="text-foreground/80 transition-colors hover:text-primary no-underline">Build My Own</Link>
                    <Link href="/modules/travel" className="text-foreground/80 transition-colors hover:text-primary no-underline">Travel</Link>
                    <Link href="/modules/stays" className="text-foreground/80 transition-colors hover:text-primary no-underline">Stays</Link>
                    <Link href="/modules/mall" className="text-foreground/80 transition-colors hover:text-primary no-underline">MarketPlace</Link>
                    <Link href="/modules/events" className="text-foreground/80 transition-colors hover:text-primary no-underline">Events</Link>
                </div>

                 <div className="hidden md:flex items-center gap-4">
                     <Button style={{ backgroundColor: 'hsl(var(--nesthomes-accent))' }} className="hover:bg-primary/90 text-primary-foreground">Contact</Button>
                </div>
            </div>
           </div>
        </header>
    );
};


const HeroSection = () => {
    return (
      <section className="relative hero-slider-section bg-background flex items-center justify-center">
        <Image 
            src="/images/hero-background.jpg" 
            alt="Beautiful modern home interior" 
            fill 
            className="object-cover"
            data-ai-hint="modern house"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 container mx-auto flex flex-col justify-center items-center text-center px-4 py-16">
          <div className="w-full max-w-4xl">
             <h1 className="text-4xl md:text-5xl font-bold mb-8 text-white">Find An Amazing Property</h1>
          </div>
          <div className="w-[99%] max-w-7xl">
             <SearchForm />
          </div>
        </div>
      </section>
    );
};


const FeaturedPropertiesSection = ({ properties }: { properties: Property[] }) => {
    return (
        <section className="pt-8 pb-16 md:pt-12 md:pb-24 bg-background">
            <div className="container mx-auto">
                <div className="text-left max-w-2xl">
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl" style={{ color: 'hsl(var(--nesthomes-primary))' }}>Discover Latest Properties</h2>
                    <p className="mt-2 text-lg text-muted-foreground">Newest Properties Around You</p>
                </div>
                <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {properties.slice(0, 8).map((property) => (
                        <PropertyCard key={property.id} property={property} />
                    ))}
                </div>
                 <div className="mt-12 text-center">
                    <Button asChild style={{ backgroundColor: 'hsl(var(--nesthomes-primary))' }} className="hover:bg-accent/90 text-accent-foreground">
                        <Link href="/modules/homes/properties" className="no-underline">View All Properties</Link>
                    </Button>
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
                <Link href="#" className="no-underline">{article.title}</Link>
            </h3>
            <p className="text-sm text-primary font-semibold hover:underline">
                 <Link href="#" className="no-underline">{article.category}</Link>
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
                 <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {news.map((article, index) => (
                       <NewsCard key={index} article={article} />
                    ))}
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
                        <Link href="/modules/homes" className="mr-6 flex items-center gap-2 text-2xl font-bold no-underline">
                           <span style={{ color: 'hsl(var(--nesthomes-primary))' }}>Nest</span>
                           <span style={{ color: 'hsl(var(--nesthomes-accent))' }}>Homes</span>
                        </Link>
                    </div>
                    <p className="text-muted-foreground">Find Your Ideal Property at NestProperties – Explore the best real estate opportunities in our Trusted Real Estate Portal. Whether you’re looking to buy, sell, or rent apartments, commercial spaces, or land, we connect you with verified listings and reliable agents. Your dream property is just a click away!</p>
                </div>
                 <div>
                    <h3 className="font-semibold mb-4 text-lg">Quick Links</h3>
                    <nav className="flex flex-col gap-2 text-muted-foreground">
                        <Link href="#" className="hover:text-primary no-underline">Home</Link>
                        <Link href="#" className="hover:text-primary no-underline">Properties Listing</Link>
                        <Link href="#" className="hover:text-primary no-underline">Property Talk</Link>
                        <Link href="#" className="hover:text-primary no-underline">Contact</Link>
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
