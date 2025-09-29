
'use client';

import { useSearchParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function SearchResultsPage() {
    const searchParams = useSearchParams();
    const query = searchParams.get('q');
    const phone = searchParams.get('phone');
    const email = searchParams.get('email');

    return (
        <div className="container mx-auto py-12">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold">NestSearch Results</h1>
                <p className="text-muted-foreground">Showing results for: <span className="font-semibold text-primary">"{query}"</span></p>
                <p className="text-sm text-muted-foreground mt-2">Contact Details Captured: {phone} / {email}</p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Search Results Placeholder</CardTitle>
                    <CardDescription>The AI search logic and results display will be implemented in the next step.</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center h-64 text-center">
                    <p className="text-lg text-muted-foreground">Top 10 results will be displayed here.</p>
                    <Button asChild variant="link" className="mt-4">
                        <Link href="/home">Back to Home</Link>
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
