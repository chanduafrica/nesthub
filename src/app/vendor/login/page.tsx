
'use client';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle, DollarSign, Rocket, Users } from 'lucide-react';

const benefits = [
    { icon: Rocket, text: "Reach millions of customers across Africa." },
    { icon: DollarSign, text: "Secure and fast payments via mobile money." },
    { icon: Users, text: "Access a suite of tools to manage and grow your business." },
];

export default function VendorLoginPage() {
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/vendor/otp');
  };

  return (
    <div className="flex min-h-screen items-stretch bg-background text-foreground">
        <div className="hidden lg:flex lg:w-1/2 bg-primary text-primary-foreground flex-col justify-between p-12">
             <div>
                <Link href="/" className="flex items-center space-x-2">
                    <span className="font-bold text-2xl text-white">
                        <span className="opacity-80">SG-</span><span className="opacity-100">NEST</span>
                    </span>
                </Link>
                <h2 className="mt-8 text-4xl font-bold text-white">Unlock Africa's Digital Marketplace</h2>
                <p className="mt-4 text-lg text-primary-foreground/80">
                    Join thousands of merchants scaling their business with SG-Nest.
                </p>
             </div>
             <div className="space-y-6">
                {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start gap-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
                            <benefit.icon className="h-6 w-6 text-white" />
                        </div>
                        <p className="pt-1.5 text-lg">{benefit.text}</p>
                    </div>
                ))}
             </div>
             <p className="text-sm text-primary-foreground/60">&copy; {new Date().getFullYear()} SG-Nest. All Rights Reserved.</p>
        </div>
      <div className="flex w-full lg:w-1/2 items-center justify-center p-8">
          <div className="w-full max-w-md space-y-8">
            <div className="text-center">
                 <Image src="/images/dnlogo.png" alt="SG-Nest Logo" width={48} height={48} className="mx-auto mb-4" />
                <h1 className="text-3xl font-bold">Merchant Portal</h1>
                 <p className="text-muted-foreground">Sign in to manage your store.</p>
            </div>
            <Card>
                <form onSubmit={handleLogin}>
                <CardContent className="grid gap-4 pt-6">
                    <div className="grid gap-2">
                    <Label htmlFor="email">Email or Phone</Label>
                    <Input
                        id="email"
                        type="text"
                        placeholder="m@example.com or +2547..."
                        required
                    />
                    </div>
                    <div className="grid gap-2">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" required />
                    </div>
                     <p className="text-xs text-muted-foreground text-center">You will receive an OTP to verify your login.</p>
                </CardContent>
                <CardHeader>
                    <Button type="submit" className="w-full">
                        Sign In
                    </Button>
                </CardHeader>
                </form>
            </Card>

            <div className="text-center">
                <p className="text-muted-foreground">Don't have a merchant account yet?</p>
                <Button variant="secondary" className="mt-2" asChild>
                    <Link href="/vendor-registration">Register as a Vendor</Link>
                </Button>
            </div>

           </div>
       </div>
    </div>
  );
}
