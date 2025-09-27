
'use server';

import { registerVendor, type VendorRegistrationData } from '@/lib/firebase-services';
import { revalidatePath } from 'next/cache';

export async function handleRegisterVendor(vendorData: VendorRegistrationData) {
    try {
        const result = await registerVendor(vendorData);
        // Revalidate the vendors list page so the new pending vendor shows up in the admin panel
        revalidatePath('/admin/vendors');
        return result;
    } catch (error) {
        console.error("Server Action Error: Failed to register vendor", error);
        if (error instanceof Error) {
            throw new Error(error.message);
        }
        throw new Error("An unknown error occurred while registering the vendor.");
    }
}
