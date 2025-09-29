
import { getStays } from '@/lib/firebase-services';
import { Stay } from '@/lib/mock-data';
import { StaysClient } from '@/components/modules/stays/stays-client';
import { NestSearch } from '@/components/nest-search';

export default async function NestStaysPage() {
    const stays: Stay[] = await getStays();
    return (
        <>
            <StaysClient initialStays={stays} />
            <NestSearch />
        </>
    );
}
