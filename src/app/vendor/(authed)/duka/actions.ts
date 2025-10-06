'use server';

import { promises as fs } from 'fs';
import path from 'path';
import { revalidatePath } from 'next/cache';
import type { DukaListing } from '@/lib/mock-data';
import { getDukaListings } from '@/lib/firebase-services';

const dataDirectory = path.join(process.cwd(), 'src', 'lib', 'data');
const listingsFilePath = path.join(dataDirectory, 'duka-listings.json');

export async function handleAddDukaListing(listingData: any) {
    try {
        const listings = await getDukaListings();
        const newId = `duka_${Date.now()}`;
        
        const newListing: DukaListing = {
            id: newId,
            vendorId: 'v26', // Hardcoded super vendor ID
            ...listingData,
            images: ['/images/duka/placeholder.jpg'], // Placeholder
            status: 'Pending',
        };

        listings.push(newListing);
        await fs.writeFile(listingsFilePath, JSON.stringify(listings, null, 2), 'utf8');

        revalidatePath('/vendor/duka');
        
        return { success: true, listing: newListing, message: "Product added successfully" };
    } catch (error) {
        console.error("Server Action Error: Failed to add Duka listing", error);
        if (error instanceof Error) {
            return { success: false, message: error.message };
        }
        return { success: false, message: "An unknown error occurred." };
    }
}
