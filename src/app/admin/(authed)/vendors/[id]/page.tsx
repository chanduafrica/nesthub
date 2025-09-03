import { notFound } from 'next/navigation';
import { mockVendors } from '@/lib/mock-data';
import { VendorView } from '@/components/admin/vendor-view';

export default function Vendor360Page({ params }: { params: { id: string } }) {
  
  const vendor = mockVendors.find((c) => c.id === params.id);

  if (!vendor) {
    notFound();
  }

  return <VendorView vendor={vendor} />;
}
