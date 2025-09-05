
'use client';

import { useState, useMemo, useEffect } from 'react';
import { Transaction, Client, ModuleEngagement, TransactionStatus } from '@/lib/mock-data';
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Search } from 'lucide-react';
import Link from 'next/link';
import { useCurrency } from '@/hooks/use-currency';

const conversionRates: { [key: string]: number } = {
    KES: 1, UGX: 29.45, TZS: 20.45, RWF: 10.33, BIF: 22.58, SSP: 1.22, SOS: 4.55,
};

export default function AllTransactionsPage() {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [clients, setClients] = useState<Client[]>([]);
    const [moduleEngagement, setModuleEngagement] = useState<ModuleEngagement[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<TransactionStatus | 'all'>('all');
    const [portalFilter, setPortalFilter] = useState<string | 'all'>('all');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const { currency } = useCurrency();

    useEffect(() => {
        fetch('/api/data/transactions').then(res => res.json()).then(setTransactions);
        fetch('/api/data/clients').then(res => res.json()).then(setClients);
        fetch('/api/data/module-engagement').then(res => res.json()).then(setModuleEngagement);
    }, []);

    const clientMap = useMemo(() => new Map(clients.map(c => [c.id, c.name])), [clients]);

    const convertCurrency = (amount: number) => {
        const rate = conversionRates[currency] || 1;
        return (amount * rate).toLocaleString('en-US', {
            style: 'currency', currency, minimumFractionDigits: 2, maximumFractionDigits: 2,
        });
    };

    const filteredTransactions = useMemo(() => {
        return transactions.filter(tx => {
            const clientName = clientMap.get(tx.clientId) || '';
            const searchMatch = clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                tx.description.toLowerCase().includes(searchTerm.toLowerCase());
            const statusMatch = statusFilter === 'all' || tx.status === statusFilter;
            const portalMatch = portalFilter === 'all' || tx.module === portalFilter;
            return searchMatch && statusMatch && portalMatch;
        });
    }, [transactions, searchTerm, statusFilter, portalFilter, clientMap]);

    const paginatedTransactions = filteredTransactions.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);

    const getStatusBadgeVariant = (status: TransactionStatus) => {
        switch (status) {
            case 'Completed': return 'default';
            case 'Pending': return 'secondary';
            case 'Refunded': return 'outline';
            case 'Failed': return 'destructive';
            default: return 'secondary';
        }
    };
    
  return (
    <Card>
      <CardHeader>
        <CardTitle>All Transactions</CardTitle>
        <CardDescription>
          A consolidated list of all client transactions across all portals.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap items-center gap-4 mb-6">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
                placeholder="Search by client or description..." 
                className="pl-10" 
                value={searchTerm}
                onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                }}
            />
          </div>
            <Select value={portalFilter} onValueChange={(value) => { setPortalFilter(value); setCurrentPage(1); }}>
                <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Filter by Portal" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All Portals</SelectItem>
                    {moduleEngagement.map(mod => (
                        <SelectItem key={mod.name} value={mod.name}>{mod.name}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={(value) => { setStatusFilter(value as any); setCurrentPage(1); }}>
                <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Filter by Status" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Refunded">Refunded</SelectItem>
                    <SelectItem value="Failed">Failed</SelectItem>
                </SelectContent>
            </Select>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Client</TableHead>
                <TableHead className="hidden md:table-cell">Date</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="hidden sm:table-cell">Portal</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Amount ({currency})</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedTransactions.length > 0 ? paginatedTransactions.map(tx => (
                <TableRow key={tx.id}>
                  <TableCell className="font-medium">
                    <Link href={`/admin/clients/${tx.clientId}`} className="hover:underline">
                      {clientMap.get(tx.clientId)}
                    </Link>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">{tx.date}</TableCell>
                  <TableCell>{tx.description}</TableCell>
                  <TableCell className="hidden sm:table-cell">{tx.module}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusBadgeVariant(tx.status)}>
                        {tx.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right font-mono">{convertCurrency(tx.amount)}</TableCell>
                </TableRow>
              )) : (
                <TableRow>
                    <TableCell colSpan={6} className="text-center h-24">
                        No transactions found.
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
                <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                >
                    Previous
                </Button>
                <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages || totalPages === 0}
                >
                    Next
                </Button>
            </div>
      </CardFooter>
    </Card>
  );
}
