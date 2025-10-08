
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { DukaProduct, DukaShop } from "@/lib/mock-data";
import { Barcode, ChevronRight, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ProductCard } from "@/components/modules/duka/product-card";

interface DukaClientPageProps {
    initialProducts: DukaProduct[];
    initialShops: DukaShop[];
}

function Header() {
    return (
        <header className="sticky top-0 z-40 w-full border-b bg-background">
            <div className="container flex h-16 items-center">
                <Link href="/modules/duka" className="mr-6 flex items-center space-x-2">
                    <Barcode className="h-6 w-6 text-primary" />
                    <span className="font-bold text-lg">NestDuka</span>
                </Link>
                <div className="relative flex-1 hidden md:block">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search for groceries, shops..." className="pl-10" />
                </div>
                <nav className="ml-6 flex items-center space-x-4">
                    <Button variant="ghost" asChild><Link href="#">My Orders</Link></Button>
                    <Button>Login</Button>
                </nav>
                 <div className="ml-auto flex items-center gap-4 md:hidden">
                    <Button variant="ghost" size="icon"><Search className="h-5 w-5" /></Button>
                </div>
            </div>
        </header>
    )
}

function HeroSection() {
    return (
        <section className="py-12 bg-muted/30">
            <div className="container">
                <h1 className="text-3xl font-bold">Good Evening, Jane 👋</h1>
                <p className="text-muted-foreground">Restock your daily essentials with ease.</p>
            </div>
        </section>
    )
}

function ShopsSection({ shops }: { shops: DukaShop[] }) {
    return (
        <section className="py-12">
             <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Featured Shops</h2>
                <Button variant="ghost" asChild>
                    <Link href="#">View All <ChevronRight className="ml-2 h-4 w-4" /></Link>
                </Button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                {shops.map(shop => (
                    <Card key={shop.id} className="hover:shadow-lg transition-shadow">
                        <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                            <div className="relative w-20 h-20 mb-2">
                                <Image src={shop.logo} alt={shop.name} fill className="object-contain" />
                            </div>
                            <h4 className="font-semibold text-sm">{shop.name}</h4>
                            <p className="text-xs text-muted-foreground">{shop.category}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </section>
    );
}

function QuickReorderSection({ products }: { products: DukaProduct[] }) {
    return (
        <section className="py-8 bg-muted/30">
            <div className="container">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold">Quick Re-order</h2>
                </div>
                 <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {products.slice(0, 5).map((product) => (
                       <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </section>
    )
}


export function DukaClientPage({ initialProducts, initialShops }: DukaClientPageProps) {
    return (
        <div className="bg-background min-h-screen">
            <Header />
            <main>
                <HeroSection />
                <div className="container">
                    <ShopsSection shops={initialShops} />
                </div>
                <QuickReorderSection products={initialProducts} />
            </main>
        </div>
    )
}
