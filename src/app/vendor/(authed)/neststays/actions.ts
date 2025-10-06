
'use server';

import { promises as fs } from 'fs';
import path from 'path';
import { revalidatePath } from 'next/cache';
import type { StayListing } from '@/lib/mock-data';
import { getStayListings } from '@/lib/firebase-services';

const dataDirectory = path.join(process.cwd(), 'src', 'lib', 'data');
const listingsFilePath = path.join(dataDirectory, 'nest-stays.json');

export async function handleAddStayListing(listingData: Omit<StayListing, 'id' | 'vendorId' | 'status' | 'coverImage' | 'gallery'>) {
    try {
        const listings = await getStayListings();
        const newId = `stay_${Date.now()}`;
        
        const newListing: StayListing = {
            id: newId,
            vendorId: 'v26', // Hardcoded super vendor ID
            ...listingData,
            status: 'Pending',
            coverImage: '/property/placeholder.jpg', // Placeholder
            gallery: [], // Placeholder
        };

        listings.push(newListing);
        await fs.writeFile(listingsFilePath, JSON.stringify(listings, null, 2), 'utf8');

        revalidatePath('/vendor/neststays');
        
        return { success: true, listing: newListing, message: "Listing added successfully" };
    } catch (error) {
        console.error("Server Action Error: Failed to add stay listing", error);
        if (error instanceof Error) {
            return { success: false, message: error.message };
        }
        return { success: false, message: "An unknown error occurred." };
    }
}
