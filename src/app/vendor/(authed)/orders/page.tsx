
import { getTransactions, getVendor, getClients } from "@/lib/firebase-services";
import { Transaction, Vendor, Client } from "@/lib/mock-data";
import { OrdersList } from "@/components/vendor/orders-list";
import { notFound } from "next/navigation";

export default async function VendorOrdersPage() {
    // For this prototype, we'll fetch data for the hardcoded "super vendor".
    const vendorId = 'v26'; 

    const vendor = await getVendor(vendorId);
    if (!vendor) {
        notFound();
    }

    // In a real app, you'd fetch orders/transactions for the specific vendor more directly.
    const allTransactions: Transaction[] = await getTransactions();
    const vendorTransactions = allTransactions.filter(tx => tx.vendorId === vendor.id);

    const allClients: Client[] = await getClients();
    
    return (
        <OrdersList initialOrders={vendorTransactions} clients={allClients} />
    );
}
