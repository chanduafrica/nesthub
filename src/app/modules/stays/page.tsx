
import { getStays } from '@/lib/firebase-services';
import { Stay } from '@/lib/mock-data';
import { StaysClient } from '@/components/modules/stays/stays-client';

export default async function NestStaysPage() {
    const stays: Stay[] = await getStays();
    return <StaysClient initialStays={stays} />;
}
