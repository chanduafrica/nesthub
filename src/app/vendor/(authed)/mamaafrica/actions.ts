
'use server';

import { promises as fs } from 'fs';
import path from 'path';
import { revalidatePath } from 'next/cache';
import type { MamaAfricaListing } from '@/lib/mock-data';
import { getMamaAfricaListings } from '@/lib/firebase-services';

const dataDirectory = path.join(process.cwd(), 'src', 'lib', 'data');
const listingsFilePath = path.join(dataDirectory, 'mamaafrica-listings.json');

export async function handleAddMamaAfricaListing(listingData: any) {
    try {
        const listings = await getMamaAfricaListings();
        const newId = `ma_${Date.now()}`;
        
        const newListing: MamaAfricaListing = {
            id: newId,
            vendorId: 'v26', // Hardcoded super vendor ID
            ...listingData,
            status: 'Pending',
            mainImage: '/images/food/placeholder.jpg', // Placeholder
        };

        listings.push(newListing);
        await fs.writeFile(listingsFilePath, JSON.stringify(listings, null, 2), 'utf8');

        revalidatePath('/vendor/mamaafrica');
        
        return { success: true, listing: newListing, message: "Listing added successfully" };
    } catch (error) {
        console.error("Server Action Error: Failed to add listing", error);
        if (error instanceof Error) {
            return { success: false, message: error.message };
        }
        return { success: false, message: "An unknown error occurred." };
    }
}
