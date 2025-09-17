
'use client';
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
import Image from 'next/image';
import Link from 'next/link';

export default function AdminLoginPage() {
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/admin/dashboard');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-sidebar">
      <div className="w-full max-w-md p-8 space-y-8">
        <div className="flex justify-center">
            <Image src="/images/dnlogo.png" alt="SG-Nest Logo" width={40} height={40} className="h-10 w-10" />
        </div>
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
                    required
                />
                </div>
                <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                />
                </div>
                <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" required />
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
