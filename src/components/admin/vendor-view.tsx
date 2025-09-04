
'use client';

import { useState, useMemo, useEffect, useCallback } from 'react';
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
  Gift,
  RefreshCw,
  Percent,
} from 'lucide-react';
import Image from 'next/image';
import { mockVendors, Vendor, VendorStatus, mockTransactions, TransactionStatus, VendorOffer, mockModuleEngagement } from '@/lib/mock-data';
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/hooks/use-toast';
import { saveVendorOffer, getOffersForVendor } from '@/lib/firebase-services';


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
  const [isOfferModalOpen, setOfferModalOpen] = useState(false);
  const [sentOffers, setSentOffers] = useState<VendorOffer[]>([]);
  const [loadingOffers, setLoadingOffers] = useState(true);
  const [offersCurrentPage, setOffersCurrentPage] = useState(1);
  const offersItemsPerPage = 5;
  const { toast } = useToast();


  const fetchOffers = useCallback(async () => {
    if (!vendor.id) return;
    setLoadingOffers(true);
    try {
        const offers = await getOffersForVendor(vendor.id);
        setSentOffers(offers);
    } catch (error) {
        console.error("Error fetching vendor offers: ", error);
        toast({
            title: "Error",
            description: "Could not fetch vendor offers.",
            variant: "destructive"
        });
    } finally {
        setLoadingOffers(false);
    }
  }, [vendor.id, toast]);

  useEffect(() => {
    fetchOffers();
  }, [fetchOffers]);

  const { totalBusiness, vendorTransactions } = useMemo(() => {
    const vendorTransactions = mockTransactions.filter(tx => tx.vendorId === vendor.id);
    const totalBusiness = vendorTransactions.reduce((sum, tx) => tx.status === 'Completed' ? sum + tx.amount : sum, 0);
    return { totalBusiness, vendorTransactions };
  }, [vendor.id]);

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

  const handleSendOffer = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const data = Object.fromEntries(formData.entries());
      
      const newOfferData = {
        vendorId: vendor.id,
        code: data.code as string,
        type: data.discountType as 'percentage' | 'amount',
        value: Number(data.value),
        portal: data.portal as string,
        dateSent: new Date().toISOString().split('T')[0],
        status: 'Sent' as 'Sent' | 'Redeemed'
      };

      try {
        await saveVendorOffer(newOfferData);
        toast({
            title: 'Offer Sent!',
            description: `Offer code ${newOfferData.code} has been sent to ${vendor.name}.`,
        });
        setOfferModalOpen(false);
        fetchOffers(); // Re-fetch offers to update the list
      } catch (error) {
        console.error("Error saving offer: ", error);
        toast({
            title: 'Error',
            description: 'Failed to send offer. Please try again.',
            variant: 'destructive',
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
  
    const totalOffersPages = Math.ceil(sentOffers.length / offersItemsPerPage);
    const paginatedOffers = sentOffers.slice(
      (offersCurrentPage - 1) * offersItemsPerPage,
      offersCurrentPage * offersItemsPerPage
    );


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
            <Dialog open={isOfferModalOpen} onOpenChange={setOfferModalOpen}>
                <DialogTrigger asChild>
                    <Button>
                        <Gift className="mr-2 h-4 w-4" />
                        Assign Offer
                    </Button>
                </DialogTrigger>
                <OfferDialogContent vendor={vendor} onSubmit={handleSendOffer} />
            </Dialog>
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
                    <CardTitle>Assigned Offers</CardTitle>
                    <CardDescription>Offers and discounts assigned to this vendor.</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                    {loadingOffers ? (
                        <p className="text-sm text-muted-foreground text-center py-4">Loading offers...</p>
                    ) : sentOffers.length > 0 ? (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Code</TableHead>
                                    <TableHead>Value</TableHead>
                                    <TableHead>Portal</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {paginatedOffers.map(offer => (
                                    <TableRow key={offer.id}>
                                        <TableCell className="font-mono">{offer.code}</TableCell>
                                        <TableCell>{offer.type === 'percentage' ? `${offer.value}%` : convertCurrency(offer.value)}</TableCell>
                                        <TableCell>{offer.portal}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    ) : (
                        <p className="text-sm text-muted-foreground text-center py-4">No offers assigned yet.</p>
                    )}
                </CardContent>
                 {sentOffers.length > 0 && (
                    <CardFooter className="flex justify-between items-center">
                        <div className="text-xs text-muted-foreground">
                            Page {offersCurrentPage} of {totalOffersPages}
                        </div>
                        <div className="flex items-center gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setOffersCurrentPage(prev => Math.max(prev - 1, 1))}
                                disabled={offersCurrentPage === 1}
                            >
                                Previous
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setOffersCurrentPage(prev => Math.min(prev + 1, totalOffersPages))}
                                disabled={offersCurrentPage === totalOffersPages}
                            >
                                Next
                            </Button>
                        </div>
                    </CardFooter>
                 )}
            </Card>
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

function OfferDialogContent({ vendor, onSubmit }: { vendor: any, onSubmit: (e: React.FormEvent<HTMLFormElement>) => void }) {
    const [discountType, setDiscountType] = useState<'percentage' | 'amount'>('percentage');
    const [offerCode, setOfferCode] = useState(generateOfferCode());

    function generateOfferCode() {
        return `VNDR-${Math.random().toString(36).substr(2, 8).toUpperCase()}`;
    }

    return (
        <DialogContent className="sm:max-w-md">
            <DialogHeader>
                <DialogTitle>Create Offer for {vendor.name}</DialogTitle>
                <DialogDescription>
                    Select the portal, offer type, and value. The code will be assigned to the vendor.
                </DialogDescription>
            </DialogHeader>
            <form onSubmit={onSubmit} className="space-y-4">
                <div className="grid gap-2">
                    <Label htmlFor="portal">Portal / Module</Label>
                    <Select name="portal" defaultValue="all">
                        <SelectTrigger id="portal">
                            <SelectValue placeholder="Select a portal" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Portals</SelectItem>
                             {mockModuleEngagement.map(mod => (
                                <SelectItem key={mod.name} value={mod.name}>{mod.name}</SelectItem>
                             ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className="grid gap-2">
                    <Label>Offer Type</Label>
                    <RadioGroup
                        defaultValue="percentage"
                        className="grid grid-cols-2 gap-4"
                        value={discountType}
                        onValueChange={(value: 'percentage' | 'amount') => setDiscountType(value)}
                        name="discountType"
                    >
                        <div>
                            <RadioGroupItem value="percentage" id="r1" className="peer sr-only" />
                            <Label
                                htmlFor="r1"
                                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                            >
                                <Percent className="mb-3 h-6 w-6" />
                                Percentage
                            </Label>
                        </div>
                        <div>
                            <RadioGroupItem value="amount" id="r2" className="peer sr-only" />
                            <Label
                                htmlFor="r2"
                                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                            >
                                <DollarSign className="mb-3 h-6 w-6" />
                                Fixed Amount
                            </Label>
                        </div>
                    </RadioGroup>
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="value">
                        {discountType === 'percentage' ? 'Percentage (%)' : 'Amount (KES)'}
                    </Label>
                    <Input id="value" name="value" type="number" placeholder={discountType === 'percentage' ? 'e.g., 10' : 'e.g., 250'} required />
                </div>
                 <div className="grid gap-2">
                    <Label htmlFor="code">Offer Code</Label>
                    <div className="flex items-center gap-2">
                        <Input id="code" name="code" value={offerCode} readOnly />
                        <Button type="button" variant="outline" size="icon" onClick={() => setOfferCode(generateOfferCode())}>
                            <RefreshCw className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit" className="w-full">Assign Offer</Button>
                </DialogFooter>
            </form>
        </DialogContent>
    )
}

    