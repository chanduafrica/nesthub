
'use client';

import { ArrowLeft, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function EditStayListingPage({ params }: { params: { id: string } }) {
    return (
        <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                    <Button variant="outline" size="icon" asChild>
                        <Link href="/vendor/neststays">
                            <ArrowLeft className="h-4 w-4" />
                        </Link>
                    </Button>
                    <h1 className="text-2xl font-bold">Edit Stay Listing</h1>
                </div>
            </div>

            <div className="flex items-center justify-center h-64 border-2 border-dashed rounded-lg">
                <div className="text-center text-muted-foreground">
                    <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
                    <p>Loading listing details for ID: {params.id}</p>
                    <p>(Edit form functionality coming soon)</p>
                </div>
            </div>
        </div>
    );
}
