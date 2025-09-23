
import { Product } from "@/lib/mock-data";
import { getProducts } from "@/lib/firebase-services";
import { ShopClient } from "@/components/modules/mall/shop-client";

export default async function ShopAllPage() {
    const products: Product[] = await getProducts();
    return (
        <main>
            <ShopClient initialProducts={products} />
        </main>
    );
}
