
import { notFound } from 'next/navigation';
import { Property } from '@/lib/mock-data';
import fs from 'fs';
import path from 'path';
import { PropertyView } from '@/components/modules/homes/property-view';

async function getPropertyData(slug: string): Promise<Property | undefined> {
    const filePath = path.join(process.cwd(), 'src', 'lib', 'data', 'properties.json');
    try {
        const fileContents = fs.readFileSync(filePath, 'utf8');
        const properties: Property[] = JSON.parse(fileContents);
        // Find property by matching a generated slug from the title
        return properties.find(p => p.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') === slug);
    } catch (error) {
        console.error("Failed to read or parse properties data:", error);
        return undefined;
    }
}

// This is the main Server Component for the page
export default async function PropertyDetailsPage({ params }: { params: { slug: string } }) {
    const property = await getPropertyData(params.slug);

    if (!property) {
        notFound();
    }

    return <PropertyView property={property} />;
}
