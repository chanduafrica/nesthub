import { getDukaProducts, getDukaShops } from "@/lib/firebase-services";
import { DukaProduct, DukaShop } from "@/lib/mock-data";
import { DukaClientPage } from "@/components/modules/duka/duka-client-page";

// This is now a Server Component responsible for fetching data
export default async function DukaHomePage() {
    
    // Fetch data on the server
    const products: DukaProduct[] = await getDukaProducts();
    const shops: DukaShop[] = await getDukaShops();

    // Pass data to the Client Component
    return (
        <DukaClientPage initialProducts={products} initialShops={shops} />
    );
}
