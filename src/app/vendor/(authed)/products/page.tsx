
import { getProducts, getVendor } from "@/lib/firebase-services";
import { Product, Vendor } from "@/lib/mock-data";
import { ProductsList } from "@/components/vendor/products-list";
import { notFound } from "next/navigation";

export default async function VendorProductsPage() {
    // For this prototype, we'll fetch data for the hardcoded "super vendor".
    // In a real app, you would get the logged-in vendor's ID from the session.
    const vendorId = 'v26'; 

    const vendor = await getVendor(vendorId);
    if (!vendor) {
        notFound();
    }

    // This is a placeholder. In a real app, you'd fetch products for the specific vendor more directly.
    const allProducts: Product[] = await getProducts();
    const vendorProducts = allProducts.filter(p => p.vendor === vendor.name);
    
    return <ProductsList initialProducts={vendorProducts} />;
}
