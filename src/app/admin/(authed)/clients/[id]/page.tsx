
'use client';

import { useState, useMemo } from 'react';
import {
  ArrowLeft,
  DollarSign,
  Gift,
  Globe,
  Mail,
  MoreVertical,
  Phone,
  UserCheck,
  UserX,
  Percent,
  RefreshCw,
} from 'lucide-react';
import { notFound } from 'next/navigation';
import { mockClients, mockModuleEngagement, mockTransactions, ClientStatus } from '@/lib/mock-data';
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

const conversionRates: { [key: string]: number } = {
    KES: 1,
    UGX: 29.45,
    TZS: 20.45,
    RWF: 10.33,
    BIF: 22.58,
    SSP: 1.22,
    SOS: 4.55,
};


export default function Client360Page({ params }: { params: { id: string } }) {
  const initialClient = mockClients.find((c) => c.id === params.id);

  const [allClients, setAllClients] = useState(mockClients);
  const [client, setClient] = useState(initialClient);
  const [isDiscountModalOpen, setDiscountModalOpen] = useState(false);

  const { currency } = useCurrency();
  const { toast } = useToast();

  const convertCurrency = (amount: number) => {
    const rate = conversionRates[currency] || 1;
    return (amount * rate).toLocaleString('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  if (!client) {
    notFound();
  }

  const handleStatusChange = (newStatus: ClientStatus) => {
    setClient(prevClient => prevClient ? { ...prevClient, status: newStatus } : undefined);
    setAllClients(allClients.map(c => c.id === client.id ? { ...c, status: newStatus } : c));
  };
  
  const handleSendDiscount = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const data = Object.fromEntries(formData.entries());
      console.log('Discount Offer:', data);
      
      toast({
        title: 'Discount Sent!',
        description: `Offer code ${data.code} has been sent to ${client.name}.`,
      });
      setDiscountModalOpen(false);
  };


  const convertedModuleEngagement = useMemo(() => {
    const rate = conversionRates[currency] || 1;
    return mockModuleEngagement.map(item => ({
        ...item,
        value: item.value * rate,
    }));
  }, [currency]);


  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" asChild>
            <Link href="/admin/clients">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back to Clients</span>
            </Link>
          </Button>
          <h1 className="text-2xl font-bold">Client 360 View</h1>
        </div>
        <Dialog open={isDiscountModalOpen} onOpenChange={setDiscountModalOpen}>
            <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                <MoreVertical className="h-4 w-4" />
                <span className="sr-only">Client Actions</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>Client Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                    onClick={() => handleStatusChange('Active')} 
                    disabled={client.status === 'Active'}>
                <UserCheck className="mr-2 h-4 w-4" />
                Activate
                </DropdownMenuItem>
                <DropdownMenuItem 
                    className="text-destructive" 
                    onClick={() => handleStatusChange('Inactive')} 
                    disabled={client.status !== 'Active'}>
                <UserX className="mr-2 h-4 w-4" />
                Deactivate
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DialogTrigger asChild>
                    <DropdownMenuItem className="text-primary">
                        <Gift className="mr-2 h-4 w-4" />
                        Offer Discount
                    </DropdownMenuItem>
                </DialogTrigger>
            </DropdownMenuContent>
            </DropdownMenu>
            <DiscountDialogContent client={client} onSubmit={handleSendDiscount} />
        </Dialog>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Left Column: Client Profile & Details */}
        <div className="lg:col-span-1 flex flex-col gap-8">
          <Card>
            <CardHeader className="items-center text-center">
              <Avatar className="h-24 w-24 mb-4">
                <AvatarImage src={`https://i.pravatar.cc/150?u=${client.id}`} alt={client.name} />
                <AvatarFallback>{client.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <CardTitle className="text-2xl">{client.name}</CardTitle>
              <CardDescription>
                 <Badge variant={
                    client.status === 'Active' ? 'default' : 
                    client.status === 'Inactive' ? 'secondary' : 'destructive'
                }>
                    {client.status}
                </Badge>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4" />
                  <a href={`mailto:${client.email}`} className="text-foreground hover:underline">
                    {client.email}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4" />
                  <span>{client.phone}</span>
                </div>
                 <div className="flex items-center gap-3">
                  <Globe className="h-4 w-4" />
                  <span>Nairobi, Kenya</span>
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
                <p className="text-4xl font-bold">{convertCurrency(client.business)}</p>
                <p className="text-xs text-muted-foreground">Across all DigitalNest portals</p>
              </CardContent>
            </Card>
        </div>

        {/* Right Column: Engagement & Transactions */}
        <div className="lg:col-span-2 flex flex-col gap-8">
          <Card>
             <CardHeader>
                <CardTitle>Module Engagement ({currency})</CardTitle>
                <CardDescription>Business value generated per module.</CardDescription>
             </CardHeader>
             <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={convertedModuleEngagement} layout="vertical">
                         <CartesianGrid strokeDasharray="3 3" />
                         <XAxis type="number" tickFormatter={(value) => convertCurrency(value as number / (conversionRates[currency] || 1))} />
                         <YAxis type="category" dataKey="name" width={80} />
                         <Tooltip formatter={(value: number, name, props) => convertCurrency(props.payload.value / (conversionRates[currency] || 1))} />
                         <Bar dataKey="value" fill="hsl(var(--primary))" name="Business" />
                    </BarChart>
                </ResponsiveContainer>
             </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>A log of the client's latest activities.</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Date</TableHead>
                            <TableHead>Module</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead className="text-right">Amount ({currency})</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                       {mockTransactions.map((tx) => (
                         <TableRow key={tx.id}>
                            <TableCell>{tx.date}</TableCell>
                            <TableCell>{tx.module}</TableCell>
                            <TableCell>{tx.description}</TableCell>
                            <TableCell className="text-right">{convertCurrency(tx.amount)}</TableCell>
                         </TableRow>
                       ))}
                    </TableBody>
                </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function DiscountDialogContent({ client, onSubmit }: { client: any, onSubmit: (e: React.FormEvent<HTMLFormElement>) => void }) {
    const [discountType, setDiscountType] = useState<'percentage' | 'amount'>('percentage');
    const [offerCode, setOfferCode] = useState(generateOfferCode());

    function generateOfferCode() {
        return `DNEST-${Math.random().toString(36).substr(2, 8).toUpperCase()}`;
    }

    return (
        <DialogContent className="sm:max-w-md">
            <DialogHeader>
                <DialogTitle>Create Discount for {client.name}</DialogTitle>
                <DialogDescription>
                    Select the portal, discount type, and value. The code will be sent to the client.
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
                    <Label>Discount Type</Label>
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
                    <Input id="value" name="value" type="number" placeholder={discountType === 'percentage' ? 'e.g., 15' : 'e.g., 500'} required />
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
                    <Button type="submit" className="w-full">Send Discount</Button>
                </DialogFooter>
            </form>
        </DialogContent>
    )
}

    