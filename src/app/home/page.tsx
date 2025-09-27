

'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from "@/components/ui/card";
import { Briefcase, CheckCircle, HomeIcon, LayoutGrid, MessageSquare, Plane, ShoppingCart, Store, Ticket, UtensilsCrossed, Wallet, BarChart, Tv, Newspaper, Radio, Sparkles, BedDouble, Rocket, ShieldCheck, Cpu, Menu, Flame, Star, MapPin, Car, BookOpen, Gift, Lock, UserPlus, Award, Users, HandCoins, ShoppingBag, Edit, Share2, Copy, ChevronDown, User, ShieldQuestion, Building, Package, Dna, School, Info, FileText, Shield, RefreshCw, Mail as MailIconLucide } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { CountdownTimer } from "@/components/modules/home/countdown-timer";
import { useState, useEffect } from "react";
import homeTabsData from '@/lib/data/home-tabs.json';
import { Facebook, Twitter, Mail as MailIcon } from 'lucide-react';
import { useRouter } from "next/navigation";


const navLinks = [
  { href: "/modules/mall", icon: ShoppingCart, text: "NestMall" },
  { href: "#", icon: Dna, text: "Duka" },
  { href: "#", icon: Car, text: "AutoParts" },
  { href: "#", icon: School, text: "Back2School" },
  { href: "/modules/travel", icon: Plane, text: "Travel" },
  { href: "/modules/homes/properties", icon: Building, text: "Properties" },
  { href: "/modules/stays", icon: BedDouble, text: "Stays"},
  { href: "/modules/campfire", icon: MessageSquare, text: "Join Campfire" },
  { href: "#", icon: UtensilsCrossed, text: "Mama Africa", comingSoon: true },
  { href: "#", icon: Ticket, text: "Events", comingSoon: true },
];


function Header() {
  const { toast } = useToast();

  const handleComingSoon = (e: React.MouseEvent, feature: string) => {
    e.preventDefault();
    toast({
      title: "Coming Soon!",
      description: `${feature} is under construction. Stay tuned!`,
    });
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="w-[94%] mx-auto flex h-14 items-center justify-between">
        <div className="flex items-center">
          <Sheet>
              <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="lg:hidden mr-2">
                      <Menu className="h-6 w-6" />
                      <span className="sr-only">Toggle Menu</span>
                  </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                   <SheetHeader>
                        <SheetTitle className="sr-only">Main Menu</SheetTitle>
                   </SheetHeader>
                  <nav className="flex flex-col gap-4 mt-8">
                      {navLinks.map((link) => 
                        link.href ? (
                          <Link
                            key={link.text}
                            href={link.href}
                            onClick={(e) => (link as any).comingSoon && handleComingSoon(e, link.text)}
                            className="flex items-center gap-3 text-lg font-medium text-muted-foreground hover:text-foreground"
                          >
                              <link.icon className="h-5 w-5" />
                              {link.text}
                          </Link>
                        ) : (
                          <div key={link.text}>
                            <p className="flex items-center gap-3 text-lg font-medium text-foreground px-2 pt-4 pb-2">{link.text}</p>
                          </div>
                        )
                      )}
                  </nav>
              </SheetContent>
          </Sheet>
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-bold text-lg">
              <span className="text-primary">SG-</span><span className="text-secondary">NEST</span>
            </span>
          </Link>
        </div>

         <nav className="hidden lg:flex items-center gap-2 text-sm font-medium ml-6">
           {navLinks.map((link) => (
            <Link
              key={link.text}
              href={link.href}
              onClick={(e) => (link as any).comingSoon && handleComingSoon(e, link.text)}
              className="flex items-center gap-1 text-muted-foreground transition-colors hover:text-foreground px-3 py-2 rounded-md"
            >
              <link.icon className="h-4 w-4" />
              {link.text}
            </Link>
           ))}
        </nav>

        <div className="flex items-center justify-end space-x-2 ml-auto">
          <Dialog>
             <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                      <Button variant="outline">
                          Account
                          <ChevronDown className="ml-2 h-4 w-4" />
                      </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                      <DialogTrigger asChild>
                        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                            <span className="flex items-center gap-2"><User className="h-4 w-4"/> Customer Login</span>
                        </DropdownMenuItem>
                      </DialogTrigger>
                       <DropdownMenuItem asChild>
                          <a href="/vendor/login" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 w-full">
                              <Store className="h-4 w-4"/> Vendor Login
                          </a>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                       <DropdownMenuItem asChild>
                          <a href="/admin/login" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 w-full">
                              <ShieldQuestion className="h-4 w-4"/> Admin
                          </a>
                      </DropdownMenuItem>
                  </DropdownMenuContent>
             </DropdownMenu>
             <CustomerLoginPopup />
          </Dialog>
        </div>
      </div>
    </header>
  );
};

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <div className="w-[94%] mx-auto">
          <CuratedPicksSection homeTabsData={homeTabsData} />
          <EcosystemPortals />
          <CommunitySection />
        </div>
      </main>
      <Footer />
    </div>
  );
}

const HeroSection = () => (
    <section className="relative text-white h-[58vh] flex items-center justify-center">
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


const ProductGrid = ({ items, buttonDisabled = false, children }: { items?: any[], buttonDisabled?: boolean, children?: React.ReactNode }) => (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 mt-8">
        {items && items.map((pick) => (
            <Card key={pick.title} className="overflow-hidden group">
                <Link href={pick.href} className="block">
                    <div className="relative h-56 w-full">
                        <Image
                            src={pick.imageUrl}
                            alt={pick.title}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                            data-ai-hint={pick.imageHint}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                        <div className="absolute bottom-0 left-0 p-4">
                             <span className="text-xs font-semibold uppercase tracking-wider text-white bg-black/50 px-2 py-1 rounded">{pick.type}</span>
                        </div>
                    </div>
                </Link>
                <CardContent className="p-4">
                    <h3 className="text-lg font-semibold leading-tight truncate">{pick.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{pick.details}</p>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                     <Button asChild className="w-full" disabled={buttonDisabled}>
                        <Link href={pick.href}>{pick.buttonText}</Link>
                     </Button>
                </CardFooter>
            </Card>
        ))}
        {children}
    </div>
);

const CeoGiveawaySection = ({ items }: { items: any[] }) => {
    const [now, setNow] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setNow(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const targetDate = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);

    return (
        <div>
            <div className="text-center my-8">
                <h3 className="text-2xl font-bold text-primary">C.E.O's Monthly Giveaway</h3>
                <p className="text-muted-foreground">Be the first to grab these items for KES 1 when the timer hits zero!</p>
                <CountdownTimer targetDate={targetDate.toISOString()} />
            </div>
            <ProductGrid items={items} buttonDisabled={true} />
        </div>
    );
};

const MiddayVaultSection = ({ items }: { items: any[] }) => {
    const [isClient, setIsClient] = useState(false);
    const [now, setNow] = useState(new Date());

    useEffect(() => {
        setIsClient(true);
        const timer = setInterval(() => setNow(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    if (!isClient) {
        // Render a placeholder or skeleton on the server and during initial client render
        return (
            <div>
                <div className="text-center my-8">
                    <h3 className="text-2xl font-bold text-primary">Midday Vault</h3>
                    <p className="text-muted-foreground">The vault opens at midday for 5 minutes only. Get ready!</p>
                </div>
                 <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 mt-8">
                    {Array.from({ length: 4 }).map((_, index) => (
                        <Card key={index} className="overflow-hidden group animate-pulse">
                            <div className="relative h-56 w-full bg-muted"></div>
                            <CardContent className="p-4">
                                <div className="h-6 w-3/4 bg-muted rounded"></div>
                                <div className="flex items-baseline gap-2 mt-2">
                                    <div className="h-8 w-1/4 bg-muted rounded"></div>
                                    <div className="h-6 w-1/3 bg-muted rounded"></div>
                                </div>
                            </CardContent>
                            <CardFooter className="p-4 pt-0">
                                <Button className="w-full" disabled={true}>
                                    Awaiting Vault Opening
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        );
    }

    const todayMidday = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 12, 0, 0);
    const vaultEndTime = new Date(todayMidday.getTime() + 5 * 60 * 1000);
    const isVaultOpen = now >= todayMidday && now < vaultEndTime;

    let targetDate: Date;
    if (now >= vaultEndTime) {
        // If past today's vault time, set target for tomorrow's midday
        targetDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 12, 0, 0);
    } else {
        targetDate = todayMidday;
    }

    return (
        <div>
            <div className="text-center my-8">
                <h3 className="text-2xl font-bold text-primary">Midday Vault</h3>
                {isVaultOpen ? (
                    <p className="text-muted-foreground">The Vault is open! These deals are available for the next 5 minutes only!</p>
                ) : (
                    <p className="text-muted-foreground">The vault opens at midday for 5 minutes only. Get ready!</p>
                )}
                 {!isVaultOpen && <CountdownTimer targetDate={targetDate.toISOString()} />}
            </div>
             <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 mt-8">
                 {items.map((product) => (
                    <Card key={product.title} className="overflow-hidden group">
                        <div className="relative h-56 w-full">
                            <Image
                                src={product.imageUrl}
                                alt={product.title}
                                fill
                                className={`object-cover transition-all duration-500 ${!isVaultOpen ? 'blur-xl' : ''}`}
                                data-ai-hint={product.imageHint}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                            <div className="absolute bottom-0 left-0 p-4">
                                <span className="text-xs font-semibold uppercase tracking-wider text-white bg-black/50 px-2 py-1 rounded">{product.type}</span>
                            </div>
                            {isVaultOpen && (
                                <div className="absolute top-4 right-4 bg-green-500 text-white font-bold py-2 px-4 rounded-lg animate-pulse">
                                    Vault is Open!
                                </div>
                            )}
                        </div>
                        <CardContent className="p-4">
                            <h3 className={`text-lg font-semibold leading-tight truncate transition-all duration-500 ${!isVaultOpen ? 'blur-sm bg-muted-foreground/20' : ''}`}>{product.title}</h3>
                            <div className="flex items-baseline gap-2 mt-2">
                                <p className="text-2xl font-bold text-primary">KES 1,000</p>
                                <p className="text-md text-muted-foreground line-through">KES {product.originalPrice.toLocaleString()}</p>
                            </div>
                        </CardContent>
                        <CardFooter className="p-4 pt-0">
                            <Button className="w-full" disabled={!isVaultOpen}>
                                {isVaultOpen ? 'Buy Now for KES 1,000' : 'Awaiting Vault Opening'}
                            </Button>
                        </CardFooter>
                    </Card>
                 ))}
            </div>
        </div>
    );
};


const CuratedPicksSection = ({ homeTabsData }: { homeTabsData: any }) => (
    <section className="py-4 md:py-12">
        <div className="container px-4">
            <Tabs defaultValue="ceo-giveaway" className="w-full">
                <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:grid-cols-7 h-auto mb-8">
                    <TabsTrigger value="ceo-giveaway" className="gap-2"><Gift className="h-4 w-4"/>C.E.O Giveaway</TabsTrigger>
                    <TabsTrigger value="midday-vault" className="gap-2"><Lock className="h-4 w-4"/>Midday Vault</TabsTrigger>
                    <TabsTrigger value="staff-picks" className="gap-2"><Star className="h-4 w-4"/>Weekly Staff Picks</TabsTrigger>
                    <TabsTrigger value="top-stays" className="gap-2"><BedDouble className="h-4 w-4"/>Top 5 Stays</TabsTrigger>
                    <TabsTrigger value="top-destinations" className="gap-2"><MapPin className="h-4 w-4"/>Top 5 Destinations</TabsTrigger>
                    <TabsTrigger value="frequently-bought" className="gap-2"><ShoppingCart className="h-4 w-4"/>Frequently Bought</TabsTrigger>
                    <TabsTrigger value="explosive-sale" className="gap-2"><Flame className="h-4 w-4"/>Explosive Sale</TabsTrigger>
                </TabsList>
                <TabsContent value="ceo-giveaway">
                    <CeoGiveawaySection items={homeTabsData['ceo-giveaway'] || []} />
                </TabsContent>
                <TabsContent value="midday-vault">
                    <MiddayVaultSection items={homeTabsData['midday-vault'] || []} />
                </TabsContent>
                <TabsContent value="staff-picks">
                    <ProductGrid items={homeTabsData['staff-picks']} />
                </TabsContent>
                <TabsContent value="top-stays">
                    <ProductGrid items={homeTabsData['top-stays']} />
                </TabsContent>
                <TabsContent value="top-destinations">
                    <ProductGrid items={homeTabsData['top-destinations']} />
                </TabsContent>
                <TabsContent value="frequently-bought">
                    <ProductGrid items={homeTabsData['frequently-bought']} />
                </TabsContent>
                <TabsContent value="explosive-sale">
                    <ProductGrid items={homeTabsData['explosive-sale']} />
                </TabsContent>
            </Tabs>
        </div>
    </section>
);


const portals = [
    { icon: Store, title: "NestMall", description: "Shop electronics, fashion, FMCG & wholesale.", href: "/modules/mall" },
    { icon: HomeIcon, title: "NestHomes", description: "Buy, rent, or build affordable green homes.", href: "/modules/homes" },
    { icon: Plane, title: "NestTravel", description: "Flights, SGR, buses, hotels, tours.", href: "/modules/travel" },
    { icon: BedDouble, title: "NestStays", description: "Airbnb-style verified stays across Kenya.", href: "/modules/stays" },
    { icon: Ticket, title: "NestEvents", description: "Tickets for concerts, expos & conferences.", href: "#" },
    { icon: UtensilsCrossed, title: "Mama Africa", description: "Authentic African recipes & food delivery.", href: "#" },
    { icon: MessageSquare, title: "Campfire", description: "Youth digital forum: careers, wellness, money.", href: "#" },
    { icon: Car, title: "BuyMyCar", description: "Buy and sell new and used vehicles.", href: "#" },
    { icon: Package, title: "Auto Parts", description: "Genuine spare parts & accessories.", href: "#" },
    { icon: BookOpen, title: "Back to School", description: "Textbooks, uniforms, and supplies.", href: "#" },
];

const EcosystemPortals = () => (
    <section className="py-5 md:py-8">
        <div className="container px-4">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-primary">One Hub, Endless Possibilities</h2>
            </div>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                 {portals.map((portal) => (
                    <Link href={portal.href} key={portal.title} className="no-underline">
                        <Card className="hover:shadow-xl transition-shadow h-full">
                            <CardHeader className="flex flex-row items-center gap-4">
                                <portal.icon className="h-8 w-8 text-primary" />
                                <CardTitle className="!text-xl !text-foreground">{portal.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">{portal.description}</p>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
                 <Link href="/vendor-registration" className="no-underline">
                    <Card className="hover:shadow-xl transition-shadow h-full bg-secondary text-secondary-foreground">
                        <CardHeader className="flex flex-row items-center gap-4">
                            <UserPlus className="h-8 w-8" />
                            <CardTitle className="!text-xl !text-white">Become a Merchant</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p>click to register your business</p>
                        </CardContent>
                    </Card>
                </Link>
            </div>
        </div>
    </section>
);

const CommunityCard = ({ title, description, imageUrl, imageHint }: { title: string, description: string, imageUrl: string, imageHint: string }) => (
    <Dialog>
        <DialogTrigger asChild>
            <Card className="relative overflow-hidden group cursor-pointer h-64">
                <Image
                    src={imageUrl}
                    alt={title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    data-ai-hint={imageHint}
                />
                <div className="absolute inset-0 bg-black/50" />
                <div className="relative h-full flex flex-col justify-end p-6 text-white">
                    <h3 className="text-2xl font-bold">{title}</h3>
                    <p>{description}</p>
                </div>
            </Card>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
            <DialogHeader>
                <DialogTitle className="text-center text-2xl">Coming Soon!</DialogTitle>
            </DialogHeader>
            <div className="text-center py-4">
                <p className="text-lg">Something awesome is coming soon, stay tuned!!</p>
            </div>
        </DialogContent>
    </Dialog>
);

// Define WhatsApp icon as an SVG component
const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="h-6 w-6"
  >
    <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38c1.45.79 3.08 1.21 4.79 1.21 5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2zM12.04 20.12c-1.48 0-2.92-.39-4.19-1.12l-.3-.18-3.12.82.83-3.04-.2-.31a8.27 8.27 0 0 1-1.27-4.38c0-4.54 3.69-8.23 8.23-8.23 2.22 0 4.28.87 5.82 2.41s2.41 3.6 2.41 5.82-3.69 8.23-8.23 8.23zm4.52-6.19c-.25-.12-1.47-.73-1.7-.81-.22-.08-.39-.12-.55.12-.17.25-.64.81-.79.98-.15.17-.29.18-.54.06-.25-.12-1.06-.39-2.02-1.25-.74-.67-1.23-1.5-1.38-1.75s-.15-.22-.02-.34c.12-.11.26-.28.39-.42.12-.14.17-.25.25-.42.08-.17.04-.31-.02-.43s-.55-1.32-.76-1.81c-.2-.48-.4-.42-.55-.42h-.48c-.17 0-.43.06-.66.31-.22.25-.87.85-.87 2.07s.9 2.4 1.02 2.56c.12.17 1.75 2.67 4.24 3.75 2.49 1.08 2.49.72 2.94.68.45-.04 1.47-.6 1.67-1.18.21-.58.21-1.08.15-1.18-.07-.1-.22-.16-.47-.28z" />
  </svg>
);


function ReferFriendPopup() {
    const { toast } = useToast();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const referralLink = "https://sg-nest.com/join?ref=A4B2C1";

    const copyToClipboard = () => {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(referralLink);
            toast({
                title: "Copied!",
                description: "Referral link copied to clipboard.",
            });
        }
    };

    if (!isMounted) {
        return <Button size="lg" variant="outline">Refer a Friend</Button>;
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                 <Button size="lg" variant="outline">Refer a Friend</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Refer a Friend & Earn Sparks</DialogTitle>
                    <DialogDescription>
                        Share your unique link and you'll both get rewarded when they join and make their first purchase.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex items-center space-x-2">
                    <div className="grid flex-1 gap-2">
                        <Label htmlFor="link" className="sr-only">
                        Link
                        </Label>
                        <Input
                        id="link"
                        defaultValue={referralLink}
                        readOnly
                        />
                    </div>
                    <Button type="button" size="sm" className="px-3" onClick={copyToClipboard}>
                        <span className="sr-only">Copy</span>
                        <Copy className="h-4 w-4" />
                    </Button>
                </div>
                 <div className="py-2 text-center text-sm text-muted-foreground">Or share via</div>
                <div className="flex justify-center gap-4">
                    <a href={`https://wa.me/?text=Join%20me%20on%20SG-Nest!%20${referralLink}`} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary">
                        <div className="w-12 h-12 rounded-full bg-green-500 text-white flex items-center justify-center">
                            <WhatsAppIcon className="h-7 w-7" />
                        </div>
                        <span className="text-xs">WhatsApp</span>
                    </a>
                     <a href={`https://www.facebook.com/sharer/sharer.php?u=${referralLink}`} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary">
                        <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center">
                            <Facebook className="h-6 w-6" />
                        </div>
                        <span className="text-xs">Facebook</span>
                    </a>
                     <a href={`https://twitter.com/intent/tweet?url=${referralLink}&text=Join%20me%20on%20SG-Nest!`} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary">
                       <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center">
                            <Twitter className="h-6 w-6" />
                        </div>
                        <span className="text-xs">Twitter</span>
                    </a>
                     <a href={`mailto:?subject=Join%20me%20on%20SG-Nest&body=Use%20my%20link%20to%20get%20started:%20${referralLink}`} className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary">
                        <div className="w-12 h-12 rounded-full bg-gray-500 text-white flex items-center justify-center">
                            <MailIcon className="h-6 w-6" />
                        </div>
                        <span className="text-xs">Email</span>
                    </a>
                </div>
            </DialogContent>
        </Dialog>
    )
}

function CustomerLoginPopup() {
    const router = useRouter();
    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        router.push('/customer/dashboard');
    };
    return (
        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>Customer Login</DialogTitle>
                <DialogDescription>
                    One account for all SG-NEST portals.
                </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleLogin}>
                <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email/Phone</Label>
                        <Input
                            id="email"
                            type="text"
                            placeholder="Email or Phone Number"
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" type="password" />
                    </div>
                    <div className="flex justify-between items-center text-sm">
                        <ForgotPasswordPopup />
                        <CustomerRegisterPopup />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit" className="w-full">Sign In</Button>
                </DialogFooter>
            </form>
        </DialogContent>
    );
}

function ForgotPasswordPopup() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="link" size="sm" className="p-0 h-auto">Forgot password?</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Reset Password</DialogTitle>
                    <DialogDescription>
                        Enter your email address and we'll send you a link to reset your password.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="reset-email">Email</Label>
                        <Input id="reset-email" type="email" placeholder="m@example.com" />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit" className="w-full">Send Reset Link</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

function CustomerRegisterPopup() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                 <Button variant="link" size="sm" className="p-0 h-auto">Don't have an account? Sign Up</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle>Create Customer Account</DialogTitle>
                    <DialogDescription>
                        Join the SG-Nest ecosystem with a single account.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                        <div className="grid gap-2">
                           <Label htmlFor="first-name">First Name</Label>
                           <Input id="first-name" placeholder="John" />
                        </div>
                        <div className="grid gap-2">
                           <Label htmlFor="other-names">Other Names</Label>
                           <Input id="other-names" placeholder="Doe" />
                        </div>
                    </div>
                     <div className="grid gap-2">
                        <Label htmlFor="reg-phone">Phone Number</Label>
                        <Input id="reg-phone" placeholder="+254712345678" />
                    </div>
                     <div className="grid gap-2">
                        <Label htmlFor="reg-email">Email Address</Label>
                        <Input id="reg-email" type="email" placeholder="m@example.com" />
                    </div>
                     <div className="grid gap-2">
                        <Label htmlFor="reg-password">Password</Label>
                        <Input id="reg-password" type="password" />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit" className="w-full">Create Account & Get OTP</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

const CommunitySection = () => (
  <section className="py-5 md:py-8 bg-muted/30">
    <div className="container text-center max-w-5xl mx-auto px-4">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-primary">
            Campfire by Standard Group.
        </h2>
        <p className="mt-4 text-muted-foreground max-w-3xl mx-auto">
            Campfire is our digital fireside - just like the African campfire where wisdom was shared, stories told, and generations guided. It’s a space to connect, learn, and grow together in today’s digital age.
        </p>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
            <CommunityCard
                title="Money Mondays"
                description="Finance Literacy"
                imageUrl="/images/campfire/moneymondays.png"
                imageHint="finance discussion"
            />
            <CommunityCard
                title="Wellness Wednesdays"
                description="Mental Health"
                imageUrl="/images/campfire/wellnesswednesdays.png"
                imageHint="wellness yoga"
            />
            <CommunityCard
                title="Ignite Fridays"
                description="Jobs & Entrepreneurship"
                imageUrl="/images/campfire/ignitefridays.png"
                imageHint="entrepreneur meeting"
            />
        </div>
    </div>
    <div className="container max-w-6xl mx-auto px-4 mt-16">
        <div className="text-center">
            <h2 className="text-3xl font-bold text-accent">Sparks Points - Loyalty That Connects Us</h2>
            <p className="mt-2 text-muted-foreground max-w-3xl mx-auto">Sparks is more than points - it’s the glow that connects our SG Nest community. Just like sparks around an African campfire, every purchase, referral, or sale keeps the fire alive and rewards you back.</p>
        </div>
        <div className="mt-12 grid md:grid-cols-2 gap-12 items-start">
            <div className="space-y-8">
                <h3 className="text-2xl font-semibold text-primary">How to Earn Sparks</h3>
                <div className="space-y-6">
                    <div className="flex gap-4">
                        <ShoppingBag className="h-8 w-8 text-accent flex-shrink-0 mt-1" />
                        <div>
                            <h4 className="font-semibold">As a Customer</h4>
                            <p className="text-muted-foreground">Earn Sparks every time you shop across Nest portals.</p>
                        </div>
                    </div>
                     <div className="flex gap-4">
                        <Users className="h-8 w-8 text-accent flex-shrink-0 mt-1" />
                        <div>
                            <h4 className="font-semibold">Through Referrals</h4>
                            <p className="text-muted-foreground">Invite friends and family - both of you earn Sparks when they join and shop.</p>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <Store className="h-8 w-8 text-accent flex-shrink-0 mt-1" />
                        <div>
                            <h4 className="font-semibold">As a Vendor</h4>
                            <p className="text-muted-foreground">Vendors gain Sparks for new listings, high ratings, and sales milestones.</p>
                        </div>
                    </div>
                     <div className="flex gap-4">
                        <MessageSquare className="h-8 w-8 text-accent flex-shrink-0 mt-1" />
                        <div>
                            <h4 className="font-semibold">Community Engagement</h4>
                            <p className="text-muted-foreground">Join Campfire, post reviews, or share content and earn Sparks.</p>
                        </div>
                    </div>
                </div>
            </div>
             <div className="space-y-8 p-8 bg-white rounded-lg shadow-lg">
                 <h3 className="text-2xl font-semibold text-primary">Redeem Sparks</h3>
                 <p className="text-muted-foreground">Every month, redeem your Sparks for rewards across SG Nest:</p>
                 <ul className="space-y-3">
                    <li className="flex items-center gap-3"><CheckCircle className="h-5 w-5 text-green-500" /> Shopping & travel discounts</li>
                    <li className="flex items-center gap-3"><CheckCircle className="h-5 w-5 text-green-500" /> Exclusive event access & premium content</li>
                    <li className="flex items-center gap-3"><CheckCircle className="h-5 w-5 text-green-500" /> Cashback & bill payments (where available)</li>
                    <li className="flex items-center gap-3"><CheckCircle className="h-5 w-5 text-green-500" /> Seasonal gifts and special offers</li>
                </ul>
            </div>
        </div>
        <div className="mt-12 flex flex-wrap justify-center gap-4">
            <Button size="lg">Start Earning Sparks Today</Button>
            <Dialog>
                <DialogTrigger asChild>
                    <Button size="lg" variant="secondary">Customer Register</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-lg">
                    <DialogHeader>
                        <DialogTitle>Create Customer Account</DialogTitle>
                        <DialogDescription>
                            Join the SG-Nest ecosystem with a single account.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                         <div className="grid sm:grid-cols-2 gap-4">
                            <div className="grid gap-2">
                               <Label htmlFor="first-name-main">First Name</Label>
                               <Input id="first-name-main" placeholder="John" />
                            </div>
                            <div className="grid gap-2">
                               <Label htmlFor="other-names-main">Other Names</Label>
                               <Input id="other-names-main" placeholder="Doe" />
                            </div>
                        </div>
                         <div className="grid gap-2">
                            <Label htmlFor="reg-phone-main">Phone Number</Label>
                            <Input id="reg-phone-main" placeholder="+254712345678" />
                        </div>
                         <div className="grid gap-2">
                            <Label htmlFor="reg-email-main">Email Address</Label>
                            <Input id="reg-email-main" type="email" placeholder="m@example.com" />
                        </div>
                         <div className="grid gap-2">
                            <Label htmlFor="reg-password-main">Password</Label>
                            <Input id="reg-password-main" type="password" />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit" className="w-full">Create Account & Get OTP</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
            <Button size="lg" variant="outline" asChild>
                <Link href="/vendor-registration">Vendor Register</Link>
            </Button>
            <ReferFriendPopup />
        </div>
    </div>
  </section>
);


const Footer = () => (
    <footer className="border-t bg-gray-900 text-gray-300">
      <div className="w-[94%] mx-auto flex flex-col items-center justify-between gap-6 py-8 md:flex-row">
        <div className="flex items-center gap-2">
          <p className="text-sm">
            © {new Date().getFullYear()} Standard Group x NestHub | All Rights Reserved.
          </p>
        </div>
         <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            <Link href="#" className="text-sm text-white hover:underline flex items-center gap-2">
                <Info className="h-4 w-4" /> About us
            </Link>
            <Link href="#" className="text-sm text-white hover:underline flex items-center gap-2">
                <FileText className="h-4 w-4" /> Terms
            </Link>
            <Link href="#" className="text-sm text-white hover:underline flex items-center gap-2">
                <Shield className="h-4 w-4" /> Privacy policy
            </Link>
            <Link href="#" className="text-sm text-white hover:underline flex items-center gap-2">
                <RefreshCw className="h-4 w-4" /> Refund
            </Link>
            <Link href="#" className="text-sm text-white hover:underline flex items-center gap-2">
                <MailIconLucide className="h-4 w-4" /> Contact us
            </Link>
        </div>
      </div>
    </footer>
  );
  

    

    

    

    

    

      

    

    

    

    