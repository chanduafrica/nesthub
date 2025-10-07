
'use client';

import { useState, useMemo } from 'react';
import { Transaction } from '@/lib/mock-data';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Percent, ArrowDown, ArrowUp } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface CommissionsDashboardProps {
    initialTransactions: Transaction[];
}

const STANDARD_COMMISSION_RATE = 0.10; // 10%

export function CommissionsDashboard({ initialTransactions }: CommissionsDashboardProps) {
    const [transactions] = useState(initialTransactions);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const { totalGrossSales, totalCommission, commissionableTransactions } = useMemo(() => {
        let gross = 0;
        let commission = 0;
        const commTxns = transactions.filter(tx => tx.status === 'Completed' && tx.amount > 0);

        commTxns.forEach(tx => {
            gross += tx.amount;
            commission += tx.amount * STANDARD_COMMISSION_RATE;
        });

        return {
            totalGrossSales: gross,
            totalCommission: commission,
            commissionableTransactions: commTxns
        };
    }, [transactions]);
    
    const filteredTransactions = useMemo(() => {
        return commissionableTransactions.filter(tx => 
            tx.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            tx.id.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [commissionableTransactions, searchTerm]);

    const paginatedTransactions = filteredTransactions.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
    
    const formatCurrency = (amount: number) => `KES ${amount.toLocaleString()}`;

    return (
        <div className="flex-1 space-y-6">
             <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold">Commissions & Fees</h1>
                    <p className="text-muted-foreground">A breakdown of your earnings and platform fees.</p>
                </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                 <Card>
                    <CardHeader><CardTitle>Standard Commission</CardTitle></CardHeader>
                    <CardContent>
                        <p className="text-3xl font-bold text-primary">{STANDARD_COMMISSION_RATE * 100}%</p>
                        <p className="text-xs text-muted-foreground">Applied on all completed sales.</p>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader><CardTitle>Total Gross Sales</CardTitle></CardHeader>
                    <CardContent>
                        <p className="text-3xl font-bold flex items-center gap-2">
                           <ArrowUp className="h-6 w-6 text-green-500" />
                           {formatCurrency(totalGrossSales)}
                        </p>
                         <p className="text-xs text-muted-foreground">Total value of completed orders.</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader><CardTitle>Total Commission Paid</CardTitle></CardHeader>
                    <CardContent>
                        <p className="text-3xl font-bold text-destructive flex items-center gap-2">
                           <ArrowDown className="h-6 w-6" />
                           {formatCurrency(totalCommission)}
                        </p>
                        <p className="text-xs text-muted-foreground">Total platform fees deducted.</p>
                    </CardContent>
                </Card>
            </div>
            
             <Card>
              <CardHeader>
                <CardTitle>Commission Ledger</CardTitle>
                <CardDescription>A detailed breakdown of commission on each completed transaction.</CardDescription>
              </CardHeader>
              <CardContent>
                 <div className="relative mb-4">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search by description or ID..." className="pl-10" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
                </div>
                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Date</TableHead>
                                <TableHead>Product/Service</TableHead>
                                <TableHead>Gross Amount</TableHead>
                                <TableHead>Commission</TableHead>
                                <TableHead>Net Earnings</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {paginatedTransactions.length > 0 ? paginatedTransactions.map(tx => (
                                <TableRow key={tx.id}>
                                    <TableCell>{tx.date}</TableCell>
                                    <TableCell className="max-w-[250px] truncate">{tx.description.replace('Purchase of ', '')}</TableCell>
                                    <TableCell>{formatCurrency(tx.amount)}</TableCell>
                                    <TableCell className="text-destructive">- {formatCurrency(tx.amount * STANDARD_COMMISSION_RATE)}</TableCell>
                                    <TableCell className="font-semibold">{formatCurrency(tx.amount * (1 - STANDARD_COMMISSION_RATE))}</TableCell>
                                </TableRow>
                            )) : (
                                <TableRow>
                                    <TableCell colSpan={5} className="h-24 text-center">
                                        No commissionable transactions found.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
              </CardContent>
               <CardFooter className="flex justify-between items-center">
                    <div className="text-xs text-muted-foreground">
                        Showing <strong>{paginatedTransactions.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0}-{(currentPage - 1) * itemsPerPage + paginatedTransactions.length}</strong> of <strong>{filteredTransactions.length}</strong> transactions
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" onClick={() => setCurrentPage(p => Math.max(1, p-1))} disabled={currentPage === 1}>Previous</Button>
                        <Button variant="outline" size="sm" onClick={() => setCurrentPage(p => Math.min(totalPages, p+1))} disabled={currentPage === totalPages || totalPages === 0}>Next</Button>
                    </div>
                </CardFooter>
            </Card>

             <Card>
                <CardHeader>
                    <CardTitle>Subscription Tiers & Commission Rates</CardTitle>
                    <CardDescription>Upgrade your plan to enjoy lower commission rates and unlock more features.</CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="flex flex-col">
                        <CardHeader><CardTitle>Basic Plan</CardTitle><CardDescription>Free</CardDescription></CardHeader>
                        <CardContent className="flex-grow"><p className="text-2xl font-bold">10%</p><p>Commission</p></CardContent>
                        <CardFooter><Button variant="secondary" className="w-full" disabled>Current Plan</Button></CardFooter>
                    </Card>
                     <Card className="border-primary flex flex-col">
                        <CardHeader><CardTitle>Pro Plan</CardTitle><CardDescription>KES 1,000/year</CardDescription></CardHeader>
                        <CardContent className="flex-grow"><p className="text-2xl font-bold">7.5%</p><p>Commission</p><ul className="text-xs mt-2 space-y-1 text-muted-foreground"><li>+ Advanced Analytics</li><li>+ Priority Support</li></ul></CardContent>
                        <CardFooter><Button className="w-full">Upgrade to Pro</Button></CardFooter>
                    </Card>
                     <Card className="flex flex-col">
                        <CardHeader><CardTitle>Enterprise Plan</CardTitle><CardDescription>KES 1,000/month</CardDescription></CardHeader>
                        <CardContent className="flex-grow"><p className="text-2xl font-bold">5%</p><p>Commission</p><ul className="text-xs mt-2 space-y-1 text-muted-foreground"><li>+ Dedicated Account Manager</li><li>+ Lower Commission</li></ul></CardContent>
                        <CardFooter><Button variant="outline" className="w-full">Contact Sales</Button></CardFooter>
                    </Card>
                </CardContent>
            </Card>
        </div>
    );
}
