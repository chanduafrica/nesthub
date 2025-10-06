
import { getAutoPartListings, getVendor } from "@/lib/firebase-services";
import { AutoPartListing } from "@/lib/mock-data";
import { NestAutoPartsDashboard } from "@/components/vendor/nestautoparts-dashboard";
import { notFound } from "next/navigation";

export default async function VendorAutoPartsPage() {
    const vendorId = 'v26'; 

    const vendor = await getVendor(vendorId);
    if (!vendor) {
        notFound();
    }

    const allListings: AutoPartListing[] = await getAutoPartListings();
    const vendorListings = allListings.filter(l => l.vendorId === vendor.id);
    
    return (
        <NestAutoPartsDashboard initialListings={vendorListings} />
    );
}
