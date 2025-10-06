
'use server';

import { promises as fs } from 'fs';
import path from 'path';
import { revalidatePath } from 'next/cache';
import type { AutoPartListing } from '@/lib/mock-data';
import { getAutoPartListings } from '@/lib/firebase-services';

const dataDirectory = path.join(process.cwd(), 'src', 'lib', 'data');
const listingsFilePath = path.join(dataDirectory, 'autoparts-listings.json');

export async function handleAddAutoPartListing(listingData: any) {
    try {
        const listings = await getAutoPartListings();
        const newId = `ap_${Date.now()}`;
        
        const newListing: AutoPartListing = {
            id: newId,
            vendorId: 'v26', // Hardcoded super vendor ID
            name: listingData.name,
            category: listingData.category,
            brand: listingData.brand,
            condition: listingData.condition,
            description: listingData.description,
            compatibility: listingData.compatibility,
            pricing: listingData.pricing,
            stock: listingData.stock,
            media: {
                mainImage: '/images/autoparts/placeholder.jpg',
                gallery: []
            },
            logistics: listingData.logistics,
            status: 'Pending',
        };

        listings.push(newListing);
        await fs.writeFile(listingsFilePath, JSON.stringify(listings, null, 2), 'utf8');

        revalidatePath('/vendor/autoparts');
        
        return { success: true, listing: newListing, message: "Listing added successfully" };
    } catch (error) {
        console.error("Server Action Error: Failed to add auto part listing", error);
        if (error instanceof Error) {
            return { success: false, message: error.message };
        }
        return { success: false, message: "An unknown error occurred." };
    }
}
