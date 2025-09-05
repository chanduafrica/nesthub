
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { PropertyCard } from '@/components/modules/homes/property-card';
import { Property } from '@/lib/mock-data';
import Link from 'next/link';
import Image from 'next/image';
import { SearchForm } from '@/components/modules/homes/search-form';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import './theme.css';

const Header = () => {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 items-center">
                <div className="mr-4 hidden md:flex">
                    <Link href="/modules/homes" className="mr-6 flex items-center space-x-2">
                        <Image src="/images/dnlogo.png" alt="NestHomes Logo" width={24} height={24} />
                        <span className="hidden font-bold sm:inline-block">
                           NestHomes
                        </span>
                    </Link>
                    <nav className="flex items-center space-x-6 text-sm font-medium">
                        <Link href="/modules/homes/properties" className="text-foreground/60 transition-colors hover:text-foreground/80">Properties</Link>
                        <Link href="/modules/homes/build" className="text-foreground/60 transition-colors hover:text-foreground/80">Build My Own</Link>
                    </nav>
                </div>
                <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
                     <Button>Contact Agent</Button>
                </div>
            </div>
        </header>
    );
};


const HeroSection = () => {
    return (
      <section className="relative h-[50vh] flex items-center justify-center">
        <Image
            src="/images/hero-background.jpg"
            alt="Beautiful modern home interior"
            fill
            className="object-cover"
            data-ai-hint="modern house"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 container mx-auto flex flex-col justify-center items-center text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-8">
            Find Your Dream Home
          </h1>
          <div className="w-full max-w-4xl">
            <SearchForm />
          </div>
        </div>
      </section>
    );
};


const FeaturedPropertiesSection = ({ properties }: { properties: Property[] }) => {
    return (
        <section className="py-16 md:py-24 bg-background">
            <div className="container mx-auto">
                <div className="text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">Featured Properties</h2>
                    <p className="mt-4 text-lg text-muted-foreground">
                        Explore our handpicked selection of premier properties.
                    </p>
                </div>
                <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {properties.slice(0, 8).map((property) => (
                        <PropertyCard key={property.id} property={property} />
                    ))}
                </div>
                 <div className="mt-12 text-center">
                    <Button asChild variant="outline">
                        <Link href="/modules/homes/properties">View All Properties</Link>
                    </Button>
                </div>
            </div>
        </section>
    );
};

const NewsCard = ({ article }: { article: any }) => (
    <Card className="overflow-hidden">
        <Image
            src={article.image}
            alt={article.title}
            width={400}
            height={250}
            className="w-full h-48 object-cover"
            data-ai-hint={article.hint}
        />
        <CardContent className="p-4">
            <p className="text-sm text-muted-foreground mb-2">{article.date}</p>
            <h3 className="font-semibold mb-2 hover:text-primary transition-colors">
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
        { title: "Market Trends: What to Expect in 2025", date: "July 20, 2024", category: "Market Analysis", image: "https://picsum.photos/400/250?random=10", hint: "modern kitchen" },
        { title: "First-Time Homebuyer's Guide to Nairobi", date: "July 18, 2024", category: "Buyer Tips", image: "https://picsum.photos/400/250?random=11", hint: "living room" },
        { title: "The Rise of Green Homes in Kenya", date: "July 15, 2024", category: "Sustainability", image: "https://picsum.photos/400/250?random=12", hint: "house exterior" },
    ]
    return (
        <section className="py-16 md:py-24 bg-secondary/10">
            <div className="container mx-auto">
                <div className="text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">Latest News</h2>
                    <p className="mt-4 text-lg text-muted-foreground">
                        Stay updated with the latest in real estate.
                    </p>
                </div>
                 <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
                    {news.map((article, index) => (
                       <NewsCard key={index} article={article} />
                    ))}
                </div>
            </div>
        </section>
    );
}

const Footer = () => (
    <footer className="border-t">
        <div className="container py-8">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                <div>
                    <h3 className="font-semibold mb-2">NestHomes</h3>
                    <p className="text-sm text-muted-foreground">Your partner in finding the perfect home.</p>
                </div>
                 <div>
                    <h3 className="font-semibold mb-2">Quick Links</h3>
                    <nav className="flex flex-col gap-1 text-sm text-muted-foreground">
                        <Link href="#" className="hover:text-primary">Properties</Link>
                        <Link href="#" className="hover:text-primary">About Us</Link>
                        <Link href="#" className="hover:text-primary">Contact</Link>
                    </nav>
                </div>
                <div>
                    <h3 className="font-semibold mb-2">Newsletter</h3>
                    <p className="text-sm text-muted-foreground mb-2">Subscribe to get the latest updates.</p>
                    <form className="flex gap-2">
                        <Input type="email" placeholder="Your Email" />
                        <Button>Subscribe</Button>
                    </form>
                </div>
                 <div>
                    <h3 className="font-semibold mb-2">Follow Us</h3>
                     <div className="flex space-x-4">
                        <Link href="#" className="text-muted-foreground hover:text-primary">FB</Link>
                        <Link href="#" className="text-muted-foreground hover:text-primary">TW</Link>
                        <Link href="#" className="text-muted-foreground hover:text-primary">IG</Link>
                    </div>
                </div>
            </div>
            <div className="mt-8 border-t pt-4 text-center text-sm text-muted-foreground">
                <p>&copy; {new Date().getFullYear()} NestHomes by DigitalNest. All rights reserved.</p>
            </div>
        </div>
    </footer>
);

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
