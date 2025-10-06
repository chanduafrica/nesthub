
'use server';

import { promises as fs } from 'fs';
import path from 'path';
import { revalidatePath } from 'next/cache';
import type { Property } from '@/lib/mock-data';
import { getProperties } from '@/lib/firebase-services';

const dataDirectory = path.join(process.cwd(), 'src', 'lib', 'data');
const propertiesFilePath = path.join(dataDirectory, 'properties.json');

function createSlug(title: string) {
    if (!title) return '';
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

export async function handleAddProperty(propertyData: any) {
    try {
        const properties = await getProperties();
        const newId = `prop${properties.length + 1}_${Date.now()}`;
        
        const slug = propertyData.slug || propertyData.title;

        const newProperty: Property = {
            id: newId,
            vendorId: 'v26', // Hardcoded super vendor ID
            title: propertyData.title,
            slug: createSlug(slug),
            description: propertyData.description,
            location: `${propertyData.town}, ${propertyData.county}`,
            price: propertyData.price,
            type: propertyData.listingType,
            category: propertyData.propertyType,
            beds: propertyData.bedrooms,
            baths: propertyData.bathrooms,
            area: propertyData.size,
            amenities: propertyData.amenities,
            imageUrl: '/property/placeholder.jpg', // Placeholder
            images: [], // Placeholder
            videoUrl: propertyData.videoUrl,
            status: propertyData.status,
            shariaCompliant: false, // Default value
            agent: { // Default agent info
                name: "SGNEST SUPER VENDOR",
                avatarUrl: "https://picsum.photos/100/100?random=a26"
            },
            views: 0,
            leads: 0,
            seo: {
                title: propertyData.metaTitle,
                description: propertyData.metaDescription,
                tags: propertyData.tags
            }
        };

        properties.push(newProperty);
        await fs.writeFile(propertiesFilePath, JSON.stringify(properties, null, 2), 'utf8');

        revalidatePath('/vendor/nesthomes');
        
        return { success: true, property: newProperty, message: "Property added successfully" };
    } catch (error) {
        console.error("Server Action Error: Failed to add property", error);
        if (error instanceof Error) {
            return { success: false, message: error.message };
        }
        return { success: false, message: "An unknown error occurred while adding the property." };
    }
}
