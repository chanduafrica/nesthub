
import { Vendor } from '@/lib/mock-data';
import fs from 'fs';
import path from 'path';
import { VendorsList } from '@/components/admin/vendors-list';

// This is now a SERVER component
export default async function AllVendorsPage() {
  
  // 1. Fetch data on the server
  const filePath = path.join(process.cwd(), 'src', 'lib', 'data', 'vendors.json');
  const jsonData = fs.readFileSync(filePath, 'utf-8');
  const vendors: Vendor[] = JSON.parse(jsonData);

  // 2. Pass the data as props to the client component
  return <VendorsList initialVendors={vendors} />;
}
