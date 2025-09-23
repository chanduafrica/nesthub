
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BarChart as BarChartIcon, DollarSign, Package, Star, Users } from "lucide-react";
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

const recentOrders = [
    { id: "ORD101", product: "Handmade Leather Bag", date: "2023-08-10", customer: "Wanjiku Kamau", amount: "KES 4,500" },
    { id: "ORD102", product: "Beaded Necklace", date: "2023-08-09", customer: "Musa Okello", amount: "KES 1,200" },
    { id: "ORD103", product: "Ankara Print Shirt", date: "2023-08-08", customer: "Amina Yusuf", amount: "KES 2,800" },
];

const salesData = [
  { name: 'Jan', sales: 40000 },
  { name: 'Feb', sales: 30000 },
  { name: 'Mar', sales: 50000 },
  { name: 'Apr', sales: 45000 },
  { name: 'May', sales: 60000 },
  { name: 'Jun', sales: 75000 },
];

export default function VendorDashboardPage() {
  return (
    <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
            <Card>
                <CardHeader className="pb-2">
                <CardDescription>Total Revenue</CardDescription>
                <CardTitle className="text-4xl">KES 452,310</CardTitle>
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
                <CardTitle className="text-4xl">1,250</CardTitle>
                </CardHeader>
                <CardContent>
                <div className="text-xs text-muted-foreground">
                    +150 orders this month
                </div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="pb-2">
                <CardDescription>Active Products</CardDescription>
                <CardTitle className="text-4xl">85</CardTitle>
                </CardHeader>
                <CardContent>
                <div className="text-xs text-muted-foreground">
                    5 new products added
                </div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="pb-2">
                <CardDescription>Average Rating</CardDescription>
                <CardTitle className="text-4xl flex items-center gap-2">
                    <Star className="h-8 w-8 text-yellow-400 fill-yellow-400" /> 4.8
                </CardTitle>
                </CardHeader>
                <CardContent>
                <div className="text-xs text-muted-foreground">
                    Based on 530 reviews
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
                        <RechartsBarChart data={salesData}>
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
                            {recentOrders.map(order => (
                                <TableRow key={order.id}>
                                    <TableCell className="font-medium">{order.customer}</TableCell>
                                    <TableCell>{order.product}</TableCell>
                                    <TableCell className="text-right">{order.amount}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    </div>
  );
}

    
