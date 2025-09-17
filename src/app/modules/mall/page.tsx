
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Car, ChevronsRight, Home, LayoutGrid, Award, Briefcase, HandCoins, Package, Percent, Phone, Rocket, Search, ShoppingBag, Store, Tag, Users, Wallet, Warehouse, Zap } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const Header = () => (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
            <div className="mr-4 hidden md:flex">
                <Link href="/modules/mall" className="mr-6 flex items-center space-x-2">
                    <Store className="h-6 w-6 text-primary" />
                    <span className="font-bold text-lg">NestMall</span>
                </Link>
                <nav className="flex items-center space-x-6 text-sm font-medium">
                    <Link href="#" className="text-foreground/60 transition-colors hover:text-foreground/80">Shop All</Link>
                    <Link href="#" className="text-foreground/60 transition-colors hover:text-foreground/80">Categories</Link>
                    <Link href="#" className="text-foreground/60 transition-colors hover:text-foreground/80">Wholesale Hub</Link>
                    <Link href="#" className="text-foreground/60 transition-colors hover:text-foreground/80">Become a Vendor</Link>
                    <Link href="#" className="text-foreground/60 transition-colors hover:text-foreground/80">My Orders</Link>
                    <Link href="/" className="text-foreground/60 transition-colors hover:text-foreground/80">SG-Nest</Link>
                </nav>
            </div>
            <div className="flex flex-1 items-center justify-end">
                <Button>Login / Sign Up</Button>
            </div>
        </div>
    </header>
);

const HeroSection = () => (
    <section className="relative h-[60vh] flex items-center justify-center text-white">
        <Image
            src="https://picsum.photos/1600/900?random=40"
            alt="Shoppers in a modern African market"
            fill
            className="object-cover brightness-50"
            data-ai-hint="african shoppers market"
        />
        <div className="relative z-10 container text-center flex flex-col items-center px-4">
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
                Africa’s Digital Mall — Shop, Sell & Grow
            </h1>
            <p className="mt-6 text-lg max-w-3xl mx-auto">
                From electronics to clothing to fresh produce — NestMall connects buyers and sellers with trust, convenience, and scale.
            </p>
            <Card className="mt-8 w-full max-w-2xl bg-white/20 backdrop-blur-sm border-white/30">
                <CardContent className="p-4">
                    <div className="flex flex-col md:flex-row gap-2">
                        <Input placeholder="Search for products or vendors..." className="bg-white/90 text-foreground" />
                        <Select defaultValue="products">
                            <SelectTrigger className="w-full md:w-[180px] bg-white/90 text-foreground border-white/30">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="products">Products</SelectItem>
                                <SelectItem value="wholesale">Wholesale</SelectItem>
                                <SelectItem value="vendors">Vendors</SelectItem>
                            </SelectContent>
                        </Select>
                        <Button className="w-full md:w-auto"><Search className="mr-2 h-4 w-4"/>Search</Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    </section>
);

const coreFeatures = [
    { icon: Store, title: "Multi-Vendor Stores", description: "Sell under your own shop brand with a dedicated storefront." },
    { icon: Warehouse, title: "Bulk & Wholesale Pricing", description: "Buy for resale at discounted rates from verified suppliers." },
    { icon: Phone, title: "Vendor POS", description: "Empower your offline sellers with a digital checkout system." },
    { icon: Package, title: "Logistics Integration", description: "Smart courier tracking and real-time delivery updates." },
    { icon: Award, title: "Loyalty Rewards", description: "Earn points, get discounts, and enjoy exclusive buyer incentives." },
    { icon: Wallet, title: "Secure Payments", description: "M-Pesa, Bank, and Card payments with Escrow protection." },
];

const CoreFeaturesSection = () => (
    <section id="features" className="py-16 md:py-24 bg-muted/50">
        <div className="container">
            <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {coreFeatures.map((prop) => (
                    <Card key={prop.title} className="text-center border-none shadow-none bg-transparent">
                        <CardHeader className="items-center">
                            <div className="p-4 bg-primary/10 rounded-full">
                                <prop.icon className="h-8 w-8 text-primary" />
                            </div>
                            <CardTitle className="mt-4 !text-xl !text-foreground">{prop.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">{prop.description}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    </section>
);

const categories = [
  { slug: "auto", icon: Car, title: "Buy My Car", description: "New & used vehicles, financing." },
  { slug: "electronics", icon: Zap, title: "Electronics", description: "Phones, laptops, gadgets." },
  { slug: "fashion", icon: ShoppingBag, title: "Clothing & Fashion", description: "African & global brands." },
  { slug: "accessories", icon: Tag, title: "Shoes & Accessories", description: "Footwear, bags, jewelry." },
  { slug: "groceries", icon: Home, title: "Groceries & FMCG", description: "Fresh produce, subscriptions." },
  { slug: "made-in-africa", icon: LayoutGrid, title: "Made in Africa", description: "Local crafts, national pride." },
];

const CategoriesSection = () => (
  <section id="categories" className="py-16 md:py-24">
    <div className="container">
      <div className="text-center max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-primary">
          Shop from a World of Choices
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
            Explore our vast selection of categories, tailored for the African market.
        </p>
      </div>
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((mod) => (
          <Link href={`/modules/mall/categories/${mod.slug}`} key={mod.slug} className="no-underline">
            <Card className="flex flex-col h-full hover:shadow-xl transition-shadow group">
                <CardContent className="p-6 flex items-center gap-4">
                  <mod.icon className="h-10 w-10 text-primary" />
                  <div>
                    <CardTitle className="text-xl group-hover:text-accent transition-colors !text-foreground">{mod.title}</CardTitle>
                     <p className="text-muted-foreground text-sm">{mod.description}</p>
                  </div>
                </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  </section>
);

const VendorJourneySection = () => (
    <section className="py-16 md:py-24 bg-primary/5">
        <div className="container">
            <div className="text-center max-w-3xl mx-auto">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-primary">
                    Open Your Digital Store Today
                </h2>
                <p className="mt-4 text-lg text-muted-foreground">
                    Join thousands of vendors and start selling to a continent of buyers in just a few simple steps.
                </p>
            </div>

            <div className="mt-12 grid md:grid-cols-3 gap-8 text-center">
                <div className="flex flex-col items-center">
                    <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary text-primary-foreground font-bold text-2xl">1</div>
                    <h3 className="mt-4 text-xl font-semibold">Sign Up & Onboard</h3>
                    <p className="mt-2 text-muted-foreground">Create your account and complete our simple KYC verification.</p>
                </div>
                <div className="flex flex-col items-center">
                    <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary text-primary-foreground font-bold text-2xl">2</div>
                    <h3 className="mt-4 text-xl font-semibold">Upload Products</h3>
                    <p className="mt-2 text-muted-foreground">Easily add your products, set prices, and manage inventory.</p>
                </div>
                <div className="flex flex-col items-center">
                    <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary text-primary-foreground font-bold text-2xl">3</div>
                    <h3 className="mt-4 text-xl font-semibold">Sell & Get Paid</h3>
                    <p className="mt-2 text-muted-foreground">Receive orders, track sales, and get fast payouts via mobile money.</p>
                </div>
            </div>
             <div className="text-center mt-12">
                <Button size="lg">Become a Vendor <ChevronsRight className="ml-2 h-5 w-5"/></Button>
            </div>
        </div>
    </section>
);


const TrustSection = () => (
    <section className="py-16 md:py-24">
        <div className="container grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
             <div>
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-primary">
                    Shop with Confidence.
                </h2>
                 <p className="mt-4 text-lg text-muted-foreground">
                    Your security and trust are our top priorities. We've built a marketplace with features designed to protect every transaction.
                </p>
                 <ul className="mt-6 space-y-4">
                    <li className="flex items-start gap-3">
                        <Users className="h-6 w-6 text-primary mt-1" />
                        <div>
                            <h4 className="font-semibold">Verified Vendors</h4>
                            <p className="text-muted-foreground text-sm">All sellers undergo a strict KYC process to ensure authenticity.</p>
                        </div>
                    </li>
                     <li className="flex items-start gap-3">
                        <Award className="h-6 w-6 text-primary mt-1" />
                        <div>
                            <h4 className="font-semibold">Ratings & Reviews</h4>
                            <p className="text-muted-foreground text-sm">Make informed decisions with transparent feedback from other buyers.</p>
                        </div>
                    </li>
                     <li className="flex items-start gap-3">
                        <HandCoins className="h-6 w-6 text-primary mt-1" />
                        <div>
                            <h4 className="font-semibold">Escrow & BNPL Protection</h4>
                            <p className="text-muted-foreground text-sm">Payments are held securely until you confirm your order, with options to Buy Now, Pay Later.</p>
                        </div>
                    </li>
                </ul>
            </div>
            <div className="relative w-full aspect-square md:aspect-auto md:h-full">
                 <Image
                    src="https://picsum.photos/600/500?random=41"
                    alt="Secure online shopping"
                    fill
                    className="rounded-lg shadow-xl object-cover"
                    data-ai-hint="secure online payment"
                />
            </div>
        </div>
    </section>
);

const CtaSection = () => (
    <section className="py-16 md:py-24 bg-primary text-primary-foreground">
      <div className="container text-center max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-white">
          From Nairobi to Lagos, NestMall is building Africa’s largest digital marketplace. Be part of the movement.
        </h2>
        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
          <Button size="lg" variant="secondary">
            Shop Now
          </Button>
          <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-primary">
            Become a Vendor
          </Button>
        </div>
      </div>
    </section>
  );

export default function NestMallPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <CoreFeaturesSection />
        <CategoriesSection />
        <VendorJourneySection />
        <TrustSection />
        <CtaSection />
      </main>
    </div>
  );
}
