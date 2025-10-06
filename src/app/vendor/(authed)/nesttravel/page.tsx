
import { getTravelListings } from "@/lib/firebase-services";
import { TravelListing, Vendor } from "@/lib/mock-data";
import { NestTravelDashboard } from "@/components/vendor/nesttravel-dashboard";
import { notFound } from "next/navigation";
import { getVendor } from "@/lib/firebase-services";

export default async function VendorNestTravelPage() {
    // For this prototype, we'll fetch data for the hardcoded "super vendor".
    const vendorId = 'v26'; 

    const vendor = await getVendor(vendorId);
    if (!vendor) {
        notFound();
    }

    const allListings: TravelListing[] = await getTravelListings();
    // In a real app, you'd fetch listings for the specific vendor more directly.
    const vendorListings = allListings.filter(l => l.vendorId === vendor.id);
    
    return (
        <NestTravelDashboard initialListings={vendorListings} />
    );
}
