
import { notFound } from 'next/navigation';
import { Property } from '@/lib/mock-data';
import { PropertyView } from '@/components/modules/homes/property-view';
import { getPropertyBySlug } from '@/lib/firebase-services';

// This is the main Server Component for the page
export default async function PropertyDetailsPage({ params }: { params: { slug: string } }) {
    const property = await getPropertyBySlug(params.slug);

    if (!property) {
        notFound();
    }

    return (
        <PropertyView property={property} />
    );
}
