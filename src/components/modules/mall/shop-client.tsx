
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { ProductCard } from '@/components/modules/mall/product-card';
import { 
    Store, 
    List,
    Grid,
    Filter,
    ShoppingCart
} from 'lucide-react';
import { Product } from '@/lib/mock-data';

interface ShopClientProps {
    initialProducts: Product[];
}

const Header = () => (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="w-[94%] mx-auto flex h-14 items-center">
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

export function ShopClient({ initialProducts }: ShopClientProps) {
    const [layout, setLayout] = useState<'grid' | 'list'>('grid');

    return (
        <div className="flex flex-col min-h-screen bg-muted/20">
            <Header />
            <main>
                <div className="w-[94%] mx-auto py-8">
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
                                    Showing {initialProducts.length} products
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
                                {initialProducts.map((product) => (
                                    <ProductCard key={product.id} product={product} layout={layout} />
                                ))}
                            </div>

                             <div className="flex justify-center mt-8">
                                <Button variant="outline">Load More Products</Button>
                            </div>
                        </section>
                    </div>
                </div>
            </main>
        </div>
    );
}
