
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PlusCircle, Building } from 'lucide-react';
import Link from 'next/link';

export default function NestBizDashboardPage() {
    return (
        <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold">My Business Listings</h1>
                    <p className="text-muted-foreground">Manage your business profiles on NestBiz.</p>
                </div>
                <Button asChild>
                    <Link href="/vendor/nestbiz/add">
                        <PlusCircle className="mr-2 h-4 w-4" /> Add Business
                    </Link>
                </Button>
            </div>
            <Card className="flex flex-col items-center justify-center text-center py-12">
                <CardHeader>
                    <Building className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <CardTitle>No Business Listed Yet</CardTitle>
                    <CardDescription>Get started by creating your business profile.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Button asChild>
                        <Link href="/vendor/nestbiz/add">
                            <PlusCircle className="mr-2 h-4 w-4" /> List Your Business
                        </Link>
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
