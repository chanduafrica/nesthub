
import { getMamaAfricaListings, getVendor } from "@/lib/firebase-services";
import { MamaAfricaListing } from "@/lib/mock-data";
import { MamaAfricaDashboard } from "@/components/vendor/mamaafrica-dashboard";
import { notFound } from "next/navigation";

export default async function VendorMamaAfricaPage() {
    // For this prototype, we'll fetch data for the hardcoded "super vendor".
    const vendorId = 'v26'; 

    const vendor = await getVendor(vendorId);
    if (!vendor) {
        notFound();
    }

    const allListings: MamaAfricaListing[] = await getMamaAfricaListings();
    // In a real app, you'd fetch listings for the specific vendor more directly.
    const vendorListings = allListings.filter(l => l.vendorId === vendor.id);
    
    return (
        <MamaAfricaDashboard initialListings={vendorListings} />
    );
}
