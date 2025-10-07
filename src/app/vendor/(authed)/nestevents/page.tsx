
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PlusCircle, Ticket } from 'lucide-react';
import Link from 'next/link';

export default function NestEventsDashboardPage() {
    return (
        <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold">My Events</h1>
                    <p className="text-muted-foreground">Manage your event listings and ticket sales.</p>
                </div>
                <Button asChild>
                    <Link href="/vendor/nestevents/add">
                        <PlusCircle className="mr-2 h-4 w-4" /> Add Event
                    </Link>
                </Button>
            </div>
            <Card className="flex flex-col items-center justify-center text-center py-12">
                <CardHeader>
                    <Ticket className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <CardTitle>No Events Listed Yet</CardTitle>
                    <CardDescription>Get started by creating your first event on the platform.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Button asChild>
                        <Link href="/vendor/nestevents/add">
                            <PlusCircle className="mr-2 h-4 w-4" /> Create Your First Event
                        </Link>
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
