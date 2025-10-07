
'use client';

import { useState, useMemo } from 'react';
import { Review } from '@/lib/mock-data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MoreHorizontal, Star, MessageCircle, TrendingUp, ThumbsUp, ThumbsDown, Meh, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

export function ReviewsDashboard({ initialReviews }: { initialReviews: Review[] }) {
    const [reviews, setReviews] = useState<Review[]>(initialReviews);

    const { averageRating, totalReviews, sentimentCounts } = useMemo(() => {
        const total = reviews.length;
        if (total === 0) {
            return { averageRating: 0, totalReviews: 0, sentimentCounts: { Positive: 0, Neutral: 0, Negative: 0 } };
        }
        const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
        const avg = sum / total;
        
        const sentiments = reviews.reduce((acc, review) => {
            const sentiment = review.sentiment || 'Neutral';
            acc[sentiment]++;
            return acc;
        }, { Positive: 0, Neutral: 0, Negative: 0 });

        return {
            averageRating: parseFloat(avg.toFixed(1)),
            totalReviews: total,
            sentimentCounts: sentiments
        };
    }, [reviews]);

    const ReviewItem = ({ review }: { review: Review }) => (
        <Card>
            <CardHeader className="flex flex-row items-start justify-between gap-4">
                <div>
                    <p className="font-semibold">{review.title}</p>
                    <p className="text-sm text-muted-foreground">For: <a href="#" className="text-primary hover:underline">{review.productTitle}</a></p>
                </div>
                 <DropdownMenu>
                    <DropdownMenuTrigger asChild><Button variant="ghost" size="icon" className="h-8 w-8"><MoreHorizontal className="h-4 w-4"/></Button></DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem><CheckCircle className="mr-2 h-4 w-4"/>Approve</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive"><XCircle className="mr-2 h-4 w-4"/>Reject</DropdownMenuItem>
                         <DropdownMenuSeparator />
                        <DropdownMenuItem><AlertTriangle className="mr-2 h-4 w-4"/>Flag as Inappropriate</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </CardHeader>
            <CardContent>
                <div className="flex items-center gap-2 mb-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className={`h-5 w-5 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground/30 fill-muted-foreground/30'}`} />
                    ))}
                </div>
                <p className="text-muted-foreground text-sm mb-4">{review.comment}</p>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6"><AvatarFallback>{review.customerName.charAt(0)}</AvatarFallback></Avatar>
                        <span>{review.customerName}</span>
                    </div>
                    <span>{review.date}</span>
                </div>
                 <div className="mt-4 border-t pt-4">
                    <Label htmlFor={`reply-${review.id}`} className="text-xs font-semibold">Your Response</Label>
                    <Textarea id={`reply-${review.id}`} placeholder="Write a public reply..." className="mt-1" />
                    <Button size="sm" className="mt-2">Post Reply</Button>
                </div>
            </CardContent>
        </Card>
    );

    return (
        <div className="flex-1 space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold">Reviews & Ratings</h1>
                    <p className="text-muted-foreground">Manage customer feedback for your products and services.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card>
                    <CardHeader><CardTitle>Overall Rating</CardTitle></CardHeader>
                    <CardContent className="flex items-center gap-4">
                        <p className="text-5xl font-bold text-primary">{averageRating.toFixed(1)}</p>
                        <div>
                             <div className="flex items-center">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <Star key={i} className={`h-5 w-5 ${i < averageRating ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground/30 fill-muted-foreground/30'}`} />
                                ))}
                            </div>
                            <p className="text-sm text-muted-foreground">Based on {totalReviews} reviews</p>
                        </div>
                    </CardContent>
                </Card>
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle>AI Customer Sentiment</CardTitle>
                        <CardDescription>An AI-powered summary of your customer feedback.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center gap-6">
                            <div className="flex-1 text-center">
                                <ThumbsUp className="h-8 w-8 text-green-500 mx-auto mb-2" />
                                <p className="text-2xl font-bold">{sentimentCounts.Positive}</p>
                                <p className="text-sm text-muted-foreground">Positive</p>
                            </div>
                            <div className="flex-1 text-center">
                                <Meh className="h-8 w-8 text-amber-500 mx-auto mb-2" />
                                <p className="text-2xl font-bold">{sentimentCounts.Neutral}</p>
                                <p className="text-sm text-muted-foreground">Neutral</p>
                            </div>
                            <div className="flex-1 text-center">
                                <ThumbsDown className="h-8 w-8 text-red-500 mx-auto mb-2" />
                                <p className="text-2xl font-bold">{sentimentCounts.Negative}</p>
                                <p className="text-sm text-muted-foreground">Negative</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
            
             <Card>
                <CardHeader>
                    <CardTitle>All Reviews ({totalReviews})</CardTitle>
                    <CardDescription>Manage and respond to all incoming reviews.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {reviews.length > 0 ? (
                        reviews.map(review => <ReviewItem key={review.id} review={review} />)
                    ) : (
                         <div className="text-center py-12 text-muted-foreground">
                            <MessageCircle className="h-12 w-12 mx-auto mb-4" />
                            <p>You have not received any reviews yet.</p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
