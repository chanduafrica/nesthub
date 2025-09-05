import { notFound } from 'next/navigation';
import { VendorView } from '@/components/admin/vendor-view';
import { Vendor } from '@/lib/mock-data';
import fs from 'fs';
import path from 'path';

export default function Vendor360Page({ params }: { params: { id: string } }) {
  
  const filePath = path.join(process.cwd(), 'src', 'lib', 'data', 'vendors.json');
  const jsonData = fs.readFileSync(filePath, 'utf-8');
  const vendors: Vendor[] = JSON.parse(jsonData);
  
  const vendor = vendors.find((c) => c.id === params.id);

  if (!vendor) {
    notFound();
  }

  return <VendorView vendor={vendor} />;
}
