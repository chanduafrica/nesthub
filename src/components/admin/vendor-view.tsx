
'use client';

import { useState, useMemo } from 'react';
import {
  ArrowLeft,
  DollarSign,
  Mail,
  MoreVertical,
  Phone,
  UserCheck,
  UserX,
  Star,
  Package,
  Building,
  FileCheck,
  FileX
} from 'lucide-react';
import Image from 'next/image';
import { mockVendors, Vendor, VendorStatus } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
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


const conversionRates: { [key: string]: number } = {
    KES: 1,
    UGX: 29.45,
    TZS: 20.45,
    RWF: 10.33,
    BIF: 22.58,
    SSP: 1.22,
    SOS: 4.55,
};

export function VendorView({ vendor }: { vendor: Vendor }) {
  const [vendorStatus, setVendorStatus] = useState(vendor.status);
  const { currency } = useCurrency();

  const convertCurrency = (amount: number) => {
    const rate = conversionRates[currency] || 1;
    return (amount * rate).toLocaleString('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };
  
  const handleStatusChange = (newStatus: VendorStatus) => {
    setVendorStatus(newStatus);
    // In a real app, you would also update the backend here.
  };

  const productPerformanceData = useMemo(() => {
    // Dummy data for product performance
    return [
      { name: 'Product A', sales: 4000, units: 240 },
      { name: 'Product B', sales: 3000, units: 139 },
      { name: 'Product C', sales: 2000, units: 980 },
      { name: 'Product D', sales: 2780, units: 390 },
      { name: 'Product E', sales: 1890, units: 480 },
    ].map(p => ({...p, sales: p.sales * (conversionRates[currency] || 1)}));
  }, [currency]);


  const getStatusBadgeVariant = (status: VendorStatus) => {
        switch (status) {
            case 'Active': return 'default';
            case 'Pending': return 'secondary';
            case 'Inactive': return 'destructive';
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
        {vendorStatus === 'Pending' && (
             <div className="flex items-center gap-2">
                <Button onClick={() => handleStatusChange('Active')}>
                    <FileCheck className="mr-2 h-4 w-4" />
                    Approve
                </Button>
                 <Button variant="destructive" onClick={() => handleStatusChange('Inactive')}>
                    <FileX className="mr-2 h-4 w-4" />
                    Reject
                </Button>
             </div>
        )}
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
              <CardDescription>
                 <Badge variant={getStatusBadgeVariant(vendorStatus)}>
                    {vendorStatus}
                </Badge>
              </CardDescription>
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
                <p className="text-4xl font-bold">{convertCurrency(vendor.business)}</p>
                <p className="text-xs text-muted-foreground">Across all DigitalNest portals</p>
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
                <CardDescription>Sales performance of the vendor's top 5 products.</CardDescription>
             </CardHeader>
             <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={productPerformanceData}>
                         <CartesianGrid strokeDasharray="3 3" />
                         <XAxis dataKey="name" />
                         <YAxis yAxisId="left" orientation="left" stroke="hsl(var(--primary))" tickFormatter={(value) => convertCurrency(value as number / (conversionRates[currency] || 1))}/>
                         <YAxis yAxisId="right" orientation="right" stroke="hsl(var(--secondary-foreground))" />
                         <Tooltip formatter={(value: number, name: string) => {
                            if(name === 'Sales') return convertCurrency(value / (conversionRates[currency] || 1));
                            return value;
                         }} />
                         <Legend />
                         <Bar yAxisId="left" dataKey="sales" fill="hsl(var(--primary))" name="Sales" />
                         <Bar yAxisId="right" dataKey="units" fill="hsl(var(--secondary))" name="Units Sold" />
                    </BarChart>
                </ResponsiveContainer>
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
                            <TableHead>Type</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead className="text-right">Amount ({currency})</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                       {/* Dummy Data */}
                       <TableRow>
                            <TableCell>2024-07-22</TableCell>
                            <TableCell><Badge variant="default">Sale</Badge></TableCell>
                            <TableCell>Order #12345 - iPhone 15 Pro</TableCell>
                            <TableCell className="text-right">{convertCurrency(150000)}</TableCell>
                         </TableRow>
                         <TableRow>
                            <TableCell>2024-07-21</TableCell>
                             <TableCell><Badge variant="secondary">Payout</Badge></TableCell>
                            <TableCell>Weekly Payout - 2024-W29</TableCell>
                            <TableCell className="text-right text-destructive">{convertCurrency(-285000)}</TableCell>
                         </TableRow>
                         <TableRow>
                            <TableCell>2024-07-20</TableCell>
                            <TableCell><Badge variant="default">Sale</Badge></TableCell>
                            <TableCell>Order #12344 - Samsung TV</TableCell>
                            <TableCell className="text-right">{convertCurrency(85000)}</TableCell>
                         </TableRow>
                         <TableRow>
                            <TableCell>2024-07-19</TableCell>
                            <TableCell><Badge variant="outline">Refund</Badge></TableCell>
                            <TableCell>Refund for Order #12301</TableCell>
                            <TableCell className="text-right">{convertCurrency(-5500)}</TableCell>
                         </TableRow>
                    </TableBody>
                </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
