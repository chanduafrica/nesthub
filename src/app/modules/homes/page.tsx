
import { getProperties } from '@/lib/firebase-services';
import { Property } from '@/lib/mock-data';
import { NestHomesClient } from '@/components/modules/homes/nesthomes-client';
import { NestSearch } from '@/components/nest-search';

export default async function NestHomesPage() {
    const properties: Property[] = await getProperties();

    return (
        <>
            <NestHomesClient initialProperties={properties} />
            <NestSearch />
        </>
    );
}
