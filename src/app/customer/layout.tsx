
'use client';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { HomeIcon, Menu, Package, Plane, Search, Settings, ShoppingCart, User, UserCircle } from "lucide-react";
import Link from "next/link";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { NestSearch } from '@/components/nest-search';

const navLinks = [
    { href: "/home", icon: HomeIcon, text: "Home" },
    { href: "/modules/mall", icon: ShoppingCart, text: "Mall" },
    { href: "/modules/travel", icon: Plane, text: "Travel" },
    { href: "/customer/dashboard#orders", icon: Package, text: "My Orders" },
    { href: "/customer/dashboard#settings", icon: Settings, text: "Settings" },
];

function CustomerHeader() {
    return (
    <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6 z-50">
        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <Link
            href="/home"
            className="flex items-center gap-2 text-lg font-semibold md:text-base"
          >
            <span className="font-bold text-lg">
                <span className="text-primary">SG-</span><span className="text-secondary">NEST</span>
            </span>
            <span className="sr-only">SG-Nest</span>
          </Link>
          {navLinks.map(link => (
            <Link
                key={link.text}
                href={link.href}
                className="text-muted-foreground transition-colors hover:text-foreground"
            >
                {link.text}
            </Link>
          ))}
        </nav>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <nav className="grid gap-6 text-lg font-medium">
               <Link
                href="/home"
                className="flex items-center gap-2 text-lg font-semibold"
              >
                 <span className="font-bold text-lg">
                    <span className="text-primary">SG-</span><span className="text-secondary">NEST</span>
                </span>
                <span className="sr-only">SG-Nest</span>
              </Link>
              {navLinks.map(link => (
                 <Link
                    key={link.text}
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground"
                 >
                    {link.text}
                 </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
        <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
          <form className="ml-auto flex-1 sm:flex-initial">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products..."
                className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
              />
            </div>
          </form>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <UserCircle className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/home">Logout</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
    )
}

export default function CustomerDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen w-full flex-col">
       <CustomerHeader />
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                        <Link href="/home">Home</Link>
                    </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                    <BreadcrumbPage>Dashboard</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            {children}
        </main>
        <NestSearch />
    </div>
  );
}
