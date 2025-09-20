
'use client';

import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { PropertyCard } from '@/components/modules/homes/property-card';
import { Property } from '@/lib/mock-data';
import Link from 'next/link';
import { SearchForm, SearchFilters } from '@/components/modules/homes/search-form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { List, Grid, HomeIcon, Building, Plane, Briefcase, LayoutGrid, Ticket, Facebook, Twitter, Instagram } from 'lucide-react';

interface AllPropertiesClientProps {
    initialProperties: Property[];
}

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
                <p>&copy; {new Date().getFullYear()} NestHomes by SG-Nest. All rights reserved.</p>
            </div>
        </div>
    </footer>
);

export function AllPropertiesClient({ initialProperties }: AllPropertiesClientProps) {
    const [properties, setProperties] = useState<Property[]>(initialProperties);
    const [currentPage, setCurrentPage] = useState(1);
    const [sortOrder, setSortOrder] = useState('relevance');
    const [layout, setLayout] = useState<'grid' | 'list'>('grid');
    const [filters, setFilters] = useState<SearchFilters>({
        type: 'all',
        keyword: '',
        location: 'all',
        beds: 'all',
        baths: 'all',
        minArea: '',
        propId: '',
    });
    const propertiesPerPage = 24;

    const handleFilterChange = (newFilters: Partial<SearchFilters>) => {
        setFilters(prev => ({...prev, ...newFilters}));
        setCurrentPage(1);
    }
    
    const filteredProperties = useMemo(() => {
        let filtered = properties;

        if (filters.type !== 'all') {
            const typeToFilter = filters.type === 'rent' ? 'For Rent' : 'For Sale';
            filtered = filtered.filter(p => p.type === typeToFilter);
        }

        if(filters.keyword) {
            filtered = filtered.filter(p => p.title.toLowerCase().includes(filters.keyword.toLowerCase()));
        }

        if(filters.location !== 'all') {
            filtered = filtered.filter(p => p.location.toLowerCase().includes(filters.location.toLowerCase()));
        }
        
        if (filters.beds !== 'all') {
            if (filters.beds === '4+') {
                 filtered = filtered.filter(p => p.beds >= 4);
            } else {
                 filtered = filtered.filter(p => p.beds === parseInt(filters.beds));
            }
        }
        
        if (filters.baths !== 'all') {
            if (filters.baths === '3+') {
                 filtered = filtered.filter(p => p.baths >= 3);
            } else {
                 filtered = filtered.filter(p => p.baths === parseInt(filters.baths));
            }
        }

        if(filters.minArea) {
            filtered = filtered.filter(p => p.area >= parseInt(filters.minArea));
        }
        
        if(filters.propId) {
            filtered = filtered.filter(p => p.id.toLowerCase().includes(filters.propId.toLowerCase()));
        }

        return filtered;

    }, [properties, filters]);

    const sortedProperties = useMemo(() => {
        return [...filteredProperties].sort((a, b) => {
            switch(sortOrder) {
                case 'price-asc':
                    return a.price - b.price;
                case 'price-desc':
                    return b.price - a.price;
                case 'date-desc':
                    // A simple date sort based on ID, assuming higher ID is newer
                    return parseInt(b.id.replace('prop', '')) - parseInt(a.id.replace('prop', ''));
                default:
                    return 0; // 'relevance'
            }
        });
    }, [filteredProperties, sortOrder]);


    const paginatedProperties = useMemo(() => {
        const startIndex = (currentPage - 1) * propertiesPerPage;
        return sortedProperties.slice(startIndex, startIndex + propertiesPerPage);
    }, [currentPage, sortedProperties, propertiesPerPage]);
    
    const totalPages = Math.ceil(sortedProperties.length / propertiesPerPage);

    return (
        <div className="flex flex-col min-h-screen bg-background">
            <Header />
            <main className="flex-1">
                 <section className="py-8 bg-secondary/10">
                    <div className="container">
                        <h1 className="text-4xl font-bold text-primary">All Properties</h1>
                        <p className="text-muted-foreground mt-2">Browse our full collection of premium properties.</p>
                    </div>
                </section>

                <section className="py-12">
                    <div className="container">
                         <div className="mb-8">
                            <SearchForm filters={filters} onFilterChange={handleFilterChange} />
                        </div>
                        
                        <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
                            <div className="text-sm text-muted-foreground">
                                Showing {paginatedProperties.length} of {sortedProperties.length} results
                            </div>
                            <div className="flex items-center gap-4">
                                <Select value={sortOrder} onValueChange={setSortOrder}>
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Sort by" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="relevance">Sort by Relevance</SelectItem>
                                        <SelectItem value="price-asc">Price: Low to High</SelectItem>
                                        <SelectItem value="price-desc">Price: High to Low</SelectItem>
                                        <SelectItem value="date-desc">Newest First</SelectItem>
                                    </SelectContent>
                                </Select>
                                 <div className="flex items-center gap-2">
                                    <Button variant={layout === 'grid' ? 'default' : 'outline'} size="icon" onClick={() => setLayout('grid')}>
                                        <Grid className="h-4 w-4" />
                                    </Button>
                                    <Button variant={layout === 'list' ? 'default' : 'outline'} size="icon" onClick={() => setLayout('list')}>
                                        <List className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </div>

                        <div className={`grid gap-6 ${layout === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4' : 'grid-cols-1'}`}>
                            {paginatedProperties.map((property) => (
                                <PropertyCard key={property.id} property={property} layout={layout} />
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
            </main>
            <Footer />
        </div>
    );
}
