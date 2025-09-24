
'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
    FileCheck2, HomeIcon, Plane, ShoppingCart, Ticket, UserCheck, BedDouble, ArrowRight, Building, Car, School, Dna,
    MessageSquare, UtensilsCrossed, Info, FileText, Shield, RefreshCw, Mail as MailIconLucide, Menu, ArrowLeft, Loader2, KeyRound
} from "lucide-react";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import Image from "next/image";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { useRouter } from "next/navigation";


const availablePortals = [
    { id: "nesthomes", name: "NestHomes", icon: HomeIcon },
    { id: "neststays", name: "NestStays", icon: BedDouble },
    { id: "nestmall", name: "NestMall", icon: ShoppingCart },
    { id: "nestevents", name: "NestEvents", icon: Ticket },
    { id: "nesttravel", name: "NestTravel", icon: Plane },
]

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
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
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
                                <Link
                                    key={link.text}
                                    href={link.href}
                                    onClick={(e) => (link as any).comingSoon && handleComingSoon(e, link.text)}
                                    className="flex items-center gap-3 text-lg font-medium text-muted-foreground hover:text-foreground"
                                >
                                    <link.icon className="h-5 w-5" />
                                    {link.text}
                                </Link>
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
                
                <nav className="hidden lg:flex items-center gap-1 text-sm font-medium">
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
                <Button asChild variant="outline">
                    <Link href="/home"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Home</Link>
                </Button>
            </div>
        </header>
    );
};

const VendorHeroSection = () => (
    <section className="relative h-[20vh] flex items-center justify-center text-white">
        <Image
            src="/images/herovendoreg.jpg"
            alt="Smiling African vendor at a market stall"
            fill
            className="object-cover brightness-50"
            data-ai-hint="african merchant"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 w-[94%] mx-auto text-center flex flex-col items-center px-4">
            <h1 className="text-4xl font-bold text-white tracking-tight">
                Become a Nest Merchant
            </h1>
            <p className="mt-6 text-lg max-w-3xl mx-auto">
                Join Africa's fastest-growing digital ecosystem. Register once, sell everywhere.
            </p>
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

type RegStep = 'details' | 'otp' | 'portals' | 'password';

export default function VendorRegistrationPage() {
    const [step, setStep] = useState<RegStep>('details');
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();
    const router = useRouter();

    const handleDetailsSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
            toast({ title: "OTP Sent!", description: "Check your phone for the verification code." });
            setIsLoading(false);
            setStep('otp');
        }, 1500);
    }

    const handleOtpSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setTimeout(() => {
             toast({ title: "Verification Successful!", variant: "default" });
             setIsLoading(false);
             setStep('portals');
        }, 1500);
    }
    
    const handlePortalsSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setStep('password');
    }

    const handlePasswordSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setTimeout(() => {
             toast({ title: "Registration Complete!", description: "Redirecting to your dashboard..." });
             setIsLoading(false);
             router.push('/vendor/dashboard');
        }, 1500);
    }

    return (
        <div className="min-h-screen bg-muted/40 flex flex-col">
            <Header />
            <main className="flex-1">
                <VendorHeroSection />
                <div className="w-[94%] mx-auto py-8">
                     <Breadcrumb className="mb-4">
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink asChild>
                                    <Link href="/home">Home</Link>
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbPage>Vendor Registration</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                    
                    <Card className="max-w-2xl mx-auto">
                        {step === 'details' && (
                            <form onSubmit={handleDetailsSubmit}>
                                <CardHeader>
                                    <CardTitle>Step 1: Business Details</CardTitle>
                                    <CardDescription>Start by telling us about your business.</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="grid sm:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="businessName">Business Name</Label>
                                            <Input id="businessName" placeholder="e.g., Wanjiku's Crafts" required />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="businessType">Business Type</Label>
                                            <Select required>
                                                <SelectTrigger id="businessType">
                                                    <SelectValue placeholder="Select type" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="individual">Individual / Sole Proprietor</SelectItem>
                                                    <SelectItem value="company">Registered Company</SelectItem>
                                                    <SelectItem value="group">SHG / Group</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                    <div className="grid sm:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="email">Contact Email</Label>
                                            <Input id="email" type="email" placeholder="contact@yourbusiness.com" required />
                                        </div>
                                         <div className="space-y-2">
                                            <Label htmlFor="phone">Phone Number</Label>
                                            <Input id="phone" type="tel" placeholder="+254712345678" required />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex items-center space-x-2">
                                            <Checkbox id="terms" required />
                                            <label htmlFor="terms" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                                I accept the <a href="#" className="text-primary underline">Terms & Conditions</a> of KYB and Background Checks.
                                            </label>
                                        </div>
                                    </div>
                                    <div className="flex justify-center p-4 bg-muted rounded-md">
                                        <p className="text-sm text-muted-foreground">[Captcha Placeholder]</p>
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <Button size="lg" className="w-full" type="submit" disabled={isLoading}>
                                        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                        Get OTP
                                    </Button>
                                </CardFooter>
                            </form>
                        )}
                        
                        {step === 'otp' && (
                             <form onSubmit={handleOtpSubmit}>
                                <CardHeader>
                                    <CardTitle>Step 2: Verify OTP</CardTitle>
                                    <CardDescription>Enter the code sent to your phone.</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="otp">One-Time Password</Label>
                                        <Input id="otp" type="text" inputMode="numeric" required placeholder="_ _ _ _ _ _"/>
                                    </div>
                                    <Button variant="link" size="sm" type="button">Resend OTP</Button>
                                </CardContent>
                                <CardFooter>
                                    <Button size="lg" className="w-full" type="submit" disabled={isLoading}>
                                        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                        Verify & Continue
                                    </Button>
                                </CardFooter>
                            </form>
                        )}

                        {step === 'portals' && (
                             <form onSubmit={handlePortalsSubmit}>
                                <CardHeader>
                                    <CardTitle>Step 3: Select Portals</CardTitle>
                                    <CardDescription>Choose where you want to sell. You can add more later.</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
                                        {availablePortals.map(portal => (
                                            <div key={portal.id} className="flex items-center space-x-2 p-3 border rounded-md has-[:checked]:bg-primary/10 has-[:checked]:border-primary">
                                                <Checkbox id={portal.id} />
                                                <Label htmlFor={portal.id} className="flex items-center gap-2 font-normal cursor-pointer">
                                                    <portal.icon className="h-5 w-5 text-muted-foreground" />
                                                    {portal.name}
                                                </Label>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                                <CardFooter>
                                     <Button size="lg" className="w-full" type="submit">
                                        Continue <ArrowRight className="ml-2 h-4 w-4" />
                                    </Button>
                                </CardFooter>
                            </form>
                        )}
                        
                         {step === 'password' && (
                             <form onSubmit={handlePasswordSubmit}>
                                <CardHeader>
                                    <CardTitle>Step 4: Set Your Password</CardTitle>
                                    <CardDescription>Secure your new merchant account.</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="password">New Password</Label>
                                        <Input id="password" type="password" required />
                                    </div>
                                     <div className="space-y-2">
                                        <Label htmlFor="confirm-password">Confirm Password</Label>
                                        <Input id="confirm-password" type="password" required />
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <Button size="lg" className="w-full" type="submit" disabled={isLoading}>
                                        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                        Complete Registration & Login
                                    </Button>
                                </CardFooter>
                            </form>
                        )}
                    </Card>
                </div>
            </main>
            <Footer />
        </div>
    );
}
