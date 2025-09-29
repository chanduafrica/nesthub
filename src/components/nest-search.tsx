
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Search, MessageSquare, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

export function NestSearch() {
    const [isChatOpen, setChatOpen] = useState(false);
    const [isCaptureOpen, setCaptureOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [query, setQuery] = useState('');
    const [userDetails, setUserDetails] = useState({ phone: '', email: '' });
    const router = useRouter();
    const { toast } = useToast();

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!query.trim()) {
            toast({ title: 'Please enter a search query.', variant: 'destructive' });
            return;
        }
        setIsLoading(true);
        // Simulate AI thinking time
        setTimeout(() => {
            setIsLoading(false);
            setChatOpen(false);
            setCaptureOpen(true);
        }, 1500);
    };

    const handleCaptureSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!userDetails.phone.trim() || !userDetails.email.trim()) {
            toast({ title: 'Please enter your phone and email.', variant: 'destructive' });
            return;
        }
        // In a real app, you'd save the user details here.
        console.log('User Details Captured:', userDetails);
        toast({ title: 'Thank you!', description: 'Redirecting to your search results...' });

        // Redirect to the results page with all the info
        const searchParams = new URLSearchParams({
            q: query,
            phone: userDetails.phone,
            email: userDetails.email
        });
        router.push(`/search?${searchParams.toString()}`);
        
        setCaptureOpen(false);
        setQuery('');
    };

    return (
        <>
            <Dialog open={isChatOpen} onOpenChange={setChatOpen}>
                <DialogTrigger asChild>
                    <Button
                        className="fixed bottom-5 right-5 h-14 w-auto px-4 rounded-full shadow-lg"
                        size="lg"
                    >
                        <Search className="mr-2 h-5 w-5" />
                        NestSearch
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-xl">
                    <DialogHeader>
                        <DialogTitle className="text-2xl flex items-center gap-2">
                           <MessageSquare className="text-primary"/> NestSearch AI
                        </DialogTitle>
                        <DialogDescription>
                            Describe what you’re looking for, and our AI will find it across all Nest portals.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSearchSubmit}>
                        <div className="py-4">
                            <Input
                                id="search-query"
                                placeholder="e.g., 'A cheap 2-bedroom in Nairobi near Thika Road' or 'Brake pads for a Toyota Vitz'"
                                className="h-12"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                            />
                            {isLoading && (
                                <div className="flex items-center gap-2 text-muted-foreground mt-4">
                                    <Loader2 className="h-4 w-4 animate-spin"/>
                                    <span>Nest AI is thinking...</span>
                                </div>
                            )}
                        </div>
                        <DialogFooter>
                            <Button type="submit" size="lg" className="w-full" disabled={isLoading}>
                                {isLoading ? 'Searching...' : 'Search'}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
            
            <Dialog open={isCaptureOpen} onOpenChange={setCaptureOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>One More Step!</DialogTitle>
                        <DialogDescription>
                            Provide your details to view results and earn 10 Sparks Points!
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleCaptureSubmit}>
                        <div className="space-y-4 py-4">
                            <div className="space-y-2">
                                <Label htmlFor="phone">Phone Number</Label>
                                <Input
                                    id="phone"
                                    type="tel"
                                    placeholder="+254712345678"
                                    value={userDetails.phone}
                                    onChange={(e) => setUserDetails(p => ({...p, phone: e.target.value}))}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email Address</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="you@example.com"
                                    value={userDetails.email}
                                    onChange={(e) => setUserDetails(p => ({...p, email: e.target.value}))}
                                    required
                                />
                            </div>
                        </div>
                        <DialogFooter>
                             <Button type="submit" className="w-full">View Results & Claim Sparks</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
}
