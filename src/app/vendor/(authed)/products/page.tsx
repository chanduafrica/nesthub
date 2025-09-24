
import { getProducts, getVendor } from "@/lib/firebase-services";
import { Product, Vendor, Transaction } from "@/lib/mock-data";
import { ProductsList } from "@/components/vendor/products-list";
import { notFound } from "next/navigation";
import { getTransactions } from "@/lib/firebase-services";

export default async function VendorProductsPage() {
    // For this prototype, we'll fetch data for a hardcoded vendor.
    // In a real app, you would get the logged-in vendor's ID from the session.
    const vendorId = 'v1'; 

    const vendor = await getVendor(vendorId);
    if (!vendor) {
        notFound();
    }

    // This is a placeholder. In a real app, you'd fetch products for the specific vendor.
    const allProducts: Product[] = await getProducts();
    const vendorProducts = allProducts.filter(p => p.vendor === vendor.name);
    
    return <ProductsList initialProducts={vendorProducts} />;
}
