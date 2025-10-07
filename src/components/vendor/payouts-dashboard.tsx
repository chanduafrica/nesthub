
'use client';

import { useState, useMemo } from 'react';
import { Transaction, TransactionStatus } from '@/lib/mock-data';
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Search, MoreHorizontal, FileDown, Landmark, Download } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';

interface PayoutsDashboardProps {
    initialTransactions: Transaction[];
}

export function PayoutsDashboard({ initialTransactions }: PayoutsDashboardProps) {
    const [transactions, setTransactions] = useState(initialTransactions);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const { toast } = useToast();

    const { availableForPayout, pendingBalance, lifetimeEarnings } = useMemo(() => {
        let available = 0;
        let pending = 0;
        let lifetime = 0;

        transactions.forEach(tx => {
            if (tx.status === 'Completed') {
                lifetime += tx.amount;
                // Assuming a 7-day escrow for completed payments
                if (new Date(tx.date) < new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)) {
                    available += tx.amount;
                } else {
                    pending += tx.amount;
                }
            } else if (tx.status === 'Pending') {
                 pending += tx.amount;
            }
        });
        
        return { 
            availableForPayout: available * 0.9, // Assuming 10% commission
            pendingBalance: pending,
            lifetimeEarnings: lifetime
        };

    }, [transactions]);
    
    const handleRequestPayout = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const amount = Number(formData.get('amount'));
        
        if(amount > availableForPayout) {
            toast({ title: "Invalid Amount", description: "Payout amount cannot exceed available balance.", variant: "destructive" });
            return;
        }

        toast({ title: "Payout Requested", description: `KES ${amount.toLocaleString()} has been requested for payout.`});
        // Here you would close the dialog. Assuming the dialog auto-closes on form submission via parent state.
    }

    const filteredTransactions = useMemo(() => {
        return transactions.filter(tx => 
            tx.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            tx.id.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [transactions, searchTerm]);

    const paginatedTransactions = filteredTransactions.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);

    return (
        <div className="flex-1 space-y-6">
             <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold">Payouts & Wallet</h1>
                    <p className="text-muted-foreground">Manage your earnings and request payouts.</p>
                </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <Card>
                    <CardHeader><CardTitle>Available for Payout</CardTitle></CardHeader>
                    <CardContent>
                        <p className="text-3xl font-bold text-green-500">KES {availableForPayout.toLocaleString()}</p>
                        <p className="text-xs text-muted-foreground">After 10% platform commission.</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader><CardTitle>Pending (in Escrow)</CardTitle></CardHeader>
                    <CardContent>
                        <p className="text-3xl font-bold">KES {pendingBalance.toLocaleString()}</p>
                        <p className="text-xs text-muted-foreground">Funds from recent sales.</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader><CardTitle>Lifetime Earnings</CardTitle></CardHeader>
                    <CardContent>
                        <p className="text-3xl font-bold">KES {lifetimeEarnings.toLocaleString()}</p>
                        <p className="text-xs text-muted-foreground">Total gross sales on the platform.</p>
                    </CardContent>
                </Card>
            </div>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle>Transaction History</CardTitle>
                    <CardDescription>A log of all your sales and payouts.</CardDescription>
                </div>
                <div className="flex gap-2">
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button><Landmark className="mr-2 h-4 w-4"/>Request Payout</Button>
                        </DialogTrigger>
                        <PayoutDialog onSubmit={handleRequestPayout} availableAmount={availableForPayout} />
                    </Dialog>
                    <Button variant="outline"><FileDown className="mr-2 h-4 w-4"/>Export</Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="relative mb-4">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search by description or ID..." className="pl-10" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
                </div>
                <div className="rounded-md border">
                    <Table>
                        <TableHeader><TableRow><TableHead>Date</TableHead><TableHead>Description</TableHead><TableHead>Amount</TableHead><TableHead>Commission</TableHead><TableHead>Net</TableHead><TableHead>Status</TableHead></TableRow></TableHeader>
                        <TableBody>
                            {paginatedTransactions.map(tx => (
                                <TableRow key={tx.id}>
                                    <TableCell>{tx.date}</TableCell>
                                    <TableCell>{tx.description}</TableCell>
                                    <TableCell>KES {tx.amount.toLocaleString()}</TableCell>
                                    <TableCell className="text-destructive">-KES {(tx.amount * 0.1).toLocaleString()}</TableCell>
                                    <TableCell className="font-semibold">KES {(tx.amount * 0.9).toLocaleString()}</TableCell>
                                    <TableCell><Badge variant={tx.status === 'Completed' ? 'default' : 'secondary'}>{tx.status}</Badge></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between items-center">
                    <div className="text-xs text-muted-foreground">Page {currentPage} of {totalPages}</div>
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" onClick={() => setCurrentPage(p => Math.max(1, p-1))} disabled={currentPage === 1}>Previous</Button>
                        <Button variant="outline" size="sm" onClick={() => setCurrentPage(p => Math.min(totalPages, p+1))} disabled={currentPage === totalPages}>Next</Button>
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
}

function PayoutDialog({ onSubmit, availableAmount }: { onSubmit: (e: React.FormEvent<HTMLFormElement>) => void, availableAmount: number }) {
    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Request Payout</DialogTitle>
                <DialogDescription>Select your payout method and amount. Payouts are processed within 24 hours.</DialogDescription>
            </DialogHeader>
            <form onSubmit={onSubmit}>
                <div className="space-y-4 py-4">
                    <div className="space-y-2">
                        <Label htmlFor="amount">Amount (KES)</Label>
                        <Input id="amount" name="amount" type="number" max={availableAmount} defaultValue={availableAmount} required />
                         <p className="text-xs text-muted-foreground">Maximum available: KES {availableAmount.toLocaleString()}</p>
                    </div>
                     <div className="space-y-2">
                        <Label>Payout Method</Label>
                        <RadioGroup defaultValue="mpesa" name="method">
                            <div className="flex items-center space-x-2 border rounded-md p-3">
                                <RadioGroupItem value="mpesa" id="mpesa" />
                                <Label htmlFor="mpesa" className="flex items-center gap-2">
                                    <Image src="/images/mpesa.png" alt="M-Pesa" width={60} height={15} />
                                    <span>to 0754735164</span>
                                </Label>
                            </div>
                             <div className="flex items-center space-x-2 border rounded-md p-3">
                                <RadioGroupItem value="bank" id="bank" />
                                <Label htmlFor="bank" className="flex items-center gap-2">
                                    <Landmark className="h-5 w-5" />
                                    <span>to Equity Bank ...1234</span>
                                </Label>
                            </div>
                        </RadioGroup>
                    </div>
                </div>
                 <DialogFooter>
                    <Button type="submit" className="w-full">Submit Payout Request</Button>
                </DialogFooter>
            </form>
        </DialogContent>
    );
}
