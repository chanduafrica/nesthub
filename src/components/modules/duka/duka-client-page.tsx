
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { DukaProduct, DukaShop } from "@/lib/mock-data";
import { ChevronRight, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ProductCard } from "@/components/modules/duka/product-card";
import { SearchDuka } from "./search-duka";
import { CustomerLoginPopup, CustomerRegisterPopup } from "@/components/auth/customer-auth-dialogs";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";


interface DukaClientPageProps {
    initialProducts: DukaProduct[];
    initialShops: DukaShop[];
}

function Header() {
    const router = useRouter();

    const handleLoginAndRedirect = () => {
        // In a real app, you'd check for authentication status
        // For now, we'll just redirect to the customer dashboard
        router.push('/customer/dashboard');
    }

    return (
        <header className="sticky top-0 z-40 w-full border-b bg-background">
            <div className="w-[94%] mx-auto flex h-16 items-center">
                <Link href="/modules/duka" className="mr-6 flex items-center space-x-2">
                    <span className="font-bold text-lg">
                        <span className="text-primary">Nest</span><span className="text-secondary">Duka</span>
                    </span>
                </Link>
                <div className="relative flex-1 hidden md:block">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search for groceries, shops..." className="pl-10" />
                </div>
                <nav className="ml-6 flex items-center space-x-4">
                    <Button variant="ghost" asChild>
                        <Link href="/home">SG-Nest</Link>
                    </Button>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="ghost">My Orders</Button>
                        </DialogTrigger>
                        <CustomerLoginPopup onLoginSuccess={() => router.push('/customer/dashboard#orders')} />
                    </Dialog>
                     <Dialog>
                        <DialogTrigger asChild>
                            <Button>Login / Sign Up</Button>
                        </DialogTrigger>
                        <CustomerLoginPopup onLoginSuccess={() => router.push('/modules/duka/dashboard')} />
                    </Dialog>
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
        <section className="relative h-[40vh] flex items-center justify-center text-white">
             <Image
                src="https://picsum.photos/seed/dukahero4/1600/600"
                alt="Fresh groceries"
                fill
                className="object-cover brightness-50"
                data-ai-hint="fresh groceries"
            />
            <div className="relative z-10 w-[94%] mx-auto text-center px-4">
                <h1 className="text-4xl md:text-5xl font-bold text-white">Your Daily Essentials, Delivered.</h1>
                <p className="mt-4 text-lg max-w-2xl mx-auto">
                    Restock your pantry with ease from local shops and supermarkets.
                </p>
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

function BrandsSection({ shops }: { shops: DukaShop[] }) {
    // Using shops as a proxy for brands for now
    return (
        <section className="py-12">
             <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Shop by Brands</h2>
                <Button variant="ghost" asChild>
                    <Link href="#">View All <ChevronRight className="ml-2 h-4 w-4" /></Link>
                </Button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                {shops.slice(0,5).map(shop => (
                    <Card key={shop.id} className="hover:shadow-lg transition-shadow">
                        <CardContent className="p-4 flex flex-col items-center justify-center text-center h-24">
                            <div className="relative w-24 h-16">
                                <Image src={shop.logo} alt={shop.name} fill className="object-contain" />
                            </div>
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
            <div className="w-[94%] mx-auto">
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

function MostPopularSection({ products }: { products: DukaProduct[] }) {
    return (
        <section className="py-12">
            <div className="w-[94%] mx-auto">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold">Most Popular</h2>
                     <Button variant="ghost" asChild>
                        <Link href="#">View All <ChevronRight className="ml-2 h-4 w-4" /></Link>
                    </Button>
                </div>
                 <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {products.slice(0, 10).map((product) => (
                       <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </section>
    )
}

function Footer() {
    const footerLinks = [
        { href: "#", text: "Privacy hub" },
        { href: "#", text: "Privacy policy" },
        { href: "#", text: "Terms & Conditions" },
        { href: "#", text: "Payment Terms" },
        { href: "#", text: "Corporate & Bulk Purchases" },
    ];
    return (
        <footer className="border-t bg-gray-100 dark:bg-gray-800">
            <div className="w-[94%] mx-auto py-8">
                <div className="grid md:grid-cols-2 gap-8">
                    <div>
                        <h3 className="font-bold text-lg mb-2">Shop with Confidence</h3>
                        <p className="text-muted-foreground text-sm">
                            Powered by SG-Nest, NestDuka provides secure payments, verified sellers, and reliable delivery.
                        </p>
                    </div>
                     <div>
                        <h3 className="font-bold text-lg mb-2">Sparks Card</h3>
                         <p className="text-muted-foreground text-sm">
                            Earn and redeem loyalty points on every purchase with your Sparks Card.
                        </p>
                    </div>
                </div>
                <div className="mt-8 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4">
                    <nav className="flex flex-wrap gap-x-4 gap-y-2 justify-center">
                        {footerLinks.map(link => (
                            <Link key={link.text} href={link.href} className="text-sm text-muted-foreground hover:text-primary">
                                {link.text}
                            </Link>
                        ))}
                    </nav>
                    <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} NestDuka by SG-Nest</p>
                </div>
            </div>
        </footer>
    )
}

export function DukaClientPage({ initialProducts, initialShops }: DukaClientPageProps) {
    return (
        <div className="bg-background min-h-screen">
            <Header />
            <main>
                <HeroSection />
                <div className="w-[94%] mx-auto">
                    <ShopsSection shops={initialShops} />
                </div>
                <QuickReorderSection products={initialProducts} />
                <MostPopularSection products={initialProducts} />
                 <div className="w-[94%] mx-auto">
                    <BrandsSection shops={initialShops} />
                </div>
            </main>
            <Footer />
            <SearchDuka allProducts={initialProducts} />
        </div>
    )
}

    