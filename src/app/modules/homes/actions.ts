
'use server';

import { saveViewingRequest, type ViewingRequestData, saveMortgageLead, type MortgageLeadData } from '@/lib/firebase-services';

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

export async function handleSaveMortgageLead(leadData: MortgageLeadData) {
    try {
        const result = await saveMortgageLead(leadData);
        return result;
    } catch (error) {
        console.error("Server Action Error: Failed to save mortgage lead", error);
        if (error instanceof Error) {
            throw new Error(error.message);
        }
        throw new Error("An unknown error occurred while saving the lead.");
    }
}
