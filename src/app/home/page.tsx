
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, CheckCircle, HomeIcon, LayoutGrid, MessageSquare, Plane, ShoppingCart, Store, Ticket, UtensilsCrossed, Wallet, BarChart, Tv, Newspaper, Radio, Sparkles, BedDouble, Rocket, ShieldCheck, Cpu, Menu, Flame } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const navLinks = [
  { href: "/modules/mall", icon: Store, text: "Duka Marketplace" },
  { href: "/modules/travel", icon: Plane, text: "Travel" },
  { href: "/modules/homes", icon: HomeIcon, text: "Properties" },
  { href: "/modules/campfire", icon: MessageSquare, text: "Join Campfire" },
  { href: "/modules/eats", icon: UtensilsCrossed, text: "Mama Africa" },
  { href: "/modules/events", icon: Ticket, text: "Events" },
];


const Header = () => (
  <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
    <div className="container flex h-14 items-center justify-between">
      <div className="flex items-center">
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden mr-2">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Toggle Menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col gap-4 mt-8">
                    {navLinks.map((link) => (
                        <Link key={link.text} href={link.href} className="flex items-center gap-3 text-lg font-medium text-muted-foreground hover:text-foreground">
                            <link.icon className="h-5 w-5" />
                            {link.text}
                        </Link>
                    ))}
                </nav>
            </SheetContent>
        </Sheet>
        <Link href="/" className="flex items-center space-x-2">
          <span className="font-bold text-lg">
            <span className="text-primary">SG-</span><span className="text-secondary">NEST</span>
          </span>
        </Link>
      </div>

       <nav className="hidden lg:flex items-center gap-4 text-sm font-medium">
         {navLinks.map((link) => (
            <Link key={link.text} href={link.href} className="flex items-center gap-1 text-muted-foreground transition-colors hover:text-foreground">
              <link.icon className="h-4 w-4" />
              {link.text}
            </Link>
          ))}
      </nav>

      <div className="flex items-center justify-end space-x-2">
         <Button variant="ghost" asChild>
            <Link href="/admin/login">Admin</Link>
        </Button>
        <Button>Login</Button>
      </div>
    </div>
  </header>
);

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <EcosystemPortals />
        <MerchantRevenueSection />
        <CommunitySection />
      </main>
      <Footer />
    </div>
  );
}

const HeroSection = () => (
    <section className="relative text-white h-[60vh] flex items-center justify-center">
      <Image
        src="/images/maasaimara.jpg"
        alt="Maasai Mara"
        fill
        className="object-cover"
        data-ai-hint="maasai mara sunset"
      />
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative container px-4 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl text-white">
          Your Gateway to Africa’s Digital Economy.
        </h1>
        <p className="mt-6 text-md md:text-lg max-w-3xl mx-auto">
          From shopping to housing, travel to events — powered by Standard Group Nest.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Button size="lg" variant="outline" className="rounded-full bg-transparent border-white text-white hover:bg-white hover:text-primary">Explore Marketplace</Button>
          <Button size="lg" variant="outline" className="rounded-full bg-transparent border-white text-white hover:bg-white hover:text-primary">Book Travel</Button>
          <Button size="lg" variant="outline" className="rounded-full bg-transparent border-white text-white hover:bg-white hover:text-primary">Find Property</Button>
          <Button size="lg" variant="outline" className="rounded-full bg-transparent border-white text-white hover:bg-white hover:text-primary">Join Campfire</Button>
          <Button size="lg" variant="outline" className="rounded-full bg-transparent border-white text-white hover:bg-white hover:text-primary">Mama Africa</Button>
          <Button size="lg" variant="outline" className="rounded-full bg-transparent border-white text-white hover:bg-white hover:text-primary">Events</Button>
        </div>
      </div>
  </section>
);

const portals = [
    { icon: Store, title: "NestMall", description: "Shop electronics, fashion, FMCG & wholesale." },
    { icon: HomeIcon, title: "NestHomes", description: "Buy, rent, or build affordable green homes." },
    { icon: Plane, title: "NestTravel", description: "Flights, SGR, buses, hotels, tours." },
    { icon: BedDouble, title: "NestStays", description: "Airbnb-style verified stays across Kenya." },
    { icon: Ticket, title: "NestEvents", description: "Tickets for concerts, expos & conferences." },
    { icon: UtensilsCrossed, title: "NestFoods", description: "Organic African recipes & food delivery." },
    { icon: MessageSquare, title: "Campfire", description: "Youth digital forum: careers, wellness, money." },
];

const EcosystemPortals = () => (
    <section className="py-16 md:py-24 bg-muted/30">
        <div className="container px-4">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-primary">One Hub, Endless Possibilities</h2>
            </div>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                 {portals.map((portal) => (
                    <Card key={portal.title} className="hover:shadow-xl transition-shadow">
                        <CardHeader className="flex flex-row items-center gap-4">
                            <portal.icon className="h-8 w-8 text-primary" />
                             <CardTitle className="!text-xl !text-foreground">{portal.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                             <p className="text-muted-foreground">{portal.description}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    </section>
);

const merchantFeatures = [
    { icon: LayoutGrid, title: "List products & services" },
    { icon: BarChart, title: "Access analytics & insights" },
    { icon: Wallet, title: "Accept Mpesa, Cards, Bank transfers" },
    { icon: Briefcase, title: "Logistics & courier integrations" },
    { icon: Radio, title: "Boost with SG media advertising" },
]

const MerchantRevenueSection = () => (
    <section className="py-16 md:py-24 bg-muted/30">
        <div className="container px-4">
            <div className="text-center max-w-3xl mx-auto">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-primary">
                    A Marketplace for Every Business.
                </h2>
            </div>
             <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {merchantFeatures.map((feature) => (
                <div key={feature.title} className="flex items-center gap-4 p-4 rounded-lg hover:bg-background transition-colors">
                    <feature.icon className="h-8 w-8 text-primary flex-shrink-0" />
                    <p className="text-lg font-medium">{feature.title}</p>
                </div>
                ))}
            </div>
            <div className="mt-12 text-center">
                 <Button size="lg">Become a Merchant – Join Now</Button>
            </div>
        </div>
    </section>
);


const CommunitySection = () => (
  <section className="py-16 md:py-24">
    <div className="container text-center max-w-4xl mx-auto px-4">
      <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-primary">
        Campfire by Standard Group.
      </h2>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-2 p-4 rounded-lg hover:bg-muted/50 transition-colors">
            <h3 className="text-xl font-semibold">🔥 Money Mondays</h3>
            <p className="text-muted-foreground">Finance Literacy</p>
          </div>
           <div className="space-y-2 p-4 rounded-lg hover:bg-muted/50 transition-colors">
            <h3 className="text-xl font-semibold">🌱 Wellness Wednesdays</h3>
            <p className="text-muted-foreground">Mental Health</p>
          </div>
           <div className="space-y-2 p-4 rounded-lg hover:bg-muted/50 transition-colors">
            <h3 className="text-xl font-semibold">🚀 Hustle Fridays</h3>
            <p className="text-muted-foreground">Jobs & Entrepreneurship</p>
          </div>
      </div>
      <p className="mt-8 text-lg font-semibold text-accent flex items-center justify-center gap-2">
        <Sparkles className="h-5 w-5" />
        Earn Sparks loyalty points & redeem across SG Hub.
      </p>
    </div>
  </section>
);

const Footer = () => (
  <footer className="border-t bg-gray-900 text-gray-300">
    <div className="container flex flex-col items-center justify-between gap-4 py-8 md:flex-row">
      <div className="flex items-center gap-2">
        <p className="text-sm">
          © {new Date().getFullYear()} Standard Group x NestHub | All Rights Reserved.
        </p>
      </div>
       <div className="flex gap-4">
          <Link href="#" className="text-sm hover:underline">About</Link>
          <Link href="#" className="text-sm hover:underline">Merchant Sign-up</Link>
          <Link href="#" className="text-sm hover:underline">Contact</Link>
      </div>
    </div>
  </footer>
);
