
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileCheck2, HomeIcon, Plane, ShoppingCart, Ticket, UserCheck, BedDouble, ArrowRight, Cpu } from "lucide-react";
import Link from "next/link";

const availablePortals = [
    { id: "nesthomes", name: "NestHomes", icon: HomeIcon },
    { id: "neststays", name: "NestStays", icon: BedDouble },
    { id: "nestmall", name: "NestMall", icon: ShoppingCart },
    { id: "nestevents", name: "NestEvents", icon: Ticket },
    { id: "nesttravel", name: "NestTravel", icon: Plane },
]

export default function VendorRegistrationPage() {
    return (
        <div className="min-h-screen bg-muted/40">
            <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
                <div className="container flex h-14 items-center justify-between">
                     <Link href="/" className="flex items-center space-x-2">
                        <span className="font-bold text-lg">
                        <span className="text-primary">SG-</span><span className="text-secondary">NEST</span>
                        </span>
                    </Link>
                    <Button asChild variant="outline">
                        <Link href="/home">Back to Home</Link>
                    </Button>
                </div>
            </header>

            <main className="container py-12 max-w-4xl mx-auto">
                 <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-primary">Become a Nest Merchant</h1>
                    <p className="text-lg text-muted-foreground mt-2">Join Africa's fastest-growing digital ecosystem. Register once, sell everywhere.</p>
                </div>
                
                <Card>
                    <CardHeader>
                        <CardTitle>Registration Steps</CardTitle>
                        <CardDescription>Follow these steps to get your business online.</CardDescription>
                    </CardHeader>
                     <CardContent className="space-y-8">
                        <div className="flex items-start gap-6">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-xl">1</div>
                            <div>
                                <h3 className="text-lg font-semibold">Business Details (KYB)</h3>
                                <p className="text-muted-foreground">Provide your business or individual registration details. This includes business name, registration number, and contact information.</p>
                            </div>
                        </div>
                         <div className="flex items-start gap-6">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-xl">2</div>
                            <div>
                                <h3 className="text-lg font-semibold">Upload Documents</h3>
                                <p className="text-muted-foreground">Submit required documents like company registration, KRA PIN, and director IDs for verification.</p>
                            </div>
                        </div>
                         <div className="flex items-start gap-6">
                             <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-xl">3</div>
                            <div>
                                <h3 className="text-lg font-semibold">AI Verification</h3>
                                <p className="text-muted-foreground">Our AI-powered tool will review your documents for an 80% faster approval process. You'll be notified of the outcome via email.</p>
                            </div>
                        </div>
                          <div className="flex items-start gap-6">
                             <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-xl">4</div>
                            <div>
                                <h3 className="text-lg font-semibold">Select Your Portals</h3>
                                <p className="text-muted-foreground">Choose which SG-Nest portals you want to sell on. You can select multiple portals to maximize your reach.</p>
                            </div>
                        </div>
                           <div className="flex items-start gap-6">
                             <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-xl">5</div>
                            <div>
                                <h3 className="text-lg font-semibold">Access Merchant Dashboard</h3>
                                <p className="text-muted-foreground">Once approved, you'll gain access to your merchant dashboard to manage products, view orders, and track your performance.</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="mt-8">
                    <CardHeader>
                        <CardTitle>Start Your Application</CardTitle>
                        <CardDescription>Fill out the initial details to begin.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="businessName">Business Name</Label>
                                <Input id="businessName" placeholder="e.g., Wanjiku's Crafts" />
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="businessType">Business Type</Label>
                                <Select>
                                    <SelectTrigger id="businessType">
                                        <SelectValue placeholder="Select type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="individual">Individual / Sole Proprietor</SelectItem>
                                        <SelectItem value="company">Registered Company</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="email">Contact Email</Label>
                            <Input id="email" type="email" placeholder="contact@yourbusiness.com" />
                        </div>
                         <div className="space-y-2">
                            <Label>Which portals are you interested in?</Label>
                            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
                                {availablePortals.map(portal => (
                                    <div key={portal.id} className="flex items-center space-x-2">
                                        <Checkbox id={portal.id} />
                                        <Label htmlFor={portal.id} className="flex items-center gap-2 font-normal">
                                            <portal.icon className="h-5 w-5 text-muted-foreground" />
                                            {portal.name}
                                        </Label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button size="lg" className="w-full">
                            Continue Application <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </CardFooter>
                </Card>
            </main>
        </div>
    );
}
