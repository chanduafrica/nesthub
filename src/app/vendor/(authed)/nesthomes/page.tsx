
import { getProperties, getVendor } from "@/lib/firebase-services";
import { Property, Vendor } from "@/lib/mock-data";
import { NestHomesDashboard } from "@/components/vendor/nesthomes-dashboard";
import { notFound } from "next/navigation";

export default async function VendorNestHomesPage() {
    // For this prototype, we'll fetch data for the hardcoded "super vendor".
    const vendorId = 'v26'; 

    const vendor = await getVendor(vendorId);
    if (!vendor) {
        notFound();
    }

    const allProperties: Property[] = await getProperties();
    // In a real app, you'd fetch properties for the specific vendor more directly.
    const vendorProperties = allProperties.filter(p => p.vendorId === vendor.id);
    
    return (
        <NestHomesDashboard initialProperties={vendorProperties} />
    );
}
