
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Briefcase, Cpu, Database, DollarSign, Globe, HomeIcon, LayoutGrid, MessageSquare, Package, Plane, PlayCircle, Rocket, ShieldCheck, ShoppingCart, Store, Ticket, UserCog, UtensilsCrossed } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const Header = () => (
  <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
    <div className="container flex h-14 items-center">
      <div className="mr-4 hidden md:flex">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <span className="font-bold text-lg">DigitalNest</span>
        </Link>
        <nav className="flex items-center space-x-6 text-sm font-medium">
          <Link href="#modules" className="flex items-center gap-2 text-foreground/60 transition-colors hover:text-foreground/80"><LayoutGrid className="h-4 w-4" />Modules</Link>
          <Link href="#value-proposition" className="flex items-center gap-2 text-foreground/60 transition-colors hover:text-foreground/80"><Rocket className="h-4 w-4" />Value Proposition</Link>
          <Link href="/admin/login" className="flex items-center gap-2 text-foreground/60 transition-colors hover:text-foreground/80"><UserCog className="h-4 w-4" />Admin</Link>
        </nav>
      </div>
      <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
        <Button>Request a Demo</Button>
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
        <IntroductionSection />
        <ValuePropositionSection />
        <CoreModulesSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}

const HeroSection = () => (
    <section className="relative h-[80vh] md:h-[60vh] flex items-center justify-center text-white">
    <Image
      src="/images/homepagebg.jpg"
      alt="DigitalNest platform background"
      fill
      className="object-cover"
      data-ai-hint="abstract background"
    />
    <div className="absolute inset-0 bg-black/50" />
    <div className="relative z-10 container text-center flex flex-col items-center px-4">
       <div className="relative w-48 h-48 md:w-72 md:h-72 mb-8">
         <Image src="/images/dnlogo.png" alt="DigitalNest Logo" fill className="object-contain" />
       </div>
      <h1 className="text-3xl font-bold tracking-tight sm:text-5xl md:text-6xl text-white">
        Africa’s Engine for Marketplaces & Digital Platforms
      </h1>
      <p className="mt-6 text-md md:text-lg text-gray-200 max-w-3xl mx-auto">
        We empower organizations to launch their own marketplaces and digital platforms within weeks.
      </p>
      <div className="mt-10">
        <Button size="lg">
          Request a Demo
        </Button>
      </div>
    </div>
  </section>
);


const IntroductionSection = () => (
  <section id="introduction" className="py-16 md:py-24">
    <div className="container max-w-5xl mx-auto px-4">
      <div className="text-center">
        <h2 className="text-sm font-semibold tracking-wide uppercase text-accent font-body">Introduction</h2>
        <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl text-primary">
          Bridging Africa's Digital Divide
        </p>
      </div>
      <div className="mt-12 text-lg text-muted-foreground space-y-6 leading-relaxed text-center max-w-4xl mx-auto">
        <p>
          Africa’s digital economy is projected to exceed $180 billion by 2025, powered by mobile-first consumers, internet growth and mobile money adoption. Yet telcos, banks, media houses and brands struggle to launch profitable digital platforms quickly and affordably.
        </p>
        <p className="text-foreground font-medium">
          DigitalNest bridges this gap with a white-label SaaS & PaaS ecosystem. We empower organizations to launch their own marketplaces and digital platforms within weeks complete with monetization, local integrations and scalable architecture.
        </p>
      </div>
    </div>
  </section>
);

const valueProps = [
  { icon: Globe, title: "White-label & Branded", description: "Partners launch under their own identity." },
  { icon: LayoutGrid, title: "Multi-Vertical", description: "One platform, multiple modules." },
  { icon: Cpu, title: "PaaS Flexibility", description: "Extend into fintech, logistics, events, media, and more." },
  { icon: ShieldCheck, title: "Africa-First", description: "Mobile money, escrow, USSD, fraud protection, KYC compliance." },
  { icon: Rocket, title: "Rapid Deployment", description: "Go live in 8–10 Weeks." },
  { icon: DollarSign, title: "Revenue Engine", description: "Subscriptions, commissions, ads, BNPL, loyalty, APIs." },
  { icon: Database, title: "Scalable & Secure", description: "Cloud-native architecture." },
];

const ValuePropositionSection = () => (
  <section id="value-proposition" className="py-16 md:py-24 bg-muted/50">
    <div className="container px-4">
      <div className="text-center max-w-3xl mx-auto">
        <h2 className="text-sm font-semibold tracking-wide uppercase text-accent font-body">Value Proposition</h2>
        <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl text-primary">
          Your All-in-One Digital Partner
        </p>
      </div>
      <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {valueProps.map((prop) => (
          <Card key={prop.title} className="text-center">
            <CardHeader className="items-center">
              <div className="p-4 bg-primary/10 rounded-full">
                <prop.icon className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="mt-4 !font-semibold !text-xl !text-foreground">{prop.title}</CardTitle>
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

const modules = [
  { slug: "mall", icon: ShoppingCart, title: "NestMall (Marketplace-as-a-Service)", description: "Multi-vendor store management, wholesale pricing, logistics integration, vendor POS. Enables partners to launch digital malls in weeks." },
  { slug: "homes", icon: HomeIcon, title: "NestHomes (Property-as-a-Service)", description: "Verified real estate listings, virtual tours, rent collection, mortgage/insurance calculators. Monetize property transactions and financial services." },
  { slug: "travel", icon: Plane, title: "NestTravel (Travel-as-a-Service)", description: "Flights, hotels, holiday packages, NestStays rentals, car hire, insurance add-ons. Create revenue streams from travel and tourism ecosystems." },
  { slug: "campfire", icon: MessageSquare, title: "Campfire (Community-as-a-Service)", description: "Topic forums (money, careers, mental health, society), live AMAs, polls and challenges. Gamified loyalty (“Sparks” points), anonymous wellness support, youth stories/podcasts." },
  { slug: "events", icon: Ticket, title: "NestEvents (Events-as-a-Service)", description: "Ticket sales, QR code validation, hybrid events, sponsorships. Unlock ticketing plus media monetization.", comingSoon: true },
  { slug: "jobs", icon: Briefcase, title: "NestJobs (Jobs-as-a-Service)", description: "Employer dashboards, job seeker portals, CV matching, training integrations. Position telcos/media as career hubs.", comingSoon: true },
  { slug: "biz", icon: Store, title: "NestBiz (Business Listings)", description: "SME directories, booking systems, niche listings (salons, spas, kinyozis). Empower SMEs with visibility and bookings.", comingSoon: true },
  { slug: "eats", icon: UtensilsCrossed, title: "MamaAfrica (Food & Grocery-as-a-Service)", description: "Multi-restaurant marketplace, subscription grocery boxes, driver app, loyalty points. Build food and grocery marketplaces tied to payments/loyalty.", comingSoon: true },
  { slug: "parcel", icon: Package, title: "NestParcel (Logistics-as-a-Service)", description: "Last-mile delivery, real-time tracking, e-commerce and food order integrations. Power digital commerce with seamless logistics.", comingSoon: true },
  { slug: "media", icon: PlayCircle, title: "NestMedia (Media-as-a-Service)", description: "Streaming (music, video, podcasts), paywalls, influencer marketplaces, targeted ads. Reinvent media houses into streaming platforms.", comingSoon: true },
  { slug: "admin/login", icon: UserCog, title: "Admin Portal", description: "Access the command center to manage all platforms, users, vendors, and transactions in the entire ecosystem." },
];


const CoreModulesSection = () => {
    const { toast } = useToast();

    const handleModuleClick = (e: React.MouseEvent, comingSoon?: boolean) => {
        if (comingSoon) {
            e.preventDefault();
            toast({
                title: "Coming Soon!",
                description: "This module is under construction and will be launched soon.",
            });
        }
    };

    return (
        <section id="modules" className="py-16 md:py-24">
        <div className="container px-4">
            <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-sm font-semibold tracking-wide uppercase text-accent font-body">Core SaaS Modules</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl text-primary">
                A Fully-Integrated Ecosystem
            </p>
            </div>
            <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {modules.map((mod) => {
                const linkHref = `/${mod.slug.startsWith('admin') ? '' : 'modules/'}${mod.slug}`;
                const cardContent = (
                    <Card className={`flex flex-col h-full transition-shadow group ${mod.comingSoon ? 'cursor-pointer hover:shadow-lg' : 'hover:shadow-lg'}`}>
                    <CardHeader>
                        <div className="flex items-center gap-4">
                        <mod.icon className="h-8 w-8 text-primary" />
                        <CardTitle className={`text-xl transition-colors ${mod.comingSoon ? '' : 'group-hover:text-accent'}`}>{mod.title}</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent className="flex-grow">
                        <p className="text-muted-foreground">{mod.description}</p>
                    </CardContent>
                    </Card>
                );

                if (mod.comingSoon) {
                    return (
                        <div key={mod.slug} onClick={(e) => handleModuleClick(e, mod.comingSoon)}>
                            {cardContent}
                        </div>
                    );
                }

                return (
                    <Link href={linkHref} key={mod.slug} className="no-underline">
                        {cardContent}
                    </Link>
                );
            })}
            </div>
        </div>
        </section>
    );
};

const CtaSection = () => (
  <section id="cta" className="py-16 md:py-24 bg-primary text-primary-foreground">
    <div className="container text-center max-w-4xl mx-auto px-4">
      <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-white">
        DigitalNest is Africa’s full-stack digital engine.
      </h2>
      <p className="mt-4 text-lg text-primary-foreground/80">
        Powering marketplaces, super apps, and platforms across every sector. Ready to build the future?
      </p>
      <div className="mt-8">
        <Button size="lg" variant="secondary">
          Request a Demo
        </Button>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="border-t">
    <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
      <div className="flex items-center gap-2">
        <Image src="/images/dnlogo.png" alt="DigitalNest Logo" width={24} height={24} className="h-6 w-6" />
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} DigitalNest. All rights reserved.
        </p>
      </div>
      <p className="text-sm text-muted-foreground">
        Built for Africa's Digital Future.
      </p>
    </div>
  </footer>
);

    