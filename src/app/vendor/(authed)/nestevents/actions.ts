
'use server';

import { promises as fs } from 'fs';
import path from 'path';
import { revalidatePath } from 'next/cache';
import type { NestEventListing } from '@/lib/mock-data';
import { getEventListings } from '@/lib/firebase-services';

const dataDirectory = path.join(process.cwd(), 'src', 'lib', 'data');
const listingsFilePath = path.join(dataDirectory, 'nestevents-listings.json');

export async function handleAddEventListing(listingData: any) {
    try {
        const listings = await getEventListings();
        const newId = `evt_${Date.now()}`;
        
        const newListing: NestEventListing = {
            id: newId,
            vendorId: 'v26', // Hardcoded super vendor ID
            status: 'Pending',
            posterUrl: '/images/events/placeholder.jpg',
            ...listingData,
        };

        listings.push(newListing);
        await fs.writeFile(listingsFilePath, JSON.stringify(listings, null, 2), 'utf8');

        revalidatePath('/vendor/nestevents');
        
        return { success: true, listing: newListing, message: "Event listing added successfully" };
    } catch (error) {
        console.error("Server Action Error: Failed to add event listing", error);
        if (error instanceof Error) {
            return { success: false, message: error.message };
        }
        return { success: false, message: "An unknown error occurred." };
    }
}
