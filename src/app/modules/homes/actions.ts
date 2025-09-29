
'use server';

import { getViewingRequests, getMortgageLeads, getInsuranceQuotes, writeData } from '@/lib/firebase-services';

export type ViewingRequestData = {
    propertyId: string;
    propertyTitle: string;
    agentName: string;
    date: string;
    time: string;
    name: string;
    phone: string;
};
export type MortgageLeadData = {
    propertyId: string;
    propertyTitle: string;
    propertyPrice: number;
    fullName: string;
    phone: string;
    email: string;
    employmentStatus: string;
    monthlyIncome: string;
    preferredBank: string;
};
export type InsuranceQuoteData = {
    propertyId: string;
    propertyTitle: string;
    propertyValue: number;
    fullName: string;
    email: string;
    phone: string;
    preferredInsurer: string;
};

export async function handleSaveViewingRequest(requestData: ViewingRequestData) {
    try {
        const requests = await getViewingRequests();
        const newRequest = {
            id: `vr_${Date.now()}`,
            ...requestData,
            submittedAt: new Date().toISOString(),
        };
        requests.push(newRequest);
        await writeData('viewing-requests.json', requests);
        return { success: true, request: newRequest };
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
        const leads = await getMortgageLeads();
        const newLead = {
            id: `ml_${Date.now()}`,
            ...leadData,
            submittedAt: new Date().toISOString(),
        };
        leads.push(newLead);
        await writeData('mortgage-leads.json', leads);
        return { success: true, lead: newLead };
    } catch (error) {
        console.error("Server Action Error: Failed to save mortgage lead", error);
        if (error instanceof Error) {
            throw new Error(error.message);
        }
        throw new Error("An unknown error occurred while saving the lead.");
    }
}

export async function handleSaveInsuranceQuote(quoteData: InsuranceQuoteData) {
    try {
        const quotes = await getInsuranceQuotes();
        const newQuote = {
            id: `iq_${Date.now()}`,
            ...quoteData,
            submittedAt: new Date().toISOString(),
        };
        quotes.push(newQuote);
        await writeData('insurance-quotes.json', quotes);
        return { success: true, quote: newQuote };
    } catch (error) {
        console.error("Server Action Error: Failed to save insurance quote", error);
        if (error instanceof Error) {
            throw new Error(error.message);
        }
        throw new Error("An unknown error occurred while saving the quote.");
    }
}
