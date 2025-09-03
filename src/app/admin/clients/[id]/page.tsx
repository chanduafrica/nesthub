
'use client';

import {
  ArrowLeft,
  Briefcase,
  DollarSign,
  Gift,
  Globe,
  Home,
  Mail,
  MoreVertical,
  Phone,
  Plane,
  ShoppingCart,
  Ticket,
  User,
  UserCheck,
  UserX,
  UtensilsCrossed,
} from 'lucide-react';
import { notFound } from 'next/navigation';
import { mockClients, mockModuleEngagement, mockTransactions } from '@/lib/mock-data';
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


export default function Client360Page({ params }: { params: { id: string } }) {
  const client = mockClients.find((c) => c.id === params.id);

  if (!client) {
    notFound();
  }

  const formatCurrency = (amount: number) => {
    return `KES ${amount.toLocaleString('en-US')}`;
  };

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
            <DropdownMenuItem disabled={client.status === 'Active'}>
              <UserCheck className="mr-2 h-4 w-4" />
              Activate
            </DropdownMenuItem>
            <DropdownMenuItem className="text-destructive" disabled={client.status !== 'Active'}>
              <UserX className="mr-2 h-4 w-4" />
              Deactivate
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-primary">
              <Gift className="mr-2 h-4 w-4" />
              Offer Prize
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
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
                  <span>Total Lifetime Business</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold">{formatCurrency(client.business)}</p>
                <p className="text-xs text-muted-foreground">Across all DigitalNest portals</p>
              </CardContent>
            </Card>
        </div>

        {/* Right Column: Engagement & Transactions */}
        <div className="lg:col-span-2 flex flex-col gap-8">
          <Card>
             <CardHeader>
                <CardTitle>Module Engagement</CardTitle>
                <CardDescription>Business value generated per module.</CardDescription>
             </CardHeader>
             <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={mockModuleEngagement} layout="vertical">
                         <CartesianGrid strokeDasharray="3 3" />
                         <XAxis type="number" tickFormatter={(value) => formatCurrency(value as number)} />
                         <YAxis type="category" dataKey="name" width={80} />
                         <Tooltip formatter={(value: number) => formatCurrency(value)} />
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
                            <TableHead className="text-right">Amount</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                       {mockTransactions.map((tx) => (
                         <TableRow key={tx.id}>
                            <TableCell>{tx.date}</TableCell>
                            <TableCell>{tx.module}</TableCell>
                            <TableCell>{tx.description}</TableCell>
                            <TableCell className="text-right">{formatCurrency(tx.amount)}</TableCell>
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

