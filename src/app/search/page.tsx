
'use client';

import { useSearchParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { NestSearchResult, searchNest } from '@/ai/flows/nest-search-flow';
import { Loader2, ExternalLink, Menu, ShoppingCart, Dna, Car, School, Plane, Building, BedDouble, MessageSquare, UtensilsCrossed, Ticket, Info, FileText, Shield, RefreshCw, Mail as MailIconLucide, UserCircle, Award } from 'lucide-react';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { useToast } from '@/hooks/use-toast';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';


const navLinks = [
  { href: "/modules/mall", icon: ShoppingCart, text: "NestMall" },
  { href: "#", icon: Dna, text: "Duka" },
  { href: "/modules/mall", icon: Car, text: "BuyMyCar" },
  { href: "#", icon: School, text: "Back2School" },
  { href: "/modules/travel", icon: Plane, text: "Travel" },
  { href: "/modules/homes/properties", icon: Building, text: "Properties" },
  { href: "/modules/stays", icon: BedDouble, text: "Stays"},
  { href: "/modules/campfire", icon: MessageSquare, text: "Join Campfire" },
  { href: "#", icon: UtensilsCrossed, text: "Mama Africa", comingSoon: true },
  { href: "#", icon: Ticket, text: "Events", comingSoon: true },
];

function Header() {
  const { toast } = useToast();

  const handleComingSoon = (e: React.MouseEvent, feature: string) => {
    e.preventDefault();
    toast({
      title: "Coming Soon!",
      description: `${feature} is under construction. Stay tuned!`,
    });
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="w-[94%] mx-auto flex h-14 items-center justify-between">
        <div className="flex items-center">
          <Sheet>
              <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="lg:hidden mr-2">
                      <Menu className="h-6 w-6" />
                      <span className="sr-only">Toggle Menu</span>
                  </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                   <SheetHeader className="p-4 border-b">
                       <div className="flex items-center gap-3">
                           <Image src="/images/dnlogo.png" alt="SG-Nest Logo" width={32} height={32} />
                           <span className="font-semibold text-lg">Nest Portals</span>
                       </div>
                   </SheetHeader>
                  <nav className="flex flex-col gap-4 mt-4 p-4">
                      {navLinks.map((link) => 
                        link.href ? (
                          <Link
                            key={link.text}
                            href={link.href}
                            onClick={(e) => (link as any).comingSoon && handleComingSoon(e, link.text)}
                            className="flex items-center gap-3 text-lg font-medium text-muted-foreground hover:text-foreground"
                          >
                              <link.icon className="h-5 w-5" />
                              {link.text}
                          </Link>
                        ) : (
                          <div key={link.text}>
                            <p className="flex items-center gap-3 text-lg font-medium text-foreground px-2 pt-4 pb-2">{link.text}</p>
                          </div>
                        )
                      )}
                  </nav>
              </SheetContent>
          </Sheet>
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-bold text-lg">
              <span className="text-primary">SG-</span><span className="text-secondary">NEST</span>
            </span>
          </Link>
        </div>

         <nav className="hidden lg:flex items-center gap-2 text-sm font-medium ml-6">
           {navLinks.map((link) => (
            <Link
              key={link.text}
              href={link.href}
              onClick={(e) => (link as any).comingSoon && handleComingSoon(e, link.text)}
              className="flex items-center gap-1 text-muted-foreground transition-colors hover:text-foreground px-3 py-2 rounded-md"
            >
              <link.icon className="h-4 w-4" />
              {link.text}
            </Link>
           ))}
        </nav>
        <div className="flex items-center gap-4">
            <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <UserCircle className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/customer/dashboard">Dashboard</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/home">Logout</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

const Footer = () => (
    <footer className="border-t bg-gray-900 text-gray-300">
      <div className="w-[94%] mx-auto flex flex-col items-center justify-between gap-6 py-8 md:flex-row">
        <div className="flex items-center gap-2">
          <p className="text-sm">
            © {new Date().getFullYear()} Standard Group x NestHub | All Rights Reserved.
          </p>
        </div>
         <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            <Link href="#" className="text-sm text-white hover:underline flex items-center gap-2">
                <Info className="h-4 w-4" /> About us
            </Link>
            <Link href="#" className="text-sm text-white hover:underline flex items-center gap-2">
                <FileText className="h-4 w-4" /> Terms
            </Link>
            <Link href="#" className="text-sm text-white hover:underline flex items-center gap-2">
                <Shield className="h-4 w-4" /> Privacy policy
            </Link>
            <Link href="#" className="text-sm text-white hover:underline flex items-center gap-2">
                <RefreshCw className="h-4 w-4" /> Refund
            </Link>
            <Link href="#" className="text-sm text-white hover:underline flex items-center gap-2">
                <MailIconLucide className="h-4 w-4" /> Contact us
            </Link>
        </div>
      </div>
    </footer>
  );


function SearchResults() {
    const searchParams = useSearchParams();
    const query = searchParams.get('q') || '';
    const phone = searchParams.get('phone');
    const email = searchParams.get('email');

    const [results, setResults] = useState<NestSearchResult[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (query) {
            const performSearch = async () => {
                setLoading(true);
                setError(null);
                try {
                    const searchResults = await searchNest(query);
                    setResults(searchResults);
                } catch (e) {
                    console.error(e);
                    setError('An error occurred while searching. Please try again.');
                } finally {
                    setLoading(false);
                }
            };
            performSearch();
        } else {
            setLoading(false);
        }
    }, [query]);

    const portals = [...new Set(results.map(r => r.portal))];

    return (
        <div className="container mx-auto py-12">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold">NestSearch Results</h1>
                <p className="text-muted-foreground">Showing results for: <span className="font-semibold text-primary">"{query}"</span></p>
                {phone && <p className="text-sm text-muted-foreground mt-1">Contact Details: {phone} / {email}</p>}
                
                <Card className="max-w-xs mx-auto mt-4 bg-green-50 border-green-200">
                    <CardContent className="p-3 flex items-center justify-center gap-2">
                        <Award className="h-6 w-6 text-green-600" />
                        <span className="font-semibold text-green-700">10 Spark Points Earned!</span>
                    </CardContent>
                </Card>
            </div>

            {loading ? (
                <div className="flex flex-col items-center justify-center h-64 text-center">
                    <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
                    <p className="text-lg text-muted-foreground">Nest AI is searching across all portals for you...</p>
                </div>
            ) : error ? (
                 <Card className="text-center">
                    <CardHeader>
                        <CardTitle className="text-destructive">Search Failed</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>{error}</p>
                        <Button asChild variant="link" className="mt-4">
                            <Link href="/home">Back to Home</Link>
                        </Button>
                    </CardContent>
                </Card>
            ) : results.length === 0 ? (
                 <Card>
                    <CardHeader>
                        <CardTitle>No Results Found</CardTitle>
                        <CardDescription>We couldn't find any items matching your search.</CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center justify-center h-64 text-center">
                        <p className="text-lg text-muted-foreground">Try a different search term.</p>
                        <Button asChild variant="link" className="mt-4">
                            <Link href="/home">Back to Home</Link>
                        </Button>
                    </CardContent>
                </Card>
            ) : (
                <Tabs defaultValue="all" className="w-full">
                    <div className="flex justify-center mb-4">
                        <TabsList>
                            <TabsTrigger value="all">All ({results.length})</TabsTrigger>
                            {portals.map(portal => (
                                <TabsTrigger key={portal} value={portal}>
                                    {portal} ({results.filter(r => r.portal === portal).length})
                                </TabsTrigger>
                            ))}
                        </TabsList>
                    </div>

                    <TabsContent value="all">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {results.map((item, index) => <ResultCard key={index} item={item} />)}
                        </div>
                    </TabsContent>

                    {portals.map(portal => (
                         <TabsContent key={portal} value={portal}>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {results.filter(r => r.portal === portal).map((item, index) => <ResultCard key={index} item={item} />)}
                            </div>
                        </TabsContent>
                    ))}
                </Tabs>
            )}
        </div>
    );
}

function ResultCard({ item }: { item: NestSearchResult }) {
    return (
        <Card className="overflow-hidden group flex flex-col">
            <div className="relative h-56 w-full">
                 <Image src={item.imageUrl} alt={item.title} fill className="object-cover" />
                 <div className="absolute top-2 right-2">
                     <Badge>{item.portal}</Badge>
                 </div>
            </div>
             <CardContent className="p-4 flex-grow flex flex-col">
                <h3 className="font-semibold text-lg leading-tight flex-grow">{item.title}</h3>
                <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{item.description}</p>
                 {item.price && <p className="mt-2 font-bold text-primary text-lg">KES {item.price.toLocaleString()}</p>}
             </CardContent>
             <div className="p-4 pt-0">
                <Button asChild className="w-full">
                    <Link href={item.url} target="_blank">
                        View More <ExternalLink className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
            </div>
        </Card>
    );
}

export default function SearchResultsPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">
                <SearchResults />
            </main>
            <Footer />
        </div>
    );
}

    