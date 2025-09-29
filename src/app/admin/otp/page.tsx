
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
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';

export default function OtpPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [otp, setOtp] = useState('');

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp === '123456') {
      router.push('/admin/dashboard');
    } else {
      toast({
        title: 'Invalid OTP',
        description: 'The OTP you entered is incorrect. Please try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-sidebar">
       <div className="w-full max-w-md p-8 space-y-8">
        
        <Card className="bg-background shadow-2xl">
            <CardHeader className="text-center">
            <CardTitle className="text-2xl">Enter OTP</CardTitle>
            <CardDescription>
                We've sent a one-time password to your registered device. (Hint: 123456)
            </CardDescription>
            </CardHeader>
            <form onSubmit={handleVerify}>
            <CardContent className="grid gap-4">
                <div className="grid gap-2">
                <Label htmlFor="otp">One-Time Password</Label>
                <Input 
                    id="otp" 
                    type="text" 
                    inputMode="numeric" 
                    required 
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    />
                </div>
            </CardContent>
            <CardFooter className="flex-col gap-4">
                <Button type="submit" className="w-full">
                Verify
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
