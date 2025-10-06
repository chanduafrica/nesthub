'use server';

import { promises as fs } from 'fs';
import path from 'path';
import { revalidatePath } from 'next/cache';
import type { Back2SchoolListing } from '@/lib/mock-data';
import { getBack2SchoolListings } from '@/lib/firebase-services';

const dataDirectory = path.join(process.cwd(), 'src', 'lib', 'data');
const listingsFilePath = path.join(dataDirectory, 'back2school-listings.json');

export async function handleAddBack2SchoolListing(listingData: any) {
    try {
        const listings = await getBack2SchoolListings();
        const newId = `b2s_${Date.now()}`;
        
        const newListing: Back2SchoolListing = {
            id: newId,
            vendorId: 'v26', // Hardcoded super vendor ID
            ...listingData,
            status: 'Pending',
            media: {
                mainImage: '/images/school/placeholder.jpg', // Placeholder
                gallery: [],
            },
        };

        listings.push(newListing);
        await fs.writeFile(listingsFilePath, JSON.stringify(listings, null, 2), 'utf8');

        revalidatePath('/vendor/back2school');
        
        return { success: true, listing: newListing, message: "Listing added successfully" };
    } catch (error) {
        console.error("Server Action Error: Failed to add listing", error);
        if (error instanceof Error) {
            return { success: false, message: error.message };
        }
        return { success: false, message: "An unknown error occurred." };
    }
}
