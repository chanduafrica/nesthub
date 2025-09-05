
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { CheckCircle, ChevronRight, Home, MapPin, Milestone, Sun, Wind } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const designs = [
  {
    id: 'simba-cottage',
    name: 'African Simba Cottage',
    price: 500000,
    imageUrl: 'https://picsum.photos/seed/simba/600/400',
    imageHint: 'small african cottage',
    description: '1 bedroom, traditional-inspired silhouette, cross-ventilation, rainwater harvesting.',
    features: ['Solar Kit', 'Biogas Digester', '1 Bedroom'],
    upgrades: ['kitchen', 'security']
  },
  {
    id: 'flat-roof-minimal',
    name: 'One-Bedroom Flat Roof – Minimal',
    price: 800000,
    imageUrl: 'https://picsum.photos/seed/flat-roof/600/400',
    imageHint: 'modern flat roof house',
    description: 'Flat roof, modern plan, light brick, grey water reuse.',
    features: ['Solar Kit', 'Biogas Digester', '1 Bedroom', 'Modern Finishes'],
    upgrades: ['kitchen', 'security', 'water']
  },
  {
    id: 'simple-brick',
    name: 'Simple Brick Walls – Live Green',
    price: 1000000,
    imageUrl: 'https://picsum.photos/seed/brick-walls/600/400',
    imageHint: 'brick house kenya',
    description: 'Thermal mass bricks, natural light, modern finishes.',
    features: ['Solar Kit', 'Biogas Digester', '1-2 Bedrooms', 'Premium Finishes'],
    upgrades: ['kitchen', 'security', 'water']
  },
];

const howItWorksSteps = [
    { title: "Choose Design", description: "Select your preferred green home from our catalog." },
    { title: "Site & KYC", description: "Provide plot details and identity verification." },
    { title: "Quote & Contract", description: "Receive a final quote and sign the digital contract." },
    { title: "Pay 70% Deposit", description: "Secure your build with a deposit into a secure escrow account." },
    { title: "Build & Inspect", description: "Follow the construction progress with milestone updates." },
    { title: "Handover", description: "Receive the keys to your new sustainable home." },
];

export default function BuildMyOwnPage() {
  const [selectedDesign, setSelectedDesign] = useState(designs[0]);
  const [config, setConfig] = useState({
    location: '',
    bedrooms: '1',
    upgrades: { kitchen: false, security: false, water: false }
  });

  const upgradeCosts = {
    kitchen: 50000,
    security: 35000,
    water: 25000,
  };

  const handleUpgradeChange = (upgrade: keyof typeof config.upgrades) => {
    setConfig(prev => ({
      ...prev,
      upgrades: { ...prev.upgrades, [upgrade]: !prev.upgrades[upgrade] }
    }));
  };

  const calculateTotal = () => {
    let total = selectedDesign.price;
    if (config.upgrades.kitchen) total += upgradeCosts.kitchen;
    if (config.upgrades.security) total += upgradeCosts.security;
    if (config.upgrades.water) total += upgradeCosts.water;
    return total;
  };

  const totalCost = calculateTotal();
  const depositAmount = totalCost * 0.7;
  const balanceAmount = totalCost * 0.3;
  
  const formatCurrency = (amount: number) => `KES ${amount.toLocaleString()}`;

  return (
    <div className="container mx-auto py-10">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-primary">Build Your Own Green Home</h1>
        <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
          Choose a pre-vetted, sustainable house design with solar and biogas options, and start building with a secure deposit.
        </p>
      </div>

      <Card className="mb-12">
        <CardHeader>
            <CardTitle>How It Works</CardTitle>
            <CardDescription>A simple, transparent process from design to handover.</CardDescription>
        </CardHeader>
        <CardContent>
            <div className="relative flex flex-col md:flex-row justify-between items-start gap-8">
                 <div className="absolute left-0 md:left-1/2 top-0 md:top-4 h-full w-px md:w-full md:h-px bg-border -translate-x-1/2 md:-translate-x-1/2 md:-translate-y-1/2" />
                 {howItWorksSteps.map((step, index) => (
                    <div key={index} className="relative z-10 flex items-start md:flex-col md:items-center md:text-center md:w-1/6 gap-4">
                        <div className="flex-shrink-0 bg-background border-2 border-primary rounded-full h-8 w-8 flex items-center justify-center text-primary font-bold">{index + 1}</div>
                        <div>
                            <h3 className="font-semibold">{step.title}</h3>
                            <p className="text-xs text-muted-foreground">{step.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </CardContent>
      </Card>


      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
            <Card>
                <CardHeader>
                    <CardTitle>1. Choose Your Design</CardTitle>
                </CardHeader>
                <CardContent>
                    <RadioGroup value={selectedDesign.id} onValueChange={(id) => setSelectedDesign(designs.find(d => d.id === id)!)}>
                        <div className="space-y-4">
                        {designs.map((design) => (
                            <Label key={design.id} htmlFor={design.id} className="block cursor-pointer rounded-lg border has-[:checked]:border-primary p-4">
                                <RadioGroupItem value={design.id} id={design.id} className="sr-only" />
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                                    <Image src={design.imageUrl} alt={design.name} width={200} height={150} className="rounded-md object-cover w-full h-32" data-ai-hint={design.imageHint} />
                                    <div className="md:col-span-2">
                                        <h3 className="font-bold text-lg">{design.name}</h3>
                                        <p className="text-sm text-muted-foreground">{design.description}</p>
                                        <div className="flex flex-wrap gap-2 mt-2">
                                            {design.features.map(f => <Badge key={f} variant="outline">{f}</Badge>)}
                                        </div>
                                        <p className="font-bold text-primary mt-2">From {formatCurrency(design.price)}</p>
                                    </div>
                                </div>
                            </Label>
                        ))}
                        </div>
                    </RadioGroup>
                </CardContent>
            </Card>

            <Card className="mt-8">
                <CardHeader>
                    <CardTitle>2. Configure Your Home</CardTitle>
                </CardHeader>
                 <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="location">Plot Location / Town</Label>
                            <Input id="location" placeholder="e.g., Kitengela" value={config.location} onChange={e => setConfig(p => ({...p, location: e.target.value}))} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="bedrooms">Number of Bedrooms</Label>
                            <Select value={config.bedrooms} onValueChange={val => setConfig(p => ({...p, bedrooms: val}))} disabled={!selectedDesign.name.includes("1–2")}>
                                <SelectTrigger id="bedrooms">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="1">1 Bedroom</SelectItem>
                                    <SelectItem value="2" disabled={!selectedDesign.name.includes("1–2")}>2 Bedrooms (+ KES 150,000)</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <div>
                        <Label className="mb-2 block">Optional Upgrades</Label>
                        <div className="space-y-2">
                            {selectedDesign.upgrades.includes('kitchen') && (
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="kitchen" checked={config.upgrades.kitchen} onCheckedChange={() => handleUpgradeChange('kitchen')} />
                                    <label htmlFor="kitchen" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                        Premium Kitchen Finish (+{formatCurrency(upgradeCosts.kitchen)})
                                    </label>
                                </div>
                            )}
                             {selectedDesign.upgrades.includes('security') && (
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="security" checked={config.upgrades.security} onCheckedChange={() => handleUpgradeChange('security')} />
                                    <label htmlFor="security" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                        Security Pack (Cameras, Alarm) (+{formatCurrency(upgradeCosts.security)})
                                    </label>
                                </div>
                            )}
                             {selectedDesign.upgrades.includes('water') && (
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="water" checked={config.upgrades.water} onCheckedChange={() => handleUpgradeChange('water')} />
                                    <label htmlFor="water" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                        Extra Water Tanks (5000L) (+{formatCurrency(upgradeCosts.water)})
                                    </label>
                                </div>
                            )}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>

        <div className="lg:col-span-1">
          <Card className="sticky top-20">
            <CardHeader>
              <CardTitle>Your Quote</CardTitle>
              <CardDescription>Based on your selections.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                        <span>Base Price ({selectedDesign.name})</span>
                        <span className="font-medium">{formatCurrency(selectedDesign.price)}</span>
                    </div>
                    {config.upgrades.kitchen && <div className="flex justify-between text-muted-foreground"><span className="pl-4">Kitchen Upgrade</span><span>{formatCurrency(upgradeCosts.kitchen)}</span></div>}
                    {config.upgrades.security && <div className="flex justify-between text-muted-foreground"><span className="pl-4">Security Pack</span><span>{formatCurrency(upgradeCosts.security)}</span></div>}
                    {config.upgrades.water && <div className="flex justify-between text-muted-foreground"><span className="pl-4">Water Tanks</span><span>{formatCurrency(upgradeCosts.water)}</span></div>}
                </div>
                <Separator />
                <div className="flex justify-between text-lg font-bold">
                    <span>Total Cost</span>
                    <span>{formatCurrency(totalCost)}</span>
                </div>
                <Separator />
                 <div className="space-y-2 text-sm">
                    <div className="flex justify-between font-semibold text-primary">
                        <span>70% Deposit (to Escrow)</span>
                        <span>{formatCurrency(depositAmount)}</span>
                    </div>
                     <div className="flex justify-between">
                        <span>Balance on Milestones</span>
                        <span>{formatCurrency(balanceAmount)}</span>
                    </div>
                </div>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full" size="lg" disabled={!config.location}>
                 <Link href={`/modules/homes/build/checkout/${selectedDesign.id}`}>
                    Book & Pay Deposit
                    <ChevronRight className="ml-2 h-4 w-4" />
                 </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
