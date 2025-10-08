
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";


export default function DukaDashboardPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-muted/40">
        <Card className="w-full max-w-lg text-center">
            <CardHeader>
                <CardTitle>Welcome to your Duka Dashboard!</CardTitle>
                <CardDescription>This page is under construction. For now, you can manage your main account from the central customer dashboard.</CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">You have successfully logged in.</p>
            </CardContent>
            <CardFooter className="flex-col gap-4">
                <Button asChild>
                    <Link href="/customer/dashboard">Go to Main Dashboard</Link>
                </Button>
                <Button variant="outline" asChild>
                     <Link href="/modules/duka">Back to Duka Home</Link>
                </Button>
            </CardFooter>
        </Card>
    </div>
  );
}

