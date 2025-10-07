
import { getTransactions, getVendor } from "@/lib/firebase-services";
import { Transaction, Vendor } from "@/lib/mock-data";
import { CommissionsDashboard } from "@/components/vendor/commissions-dashboard";
import { notFound } from "next/navigation";

export default async function VendorCommissionsPage() {
    // For this prototype, we'll fetch data for the hardcoded "super vendor".
    const vendorId = 'v26'; 

    const vendor = await getVendor(vendorId);
    if (!vendor) {
        notFound();
    }

    // In a real app, you'd fetch transactions for the specific vendor more directly.
    const allTransactions: Transaction[] = await getTransactions();
    const vendorTransactions = allTransactions.filter(tx => tx.vendorId === vendor.id);
    
    return (
        <CommissionsDashboard initialTransactions={vendorTransactions} />
    );
}
