
import { getReviews, getVendor } from "@/lib/firebase-services";
import { Review } from "@/lib/mock-data";
import { notFound } from "next/navigation";
import { ReviewsDashboard } from "@/components/vendor/reviews-dashboard";

export default async function VendorReviewsPage() {
    const vendorId = 'v26'; 
    const vendor = await getVendor(vendorId);
    if (!vendor) {
        notFound();
    }

    const allReviews: Review[] = await getReviews();
    const vendorReviews = allReviews.filter(r => r.vendorId === vendorId);

    return (
        <ReviewsDashboard initialReviews={vendorReviews} />
    );
}
