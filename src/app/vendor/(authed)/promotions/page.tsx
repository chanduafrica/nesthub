
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';

export default function VendorPromotionsPage() {
    return (
        <div className="flex-1 space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold">Promotions & Ads</h1>
                    <p className="text-muted-foreground">Boost your sales with promotional tools.</p>
                </div>
            </div>

            <Card className="flex flex-col items-center justify-center text-center py-12">
                <CardHeader>
                    <Sparkles className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <CardTitle>Promotions Dashboard Coming Soon</CardTitle>
                    <CardDescription>Create discount codes, run flash sales, and manage ad campaigns here.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Button disabled>Create Promotion</Button>
                </CardContent>
            </Card>
        </div>
    );
}
