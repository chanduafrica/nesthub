
import { notFound } from 'next/navigation';
import { VendorView } from '@/components/admin/vendor-view';
import { Vendor, Transaction } from '@/lib/mock-data';
import fs from 'fs';
import path from 'path';

export default function Vendor360Page({ params }: { params: { id: string } }) {
  
  // 1. Fetch all required data on the server
  const vendorsFilePath = path.join(process.cwd(), 'src', 'lib', 'data', 'vendors.json');
  const transactionsFilePath = path.join(process.cwd(), 'src', 'lib', 'data', 'transactions.json');

  const vendorsJsonData = fs.readFileSync(vendorsFilePath, 'utf-8');
  const transactionsJsonData = fs.readFileSync(transactionsFilePath, 'utf-8');
  
  const allVendors: Vendor[] = JSON.parse(vendorsJsonData);
  const allTransactions: Transaction[] = JSON.parse(transactionsJsonData);

  const vendor = allVendors.find((v) => v.id === params.id);

  // 2. Handle not found case on the server
  if (!vendor) {
    notFound();
  }

  const vendorTransactions = allTransactions.filter(tx => tx.vendorId === vendor.id);

  // 3. Pass all the data as props to the client component
  return <VendorView vendor={vendor} transactions={vendorTransactions} />;
}
