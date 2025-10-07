
import { SparksDashboard } from "@/components/vendor/sparks-dashboard";
import { getTransactions, getVendor } from "@/lib/firebase-services";
import { Transaction } from "@/lib/mock-data";
import { notFound } from "next/navigation";

export default async function VendorSparksPage() {
    // For this prototype, we'll fetch data for the hardcoded "super vendor".
    const vendorId = 'v26'; 

    const vendor = await getVendor(vendorId);
    if (!vendor) {
        notFound();
    }

    const allTransactions: Transaction[] = await getTransactions();
    const vendorTransactions = allTransactions.filter(tx => tx.vendorId === vendor.id);
    
    return (
        <SparksDashboard initialTransactions={vendorTransactions} />
    );
}
