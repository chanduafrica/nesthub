
'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { ProductCard } from '@/components/modules/mall/product-card';
import { 
    Store, 
    Search,
    List,
    Grid,
    Filter,
    ShoppingCart
} from 'lucide-react';

const mockProducts = [
  { id: '1', slug: 'samsung-galaxy-s24', image: '/mall/s24-1.jpg', title: "Samsung Galaxy S24 - 256GB", vendor: "Kariuki's Electronics", rating: 4.5, price: 120000, category: "Electronics" },
  { id: '2', slug: 'ankara-print-dress', image: 'https://picsum.photos/300/300?random=60', title: "Ankara Print High-Low Dress", vendor: "Mama Pendo's Fashion", rating: 4.8, price: 4500, discountPrice: 3500, category: "Fashion" },
  { id: '3', slug: 'leather-sofa-set', image: 'https://picsum.photos/300/300?random=61', title: "Modern Leather Sofa Set", vendor: "Nyumbani Furnishings", rating: 4.7, price: 85000, category: "Home & Living" },
  { id: '4', slug: 'fresh-organic-veggie-box', image: 'https://picsum.photos/300/300?random=62', title: "Fresh Organic Veggie Box", vendor: "Shamba Fresh", rating: 4.9, price: 2500, category: "Groceries" },
  { id: '5', slug: 'super-fly-sneakers', image: 'https://picsum.photos/300/300?random=63', title: "Super-fly Air Sneakers", vendor: "Street Style Kicks", rating: 4.6, price: 5500, category: "Fashion" },
  { id: '6', slug: 'galaxy-watch-6', image: "https://picsum.photos/300/300?random=50", title: "Galaxy Watch 6", category: "Electronics", price: 35000, vendor: "Kariuki's Electronics", rating: 4.7 },
  { id: '7', slug: 'galaxy-buds-pro-2', image: "https://picsum.photos/300/300?random=51", title: "Galaxy Buds Pro 2", category: "Electronics", price: 22000, vendor: "Kariuki's Electronics", rating: 4.6 },
  { id: '8', slug: 'anker-power-bank', image: "https://picsum.photos/300/300?random=52", title: "Anker Power Bank", category: "Electronics", price: 8000, vendor: "Gadget World", rating: 4.8 },
  { id: '9', slug: 'iphone-15-pro', image: "https://picsum.photos/300/300?random=53", title: "iPhone 15 Pro", category: "Electronics", price: 150000, vendor: "Apple Authorized Reseller", rating: 4.9 },
  { id: '10', slug: 'coffee-table', image: 'https://picsum.photos/300/300?random=64', title: "Acacia Wood Coffee Table", vendor: "Nyumbani Furnishings", rating: 4.8, price: 12500, category: "Home & Living" },
  { id: '11', slug: 'sports-jacket', image: 'https://picsum.photos/300/300?random=65', title: "Men's Sports Jacket", vendor: "Active Wear", rating: 4.4, price: 6000, category: "Fashion" },
  { id: '12', slug: 'blender', image: 'https://picsum.photos/300/300?random=66', title: "High-Speed Blender", vendor: "Kitchen Essentials", rating: 4.7, price: 9500, category: "Home & Living" },
];

const Header = () => (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
            <div className="mr-4 hidden md:flex">
                <Link href="/modules/mall" className="mr-6 flex items-center space-x-2">
                    <Store className="h-6 w-6 text-primary" />
                    <span className="font-bold text-lg">NestMall</span>
                </Link>
                <nav className="flex items-center space-x-6 text-sm font-medium">
                    <Link href="/modules/mall/shop" className="text-foreground/90">Shop All</Link>
                    <Link href="#" className="text-foreground/60 transition-colors hover:text-foreground/80">Categories</Link>
                    <Link href="#" className="text-foreground/60 transition-colors hover:text-foreground/80">Wholesale Hub</Link>
                    <Link href="#" className="text-foreground/60 transition-colors hover:text-foreground/80">Become a Vendor</Link>
                    <Link href="#" className="text-foreground/60 transition-colors hover:text-foreground/80">My Orders</Link>
                    <Link href="/" className="text-foreground/60 transition-colors hover:text-foreground/80">SG-Nest</Link>
                </nav>
            </div>
            <div className="flex flex-1 items-center justify-end space-x-4">
                 <Button variant="ghost" size="icon">
                    <ShoppingCart className="h-5 w-5" />
                    <span className="sr-only">Cart</span>
                </Button>
                <Button>Login / Sign Up</Button>
            </div>
        </div>
    </header>
);

const FiltersSidebar = () => {
    const [priceRange, setPriceRange] = useState([500, 50000]);

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg"><Filter className="h-5 w-5"/> Filters</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                 <div className="space-y-3">
                    <Label className="font-semibold">Categories</Label>
                    <div className="space-y-2">
                        {['Electronics', 'Fashion', 'Home & Living', 'Groceries', 'Auto Parts'].map(cat => (
                             <div key={cat} className="flex items-center space-x-2">
                                <Checkbox id={`cat-${cat}`} />
                                <label htmlFor={`cat-${cat}`} className="text-sm">{cat}</label>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="space-y-2">
                    <Label className="font-semibold">Price Range (KES)</Label>
                    <Slider
                        value={priceRange}
                        onValueChange={setPriceRange}
                        max={150000}
                        step={500}
                    />
                    <div className="flex justify-between text-sm text-muted-foreground">
                        <span>{priceRange[0].toLocaleString()}</span>
                         <span>{priceRange[1].toLocaleString()}</span>
                    </div>
                </div>

                <div className="space-y-3">
                    <Label className="font-semibold">Vendors</Label>
                    <div className="space-y-2">
                        {["Kariuki's Electronics", "Mama Pendo's Fashion", "Nyumbani Furnishings", "Shamba Fresh"].map(v => (
                             <div key={v} className="flex items-center space-x-2">
                                <Checkbox id={`v-${v}`} />
                                <label htmlFor={`v-${v}`} className="text-sm truncate">{v}</label>
                            </div>
                        ))}
                    </div>
                </div>
                
                <Button className="w-full">Apply Filters</Button>
            </CardContent>
        </Card>
    )
}

export default function ShopAllPage() {
    const [layout, setLayout] = useState<'grid' | 'list'>('grid');

    return (
        <div className="flex flex-col min-h-screen bg-muted/20">
            <Header />
            <main className="container py-8">
                <div className="mb-6">
                    <Card className="bg-primary/10 border-primary/20">
                       <CardContent className="p-6 text-center">
                            <h2 className="text-2xl font-bold text-primary">Back-to-School Deals!</h2>
                            <p className="text-muted-foreground">Get up to 20% off on electronics and stationery.</p>
                       </CardContent>
                    </Card>
                </div>

                <div className="grid lg:grid-cols-4 gap-8">
                    <aside className="lg:col-span-1">
                        <div className="sticky top-20">
                           <FiltersSidebar />
                        </div>
                    </aside>
                    <section className="lg:col-span-3">
                        <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
                            <p className="text-sm text-muted-foreground">
                                Showing {mockProducts.length} products
                            </p>
                            <div className="flex items-center gap-4">
                                <Select defaultValue="newest">
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Sort by" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="newest">Newest</SelectItem>
                                        <SelectItem value="price-asc">Price: Low to High</SelectItem>
                                        <SelectItem value="price-desc">Price: High to Low</SelectItem>
                                        <SelectItem value="rating">Highest Rated</SelectItem>
                                    </SelectContent>
                                </Select>
                                 <div className="flex items-center gap-1 p-1 rounded-md border bg-background">
                                    <Button variant={layout === 'grid' ? 'secondary' : 'ghost'} size="icon" onClick={() => setLayout('grid')} className="h-8 w-8">
                                        <Grid className="h-4 w-4" />
                                    </Button>
                                    <Button variant={layout === 'list' ? 'secondary' : 'ghost'} size="icon" onClick={() => setLayout('list')} className="h-8 w-8">
                                        <List className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </div>

                        <div className={`grid gap-6 ${layout === 'grid' ? 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'}`}>
                            {mockProducts.map((product) => (
                                <ProductCard key={product.id} product={product} layout={layout} />
                            ))}
                        </div>

                         <div className="flex justify-center mt-8">
                            <Button variant="outline">Load More Products</Button>
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
}

    