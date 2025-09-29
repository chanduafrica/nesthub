

'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { 
    MessageCircle,
    Flame,
    Home,
    ArrowLeft,
    HomeIcon,
    Plane,
    Briefcase,
    Store,
    Menu
} from "lucide-react";
import Link from "next/link";
import { ThreadCard, Thread } from "@/components/modules/campfire/thread-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { NestSearch } from '@/components/nest-search';

// Mock data, in a real app this would be fetched based on the [id] param
const thread: Thread = {
    id: '1',
    title: '#Save500ADay Challenge: How are you managing your savings?',
    author: { name: 'Wanjiku Kamau', avatar: 'https://picsum.photos/40/40?random=1' },
    circle: { name: 'Money', color: 'bg-green-500' },
    tags: ['#Savings', '#FinanceChallenge'],
    content: "I started the #Save500ADay challenge last week and it's tougher than I thought! I've managed to save KES 3,000 so far by cutting down on my daily coffee and packing lunch. What are your best tips for staying consistent?\n\nSo far I've tried:\n- Meal prepping on Sundays.\n- Using a separate M-Pesa line just for savings.\n- Unsubscribing from marketing emails.\n\nWhat else works for you?",
    stats: { likes: 128, comments: 45, sparks: 50 },
    isPoll: false,
};

const comments = [
    { author: { name: 'Musa Okello', avatar: 'https://picsum.photos/40/40?random=2' }, content: "Great start! I use the 'round-up' feature on my banking app. Every transaction rounds up to the nearest 100 bob and the difference is saved automatically. It adds up quickly!" },
    { author: { name: 'Amina Yusuf', avatar: 'https://picsum.photos/40/40?random=4' }, content: "I have a standing order to my savings account on payday. 'Pay yourself first' before you even see the money. It's the only way for me." },
    { author: { name: 'Juma Omondi', avatar: 'https://picsum.photos/40/40?random=9' }, content: "I track every single shilling on an Excel sheet. Sounds tedious but it makes you very aware of where your money is going." },
]

const Header = () => (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
             <div className="mr-4 hidden md:flex">
                <Link href="/modules/campfire" className="mr-6 flex items-center space-x-2">
                    <Flame className="h-6 w-6 text-primary" />
                    <span className="font-bold text-lg">Campfire</span>
                </Link>
                <nav className="flex items-center space-x-4 text-sm font-medium">
                        <Link href="/modules/homes/properties" className="flex items-center gap-2 text-foreground/60 transition-colors hover:text-foreground/80"><HomeIcon className="h-4 w-4" />Properties</Link>
                        <Link href="/modules/travel" className="flex items-center gap-2 text-foreground/60 transition-colors hover:text-foreground/80"><Plane className="h-4 w-4" />Travel</Link>
                        <Link href="/modules/stays" className="flex items-center gap-2 text-foreground/60 transition-colors hover:text-foreground/80"><Briefcase className="h-4 w-4" />Stays</Link>
                        <Link href="/modules/mall" className="flex items-center gap-2 text-foreground/60 transition-colors hover:text-foreground/80"><Store className="h-4 w-4" />Marketplace</Link>
                        <Link href="/" className="flex items-center gap-2 text-foreground/60 transition-colors hover:text-foreground/80">SG-Nest</Link>
                </nav>
            </div>
             <div className="md:hidden">
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon">
                            <Menu className="h-6 w-6" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left">
                         <SheetHeader>
                            <SheetTitle className="sr-only">Main Menu</SheetTitle>
                         </SheetHeader>
                         <Link href="/modules/campfire" className="mr-6 flex items-center space-x-2 mb-4">
                            <Flame className="h-6 w-6 text-primary" />
                            <span className="font-bold text-lg">Campfire</span>
                        </Link>
                        <nav className="flex flex-col space-y-4 text-md font-medium">
                            <Link href="/modules/homes/properties" className="flex items-center gap-2 text-foreground/80 transition-colors hover:text-foreground"><HomeIcon className="h-5 w-5" />Properties</Link>
                            <Link href="/modules/travel" className="flex items-center gap-2 text-foreground/80 transition-colors hover:text-foreground"><Plane className="h-5 w-5" />Travel</Link>
                            <Link href="/modules/stays" className="flex items-center gap-2 text-foreground/80 transition-colors hover:text-foreground"><Briefcase className="h-5 w-5" />Stays</Link>
                            <Link href="/modules/mall" className="flex items-center gap-2 text-foreground/80 transition-colors hover:text-foreground"><Store className="h-5 w-5" />Marketplace</Link>
                            <Link href="/" className="flex items-center gap-2 text-foreground/80 transition-colors hover:text-foreground">SG-Nest</Link>
                        </nav>
                    </SheetContent>
                </Sheet>
            </div>
            <div className="flex flex-1 items-center justify-end">
                 <Button variant="outline" size="sm" asChild>
                    <Link href="/modules/campfire">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Feed
                    </Link>
                </Button>
            </div>
        </div>
    </header>
);

export default function ThreadDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="flex flex-col min-h-screen bg-muted/40">
        <Header />

        <main className="container py-8 max-w-4xl mx-auto">
            <div className="space-y-6">
                <ThreadCard thread={thread} />
                
                <Card>
                    <CardHeader>
                        <h3 className="font-semibold">Leave a comment</h3>
                    </CardHeader>
                    <CardContent>
                        <Textarea placeholder="Share your thoughts or tips..." />
                    </CardContent>
                    <CardFooter>
                        <Button>Post Comment</Button>
                    </CardFooter>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle id="comments">Comments ({comments.length})</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {comments.map((comment, index) => (
                            <div key={index} className="flex items-start gap-4">
                                <Avatar className="h-9 w-9">
                                    <AvatarImage src={comment.author.avatar} alt={comment.author.name} />
                                    <AvatarFallback>{comment.author.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                    <p className="font-semibold text-sm">{comment.author.name}</p>
                                    <p className="text-sm text-muted-foreground">{comment.content}</p>
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>
        </main>
        <NestSearch />
    </div>
  );
}
