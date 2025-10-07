
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star, MessageSquare } from 'lucide-react';

export default function VendorReviewsPage() {
    return (
        <div className="flex-1 space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold">Reviews & Ratings</h1>
                    <p className="text-muted-foreground">Manage customer feedback for your products and services.</p>
                </div>
            </div>

            <Card className="flex flex-col items-center justify-center text-center py-12">
                <CardHeader>
                    <Star className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <CardTitle>Reviews Dashboard Coming Soon</CardTitle>
                    <CardDescription>This is where you will see, manage, and respond to customer reviews.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Button disabled>View All Reviews</Button>
                </CardContent>
            </Card>
        </div>
    );
}
