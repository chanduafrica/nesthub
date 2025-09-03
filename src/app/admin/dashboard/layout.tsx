
'use client';
import { useState }from 'react';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarTrigger,
  SidebarInset,
} from '@/components/ui/sidebar';
import {
  LayoutDashboard,
  ShoppingCart,
  Home,
  Plane,
  MessageSquare,
  Ticket,
  Briefcase,
  Store,
  UtensilsCrossed,
  Package,
  PlayCircle,
  Settings,
  UserCircle,
  Globe,
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from '@/components/ui/dropdown-menu';
import { NestIcon } from '@/components/icons';
import { CurrencyProvider } from '@/hooks/use-currency';


export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [currency, setCurrency] = useState('KES');

  return (
    <CurrencyProvider>
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2">
            <NestIcon className="w-6 h-6 text-primary" />
            <span className="font-semibold text-lg group-data-[collapsible=icon]:hidden">
              DigitalNest
            </span>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive>
                <Link href="/admin/dashboard">
                  <LayoutDashboard />
                  <span>Dashboard</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
             <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href="#">
                  <ShoppingCart />
                  <span>NestMall</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
             <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href="#">
                  <Home />
                  <span>NestHomes</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
             <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href="#">
                  <Plane />
                  <span>NestTravel</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href="#">
                  <MessageSquare />
                  <span>Campfire</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
             <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href="#">
                  <Ticket />
                  <span>NestEvents</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
             <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href="#">
                  <Briefcase />
                  <span>NestJobs</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
             <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href="#">
                  <Store />
                  <span>NestBiz</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href="#">
                  <UtensilsCrossed />
                  <span>NestEats</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href="#">
                  <Package />
                  <span>NestParcel</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href="#">
                  <PlayCircle />
                  <span>NestMedia</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href="#">
                  <Settings />
                  <span>Settings</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-14 items-center gap-4 border-b bg-background px-4 sm:px-6">
          <SidebarTrigger className="sm:hidden" />
          <h1 className="text-lg font-semibold md:text-xl">Command Center</h1>
          <div className="ml-auto flex items-center gap-4">
             <AdminCurrencySwitcher />
             <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="overflow-hidden rounded-full"
                  >
                    <UserCircle className="h-6 w-6" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuItem>Support</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/admin/login">Logout</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
          </div>
        </header>
        <main className="flex-1 overflow-auto p-4 sm:p-6">
            {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
    </CurrencyProvider>
  );
}

function AdminCurrencySwitcher() {
    const { currency, setCurrency } = useCurrency();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                variant="ghost"
                size="icon"
                className="overflow-hidden rounded-full"
                >
                <Globe className="h-5 w-5" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>Currency</DropdownMenuLabel>
                <DropdownMenuRadioGroup value={currency} onValueChange={setCurrency}>
                <DropdownMenuRadioItem value="KES">KES</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="UGX">UGX</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="TZS">TZS</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="RWF">RWF</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="BIF">BIF</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="SSP">SSP</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="SOS">SOS</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

