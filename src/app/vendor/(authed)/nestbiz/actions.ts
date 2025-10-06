
'use server';

import { promises as fs } from 'fs';
import path from 'path';
import { revalidatePath } from 'next/cache';
import type { NestBizListing } from '@/lib/mock-data';
import { getNestBizListings } from '@/lib/firebase-services';

const dataDirectory = path.join(process.cwd(), 'src', 'lib', 'data');
const listingsFilePath = path.join(dataDirectory, 'nestbiz-listings.json');

export async function handleAddBusinessListing(listingData: any) {
    try {
        const listings = await getNestBizListings();
        const newId = `biz_${Date.now()}`;
        
        const newListing: NestBizListing = {
            id: newId,
            vendorId: 'v26', // Hardcoded super vendor ID
            status: 'Pending',
            media: {
                logo: '/images/biz/placeholder-logo.png',
                coverBanner: '/images/biz/placeholder-banner.jpg',
                gallery: [],
            },
            ...listingData,
             operatingDetails: { // Placeholder data
                businessHours: [],
                availableOnlineServices: [],
                paymentMethods: [],
            },
            offers: [], // Placeholder data
        };

        listings.push(newListing);
        await fs.writeFile(listingsFilePath, JSON.stringify(listings, null, 2), 'utf8');

        revalidatePath('/vendor/nestbiz');
        
        return { success: true, listing: newListing, message: "Business listing added successfully" };
    } catch (error) {
        console.error("Server Action Error: Failed to add business listing", error);
        if (error instanceof Error) {
            return { success: false, message: error.message };
        }
        return { success: false, message: "An unknown error occurred." };
    }
}
