
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { 
    Users, 
    Mic, 
    BarChart3, 
    Sparkles, 
    HeartHandshake, 
    PlaySquare, 
    ChevronRight,
    MessageCircle,
    Flame,
    ShieldCheck,
    Podcast,
    Home,
    LayoutGrid,
    Link as LinkIcon,
    PlusCircle,
    BookOpen,
    TrendingUp,
    MessageSquareText,
    BadgeHelp,
    Award,
    HomeIcon,
    Plane,
    Briefcase,
    Ticket,
    Store,
    Menu
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { ThreadCard, Thread } from "@/components/modules/campfire/thread-card";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const threads: Thread[] = [
    {
        id: '1',
        title: '#Save500ADay Challenge: How are you managing your savings?',
        author: { name: 'Wanjiku Kamau', avatar: 'https://picsum.photos/40/40?random=1' },
        circle: { name: 'Money', color: 'bg-green-500' },
        tags: ['#Savings', '#FinanceChallenge'],
        content: "I started the #Save500ADay challenge last week and it's tougher than I thought! I've managed to save KES 3,000 so far by cutting down on my daily coffee and packing lunch. What are your best tips for staying consistent?",
        stats: { likes: 128, comments: 45, sparks: 50 },
        isPoll: false,
    },
    {
        id: '2',
        title: 'Best side hustles for a 9-to-5er in Nairobi?',
        author: { name: 'Musa Okello', avatar: 'https://picsum.photos/40/40?random=2' },
        circle: { name: 'Hustle', color: 'bg-blue-500' },
        tags: ['#SideHustle', '#Career'],
        content: "Looking for ideas on side hustles that I can do after work and on weekends. I have skills in graphic design but open to anything. What's working for you guys?",
        stats: { likes: 256, comments: 89, sparks: 80 },
        isPoll: false,
    },
    {
        id: '3',
        title: 'Poll: Is Artificial Intelligence a threat or an opportunity for Kenyan jobs?',
        author: { name: 'Admin', avatar: '/images/dnlogo.png' },
        circle: { name: 'Society', color: 'bg-purple-500' },
        tags: ['#AI', '#FutureOfWork'],
        content: "Let's settle the debate. With the rise of AI tools, do you see them as a major threat to the job market in Kenya, or a powerful opportunity for new kinds of work?",
        stats: { likes: 512, comments: 210, sparks: 150 },
        isPoll: true,
        pollOptions: [
            { text: 'Major Threat', votes: 45 },
            { text: 'Big Opportunity', votes: 35 },
            { text: 'A bit of both', votes: 20 },
        ]
    },
    {
        id: '4',
        title: 'How do you practice self-care on a budget?',
        author: { name: 'Amina Yusuf', avatar: 'https://picsum.photos/40/40?random=4' },
        circle: { name: 'Mind', color: 'bg-yellow-500' },
        tags: ['#MentalHealth', '#Wellness'],
        content: "Wellness is important, but a lot of self-care advice seems expensive (spas, retreats, etc.). What are some affordable or free ways you take care of your mental health?",
        stats: { likes: 320, comments: 112, sparks: 95 },
        isPoll: false,
    }
];


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
                <Button>Login</Button>
            </div>
        </div>
    </header>
);

const Sidebar = () => (
    <aside className="hidden md:block sticky top-[57px] h-[calc(100vh-57px)] w-64 flex-shrink-0">
        <div className="p-4 space-y-4">
             <Button className="w-full justify-start" size="lg" asChild>
                <Link href="/modules/campfire/new">
                    <PlusCircle className="mr-2 h-5 w-5"/> Start a Discussion
                </Link>
             </Button>
            <nav className="space-y-1">
                <h3 className="px-3 text-xs font-semibold text-muted-foreground uppercase">Navigation</h3>
                 <Link href="#" className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-muted">
                    <Home className="h-5 w-5 text-primary" />
                    <span>Home Feed</span>
                </Link>
                 <Link href="#" className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted">
                    <TrendingUp className="h-5 w-5" />
                    <span>Trending</span>
                </Link>
                <h3 className="px-3 pt-4 text-xs font-semibold text-muted-foreground uppercase">Circles</h3>
                 <Link href="#" className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted">
                    <Users className="h-5 w-5 text-green-500" />
                    <span>Money</span>
                </Link>
                <Link href="#" className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted">
                    <Sparkles className="h-5 w-5 text-blue-500" />
                    <span>Hustle</span>
                </Link>
                 <Link href="#" className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted">
                    <HeartHandshake className="h-5 w-5 text-yellow-500" />
                    <span>Mind</span>
                </Link>
                 <Link href="#" className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted">
                    <Users className="h-5 w-5 text-purple-500" />
                    <span>Society</span>
                </Link>
                <h3 className="px-3 pt-4 text-xs font-semibold text-muted-foreground uppercase">Resources</h3>
                 <Link href="#" className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted">
                    <Mic className="h-5 w-5" />
                    <span>Campfire Talks</span>
                </Link>
                <Link href="#" className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted">
                    <BarChart3 className="h-5 w-5" />
                    <span>Polls & Challenges</span>
                </Link>
                 <Link href="#" className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted">
                    <Award className="h-5 w-5" />
                    <span>Rewards</span>
                </Link>
                 <Link href="#" className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted">
                    <ShieldCheck className="h-5 w-5" />
                    <span>Support & Wellness</span>
                </Link>
            </nav>
        </div>
    </aside>
)


export default function CampfireForumPage() {
  return (
    <div className="flex flex-col min-h-screen bg-muted/40">
      <Header />
      <div className="container flex flex-1">
        <Sidebar />
        <main className="flex-1 py-6 md:px-8">
            <div className="space-y-6">
                {threads.map(thread => (
                    <ThreadCard key={thread.id} thread={thread} />
                ))}
            </div>
        </main>
        <aside className="sticky top-[57px] h-[calc(100vh-57px)] w-80 flex-shrink-0 p-6 hidden xl:block">
            <Card>
                <CardHeader>
                    <CardTitle>🔥 Trending on Campfire</CardTitle>
                    <CardDescription>Hottest topics right now.</CardDescription>
                </CardHeader>
                <CardContent>
                     <ul className="space-y-3">
                        <li className="text-sm font-medium hover:underline"><Link href="#">#SideHustleShowcase: What did you build this week?</Link></li>
                        <li className="text-sm font-medium hover:underline"><Link href="#">SGR vs Flight to Mombasa: What's the real cost?</Link></li>
                        <li className="text-sm font-medium hover:underline"><Link href="#">Guide to investing in Money Market Funds in Kenya.</Link></li>
                        <li className="text-sm font-medium hover:underline"><Link href="#">Best places for a weekend getaway near Nairobi.</Link></li>
                    </ul>
                </CardContent>
            </Card>
        </aside>
      </div>
    </div>
  );
}

    
