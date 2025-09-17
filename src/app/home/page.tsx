
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, CheckCircle, HomeIcon, LayoutGrid, MessageSquare, Plane, ShoppingCart, Store, Ticket, UtensilsCrossed, Wallet, BarChart, Tv, Newspaper, Radio, Sparkles, BedDouble, Rocket, ShieldCheck, Cpu } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const Header = () => (
  <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
    <div className="container flex h-14 items-center">
      <div className="mr-4 flex flex-1 items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
           <Image src="/images/dnlogo.png" alt="SG-Nest Logo" width={28} height={28} />
          <span className="font-bold text-lg">SG-Nest</span>
        </Link>
      </div>
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
        <ValuePropositionSection />
        <MerchantRevenueSection />
        <CommunitySection />
      </main>
      <Footer />
    </div>
  );
}

const HeroSection = () => (
    <section className="relative bg-gradient-to-r from-primary to-secondary text-white">
    <div className="container px-4 py-20 text-center">
      <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl text-white">
        Your Gateway to Kenya’s Digital Economy.
      </h1>
      <p className="mt-6 text-md md:text-lg max-w-3xl mx-auto">
        From shopping to housing, travel to events — powered by Standard Group + NestHub.
      </p>
      <div className="mt-10 flex flex-wrap justify-center gap-4">
        <Button size="lg" variant="outline" className="rounded-full bg-transparent border-white text-white hover:bg-white hover:text-primary">Explore Marketplace</Button>
        <Button size="lg" variant="outline" className="rounded-full bg-transparent border-white text-white hover:bg-white hover:text-primary">Book Travel</Button>
        <Button size="lg" variant="outline" className="rounded-full bg-transparent border-white text-white hover:bg-white hover:text-primary">Find Property</Button>
        <Button size="lg" variant="outline" className="rounded-full bg-transparent border-white text-white hover:bg-white hover:text-primary">Join Campfire</Button>
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
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                 {portals.map((portal) => (
                    <Card key={portal.title}>
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


const valueProps = [
  { icon: CheckCircle, text: "Trusted Brand – Decades of credibility." },
  { icon: CheckCircle, text: "Secure Payments – Escrow-protected." },
  { icon: CheckCircle, text: "Cross-Promotion Reach – Radio, TV, Print, Digital." },
  { icon: CheckCircle, text: "One Wallet, Many Services." },
  { icon: CheckCircle, text: "Local & Diaspora Ready." },
];

const ValuePropositionSection = () => (
  <section id="value-proposition" className="py-16 md:py-24">
    <div className="container px-4">
      <div className="text-center max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-primary">
          Why Choose SG Hub?
        </h2>
      </div>
      <div className="mt-12 max-w-2xl mx-auto">
        <ul className="space-y-4">
          {valueProps.map((prop, index) => (
            <li key={index} className="flex items-start gap-3">
               <prop.icon className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
               <span className="text-lg text-muted-foreground">{prop.text}</span>
            </li>
          ))}
        </ul>
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
                <div key={feature.title} className="flex items-center gap-4">
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
          <div className="space-y-2">
            <h3 className="text-xl font-semibold">🔥 Money Mondays</h3>
            <p className="text-muted-foreground">Finance Literacy</p>
          </div>
           <div className="space-y-2">
            <h3 className="text-xl font-semibold">🌱 Wellness Wednesdays</h3>
            <p className="text-muted-foreground">Mental Health</p>
          </div>
           <div className="space-y-2">
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
