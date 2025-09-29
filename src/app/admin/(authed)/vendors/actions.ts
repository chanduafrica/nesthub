'use server';

import { promises as fs } from 'fs';
import path from 'path';
import type { Vendor, VendorStatus } from '@/lib/mock-data';

// This is a simplified version of the file I/O logic from firebase-services.ts
// In a real app, this would be a shared utility or a proper database client.
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


export async function handleUpdateVendorStatus(id: string, status: VendorStatus) {
    try {
        let vendors = await readVendors();
        const vendorIndex = vendors.findIndex(v => v.id === id);
        if (vendorIndex !== -1) {
            vendors[vendorIndex].status = status;
            await writeVendors(vendors);
            return { success: true, message: `Vendor status updated to ${status}.` };
        } else {
            throw new Error(`Vendor with id ${id} not found.`);
        }
    } catch (error) {
         console.error("Server Action Error: Failed to update vendor status", error);
        if (error instanceof Error) {
            throw new Error(error.message);
        }
        throw new Error("An unknown error occurred while updating vendor status.");
    }
}
