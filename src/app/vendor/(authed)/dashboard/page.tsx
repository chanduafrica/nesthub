
import { notFound } from 'next/navigation';
import { Vendor, Transaction } from '@/lib/mock-data';
import { getVendor, getTransactions } from '@/lib/firebase-services';
import { VendorDashboardClient } from '@/components/vendor/dashboard-client';

// This is the main Server Component for the vendor dashboard.
export default async function VendorDashboardPage() {
  // For this prototype, we'll fetch data for a hardcoded vendor.
  // In a real app, you would get the logged-in vendor's ID from the session.
  const vendorId = 'v1'; 

  // 1. Fetch all required data on the server
  const vendor = await getVendor(vendorId);
  
  // 2. Handle not found case on the server
  if (!vendor) {
    notFound();
  }

  const allTransactions: Transaction[] = await getTransactions();
  const vendorTransactions = allTransactions.filter(tx => tx.vendorId === vendor.id);

  // 3. Pass all the data as props to the client component
  return <VendorDashboardClient vendor={vendor} transactions={vendorTransactions} />;
}
