
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChartIcon } from 'lucide-react';

export default function VendorAnalyticsPage() {
    return (
        <div className="flex-1 space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold">Analytics & Reports</h1>
                    <p className="text-muted-foreground">Insights into your store's performance.</p>
                </div>
            </div>

            <Card className="flex flex-col items-center justify-center text-center py-12">
                <CardHeader>
                    <BarChartIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <CardTitle>Analytics Dashboard Coming Soon</CardTitle>
                    <CardDescription>Detailed sales, traffic, and revenue reports will be available here.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Button disabled>View Reports</Button>
                </CardContent>
            </Card>
        </div>
    );
}
