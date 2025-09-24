
'use client';
import { useMemo } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BarChart as BarChartIcon, DollarSign, Package, Star, Users, AlertTriangle, FileCheck2, ArrowRight } from "lucide-react";
import Link from "next/link";
import {
  ResponsiveContainer,
  BarChart as RechartsBarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar as RechartsBar,
} from 'recharts';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Vendor, Transaction } from '@/lib/mock-data';

interface VendorDashboardClientProps {
    vendor: Vendor;
    transactions: Transaction[];
}

const salesData = [
  { name: 'Jan', sales: 40000 },
  { name: 'Feb', sales: 30000 },
  { name: 'Mar', sales: 50000 },
  { name: 'Apr', sales: 45000 },
  { name: 'May', sales: 60000 },
  { name: 'Jun', sales: 75000 },
];

export function VendorDashboardClient({ vendor, transactions }: VendorDashboardClientProps) {

  const { totalRevenue, totalOrders, recentOrders } = useMemo(() => {
    const completedOrders = transactions.filter(tx => tx.status === 'Completed' && tx.amount > 0);
    const revenue = completedOrders.reduce((sum, tx) => sum + tx.amount, 0);
    
    // Create a map to get client names - assuming you might pass clients down or have a way to resolve them
    // For now, we'll use a placeholder.
    const sortedOrders = [...completedOrders].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    const recent = sortedOrders.slice(0, 3).map(order => ({
        id: order.id,
        product: order.description.replace("Purchase of ", "").replace(/['"]+/g, ''),
        date: order.date,
        customer: `Client #${order.clientId}`, // Placeholder
        amount: `KES ${order.amount.toLocaleString()}`
    }));
    
    return {
      totalRevenue: revenue,
      totalOrders: completedOrders.length,
      recentOrders: recent,
    };
  }, [transactions]);

  // Adjust sales data for the last 6 months based on recent revenue
  const dynamicSalesData = useMemo(() => {
    const lastMonthSale = totalRevenue * 0.4; // Assume last month had 40% of recent revenue
    return salesData.map((month, index) => {
        if (index === salesData.length - 1) { // Current month
            return { ...month, sales: lastMonthSale };
        }
        // Distribute remaining revenue for previous months with some variation
        const randomFactor = (Math.random() * 0.4 + 0.8); // between 0.8 and 1.2
        return { ...month, sales: (totalRevenue * 0.12) * randomFactor };
    });
  }, [totalRevenue]);

  return (
    <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
        
        {vendor.status === 'Pending' && (
            <Alert variant="destructive" className="flex items-center justify-between">
                <div className="flex items-center">
                    <AlertTriangle className="h-5 w-5 mr-3"/>
                    <div>
                        <AlertTitle className="font-bold">Verification Required</AlertTitle>
                        <AlertDescription>
                            Please complete your KYB (Know Your Business) verification to activate your account and start selling.
                        </AlertDescription>
                    </div>
                </div>
                <Button asChild>
                    <Link href="/vendor/kyc">Start Verification <ArrowRight className="ml-2 h-4 w-4"/></Link>
                </Button>
            </Alert>
        )}


        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
            <Card>
                <CardHeader className="pb-2">
                <CardDescription>Total Revenue</CardDescription>
                <CardTitle className="text-4xl">KES {totalRevenue.toLocaleString()}</CardTitle>
                </CardHeader>
                <CardContent>
                <div className="text-xs text-muted-foreground">
                    +20.1% from last month
                </div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="pb-2">
                <CardDescription>Total Orders</CardDescription>
                <CardTitle className="text-4xl">{totalOrders}</CardTitle>
                </CardHeader>
                <CardContent>
                <div className="text-xs text-muted-foreground">
                    +15 orders this month
                </div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="pb-2">
                <CardDescription>Active Products</CardDescription>
                <CardTitle className="text-4xl">{vendor.products}</CardTitle>
                </CardHeader>
                <CardContent>
                <div className="text-xs text-muted-foreground">
                    5 new products added
                </div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="pb-2">
                <CardDescription>Verification Status</CardDescription>
                <CardTitle className={`text-4xl flex items-center gap-2 ${vendor.status === 'Active' ? 'text-green-500' : 'text-amber-500'}`}>
                    <FileCheck2 className="h-8 w-8" /> {vendor.status}
                </CardTitle>
                </CardHeader>
                <CardContent>
                <div className="text-xs text-muted-foreground">
                    {vendor.status === 'Pending' ? 'Complete KYC to activate' : 'Your account is fully active.'}
                </div>
                </CardContent>
            </Card>
        </div>

         <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-full lg:col-span-4">
                 <CardHeader>
                    <CardTitle>Sales Overview</CardTitle>
                    <CardDescription>Your sales performance over the last 6 months.</CardDescription>
                </CardHeader>
                <CardContent>
                     <ResponsiveContainer width="100%" height={300}>
                        <RechartsBarChart data={dynamicSalesData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis tickFormatter={(val) => `KES ${val/1000}k`} />
                            <Tooltip formatter={(val: number) => `KES ${val.toLocaleString()}`} />
                            <Legend />
                            <RechartsBar dataKey="sales" fill="hsl(var(--primary))" name="Sales" />
                        </RechartsBarChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
             <Card className="col-span-full lg:col-span-3">
                 <CardHeader>
                    <CardTitle>Recent Orders</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Customer</TableHead>
                                <TableHead>Product</TableHead>
                                <TableHead className="text-right">Amount</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {recentOrders.length > 0 ? recentOrders.map(order => (
                                <TableRow key={order.id}>
                                    <TableCell className="font-medium">{order.customer}</TableCell>
                                    <TableCell>{order.product}</TableCell>
                                    <TableCell className="text-right">{order.amount}</TableCell>
                                </TableRow>
                            )) : (
                                <TableRow>
                                    <TableCell colSpan={3} className="h-24 text-center">
                                        No recent orders.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    </div>
  );
}
