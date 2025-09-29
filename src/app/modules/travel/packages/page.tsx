
import { HolidayPackage } from "@/lib/mock-data";
import { getHolidayPackages } from "@/lib/firebase-services";
import { PackagesClient } from "@/components/modules/travel/packages-client";
import { NestSearch } from '@/components/nest-search';

export default async function HolidayPackagesPage() {
    const packages: HolidayPackage[] = await getHolidayPackages();
    return (
        <>
            <PackagesClient initialPackages={packages} />
            <NestSearch />
        </>
    );
}
