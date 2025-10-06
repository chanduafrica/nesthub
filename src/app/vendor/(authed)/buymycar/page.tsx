import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PlusCircle } from 'lucide-react';
import Link from 'next/link';

export default function BuyMyCarDashboardPage() {
    return (
        <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold">My Vehicles</h1>
                    <p className="text-muted-foreground">Manage your vehicle listings for the BuyMyCar portal.</p>
                </div>
                <Button asChild>
                    <Link href="/vendor/buymycar/add">
                        <PlusCircle className="mr-2 h-4 w-4" /> Add Vehicle
                    </Link>
                </Button>
            </div>
            <Card className="flex flex-col items-center justify-center text-center py-12">
                <CardHeader>
                    <CardTitle>No Vehicles Listed Yet</CardTitle>
                    <CardDescription>Get started by adding your first car to the marketplace.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Button asChild>
                        <Link href="/vendor/buymycar/add">
                            <PlusCircle className="mr-2 h-4 w-4" /> Add Your First Vehicle
                        </Link>
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
