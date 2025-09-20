
import { notFound } from 'next/navigation';
import { VendorView } from '@/components/admin/vendor-view';
import { Vendor, Transaction } from '@/lib/mock-data';
import { getVendor } from '@/lib/firebase-services';
import fs from 'fs';
import path from 'path';

export default async function Vendor360Page({ params }: { params: { id: string } }) {
  
  // 1. Fetch all required data
  const vendor = await getVendor(params.id);
  
  const transactionsFilePath = path.join(process.cwd(), 'src', 'lib', 'data', 'transactions.json');
  const transactionsJsonData = fs.readFileSync(transactionsFilePath, 'utf-8');
  const allTransactions: Transaction[] = JSON.parse(transactionsJsonData);

  // 2. Handle not found case on the server
  if (!vendor) {
    notFound();
  }

  const vendorTransactions = allTransactions.filter(tx => tx.vendorId === vendor.id);

  // 3. Pass all the data as props to the client component
  return <VendorView vendor={vendor} transactions={vendorTransactions} />;
}
