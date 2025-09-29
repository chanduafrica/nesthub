import { getVendor } from '@/lib/firebase-services';
import { notFound } from 'next/navigation';
import { VendorSidebarContent } from './vendor-sidebar-content';

// This is the new async Server Component.
// It fetches the data on the server.
export async function VendorSidebar() {
  // In a real app, you'd get the vendor ID from a session.
  // We continue to use the hardcoded ID for the super-vendor for this prototype.
  const vendorId = 'v26';
  const vendor = await getVendor(vendorId);

  if (!vendor) {
    notFound();
  }

  // It then renders the Client Component, passing the data as props.
  return <VendorSidebarContent vendor={vendor} />;
}
