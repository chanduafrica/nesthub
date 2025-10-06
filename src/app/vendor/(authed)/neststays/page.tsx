
import { getStayListings, getVendor } from "@/lib/firebase-services";
import { StayListing } from "@/lib/mock-data";
import { NestStaysDashboard } from "@/components/vendor/neststays-dashboard";
import { notFound } from "next/navigation";

export default async function VendorNestStaysPage() {
    // For this prototype, we'll fetch data for the hardcoded "super vendor".
    const vendorId = 'v26'; 

    const vendor = await getVendor(vendorId);
    if (!vendor) {
        notFound();
    }

    const allListings: StayListing[] = await getStayListings();
    const vendorListings = allListings.filter(l => l.vendorId === vendor.id);
    
    return (
        <NestStaysDashboard initialListings={vendorListings} />
    );
}
