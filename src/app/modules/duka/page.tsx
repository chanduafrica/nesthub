
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { getDukaProducts, getDukaShops } from "@/lib/firebase-services";
import { DukaProduct, DukaShop } from "@/lib/mock-data";
import { Barcode, ChevronRight, History, Home, ListFilter, Percent, PlusCircle, Search, ShoppingCart, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

async function Header() {
    return (
        <header className="sticky top-0 z-40 w-full border-b bg-background">
            <div className="container flex h-16 items-center">
                <Link href="/modules/duka" className="mr-6 flex items-center space-x-2">
                    <Barcode className="h-6 w-6 text-primary" />
                    <span className="font-bold text-lg">NestDuka</span>
                </Link>
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search for products or shops..." className="pl-10" />
                </div>
                <nav className="ml-6 flex items-center space-x-4">
                    <Button variant="ghost">Shop by Category</Button>
                    <Button variant="ghost" asChild><Link href="#">My Orders</Link></Button>
                </nav>
                 <div className="ml-auto flex items-center gap-4">
                    <Button variant="ghost" size="icon"><ShoppingCart className="h-5 w-5" /></Button>
                    <Button variant="ghost" size="icon"><User className="h-5 w-5" /></Button>
                </div>
            </div>
        </header>
    )
}

async function ShopCard({ shop }: { shop: DukaShop }) {
    return (
        <Card className="overflow-hidden">
            <div className="relative h-24 w-full">
                <Image src={shop.bannerImage} alt={shop.name} fill className="object-cover" />
            </div>
            <CardContent className="p-4">
                <div className="flex items-start gap-4">
                    <Image src={shop.logo} alt={`${shop.name} logo`} width={48} height={48} className="rounded-md border" />
                    <div>
                        <h3 className="font-semibold">{shop.name}</h3>
                        <p className="text-xs text-muted-foreground">{shop.category}</p>
                        <p className="text-xs text-muted-foreground">{shop.deliveryTime} delivery</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

async function ProductCard({ product }: { product: DukaProduct }) {
    return (
        <Card className="overflow-hidden">
            <div className="relative h-32 w-full">
                <Image src={product.images[0]} alt={product.name} fill className="object-cover" />
            </div>
            <CardContent className="p-3">
                <h4 className="font-semibold text-sm truncate">{product.name}</h4>
                <p className="text-xs text-muted-foreground">{product.unitSize}</p>
                <div className="mt-2 flex items-baseline justify-between">
                    <p className="font-bold text-primary">KES {product.price.toLocaleString()}</p>
                    <Button size="icon" className="h-8 w-8"><PlusCircle className="h-4 w-4" /></Button>
                </div>
            </CardContent>
        </Card>
    );
}


export default async function DukaHomePage() {
    const shops = await getDukaShops();
    const products = await getDukaProducts();

    const featuredShops = shops.slice(0, 5);
    const recentProducts = products.slice(0, 8);

    return (
        <div className="bg-muted/30 min-h-screen">
            <Header />
            <main className="container py-8">
                <Card className="mb-8">
                    <CardHeader>
                        <CardTitle>Good Evening, Jane 👋</CardTitle>
                        <CardDescription>Restock your daily essentials with ease.</CardDescription>
                    </CardHeader>
                </Card>

                <section className="mb-8">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold">Your Quick Re-order</h2>
                        <Button variant="ghost">View Past Orders <History className="ml-2 h-4 w-4" /></Button>
                    </div>
                     <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {recentProducts.slice(0, 4).map(product => <ProductCard key={product.id} product={product} />)}
                    </div>
                </section>
                
                <section className="mb-8">
                    <h2 className="text-xl font-bold mb-4">Featured Shops</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                        {featuredShops.map(shop => <ShopCard key={shop.id} shop={shop} />)}
                    </div>
                </section>
                
                 <section>
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold">Shop by Category</h2>
                        <Button variant="ghost">View All Categories <ChevronRight className="ml-2 h-4 w-4" /></Button>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
                        {["Beverages", "Snacks", "Fresh Food", "Cleaning", "Personal Care", "Cooking"].map(cat => (
                            <Card key={cat} className="p-4 text-center hover:shadow-md cursor-pointer">
                                <p className="font-semibold text-sm">{cat}</p>
                            </Card>
                        ))}
                    </div>
                </section>

            </main>
        </div>
    )
}

    