
'use client';
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarTrigger,
  SidebarInset,
  SidebarSeparator,
} from '@/components/ui/sidebar';
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Star,
  BarChartIcon,
  Settings,
  UserCircle,
  MessageSquare,
  LifeBuoy,
  Landmark,
  FileCheck2,
  Home,
  BedDouble,
  Plane,
  Ticket,
  UtensilsCrossed,
  Briefcase,
  Store,
  Car
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
} from '@/components/ui/dropdown-menu';
import type { Vendor } from '@/lib/mock-data';

const portalConfig = {
    NestMall: { icon: Store, href: '/vendor/products' },
    NestHomes: { icon: Home, href: '#' },
    NestStays: { icon: BedDouble, href: '#' },
    NestTravel: { icon: Plane, href: '#' },
    NestEvents: { icon: Ticket, href: '#' },
    MamaAfrica: { icon: UtensilsCrossed, href: '#' },
    NestJobs: { icon: Briefcase, href: '#' },
    NestBiz: { icon: Landmark, href: '#' },
    NestParcel: { icon: Package, href: '#' },
    BuyMyCar: { icon: Car, href: '#' },
    Duka: { icon: ShoppingCart, href: '#' },
    AutoParts: { icon: Car, href: '#' },
    Back2School: { icon: Package, href: '#' },
    'All Portals': { icon: null, href: null }
} as const;

type PortalName = keyof typeof portalConfig;

export function VendorLayoutClient({
  children,
  vendor
}: {
  children: React.ReactNode;
  vendor: Vendor;
}) {

  const registeredPortals = vendor.portal.split(',').map(p => p.trim()) as PortalName[];
  
  const portalMenuItems = registeredPortals[0] === 'All Portals'
    ? Object.keys(portalConfig).filter(p => p !== 'All Portals') as PortalName[]
    : registeredPortals;

  return (
      <>
        <Sidebar>
            <SidebarHeader>
            <div className="flex items-center gap-2">
                <span className="font-semibold text-lg group-data-[collapsible=icon]:hidden">
                Vendor Portal
                </span>
            </div>
            </SidebarHeader>
            <SidebarContent>
            <SidebarMenu>
                <SidebarMenuItem>
                <SidebarMenuButton asChild>
                    <Link href="/vendor/dashboard">
                    <LayoutDashboard />
                    <span>Dashboard</span>
                    </Link>
                </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                <SidebarMenuButton asChild>
                    <Link href="/vendor/kyc">
                    <FileCheck2 />
                    <span>KYC/Verification</span>
                    </Link>
                </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
            <SidebarSeparator/>
            <SidebarMenu>
                 <SidebarMenuItem>
                    <span className="px-2 text-xs font-medium text-muted-foreground">My Portals</span>
                 </SidebarMenuItem>
                 {portalMenuItems.map(portalName => {
                    const config = portalConfig[portalName];
                    if (!config || !config.href) return null;
                    const Icon = config.icon;
                    return (
                        <SidebarMenuItem key={portalName}>
                            <SidebarMenuButton asChild>
                                <Link href={config.href}>
                                <Icon />
                                <span>{portalName}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    )
                 })}
            </SidebarMenu>
             <SidebarSeparator/>
            <SidebarMenu>
                 <SidebarMenuItem>
                    <span className="px-2 text-xs font-medium text-muted-foreground">Store Management</span>
                 </SidebarMenuItem>
                <SidebarMenuItem>
                <SidebarMenuButton asChild>
                    <Link href="/vendor/products">
                    <Package />
                    <span>Products</span>
                    </Link>
                </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                <SidebarMenuButton asChild>
                    <Link href="#">
                    <ShoppingCart />
                    <span>Orders</span>
                    </Link>
                </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                <SidebarMenuButton asChild>
                    <Link href="#">
                    <Landmark />
                    <span>Payouts</span>
                    </Link>
                </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                <SidebarMenuButton asChild>
                    <Link href="#">
                    <Star />
                    <span>Reviews</span>
                    </Link>
                </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                <SidebarMenuButton asChild>
                    <Link href="#">
                    <BarChartIcon />
                    <span>Analytics</span>
                    </Link>
                </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                <SidebarMenuButton asChild>
                    <Link href="#">
                    <MessageSquare />
                    <span>Messages</span>
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
                <SidebarMenuItem>
                <SidebarMenuButton asChild>
                    <Link href="#">
                    <LifeBuoy />
                    <span>Support</span>
                    </Link>
                </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
        <SidebarInset className="flex flex-col">
            <header className="flex h-14 items-center gap-4 border-b bg-background px-4 sm:px-6">
            <SidebarTrigger className="sm:hidden" />
            <div className="w-[94%] mx-auto flex items-center justify-between">
                <h1 className="text-lg font-semibold md:text-xl">{vendor.name}</h1>
                <div className="ml-auto flex items-center gap-4">
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
                        <Link href="/vendor/login">Logout</Link>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
            </header>
            <main className="flex-1 overflow-auto p-4 sm:p-6">
                <div className="w-[94%] mx-auto">
                {children}
                </div>
            </main>
            <VendorFooter />
        </SidebarInset>
      </>
  );
}

function VendorFooter() {
  return (
    <footer className="border-t bg-background p-4 sm:p-6">
      <div className="w-[94%] mx-auto text-sm text-muted-foreground flex flex-col sm:flex-row justify-between items-center gap-4">
        <p>&copy; {new Date().getFullYear()} SG-Nest Vendor Portal. All Rights Reserved.</p>
        <div className="flex gap-4">
            <Link href="#" className="hover:text-primary">Terms of Service</Link>
            <Link href="#" className="hover:text-primary">Privacy Policy</Link>
            <Link href="#" className="hover:text-primary">Support</Link>
        </div>
      </div>
    </footer>
  );
}

