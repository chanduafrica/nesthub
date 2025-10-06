'use server';

import { promises as fs } from 'fs';
import path from 'path';
import { revalidatePath } from 'next/cache';
import type { BuyMyCarListing } from '@/lib/mock-data';
import { getBuyMyCarListings } from '@/lib/firebase-services';

const dataDirectory = path.join(process.cwd(), 'src', 'lib', 'data');
const listingsFilePath = path.join(dataDirectory, 'buymycar-listings.json');

export async function handleAddVehicleListing(listingData: Omit<BuyMyCarListing, 'id' | 'vendorId' | 'status' | 'mainImage' | 'gallery'>) {
    try {
        const listings = await getBuyMyCarListings();
        const newId = `car_${Date.now()}`;
        
        const newListing: BuyMyCarListing = {
            id: newId,
            vendorId: 'v26', // Hardcoded super vendor ID
            ...listingData,
            status: 'Pending',
            mainImage: '/images/cars/placeholder.jpg', // Placeholder
            gallery: [],
        };

        listings.push(newListing);
        await fs.writeFile(listingsFilePath, JSON.stringify(listings, null, 2), 'utf8');

        revalidatePath('/vendor/buymycar');
        
        return { success: true, listing: newListing, message: "Vehicle listing added successfully" };
    } catch (error) {
        console.error("Server Action Error: Failed to add vehicle listing", error);
        if (error instanceof Error) {
            return { success: false, message: error.message };
        }
        return { success: false, message: "An unknown error occurred." };
    }
}
