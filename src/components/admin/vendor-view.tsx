
'use client';

import { useState, useMemo, useEffect } from 'react';
import {
  ArrowLeft,
  DollarSign,
  Mail,
  Phone,
  Star,
  Package,
  Building,
  FileCheck,
  FileX,
  Globe,
  UserCheck,
  UserX,
} from 'lucide-react';
import Image from 'next/image';
import { Vendor, VendorStatus, Transaction, TransactionStatus } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
    ResponsiveContainer,
    BarChart,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    Bar
} from 'recharts';
import { useCurrency } from '@/hooks/use-currency';
import { useToast } from '@/hooks/use-toast';
import { handleUpdateVendorStatus } from '@/app/admin/(authed)/vendors/actions';

const conversionRates: { [key: string]: number } = {
    KES: 1,
    UGX: 29.45,
    TZS: 20.45,
    RWF: 10.33,
    BIF: 22.58,
    SSP: 1.22,
    SOS: 4.55,
};

interface VendorViewProps {
    vendor: Vendor;
    transactions: Transaction[];
}

export function VendorView({ vendor, transactions: vendorTransactions }: VendorViewProps) {
  const [vendorStatus, setVendorStatus] = useState(vendor.status);
  const { currency } = useCurrency();
  const { toast } = useToast();
  
  const totalBusiness = useMemo(() => {
    return vendorTransactions.reduce((sum, tx) => tx.status === 'Completed' ? sum + tx.amount : sum, 0);
  }, [vendorTransactions]);

  const convertCurrency = (amount: number) => {
    const rate = conversionRates[currency] || 1;
    return (amount * rate).toLocaleString('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };
  
  const handleStatusChange = async (newStatus: VendorStatus) => {
    try {
        await handleUpdateVendorStatus(vendor.id, newStatus);
        setVendorStatus(newStatus);
        toast({
            title: `Vendor Status Updated`,
            description: `${vendor.name}'s status has been updated to ${newStatus}.`,
        });
    } catch (error) {
         toast({
            title: "Error",
            description: "Could not update vendor status.",
            variant: "destructive"
        });
    }
  };

  const productPerformanceData = useMemo(() => {
    const productSales = new Map<string, { sales: number; units: number }>();

    vendorTransactions.forEach(tx => {
      if (tx.status === 'Completed' && tx.amount > 0) {
        const match = tx.description.match(/'([^']*)'/);
        const productName = match ? match[1] : tx.module;

        const current = productSales.get(productName) || { sales: 0, units: 0 };
        current.sales += tx.amount;
        current.units += 1;
        productSales.set(productName, current);
      }
    });

    return Array.from(productSales.entries())
      .map(([name, data]) => ({
        name,
        sales: data.sales * (conversionRates[currency] || 1),
        units: data.units,
      }))
      .sort((a, b) => b.sales - a.sales)
      .slice(0, 5);
  }, [vendorTransactions, currency]);


  const getStatusBadgeVariant = (status: VendorStatus) => {
        switch (status) {
            case 'Active': return 'default';
            case 'Pending': return 'secondary';
            case 'Inactive': return 'destructive';
            default: return 'secondary';
        }
    };
    
  const getTransactionStatusBadgeVariant = (status: TransactionStatus) => {
      switch (status) {
          case 'Completed': return 'default';
          case 'Pending': return 'secondary';
          case 'Refunded': return 'outline';
          case 'Failed': return 'destructive';
          default: return 'secondary';
      }
  };
  
  if (!vendor) {
    return <div>Vendor not found.</div>;
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" asChild>
            <Link href="/admin/vendors">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back to Vendors</span>
            </Link>
          </Button>
          <h1 className="text-2xl font-bold">Vendor 360 View</h1>
        </div>
        <div className="flex items-center gap-2">
            {vendorStatus === 'Pending' && (
                <>
                    <Button onClick={() => handleStatusChange('Active')}>
                        <FileCheck className="mr-2 h-4 w-4" />
                        Approve
                    </Button>
                    <Button variant="destructive" onClick={() => handleStatusChange('Inactive')}>
                        <FileX className="mr-2 h-4 w-4" />
                        Reject
                    </Button>
                </>
            )}
             {vendorStatus !== 'Pending' && (
                <>
                    <Button variant="outline" onClick={() => handleStatusChange('Active')} disabled={vendorStatus === 'Active'}>
                        <UserCheck className="mr-2 h-4 w-4" />
                        Activate
                    </Button>
                    <Button variant="destructive" onClick={() => handleStatusChange('Inactive')} disabled={vendorStatus === 'Inactive'}>
                        <UserX className="mr-2 h-4 w-4" />
                        Deactivate
                    </Button>
                </>
            )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Left Column: Vendor Profile & Details */}
        <div className="lg:col-span-1 flex flex-col gap-8">
          <Card>
            <CardHeader className="items-center text-center">
              <Avatar className="h-24 w-24 mb-4">
                <AvatarImage src={`https://picsum.photos/150/150?random=${vendor.id}`} alt={vendor.name} data-ai-hint="company logo" />
                <AvatarFallback>{vendor.name.substring(0, 2)}</AvatarFallback>
              </Avatar>
              <CardTitle className="text-2xl">{vendor.name}</CardTitle>
               <div className="pt-2">
                 <Badge variant={getStatusBadgeVariant(vendorStatus)}>
                    {vendorStatus}
                </Badge>
               </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-sm text-muted-foreground">
                 <div className="flex items-center gap-3">
                  <Building className="h-4 w-4" />
                  <span className="text-foreground">{vendor.portal}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4" />
                  <a href={`mailto:${vendor.email}`} className="text-foreground hover:underline">
                    {vendor.email}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4" />
                  <span>{vendor.phone}</span>
                </div>
                 <div className="flex items-center gap-3">
                  <Globe className="h-4 w-4" />
                  <span>{vendor.country}</span>
                </div>
              </div>
            </CardContent>
          </Card>
           <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-primary" />
                  <span>Total Lifetime Business ({currency})</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold">{convertCurrency(totalBusiness)}</p>
                <p className="text-xs text-muted-foreground">Based on completed transactions</p>
              </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Vendor Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                   <div className="flex items-center justify-between">
                        <span className="text-muted-foreground flex items-center gap-2"><Package className="h-4 w-4" /> Total Products</span>
                        <span className="font-medium">{vendor.products.toLocaleString()}</span>
                   </div>
                    <div className="flex items-center justify-between">
                        <span className="text-muted-foreground flex items-center gap-2"><Star className="h-4 w-4" /> Average Rating</span>
                        <span className="font-medium flex items-center gap-1">{vendor.rating.toFixed(1)} <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" /></span>
                   </div>
                </CardContent>
            </Card>
        </div>

        {/* Right Column: Engagement & Transactions */}
        <div className="lg:col-span-2 flex flex-col gap-8">
          <Card>
             <CardHeader>
                <CardTitle>Top Product Performance ({currency})</CardTitle>
                <CardDescription>Sales performance of the vendor's top products.</CardDescription>
             </CardHeader>
             <CardContent>
                 {productPerformanceData.length > 0 ? (
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={productPerformanceData} layout="vertical">
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis type="number" tickFormatter={(value) => convertCurrency(value as number / (conversionRates[currency] || 1))}/>
                            <YAxis type="category" dataKey="name" width={120} tick={{ fontSize: 12 }} />
                            <Tooltip
                                formatter={(value: number, name: string) => {
                                    if (name === 'Sales') return convertCurrency(value / (conversionRates[currency] || 1));
                                    return value;
                                }}
                                cursor={{ fill: 'hsl(var(--muted))' }}
                                contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))' }}
                            />
                            <Legend />
                            <Bar dataKey="sales" fill="hsl(var(--primary))" name="Sales" />
                            <Bar dataKey="units" fill="hsl(var(--secondary))" name="Units Sold" />
                        </BarChart>
                    </ResponsiveContainer>
                 ) : (
                    <div className="flex items-center justify-center h-[300px] text-muted-foreground">
                        No product performance data available.
                    </div>
                 )}
             </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Recent Orders & Payouts</CardTitle>
              <CardDescription>A log of the vendor's latest activities.</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Date</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead className="text-right">Amount ({currency})</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {vendorTransactions.length > 0 ? vendorTransactions.slice(0, 10).map(tx => (
                            <TableRow key={tx.id}>
                                <TableCell>{tx.date}</TableCell>
                                <TableCell>
                                    <Badge variant={getTransactionStatusBadgeVariant(tx.status)}>
                                        {tx.status}
                                    </Badge>
                                </TableCell>
                                <TableCell>{tx.description}</TableCell>
                                <TableCell className="text-right font-mono">{convertCurrency(tx.amount)}</TableCell>
                            </TableRow>
                        )) : (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center h-24">
                                    No transactions found for this vendor.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
