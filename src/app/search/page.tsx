
'use client';

import { useSearchParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { NestSearchResult, searchNest } from '@/ai/flows/nest-search-flow';
import { Loader2, ExternalLink } from 'lucide-react';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';


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
                {phone && <p className="text-sm text-muted-foreground mt-2">Contact Details Captured: {phone} / {email}</p>}
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
        <SearchResults />
    );
}
