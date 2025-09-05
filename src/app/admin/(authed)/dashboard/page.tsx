
'use client';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Users, DollarSign, ShoppingCart, Truck, TrendingUp, BarChart, Bell, AlertTriangle, CheckCircle, PieChart, LineChart } from "lucide-react";
import { Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart as RechartsBarChart, Pie, Cell, PieChart as RechartsPieChart, Line, LineChart as RechartsLineChart } from 'recharts';
import { useCurrency } from '@/hooks/use-currency';
import { ModuleEngagement, Client, Transaction } from '@/lib/mock-data';
import { useMemo, useState, useEffect } from "react";

const conversionRates: { [key: string]: number } = {
    KES: 1,
    UGX: 29.45,
    TZS: 20.45,
    RWF: 10.33,
    BIF: 22.58,
    SSP: 1.22,
    SOS: 4.55,
};

export default function AdminDashboardPage() {
    const { currency } = useCurrency();
    const [clients, setClients] = useState<Client[]>([]);
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [moduleEngagement, setModuleEngagement] = useState<ModuleEngagement[]>([]);

    useEffect(() => {
        fetch('/api/data/clients').then(res => res.json()).then(setClients);
        fetch('/api/data/transactions').then(res => res.json()).then(setTransactions);
        fetch('/api/data/module-engagement').then(res => res.json()).then(setModuleEngagement);
    }, []);

    const convertCurrency = (amount: number) => {
        const rate = conversionRates[currency] || 1;
        return (amount * rate).toLocaleString('en-US', {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
        });
    };

    const totalUsers = clients.length;
    const gmv = transactions
        .filter(tx => tx.status === 'Completed' && tx.amount > 0)
        .reduce((sum, tx) => sum + tx.amount, 0);

    const salesByModuleData = useMemo(() => {
        return moduleEngagement.map(mod => ({
            name: mod.name,
            sales: mod.value * (conversionRates[currency] || 1)
        }));
    }, [currency, moduleEngagement]);

  const userGrowthData = [
      { name: 'Jan', users: 400 },
      { name: 'Feb', users: 300 },
      { name: 'Mar', users: 500 },
      { name: 'Apr', users: 800 },
      { name: 'May', users: 700 },
      { name: 'Jun', users: 1200 },
  ];
  
    const topCategoriesData = useMemo(() => {
        const categoryMap = new Map<string, number>();
        transactions.forEach(tx => {
            if (tx.status === 'Completed' && tx.amount > 0) {
                // Simple logic to extract a "category" from description
                const category = tx.description.split(' ')[1] || tx.module;
                categoryMap.set(category, (categoryMap.get(category) || 0) + tx.amount);
            }
        });

        return Array.from(categoryMap.entries())
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5)
            .map(([name, value]) => ({ name, value }));

    }, [transactions]);


  const COLORS = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))', 'hsl(var(--chart-4))', 'hsl(var(--chart-5))'];

  return (
    <div className="flex flex-col gap-8">
        {/* At a Glance Cards */}
        <div>
            <h2 className="text-xl font-semibold mb-4">At a Glance</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{totalUsers.toLocaleString()}</div>
                        <p className="text-xs text-muted-foreground">Active clients on the platform</p>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Gross Merchandising Value (GMV)</CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{convertCurrency(gmv)}</div>
                         <p className="text-xs text-muted-foreground">Total completed transactions</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Orders</CardTitle>
                        <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">1,890</div>
                        <p className="text-xs text-muted-foreground">75 deliveries in progress</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Subscription Revenue</CardTitle>
                        <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{convertCurrency(12350)}</div>
                        <p className="text-xs text-muted-foreground">MRR</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Ad Revenue</CardTitle>
                        <BarChart className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{convertCurrency(4800)}</div>
                         <p className="text-xs text-muted-foreground">From banners & featured listings</p>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">VAS Utilization Revenue</CardTitle>
                        <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{convertCurrency(89400)}</div>
                         <p className="text-xs text-muted-foreground">From external partner products</p>
                    </CardContent>
                </Card>
            </div>
        </div>

        {/* Graph Widgets */}
        <div>
            <h2 className="text-xl font-semibold mb-4">Graph Widgets</h2>
            <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Sales by Module ({currency})</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <RechartsBarChart data={salesByModuleData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis tickFormatter={(value) => convertCurrency(value as number / (conversionRates[currency] || 1))} />
                                <Tooltip formatter={(value: number) => convertCurrency(value / (conversionRates[currency] || 1))} />
                                <Legend />
                                <Bar dataKey="sales" fill="hsl(var(--primary))" name="Sales" />
                            </RechartsBarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>User Growth Over Time</CardTitle>
                    </CardHeader>
                    <CardContent>
                         <ResponsiveContainer width="100%" height={300}>
                            <RechartsLineChart data={userGrowthData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="users" stroke="hsl(var(--primary))" />
                            </RechartsLineChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle>Top 5 Performing Categories</CardTitle>
                    </CardHeader>
                    <CardContent className="flex justify-center">
                        <ResponsiveContainer width="100%" height={300}>
                            <RechartsPieChart>
                                <Pie data={topCategoriesData} cx="50%" cy="50%" labelLine={false} outerRadius={100} dataKey="value" nameKey="name" label={(entry) => entry.name}>
                                    {topCategoriesData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip formatter={(value) => convertCurrency(value as number)} />
                                <Legend />
                            </RechartsPieChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>
        </div>

        {/* Alerts & Notifications */}
        <div>
            <h2 className="text-xl font-semibold mb-4">Alerts & Notifications</h2>
            <Card>
                 <CardContent className="pt-6">
                    <div className="space-y-4">
                        <div className="flex items-center gap-4 p-3 bg-secondary/10 rounded-lg">
                            <Bell className="h-5 w-5 text-primary" />
                            <div>
                                <p className="font-medium">New vendor applications pending verification</p>
                                <p className="text-sm text-muted-foreground">3 new applications</p>
                            </div>
                        </div>
                         <div className="flex items-center gap-4 p-3 bg-destructive/10 rounded-lg">
                            <AlertTriangle className="h-5 w-5 text-destructive" />
                            <div>
                                <p className="font-medium">Failed transactions / fraud alerts</p>
                                <p className="text-sm text-muted-foreground">5 suspicious transactions detected</p>
                            </div>
                        </div>
                         <div className="flex items-center gap-4 p-3 bg-green-100 dark:bg-green-900/20 rounded-lg">
                            <CheckCircle className="h-5 w-5 text-green-500" />
                            <div>
                                <p className="font-medium">System health (uptime, integrations status)</p>
                                <p className="text-sm text-muted-foreground">All systems operational. 99.99% uptime.</p>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    </div>
  );
}
