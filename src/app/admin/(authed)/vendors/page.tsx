
import { Vendor, Transaction } from '@/lib/mock-data';
import fs from 'fs';
import path from 'path';
import { VendorsList, VendorWithBusiness } from '@/components/admin/vendors-list';

// This is now a SERVER component
export default async function AllVendorsPage() {
  
  // 1. Fetch all required data on the server
  const vendorsFilePath = path.join(process.cwd(), 'src', 'lib', 'data', 'vendors.json');
  const transactionsFilePath = path.join(process.cwd(), 'src', 'lib', 'data', 'transactions.json');
  
  const vendorsJsonData = fs.readFileSync(vendorsFilePath, 'utf-8');
  const transactionsJsonData = fs.readFileSync(transactionsFilePath, 'utf-8');

  const allVendors: Vendor[] = JSON.parse(vendorsJsonData);
  const allTransactions: Transaction[] = JSON.parse(transactionsJsonData);

  // 2. Calculate business totals on the server
  const vendorBusiness = new Map<string, number>();
  allTransactions.forEach(tx => {
      if (tx.vendorId && tx.status === 'Completed') {
          vendorBusiness.set(tx.vendorId, (vendorBusiness.get(tx.vendorId) || 0) + tx.amount);
      }
  });

  // 3. Combine vendor data with business totals
  const vendorsWithBusiness: VendorWithBusiness[] = allVendors.map(vendor => ({
    ...vendor,
    totalBusiness: vendorBusiness.get(vendor.id) || 0,
  }));

  // 4. Pass the processed data as props to the client component
  return <VendorsList initialVendors={vendorsWithBusiness} />;
}
