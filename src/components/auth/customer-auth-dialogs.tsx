
'use client';

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";

interface CustomerLoginPopupProps {
  onLoginSuccess: () => void;
}

export function CustomerLoginPopup({ onLoginSuccess }: CustomerLoginPopupProps) {
    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        onLoginSuccess();
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
                            defaultValue="customer@example.com"
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" type="password" defaultValue="password" />
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

export function ForgotPasswordPopup() {
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

export function CustomerRegisterPopup() {
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
