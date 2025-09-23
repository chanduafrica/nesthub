
import { HolidayPackage } from "@/lib/mock-data";
import { getHolidayPackages } from "@/lib/firebase-services";
import { PackagesClient } from "@/components/modules/travel/packages-client";

export default async function HolidayPackagesPage() {
    const packages: HolidayPackage[] = await getHolidayPackages();
    return (
        <main>
            <PackagesClient initialPackages={packages} />
        </main>
    );
}
