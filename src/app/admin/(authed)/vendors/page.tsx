
import { Vendor, Transaction } from '@/lib/mock-data';
import { VendorsList, VendorWithBusiness } from '@/components/admin/vendors-list';
import { getVendors, getTransactions } from '@/lib/firebase-services';

// This is now a SERVER component
export default async function AllVendorsPage() {
  
  // 1. Fetch all required data
  const allVendors: Vendor[] = await getVendors();
  const allTransactions: Transaction[] = await getTransactions();

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
