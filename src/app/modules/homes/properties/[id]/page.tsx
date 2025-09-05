
import { notFound } from 'next/navigation';
import { Property } from '@/lib/mock-data';
import fs from 'fs';
import path from 'path';
import { PropertyView } from '@/components/modules/homes/property-view';

async function getPropertyData(id: string): Promise<Property | undefined> {
    const filePath = path.join(process.cwd(), 'src', 'lib', 'data', 'properties.json');
    try {
        const fileContents = fs.readFileSync(filePath, 'utf8');
        const properties: Property[] = JSON.parse(fileContents);
        return properties.find(p => p.id === id);
    } catch (error) {
        console.error("Failed to read or parse properties data:", error);
        return undefined;
    }
}

// This is the main Server Component for the page
export default async function PropertyDetailsPage({ params }: { params: { id: string } }) {
    const property = await getPropertyData(params.id);

    if (!property) {
        notFound();
    }

    return <PropertyView property={property} />;
}
