
import { getProperties } from '@/lib/firebase-services';
import { Property } from '@/lib/mock-data';
import { AllPropertiesClient } from '@/components/modules/homes/properties-client';
import { NestSearch } from '@/components/nest-search';

export default async function AllPropertiesPage() {
    const properties: Property[] = await getProperties();

    return (
        <>
            <AllPropertiesClient initialProperties={properties} />
            <NestSearch />
        </>
    );
}
