
'use server';

import { promises as fs } from 'fs';
import path from 'path';
import { revalidatePath } from 'next/cache';
import type { TravelListing } from '@/lib/mock-data';
import { getTravelListings } from '@/lib/firebase-services';

const dataDirectory = path.join(process.cwd(), 'src', 'lib', 'data');
const listingsFilePath = path.join(dataDirectory, 'travel-listings.json');

export async function handleAddTravelListing(listingData: any) {
    try {
        const listings = await getTravelListings();
        const newId = `tl${listings.length + 1}_${Date.now()}`;
        
        const newListing: TravelListing = {
            ...listingData,
            id: newId,
            vendorId: 'v26', // Hardcoded super vendor ID
            status: 'Pending',
            imageUrl: '/images/travel/placeholder.jpg', // Placeholder
        };

        listings.push(newListing);
        await fs.writeFile(listingsFilePath, JSON.stringify(listings, null, 2), 'utf8');

        revalidatePath('/vendor/nesttravel');
        
        return { success: true, listing: newListing, message: "Listing added successfully" };
    } catch (error) {
        console.error("Server Action Error: Failed to add listing", error);
        if (error instanceof Error) {
            return { success: false, message: error.message };
        }
        return { success: false, message: "An unknown error occurred while adding the listing." };
    }
}
