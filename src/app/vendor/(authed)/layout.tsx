
import { getVendor } from '@/lib/firebase-services';
import { notFound } from 'next/navigation';
import { VendorSidebar } from './vendor-sidebar';
import { VendorLayoutClient } from './vendor-layout-client';

// This is now the main SERVER layout for the authenticated vendor section.
// It fetches data and passes it to client components.
export default async function VendorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // In a real app, you'd get the vendor ID from a session.
  const vendorId = 'v26';
  const vendor = await getVendor(vendorId);

  if (!vendor) {
    notFound();
  }

  return (
    <VendorLayoutClient sidebar={<VendorSidebar vendor={vendor} />}>
      {children}
    </VendorLayoutClient>
  );
}
