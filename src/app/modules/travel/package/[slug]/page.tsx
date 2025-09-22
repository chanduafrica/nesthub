
import { notFound } from 'next/navigation';
import { HolidayPackage } from '@/lib/mock-data';
import { getPackageBySlug } from '@/lib/firebase-services';
import { PackageDetailClient } from '@/components/modules/travel/package-detail-client';


// This is now the main Server Component for the page.
export default async function PackageDetailPage({ params }: { params: { slug: string } }) {
    // 1. Fetch data on the server
    const pkg = await getPackageBySlug(params.slug);

    // 2. Handle not found case on the server
    if (!pkg) {
        notFound();
    }

    // 3. Pass the data as props to the Client Component
    return <PackageDetailClient pkg={pkg} />;
}
