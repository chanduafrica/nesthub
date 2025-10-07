
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageSquare } from 'lucide-react';

export default function VendorMessagesPage() {
    return (
        <div className="flex-1 space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold">Messages & Support</h1>
                    <p className="text-muted-foreground">Communicate with customers and the admin team.</p>
                </div>
            </div>

            <Card className="flex flex-col items-center justify-center text-center py-12">
                <CardHeader>
                    <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <CardTitle>Chat & Support Coming Soon</CardTitle>
                    <CardDescription>Your unified inbox for customer inquiries and support tickets will be here.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Button disabled>Open Inbox</Button>
                </CardContent>
            </Card>
        </div>
    );
}
