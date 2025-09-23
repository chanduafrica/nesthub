
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

export default function VendorOtpPage() {
  const router = useRouter();

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/vendor/dashboard');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-md p-8 space-y-8">
        <div className="flex justify-center">
             <Image src="/images/dnlogo.png" alt="DigitalNest Logo" width={40} height={40} className="h-10 w-10" />
        </div>
        <Card className="bg-background shadow-2xl">
            <CardHeader className="text-center">
            <CardTitle className="text-2xl">Enter OTP</CardTitle>
            <CardDescription>
                We've sent a one-time password to your registered phone/email.
            </CardDescription>
            </CardHeader>
            <form onSubmit={handleVerify}>
            <CardContent className="grid gap-4">
                <div className="grid gap-2">
                <Label htmlFor="otp">One-Time Password</Label>
                <Input id="otp" type="text" inputMode="numeric" required />
                </div>
            </CardContent>
            <CardFooter className="flex-col gap-4">
                <Button type="submit" className="w-full">
                Verify & Sign In
                </Button>
                <Button variant="link" size="sm" onClick={() => router.back()}>
                Back to login
                </Button>
            </CardFooter>
            </form>
        </Card>
      </div>
    </div>
  );
}
