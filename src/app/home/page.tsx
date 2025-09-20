

'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Briefcase, CheckCircle, HomeIcon, LayoutGrid, MessageSquare, Plane, ShoppingCart, Store, Ticket, UtensilsCrossed, Wallet, BarChart, Tv, Newspaper, Radio, Sparkles, BedDouble, Rocket, ShieldCheck, Cpu, Menu, Flame, Star, MapPin, Car, BookOpen, Gift } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CountdownTimer } from "@/components/modules/home/countdown-timer";


const navLinks = [
  { href: "/modules/mall", icon: Store, text: "NestMall" },
  { href: "#", icon: ShoppingCart, text: "Duka", comingSoon: true },
  { href: "#", icon: Car, text: "AutoParts", comingSoon: true },
  { href: "#", icon: BookOpen, text: "Back2School", comingSoon: true },
  { href: "/modules/travel", icon: Plane, text: "Travel" },
  { href: "/modules/homes/properties", icon: HomeIcon, text: "Properties" },
  { href: "/modules/stays", icon: BedDouble, text: "Stays"},
  { href: "#", icon: MessageSquare, text: "Join Campfire", comingSoon: true },
  { href: "#", icon: UtensilsCrossed, text: "Mama Africa", comingSoon: true },
  { href: "#", icon: Ticket, text: "Events", comingSoon: true },
];

const LoginPopup = () => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Login</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Login</DialogTitle>
                    <DialogDescription>
                        Access your SG-NEST account.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="email" className="text-right">
                            Email
                        </Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="m@example.com"
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="password" className="text-right">
                            Password
                        </Label>
                        <Input id="password" type="password" className="col-span-3" />
                    </div>
                     <div className="flex justify-end">
                        <Button variant="link" size="sm" className="p-0 h-auto">Forgot password?</Button>
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit" className="w-full">Sign In</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}


const Header = () => {
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
                  <nav className="flex flex-col gap-4 mt-8">
                      {navLinks.map((link) => (
                          <Link 
                            key={link.text} 
                            href={link.href} 
                            onClick={(e) => link.comingSoon && handleComingSoon(e, link.text)}
                            className="flex items-center gap-3 text-lg font-medium text-muted-foreground hover:text-foreground"
                          >
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
              <Link 
                key={link.text} 
                href={link.href} 
                onClick={(e) => link.comingSoon && handleComingSoon(e, link.text)}
                className="flex items-center gap-1 text-muted-foreground transition-colors hover:text-foreground"
              >
                <link.icon className="h-4 w-4" />
                {link.text}
              </Link>
            ))}
        </nav>

        <div className="flex items-center justify-end space-x-2">
           <Button variant="ghost" asChild>
              <Link href="/admin/login">Admin</Link>
          </Button>
          <LoginPopup />
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
          <CuratedPicksSection />
          <EcosystemPortals />
          <MerchantRevenueSection />
          <CommunitySection />
        </div>
      </main>
      <Footer />
    </div>
  );
}

const HeroSection = () => (
    <section className="relative text-white h-[72vh] flex items-center justify-center">
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

const staffPicks = [
    {
        type: "NestMall",
        title: "Hand-made Leather Sandals",
        details: "KES 2,500",
        imageUrl: "https://picsum.photos/400/300?random=21",
        imageHint: "leather sandals",
        buttonText: "Buy Now",
        href: "/modules/mall/product/leather-sandals"
    },
    {
        type: "Properties",
        title: "Modern Apartment in Kilimani",
        details: "For Rent",
        imageUrl: "https://picsum.photos/400/300?random=22",
        imageHint: "modern apartment exterior",
        buttonText: "View Property",
        href: "/modules/homes/properties/modern-apartment-in-kilimani"
    },
    {
        type: "Stays",
        title: "Diani Beachfront Villa",
        details: "From KES 25,000/night",
        imageUrl: "https://picsum.photos/400/300?random=23",
        imageHint: "beach villa",
        buttonText: "Book Stay",
        href: "/modules/stays"
    },
    {
        type: "Travel",
        title: "Sarova Stanley Hotel",
        details: "Nairobi CBD",
        imageUrl: "https://picsum.photos/400/300?random=24",
        imageHint: "luxury hotel lobby",
        buttonText: "Book Hotel",
        href: "/modules/travel"
    },
];

const topStays = [
    { type: "Stays", title: "Lamu Swahili House", details: "From KES 18,000/night", imageUrl: "https://picsum.photos/400/300?random=31", imageHint: "swahili architecture", buttonText: "Book Now", href: "/modules/stays"},
    { type: "Stays", title: "Naivasha Lakefront Cottage", details: "From KES 15,000/night", imageUrl: "https://picsum.photos/400/300?random=32", imageHint: "lake house", buttonText: "Book Now", href: "/modules/stays"},
    { type: "Stays", title: "Nanyuki Mount Kenya View", details: "From KES 12,000/night", imageUrl: "https://picsum.photos/400/300?random=33", imageHint: "mountain view cabin", buttonText: "Book Now", href: "/modules/stays"},
    { type: "Stays", title: "Watamu Beach Resort", details: "From KES 22,000/night", imageUrl: "https://picsum.photos/400/300?random=34", imageHint: "beach resort", buttonText: "Book Now", href: "/modules/stays"},
];

const topDestinations = [
    { type: "Travel", title: "Maasai Mara National Reserve", details: "World-famous safari destination.", imageUrl: "https://picsum.photos/400/300?random=41", imageHint: "maasai mara", buttonText: "Explore Packages", href: "/modules/travel/packages"},
    { type: "Travel", title: "Amboseli National Park", details: "Stunning views of Mt. Kilimanjaro.", imageUrl: "https://picsum.photos/400/300?random=42", imageHint: "amboseli kilimanjaro", buttonText: "Explore Packages", href: "/modules/travel/packages"},
    { type: "Travel", title: "Lamu Old Town", details: "A UNESCO World Heritage site.", imageUrl: "https://picsum.photos/400/300?random=43", imageHint: "lamu town", buttonText: "Explore Packages", href: "/modules/travel/packages"},
    { type: "Travel", title: "Samburu National Reserve", details: "Unique wildlife and landscapes.", imageUrl: "https://picsum.photos/400/300?random=44", imageHint: "samburu reserve", buttonText: "Explore Packages", href: "/modules/travel/packages"},
];

const frequentlyBought = [
    { type: "NestMall", title: "Smartphone Power Bank", details: "KES 3,500", imageUrl: "https://picsum.photos/400/300?random=51", imageHint: "power bank", buttonText: "Buy Now", href: "#"},
    { type: "Duka", title: "Fresh Milk - 1 Litre", details: "KES 120", imageUrl: "https://picsum.photos/400/300?random=52", imageHint: "milk bottle", buttonText: "Add to Cart", href: "#"},
    { type: "NestMall", title: "Bluetooth Earphones", details: "KES 4,000", imageUrl: "https://picsum.photos/400/300?random=53", imageHint: "bluetooth earphones", buttonText: "Buy Now", href: "#"},
    { type: "Back2School", title: "School Exercise Books (A4)", details: "KES 800 / dozen", imageUrl: "https://picsum.photos/400/300?random=54", imageHint: "exercise books", buttonText: "Buy Now", href: "#"},
];

const explosiveSale = [
    { type: "SALE", title: "Men's Casual Shirt", details: "KES 1,200 (was 2,000)", imageUrl: "https://picsum.photos/400/300?random=61", imageHint: "men shirt", buttonText: "Shop Sale", href: "#"},
    { type: "SALE", title: "Kitchen Blender", details: "KES 4,500 (was 6,000)", imageUrl: "https://picsum.photos/400/300?random=62", imageHint: "kitchen blender", buttonText: "Shop Sale", href: "#"},
    { type: "SALE", title: "Travel Backpack", details: "KES 3,000 (was 4,500)", imageUrl: "https://picsum.photos/400/300?random=63", imageHint: "travel backpack", buttonText: "Shop Sale", href: "#"},
    { type: "SALE", title: "Ladies Handbag", details: "KES 2,500 (was 4,000)", imageUrl: "https://picsum.photos/400/300?random=64", imageHint: "ladies handbag", buttonText: "Shop Sale", href: "#"},
];

const ceoGiveaway = [
    { type: "GIVEAWAY", title: "Latest Smartphone", details: "On sale for KES 1!", imageUrl: "https://picsum.photos/400/300?random=71", imageHint: "latest smartphone", buttonText: "Get for KES 1", href: "#" },
    { type: "GIVEAWAY", title: "4K Smart TV", details: "On sale for KES 1!", imageUrl: "https://picsum.photos/400/300?random=72", imageHint: "smart tv", buttonText: "Get for KES 1", href: "#" },
    { type: "GIVEAWAY", title: "Luxury Weekend Getaway", details: "On sale for KES 1!", imageUrl: "https://picsum.photos/400/300?random=73", imageHint: "luxury resort", buttonText: "Get for KES 1", href: "#" },
    { type: "GIVEAWAY", title: "KES 10,000 Shopping Voucher", details: "On sale for KES 1!", imageUrl: "https://picsum.photos/400/300?random=74", imageHint: "shopping voucher", buttonText: "Get for KES 1", href: "#" },
];

const ProductGrid = ({ items, buttonDisabled = false }: { items: typeof staffPicks, buttonDisabled?: boolean }) => (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 mt-8">
        {items.map((pick) => (
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
    </div>
);

const CeoGiveawaySection = () => {
    const now = new Date();
    const targetDate = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);

    return (
        <div>
            <div className="text-center my-8">
                <h3 className="text-2xl font-bold text-primary">C.E.O's Monthly Giveaway</h3>
                <p className="text-muted-foreground">Be the first to grab these items for KES 1 when the timer hits zero!</p>
                <CountdownTimer targetDate={targetDate.toISOString()} />
            </div>
            <ProductGrid items={ceoGiveaway} buttonDisabled={true} />
        </div>
    );
}

const CuratedPicksSection = () => (
    <section className="py-8 md:py-12">
        <div className="container px-4">
            <Tabs defaultValue="ceo-giveaway" className="w-full">
                <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-6 h-auto mb-8">
                    <TabsTrigger value="ceo-giveaway" className="gap-2"><Gift className="h-4 w-4"/>C.E.O Giveaway</TabsTrigger>
                    <TabsTrigger value="staff-picks" className="gap-2"><Star className="h-4 w-4"/>Weekly Staff Picks</TabsTrigger>
                    <TabsTrigger value="top-stays" className="gap-2"><BedDouble className="h-4 w-4"/>Top 5 Stays</TabsTrigger>
                    <TabsTrigger value="top-destinations" className="gap-2"><MapPin className="h-4 w-4"/>Top 5 Destinations</TabsTrigger>
                    <TabsTrigger value="frequently-bought" className="gap-2"><ShoppingCart className="h-4 w-4"/>Frequently Bought</TabsTrigger>
                    <TabsTrigger value="explosive-sale" className="gap-2"><Flame className="h-4 w-4"/>Explosive Sale</TabsTrigger>
                </TabsList>
                <TabsContent value="ceo-giveaway">
                    <CeoGiveawaySection />
                </TabsContent>
                <TabsContent value="staff-picks">
                    <ProductGrid items={staffPicks} />
                </TabsContent>
                <TabsContent value="top-stays">
                    <ProductGrid items={topStays} />
                </TabsContent>
                <TabsContent value="top-destinations">
                    <ProductGrid items={topDestinations} />
                </TabsContent>
                <TabsContent value="frequently-bought">
                    <ProductGrid items={frequentlyBought} />
                </TabsContent>
                <TabsContent value="explosive-sale">
                    <ProductGrid items={explosiveSale} />
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
    { icon: Car, title: "Auto Parts", description: "Genuine spare parts & accessories.", href: "#" },
    { icon: BookOpen, title: "Back to School", description: "Textbooks, uniforms, and supplies.", href: "#" },
];

const EcosystemPortals = () => (
    <section className="py-16 md:py-24">
        <div className="container px-4">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-primary">One Hub, Endless Possibilities</h2>
            </div>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
    <div className="w-[94%] mx-auto flex flex-col items-center justify-between gap-4 py-8 md:flex-row">
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

    

    

    

