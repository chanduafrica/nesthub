
'use client';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Users, DollarSign, Activity, ShoppingCart, Home, Plane, Briefcase } from "lucide-react";


export default function AdminDashboardPage() {

  return (
    <div className="grid gap-6">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">$4,523,189</div>
                    <p className="text-xs text-muted-foreground">+20.1% from last month</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">+2350</div>
                    <p className="text-xs text-muted-foreground">+180.1% from last month</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Active Portals</CardTitle>
                    <Activity className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">10</div>
                    <p className="text-xs text-muted-foreground">All modules are online</p>
                </CardContent>
            </Card>
             <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Transactions</CardTitle>
                    <Activity className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">+573</div>
                     <p className="text-xs text-muted-foreground">+201 since last hour</p>
                </CardContent>
            </Card>
        </div>
        
        <div>
            <h2 className="text-xl font-semibold mb-4">Portal Analytics</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                 <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lg">
                            <ShoppingCart className="h-5 w-5" />
                            NestMall
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-xl font-bold">1,254</div>
                        <p className="text-xs text-muted-foreground">Active Orders</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lg">
                            <Home className="h-5 w-5" />
                            NestHomes
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                         <div className="text-xl font-bold">342</div>
                        <p className="text-xs text-muted-foreground">Properties Listed</p>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lg">
                            <Plane className="h-5 w-5" />
                            NestTravel
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                         <div className="text-xl font-bold">891</div>
                        <p className="text-xs text-muted-foreground">Bookings Today</p>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lg">
                            <Briefcase className="h-5 w-5" />
                            NestJobs
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                         <div className="text-xl font-bold">5,678</div>
                        <p className="text-xs text-muted-foreground">Active Listings</p>
                    </CardContent>
                </Card>
            </div>
        </div>

         <Card>
            <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>A log of recent activities across all portals.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <div className="flex items-center gap-4">
                        <div className="p-2 bg-secondary rounded-md"><ShoppingCart className="h-5 w-5 text-muted-foreground" /></div>
                        <div>
                            <p className="font-medium">New order #ORD-00124 on NestMall</p>
                            <p className="text-sm text-muted-foreground">2 minutes ago</p>
                        </div>
                    </div>
                     <div className="flex items-center gap-4">
                        <div className="p-2 bg-secondary rounded-md"><Home className="h-5 w-5 text-muted-foreground" /></div>
                        <div>
                            <p className="font-medium">New property verification for "Modern Villa" on NestHomes</p>
                            <p className="text-sm text-muted-foreground">10 minutes ago</p>
                        </div>
                    </div>
                     <div className="flex items-center gap-4">
                        <div className="p-2 bg-secondary rounded-md"><Users className="h-5 w-5 text-muted-foreground" /></div>
                        <div>
                            <p className="font-medium">New user registered: user@example.com</p>
                            <p className="text-sm text-muted-foreground">15 minutes ago</p>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    </div>
  );
}

