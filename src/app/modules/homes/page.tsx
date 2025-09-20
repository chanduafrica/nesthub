
'use client';

import { useState, useEffect, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { PropertyCard } from '@/components/modules/homes/property-card';
import { Property } from '@/lib/mock-data';
import Link from 'next/link';
import Image from 'next/image';
import { SearchForm, SearchFilters } from '@/components/modules/homes/search-form';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Briefcase, Building, Facebook, HomeIcon, Instagram, LayoutGrid, Plane, Ticket, Twitter } from 'lucide-react';
import './theme.css';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Autoplay from "embla-carousel-autoplay";
import { getProperties } from '@/lib/firebase-services';


const Header = () => {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 items-center">
                <div className="mr-4 hidden md:flex">
                    <Link href="/modules/homes" className="mr-6 flex items-center space-x-2">
                        <span className="hidden font-bold sm:inline-block">
                           NestHomes
                        </span>
                    </Link>
                    <nav className="flex items-center space-x-4 text-sm font-medium">
                        <Link href="/modules/homes/properties" className="flex items-center gap-2 text-foreground transition-colors hover:text-foreground/80"><HomeIcon className="h-4 w-4" />Properties</Link>
                        <Link href="/modules/homes/build" className="flex items-center gap-2 text-foreground/60 transition-colors hover:text-foreground/80"><Building className="h-4 w-4" />Build My Own</Link>
                        <Link href="/modules/travel" className="flex items-center gap-2 text-foreground/60 transition-colors hover:text-foreground/80"><Plane className="h-4 w-4" />Travel</Link>
                        <Link href="/modules/stays" className="flex items-center gap-2 text-foreground/60 transition-colors hover:text-foreground/80"><Briefcase className="h-4 w-4" />Stays</Link>
                        <Link href="/modules/mall" className="flex items-center gap-2 text-foreground/60 transition-colors hover:text-foreground/80"><LayoutGrid className="h-4 w-4" />Marketplace</Link>
                        <Link href="/modules/events" className="flex items-center gap-2 text-foreground/60 transition-colors hover:text-foreground/80"><Ticket className="h-4 w-4" />Events</Link>
                        <Link href="/" className="flex items-center gap-2 text-foreground/60 transition-colors hover:text-foreground/80">SG-Nest</Link>
                    </nav>
                </div>
                <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
                     <Button variant="secondary">Login as Agent</Button>
                     <Button>Login as Buyer</Button>
                </div>
            </div>
        </header>
    );
};


const HeroSection = () => {
    const [filters, setFilters] = useState<SearchFilters>({
        type: 'all',
        keyword: '',
        location: 'all',
        beds: 'all',
        baths: 'all',
        minArea: '',
        propId: '',
    });
     const handleFilterChange = (newFilters: Partial<SearchFilters>) => {
        setFilters(prev => ({...prev, ...newFilters}));
    }

    return (
      <section className="relative h-[60vh] md:h-[50vh] flex items-center justify-center">
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
            <SearchForm filters={filters} onFilterChange={handleFilterChange} />
          </div>
        </div>
      </section>
    );
};


const FeaturedPropertiesSection = ({ properties }: { properties: Property[] }) => {
    const [filter, setFilter] = useState<'all' | 'sale' | 'rent'>('all');
    const [currentPage, setCurrentPage] = useState(1);
    const propertiesPerPage = 16; // 4 columns * 4 rows

    const filteredProperties = useMemo(() => {
        if (filter === 'all') return properties;
        const type = filter === 'sale' ? 'For Sale' : 'For Rent';
        return properties.filter(p => p.type === type);
    }, [properties, filter]);

    const totalPages = Math.ceil(filteredProperties.length / propertiesPerPage);
    const paginatedProperties = useMemo(() => {
        const startIndex = (currentPage - 1) * propertiesPerPage;
        return filteredProperties.slice(startIndex, startIndex + propertiesPerPage);
    }, [currentPage, filteredProperties]);


    const handleFilterChange = (newFilter: 'all' | 'sale' | 'rent') => {
        setFilter(newFilter);
        setCurrentPage(1);
    }

    return (
        <section className="py-16 md:py-24 bg-background">
            <div className="container mx-auto">
                <div className="text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">Featured Properties</h2>
                    <p className="mt-4 text-lg text-muted-foreground">
                        Explore our handpicked selection of premier properties.
                    </p>
                </div>
                 <div className="flex justify-center gap-2 my-8">
                    <Button variant={filter === 'all' ? 'default' : 'outline'} onClick={() => handleFilterChange('all')}>All</Button>
                    <Button variant={filter === 'sale' ? 'default' : 'outline'} onClick={() => handleFilterChange('sale')}>For Sale</Button>
                    <Button variant={filter === 'rent' ? 'default' : 'outline'} onClick={() => handleFilterChange('rent')}>For Rent</Button>
                </div>
                <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                   {paginatedProperties.map((property) => (
                        <PropertyCard key={property.id} property={property} />
                    ))}
                </div>

                 {totalPages > 1 && (
                    <div className="flex justify-center mt-12">
                        <div className="flex items-center gap-2">
                            <Button
                                variant="outline"
                                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                disabled={currentPage === 1}
                            >
                                Previous
                            </Button>
                            <span className="text-sm text-muted-foreground">
                                Page {currentPage} of {totalPages}
                            </span>
                            <Button
                                variant="outline"
                                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                disabled={currentPage === totalPages}
                            >
                                Next
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

const NewsCard = ({ article }: { article: any }) => (
    <Card className="overflow-hidden">
        <div className="relative w-full h-48">
            <Image
                src={article.image}
                alt={article.title}
                fill
                className="object-cover"
                data-ai-hint={article.hint}
            />
        </div>
        <CardContent className="p-4">
            <p className="text-sm text-muted-foreground mb-2">{article.date}</p>
            <h3 className="font-semibold mb-2 hover:text-primary transition-colors">
                <Link href="#">{article.title}</Link>
            </h3>
            <p className="text-sm text-accent font-semibold hover:underline">
                 <Link href="#">{article.category}</Link>
            </p>
        </CardContent>
    </Card>
)

const NewsSection = () => {
    const news = [
        { title: "Market Trends: What to Expect in 2025", date: "July 20, 2025", category: "Market Analysis", image: "https://picsum.photos/400/250?random=30", hint: "modern kitchen" },
        { title: "First-Time Homebuyer's Guide to Nairobi", date: "July 18, 2025", category: "Buyer Tips", image: "https://picsum.photos/400/250?random=31", hint: "living room" },
        { title: "The Rise of Green Homes in Kenya", date: "July 15, 2025", category: "Sustainability", image: "https://picsum.photos/400/250?random=32", hint: "house exterior" },
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
                    <form className="flex flex-col sm:flex-row gap-2">
                        <Input type="email" placeholder="Your Email" />
                        <Button variant="secondary">Subscribe</Button>
                    </form>
                </div>
                 <div>
                    <h3 className="font-semibold mb-2">Follow Us</h3>
                     <div className="flex space-x-4">
                        <Link href="#" className="text-muted-foreground hover:text-primary"><Facebook className="h-5 w-5" /></Link>
                        <Link href="#" className="text-muted-foreground hover:text-primary"><Twitter className="h-5 w-5" /></Link>
                        <Link href="#" className="text-muted-foreground hover:text-primary"><Instagram className="h-5 w-5" /></Link>
                    </div>
                </div>
            </div>
            <div className="mt-8 border-t pt-4 text-center text-sm text-muted-foreground">
                <p>&copy; 2025 NestHomes by SG-Nest. All rights reserved.</p>
            </div>
        </div>
    </footer>
);

export default function NestHomesPage() {
  const [properties, setProperties] = useState<Property[]>([]);

  useEffect(() => {
    // This fetch is now client-side, but ideally we'd pass initial data from a server component
    getProperties().then(setProperties);
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
