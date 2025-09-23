
import { getProperties } from '@/lib/firebase-services';
import { Property } from '@/lib/mock-data';
import { NestHomesClient } from '@/components/modules/homes/nesthomes-client';

export default async function NestHomesPage() {
    const properties: Property[] = await getProperties();

    return (
        <main>
            <NestHomesClient initialProperties={properties} />
        </main>
    );
}
