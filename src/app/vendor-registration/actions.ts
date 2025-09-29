
'use server';

import { promises as fs } from 'fs';
import path from 'path';
import { revalidatePath } from 'next/cache';
import type { Vendor, VendorStatus } from '@/lib/mock-data';

const dataDirectory = path.join(process.cwd(), 'src', 'lib', 'data');
const vendorsFilePath = path.join(dataDirectory, 'vendors.json');

async function readVendors(): Promise<Vendor[]> {
    try {
        const fileContent = await fs.readFile(vendorsFilePath, 'utf8');
        return JSON.parse(fileContent);
    } catch (error) {
        console.error('Error reading vendors.json:', error);
        return [];
    }
}

async function writeVendors(data: Vendor[]): Promise<void> {
    try {
        await fs.writeFile(vendorsFilePath, JSON.stringify(data, null, 2), 'utf8');
    } catch (error) {
        console.error('Error writing to vendors.json:', error);
    }
}


export type VendorRegistrationData = {
    businessName: string;
    businessType: string;
    email: string;
    phone: string;
    portal: string;
}

export async function handleRegisterVendor(vendorData: VendorRegistrationData) {
    try {
        const vendors = await readVendors();
        const newId = `v${vendors.length + 1}_${Date.now()}`;

        const newVendor: Vendor = {
            id: newId,
            name: vendorData.businessName,
            email: vendorData.email,
            phone: vendorData.phone,
            country: "Kenya", // Default for now
            portal: vendorData.portal,
            products: 0,
            rating: 0,
            status: 'Pending' as VendorStatus,
        };
        vendors.push(newVendor);
        await writeVendors(vendors);

        // Revalidate the vendors list page so the new pending vendor shows up in the admin panel
        revalidatePath('/admin/vendors');
        return { success: true, vendor: newVendor };
    } catch (error) {
        console.error("Server Action Error: Failed to register vendor", error);
        if (error instanceof Error) {
            throw new Error(error.message);
        }
        throw new Error("An unknown error occurred while registering the vendor.");
    }
}
