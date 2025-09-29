
import type { Vendor } from '@/lib/mock-data';
import { VendorSidebarContent } from './vendor-sidebar-content';

// This is an async Server Component.
// Its only job is to prepare the props and render the client component.
export async function VendorSidebar({ vendor }: { vendor: Vendor }) {
  // It then renders the Client Component, passing the data as props.
  return <VendorSidebarContent vendor={vendor} />;
}
