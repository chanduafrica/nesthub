
'use server';

import { saveViewingRequest, type ViewingRequestData } from '@/lib/firebase-services';

export async function handleSaveViewingRequest(requestData: ViewingRequestData) {
    try {
        const result = await saveViewingRequest(requestData);
        return result;
    } catch (error) {
        console.error("Server Action Error: Failed to save viewing request", error);
        if (error instanceof Error) {
            throw new Error(error.message);
        }
        throw new Error("An unknown error occurred while saving the request.");
    }
}
