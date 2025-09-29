
import { Product } from "@/lib/mock-data";
import { getProducts } from "@/lib/firebase-services";
import { ShopClient } from "@/components/modules/mall/shop-client";
import { NestSearch } from '@/components/nest-search';

export default async function ShopAllPage() {
    const products: Product[] = await getProducts();
    return (
        <>
            <ShopClient initialProducts={products} />
            <NestSearch />
        </>
    );
}
