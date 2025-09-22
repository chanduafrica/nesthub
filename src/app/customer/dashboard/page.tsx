
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Award, Package, Heart, Settings, ShoppingCart, User } from "lucide-react";
import Link from "next/link";

const recentOrders = [
    { id: "ORD001", item: "Ankara Print Dress", date: "2023-07-25", status: "Delivered", amount: "KES 3,500" },
    { id: "ORD002", item: "Flight to Mombasa", date: "2023-07-28", status: "Confirmed", amount: "KES 8,200" },
    { id: "ORD003", item: "Super-fly Air Sneakers", date: "2023-08-01", status: "Shipped", amount: "KES 5,500" },
];


export default function CustomerDashboardPage() {
  return (
    <div className="grid gap-4 md:gap-8">
       <Card>
            <CardHeader>
                <CardTitle>Welcome back, Wanjiku!</CardTitle>
                <CardDescription>Here's a quick overview of your account.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                 <Card>
                    <CardHeader className="pb-2">
                        <CardDescription>Sparks Points</CardDescription>
                        <CardTitle className="text-4xl flex items-center gap-2">
                            <Award className="h-8 w-8 text-primary"/> 1,250
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-xs text-muted-foreground">
                            +200 points from your last order
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Progress value={50} aria-label="50% to next reward" />
                    </CardFooter>
                 </Card>
                 <Card>
                    <CardHeader className="pb-2">
                        <CardDescription>Lifetime Spending</CardDescription>
                        <CardTitle className="text-4xl">KES 125,500</CardTitle>
                    </CardHeader>
                     <CardContent>
                        <div className="text-xs text-muted-foreground">
                            Across all SG-Nest portals
                        </div>
                    </CardContent>
                 </Card>
                  <Card>
                    <CardHeader className="pb-2">
                        <CardDescription>Open Carts</CardDescription>
                         <CardTitle className="text-4xl flex items-center gap-2">
                           <ShoppingCart className="h-8 w-8 text-primary"/> 2
                        </CardTitle>
                    </CardHeader>
                     <CardContent>
                        <div className="text-xs text-muted-foreground">
                            Finish your checkout now!
                        </div>
                    </CardContent>
                 </Card>
                  <Card>
                    <CardHeader className="pb-2">
                        <CardDescription>Wishlisted Items</CardDescription>
                         <CardTitle className="text-4xl flex items-center gap-2">
                           <Heart className="h-8 w-8 text-primary"/> 8
                        </CardTitle>
                    </CardHeader>
                     <CardContent>
                        <div className="text-xs text-muted-foreground">
                           Ready for your next purchase.
                        </div>
                    </CardContent>
                 </Card>
            </CardContent>
        </Card>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="lg:col-span-4" id="orders">
                <CardHeader>
                    <CardTitle>Recent Orders</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Item</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Amount</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {recentOrders.map(order => (
                                <TableRow key={order.id}>
                                    <TableCell className="font-medium">{order.item}</TableCell>
                                    <TableCell>{order.date}</TableCell>
                                    <TableCell>{order.status}</TableCell>
                                    <TableCell className="text-right">{order.amount}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
                 <CardFooter className="flex justify-end">
                    <Button asChild variant="outline">
                        <Link href="#">View All Orders</Link>
                    </Button>
                </CardFooter>
            </Card>

            <Card className="lg:col-span-3" id="settings">
                 <CardHeader>
                    <CardTitle>Account Settings</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <div className="flex items-center justify-between rounded-lg border p-4">
                        <div>
                            <h3 className="font-medium">Profile Information</h3>
                            <p className="text-sm text-muted-foreground">Edit your name, email, and phone.</p>
                        </div>
                        <Button variant="outline" size="sm">Edit</Button>
                    </div>
                     <div className="flex items-center justify-between rounded-lg border p-4">
                        <div>
                            <h3 className="font-medium">Saved Addresses</h3>
                            <p className="text-sm text-muted-foreground">Manage your shipping locations.</p>
                        </div>
                        <Button variant="outline" size="sm">Manage</Button>
                    </div>
                     <div className="flex items-center justify-between rounded-lg border p-4">
                        <div>
                            <h3 className="font-medium">Change Password</h3>
                            <p className="text-sm text-muted-foreground">Update your login credentials.</p>
                        </div>
                        <Button variant="outline" size="sm">Change</Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    </div>
  );
}
