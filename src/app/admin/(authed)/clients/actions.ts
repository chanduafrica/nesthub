
'use server';

import { getClients, getOffers, writeData } from '@/lib/firebase-services';
import type { Client, ClientStatus, Offer } from '@/lib/mock-data';

export async function handleUpdateClientStatus(id: string, status: ClientStatus) {
    try {
        let clients = await getClients();
        const clientIndex = clients.findIndex(c => c.id === id);
        if (clientIndex !== -1) {
            clients[clientIndex].status = status;
            await writeData('clients.json', clients);
            return { success: true, message: `Client status updated to ${status}.` };
        } else {
            throw new Error(`Client with id ${id} not found.`);
        }
    } catch (error) {
         console.error("Server Action Error: Failed to update client status", error);
        if (error instanceof Error) {
            throw new Error(error.message);
        }
        throw new Error("An unknown error occurred while updating client status.");
    }
}

export type OfferData = Omit<Offer, 'id'>;

export async function handleSaveOffer(offerData: OfferData): Promise<Offer> {
    const offers = await getOffers();
    const newOffer: Offer = { 
        id: `offer_${Date.now()}`, 
        ...offerData 
    };
    offers.push(newOffer);
    await writeData('offers.json', offers);
    return newOffer;
};

export async function getOffersForClient(clientId: string): Promise<Offer[]> {
  const offers = await getOffers();
  return offers.filter(o => o.clientId === clientId).sort((a, b) => new Date(b.dateSent).getTime() - new Date(a.dateSent).getTime());
};
