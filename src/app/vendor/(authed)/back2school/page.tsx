
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PlusCircle } from 'lucide-react';
import Link from 'next/link';

export default function Back2SchoolDashboardPage() {
    return (
        <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold">My Back2School Products</h1>
                    <p className="text-muted-foreground">Manage your school supply listings.</p>
                </div>
                <Button asChild>
                    <Link href="/vendor/back2school/add">
                        <PlusCircle className="mr-2 h-4 w-4" /> Add Product
                    </Link>
                </Button>
            </div>
            <Card className="flex flex-col items-center justify-center text-center py-12">
                <CardHeader>
                    <CardTitle>No Products Listed Yet</CardTitle>
                    <CardDescription>Get started by adding your first school product to the marketplace.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Button asChild>
                        <Link href="/vendor/back2school/add">
                            <PlusCircle className="mr-2 h-4 w-4" /> Add Your First Product
                        </Link>
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
