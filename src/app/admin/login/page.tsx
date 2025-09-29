
'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';

export default function AdminLoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [staffNumber, setStaffNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (
        staffNumber === 'SGNEST01' &&
        email === 'admin@sgnest.africa' &&
        password === '1234567890'
    ) {
        toast({
            title: 'Credentials Verified',
            description: 'Please enter the OTP sent to your device.',
        });
        router.push('/admin/otp');
    } else {
        toast({
            title: 'Invalid Credentials',
            description: 'Please check your login details and try again.',
            variant: 'destructive',
        });
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-sidebar">
      <div className="w-full max-w-md p-8 space-y-8">
        
        <Card className="bg-background shadow-2xl">
            <CardHeader className="text-center">
            <CardTitle className="text-2xl">Admin Portal</CardTitle>
            <CardDescription>
                Enter your credentials to access the command center.
            </CardDescription>
            </CardHeader>
            <form onSubmit={handleLogin}>
            <CardContent className="grid gap-4">
                <div className="grid gap-2">
                <Label htmlFor="staff-number">Staff Number</Label>
                <Input
                    id="staff-number"
                    type="text"
                    placeholder="Your staff number"
                    value={staffNumber}
                    onChange={(e) => setStaffNumber(e.target.value)}
                />
                </div>
                <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                </div>
                <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input 
                    id="password" 
                    type="password" 
                    required 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                </div>
            </CardContent>
            <CardFooter className="flex-col gap-4">
                <Button type="submit" className="w-full">
                Sign in
                </Button>
                <Button variant="link" size="sm" asChild>
                    <Link href="/">Back to Home</Link>
                </Button>
            </CardFooter>
            </form>
        </Card>
       </div>
    </div>
  );
}
