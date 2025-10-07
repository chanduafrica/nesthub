
'use client';

import { useState, useMemo } from 'react';
import { Transaction } from '@/lib/mock-data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Award, CheckCircle, Gift, Sparkles, TrendingUp, UserPlus, Zap } from 'lucide-react';

interface SparksDashboardProps {
    initialTransactions: Transaction[];
}

const SPARKS_PER_KES = 0.1; // 1 Spark for every 10 KES sold

export function SparksDashboard({ initialTransactions }: SparksDashboardProps) {

    const { sparksEarned, tier, nextTier, progressToNext } = useMemo(() => {
        const totalSales = initialTransactions
            .filter(tx => tx.status === 'Completed' && tx.amount > 0)
            .reduce((sum, tx) => sum + tx.amount, 0);
        
        const sparks = Math.floor(totalSales * SPARKS_PER_KES);

        let currentTier = "Bronze";
        let nextTier = "Silver";
        let progress = 0;

        if (sparks >= 10000 && sparks < 50000) {
            currentTier = "Silver";
            nextTier = "Gold";
            progress = ((sparks - 10000) / (50000 - 10000)) * 100;
        } else if (sparks >= 50000) {
            currentTier = "Gold";
            nextTier = "Gold";
            progress = 100;
        } else {
            progress = (sparks / 10000) * 100;
        }

        return { 
            sparksEarned: sparks,
            tier: currentTier,
            nextTier: nextTier,
            progressToNext: progress
        };
    }, [initialTransactions]);

    return (
        <div className="flex-1 space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold">Sparks Loyalty Program</h1>
                    <p className="text-muted-foreground">Your rewards dashboard for being a valued NestVendor.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-1">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Sparkles className="h-5 w-5 text-primary"/> Total Sparks Balance</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-5xl font-bold">{sparksEarned.toLocaleString()}</p>
                    </CardContent>
                </Card>
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Award className="h-5 w-5 text-primary"/> Your Vendor Tier</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-baseline gap-4">
                            <p className="text-4xl font-bold">{tier}</p>
                            {tier !== "Gold" && <p className="text-muted-foreground">Next Tier: {nextTier}</p>}
                        </div>
                        <Progress value={progressToNext} className="mt-2" />
                        <p className="text-xs text-muted-foreground mt-1">{tier === "Gold" ? "You've reached the highest tier!" : `${Math.round(progressToNext)}% to the next tier.`}</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                    <CardHeader><CardTitle>How to Earn Sparks</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-start gap-4"><CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0"/><p>Earn <strong>1 Spark for every 10 KES</strong> in completed sales across all portals.</p></div>
                        <div className="flex items-start gap-4"><UserPlus className="h-5 w-5 text-green-500 mt-1 flex-shrink-0"/><p>Get <strong>500 Sparks</strong> for every new vendor you refer who gets verified.</p></div>
                        <div className="flex items-start gap-4"><TrendingUp className="h-5 w-5 text-green-500 mt-1 flex-shrink-0"/><p>Receive bonus Sparks for participating in platform-wide promotional events.</p></div>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader><CardTitle>Redeem Your Sparks</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-start gap-4"><Zap className="h-5 w-5 text-primary mt-1 flex-shrink-0"/><p>Convert Sparks to ad credits to boost your listings.</p></div>
                        <div className="flex items-start gap-4"><Gift className="h-5 w-5 text-primary mt-1 flex-shrink-0"/><p>Redeem for discounts on your vendor subscription plan.</p></div>
                        <div className="flex items-start gap-4"><CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0"/><p>Unlock exclusive platform features and early access to new tools.</p></div>
                    </CardContent>
                     <CardFooter><Button className="w-full">Redeem Now</Button></CardFooter>
                </Card>
            </div>

             <Card>
                <CardHeader><CardTitle>Recent Sparks Activity</CardTitle></CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader><TableRow><TableHead>Date</TableHead><TableHead>Description</TableHead><TableHead className="text-right">Sparks</TableHead></TableRow></TableHeader>
                        <TableBody>
                            <TableRow><TableCell>2025-07-28</TableCell><TableCell>Sale from Order #TXN29</TableCell><TableCell className="text-right text-green-600 font-medium">+12,000</TableCell></TableRow>
                            <TableRow><TableCell>2025-07-28</TableCell><TableCell>Sale from Order #TXN30</TableCell><TableCell className="text-right text-green-600 font-medium">+50,000</TableCell></TableRow>
                            <TableRow><TableCell>2025-07-25</TableCell><TableCell>Redeemed for Ad Credit</TableCell><TableCell className="text-right text-destructive font-medium">-5,000</TableCell></TableRow>
                            <TableRow><TableCell>2025-07-24</TableCell><TableCell>Sale from Order #TXN23</TableCell><TableCell className="text-right text-green-600 font-medium">+950</TableCell></TableRow>
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

        </div>
    );
}
