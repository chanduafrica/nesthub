
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
    Link as LinkIcon
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const Header = () => (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
            <div className="mr-4 hidden md:flex">
                <Link href="/modules/campfire" className="mr-6 flex items-center space-x-2">
                    <Flame className="h-6 w-6 text-primary" />
                    <span className="font-bold text-lg">Campfire</span>
                </Link>
                <nav className="flex items-center space-x-6 text-sm font-medium">
                    <Link href="#circles" className="text-foreground/60 transition-colors hover:text-foreground/80">Circles</Link>
                    <Link href="#talks" className="text-foreground/60 transition-colors hover:text-foreground/80">Talks</Link>
                    <Link href="#challenges" className="text-foreground/60 transition-colors hover:text-foreground/80">Challenges</Link>
                    <Link href="#rewards" className="text-foreground/60 transition-colors hover:text-foreground/80">Rewards</Link>
                    <Link href="/" className="text-foreground/60 transition-colors hover:text-foreground/80">DigitalNest</Link>
                </nav>
            </div>
            <div className="flex flex-1 items-center justify-end">
                <Button variant="secondary">Login to Join</Button>
            </div>
        </div>
    </header>
);

const HeroSection = () => (
    <section className="relative h-[60vh] flex items-center justify-center text-white">
        <Image
            src="https://picsum.photos/1600/900?random=45"
            alt="A diverse group of people engaged in conversation"
            fill
            className="object-cover brightness-50"
            data-ai-hint="african community conversation"
        />
        <div className="relative z-10 container text-center flex flex-col items-center">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                Where Conversations Ignite & Communities Thrive.
            </h1>
            <p className="mt-6 text-lg max-w-3xl mx-auto">
                The engagement layer for Africa's leading SuperApps, Banks, and Telcos. Campfire powers belonging.
            </p>
            <div className="mt-8 flex gap-4">
                <Button size="lg">Explore Circles</Button>
                <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-primary">
                    Integrate Campfire
                </Button>
            </div>
        </div>
    </section>
);

const features = [
    { 
        icon: Users, 
        title: "Interactive Circles",
        id: "circles",
        description: "Topic-based forums on money, careers, mental health, and society where users drive the conversation." 
    },
    { 
        icon: Mic, 
        title: "Campfire Talks",
        id: "talks",
        description: "Live, sponsored AMA sessions with CEOs, creators, and experts, creating valuable branded content." 
    },
    { 
        icon: BarChart3, 
        title: "Polls & Challenges",
        id: "challenges",
        description: "Gamified campaigns and daily debates that generate powerful engagement data and user insights." 
    },
    { 
        icon: Sparkles, 
        title: "Gamified Loyalty",
        id: "rewards",
        description: "Earn 'Sparks' points for engagement and redeem them for real-world rewards across the DigitalNest ecosystem." 
    },
    { 
        icon: HeartHandshake, 
        title: "Safe Mental Health Support",
        id: "support",
        description: "Anonymous peer-support chatrooms and hotline integrations in a moderated, safe space." 
    },
    { 
        icon: PlaySquare, 
        title: "Campfire Stories",
        id: "stories",
        description: "User-generated audio/video stories and podcast partnerships that give a voice to the youth." 
    },
];

const FeaturesSection = () => (
    <section className="py-16 md:py-24 bg-muted/50">
        <div className="container">
             <div className="text-center max-w-3xl mx-auto">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-primary">
                    Community-as-a-Service
                </h2>
                <p className="mt-4 text-lg text-muted-foreground">
                    Campfire is more than a feature; it's an ecosystem designed to foster engagement, loyalty, and belonging within your existing platform.
                </p>
            </div>
            <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {features.map((feature) => (
                    <Card key={feature.title} id={feature.id} className="text-center border-none shadow-lg hover:shadow-xl transition-shadow">
                        <CardHeader className="items-center">
                            <div className="p-4 bg-primary/10 rounded-full">
                                <feature.icon className="h-8 w-8 text-primary" />
                            </div>
                            <CardTitle className="mt-4 !text-xl !text-foreground">{feature.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">{feature.description}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    </section>
);


const UseCaseSection = () => {
    const useCases = [
        { 
            title: "For Banking SuperApps", 
            description: "Keep Millennials/Gen Z engaged with money talks, financial literacy AMAs, and gamified savings challenges.",
            image: "https://picsum.photos/600/400?random=46",
            hint: "mobile banking app"
        },
        { 
            title: "For Telcos", 
            description: "Become the hub for youth culture with discussions on gaming, music, and mental health, driving daily app usage.",
            image: "https://picsum.photos/600/400?random=47",
            hint: "person using phone"
        },
        { 
            title: "For Media Houses", 
            description: "Spark national conversations and debates on society, politics, and relationships, turning passive readers into an active community.",
            image: "https://picsum.photos/600/400?random=48",
            hint: "news media studio"
        },
    ];

    return (
        <section className="py-16 md:py-24">
            <div className="container">
                <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-primary">
                        The Engine of Engagement
                    </h2>
                    <p className="mt-4 text-lg text-muted-foreground">
                       Integrate Campfire to transform your platform into a vibrant, interactive community.
                    </p>
                </div>
                <div className="mt-12 grid md:grid-cols-3 gap-8">
                    {useCases.map(uc => (
                        <Card key={uc.title} className="overflow-hidden">
                            <Image src={uc.image} alt={uc.title} width={600} height={400} className="w-full h-48 object-cover" data-ai-hint={uc.hint} />
                            <CardHeader>
                                <CardTitle className="!text-xl !text-foreground">{uc.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">{uc.description}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}

const CtaSection = () => (
    <section className="py-16 md:py-24 bg-primary text-primary-foreground">
      <div className="container text-center max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-white">
          Ready to build a community, not just a customer base?
        </h2>
        <p className="mt-4 text-lg text-primary-foreground/80">
            Let's integrate Campfire into your ecosystem and unlock the power of belonging.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Button size="lg" variant="secondary">
            Request a Demo
          </Button>
        </div>
      </div>
    </section>
  );

export default function CampfirePage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <UseCaseSection />
        <CtaSection />
      </main>
    </div>
  );
}
