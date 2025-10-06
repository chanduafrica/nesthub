import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PlusCircle, ShoppingCart } from 'lucide-react';
import Link from 'next/link';

export default function DukaDashboardPage() {
    return (
        <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold">My Duka Products</h1>
                    <p className="text-muted-foreground">Manage your FMCG product listings.</p>
                </div>
                <Button asChild>
                    <Link href="/vendor/duka/add">
                        <PlusCircle className="mr-2 h-4 w-4" /> Add Product
                    </Link>
                </Button>
            </div>
            <Card className="flex flex-col items-center justify-center text-center py-12">
                <CardHeader>
                    <ShoppingCart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <CardTitle>No Products Listed Yet</CardTitle>
                    <CardDescription>Get started by adding your first product to your Duka.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Button asChild>
                        <Link href="/vendor/duka/add">
                            <PlusCircle className="mr-2 h-4 w-4" /> Add Your First Product
                        </Link>
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
