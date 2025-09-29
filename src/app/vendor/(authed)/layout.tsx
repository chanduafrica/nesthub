
import {
  SidebarProvider,
} from '@/components/ui/sidebar';
import { getVendor } from '@/lib/firebase-services';
import { notFound } from 'next/navigation';
import { VendorLayoutClient } from './layout-client';


export default async function VendorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
    // For this prototype, we'll fetch data for the hardcoded "super vendor".
    // In a real app, you would get the logged-in vendor's ID from the session.
    const vendorId = 'v26'; 
    const vendor = await getVendor(vendorId);

    if (!vendor) {
        notFound();
    }

  return (
    <SidebarProvider>
        <VendorLayoutClient vendor={vendor}>
            {children}
        </VendorLayoutClient>
    </SidebarProvider>
  );
}
