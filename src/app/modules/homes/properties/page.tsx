
import { getProperties } from '@/lib/firebase-services';
import { Property } from '@/lib/mock-data';
import { AllPropertiesClient } from '@/components/modules/homes/properties-client';

export default async function AllPropertiesPage() {
    const properties: Property[] = await getProperties();

    return (
        <AllPropertiesClient initialProperties={properties} />
    );
}
