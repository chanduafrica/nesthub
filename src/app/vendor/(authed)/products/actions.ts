
'use server';

import { promises as fs } from 'fs';
import path from 'path';
import { revalidatePath } from 'next/cache';
import type { Product } from '@/lib/mock-data';
import { getProducts } from '@/lib/firebase-services';

const dataDirectory = path.join(process.cwd(), 'src', 'lib', 'data');
const productsFilePath = path.join(dataDirectory, 'products.json');

type NewProductData = Omit<Product, 'id' | 'slug'>;

export async function handleAddProduct(productData: NewProductData) {
    try {
        const products = await getProducts();
        const newId = `prod${products.length + 1}_${Date.now()}`;
        const newSlug = productData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

        const newProduct: Product = {
            id: newId,
            slug: newSlug,
            ...productData
        };

        products.push(newProduct);
        await fs.writeFile(productsFilePath, JSON.stringify(products, null, 2), 'utf8');

        // Revalidate the products list page so the new product shows up
        revalidatePath('/vendor/products');
        
        return { success: true, product: newProduct };
    } catch (error) {
        console.error("Server Action Error: Failed to add product", error);
        if (error instanceof Error) {
            throw new Error(error.message);
        }
        throw new Error("An unknown error occurred while adding the product.");
    }
}
