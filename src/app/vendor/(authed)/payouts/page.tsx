
import { getTransactions, getVendor } from "@/lib/firebase-services";
import { Transaction, Vendor } from "@/lib/mock-data";
import { PayoutsDashboard } from "@/components/vendor/payouts-dashboard";
import { notFound } from "next/navigation";

export default async function VendorPayoutsPage() {
    // For this prototype, we'll fetch data for the hardcoded "super vendor".
    const vendorId = 'v26'; 

    const vendor = await getVendor(vendorId);
    if (!vendor) {
        notFound();
    }

    // In a real app, you'd fetch payout-specific transactions.
    // For now, we'll use the main transaction log.
    const allTransactions: Transaction[] = await getTransactions();
    const vendorTransactions = allTransactions.filter(tx => tx.vendorId === vendor.id);
    
    return (
        <PayoutsDashboard initialTransactions={vendorTransactions} />
    );
}
