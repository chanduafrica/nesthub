

'use server';

import { promises as fs } from 'fs';
import path from 'path';
import { revalidatePath } from 'next/cache';
import type { Product, ProductStatus } from '@/lib/mock-data';
import { getProducts } from '@/lib/firebase-services';

const dataDirectory = path.join(process.cwd(), 'src', 'lib', 'data');
const productsFilePath = path.join(dataDirectory, 'products.json');

type NewProductData = Omit<Product, 'id' | 'slug' | 'status' | 'vendorId' >;

export async function handleAddProduct(productData: NewProductData) {
    try {
        const products = await getProducts();
        const newId = `prod${products.length + 1}_${Date.now()}`;
        const newSlug = productData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

        const newProduct: Product = {
            id: newId,
            slug: newSlug,
            vendorId: 'v26', // Assign to Super Vendor
            status: 'Active',
            isCeoPick: false,
            inMiddayVault: false,
            inExplosiveDeal: false,
            ...productData
        };

        products.push(newProduct);
        await fs.writeFile(productsFilePath, JSON.stringify(products, null, 2), 'utf8');

        // Revalidate the products list page so the new product shows up
        revalidatePath('/vendor/products');
        
        return { success: true, product: newProduct, message: "Product added successfully" };
    } catch (error) {
        console.error("Server Action Error: Failed to add product", error);
        if (error instanceof Error) {
            return { success: false, message: error.message };
        }
        return { success: false, message: "An unknown error occurred while adding the product." };
    }
}

export async function handleUpdateProductStatus(productId: string, status: ProductStatus) {
    try {
        const products = await getProducts();
        const productIndex = products.findIndex(p => p.id === productId);

        if (productIndex !== -1) {
            products[productIndex].status = status;
            await fs.writeFile(productsFilePath, JSON.stringify(products, null, 2), 'utf8');
            revalidatePath('/vendor/products');
            revalidatePath(`/vendor/products/${productId}`);
            return { success: true, product: products[productIndex], message: "Status updated" };
        }
        throw new Error(`Product with id ${productId} not found.`);

    } catch (error) {
        console.error("Server Action Error: Failed to update product status", error);
        if (error instanceof Error) {
            return { success: false, message: error.message };
        }
        return { success: false, message: "An unknown error occurred while updating product status." };
    }
}

export async function handleUpdateProduct(productData: Partial<Product> & { id: string }) {
    try {
        const products = await getProducts();
        const productIndex = products.findIndex(p => p.id === productData.id);

        if (productIndex !== -1) {
            // Create a new slug only if the title is being changed
            const newSlug = productData.title 
                ? productData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') 
                : products[productIndex].slug;
                
            const updatedProduct = {
                ...products[productIndex],
                ...productData,
                slug: newSlug
            };
            products[productIndex] = updatedProduct;

            await fs.writeFile(productsFilePath, JSON.stringify(products, null, 2), 'utf8');
            revalidatePath('/vendor/products');
            revalidatePath(`/vendor/products/${productData.id}/edit`);
            revalidatePath(`/vendor/products/${productData.id}`);
            
            return { success: true, product: updatedProduct, message: "Product updated successfully" };
        }
        throw new Error(`Product with id ${productData.id} not found.`);

    } catch (error) {
        console.error("Server Action Error: Failed to update product", error);
        if (error instanceof Error) {
            return { success: false, message: error.message };
        }
        return { success: false, message: "An unknown error occurred while updating the product." };
    }
}
