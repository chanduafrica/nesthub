'use client';
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { UserCircle } from 'lucide-react';
import Link from 'next/link';

export default function VendorLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <SidebarProvider>
      <SidebarInset className="flex flex-col">
          <header className="flex h-14 items-center gap-4 border-b bg-background px-4 sm:px-6">
          <SidebarTrigger className="sm:hidden" />
          <div className="w-full mx-auto flex items-center justify-between">
              <h1 className="text-lg font-semibold md:text-xl">Vendor Dashboard</h1>
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
              <div className="mx-auto flex">
                {children}
              </div>
          </main>
          <VendorFooter />
      </SidebarInset>
    </SidebarProvider>
  );
}

function VendorFooter() {
  return (
    <footer className="border-t bg-background p-4 sm:p-6">
      <div className="mx-auto text-sm text-muted-foreground flex flex-col sm:flex-row justify-between items-center gap-4">
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
