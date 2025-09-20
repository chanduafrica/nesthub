import app from './firebase';
import { getFirestore, collection, addDoc, getDocs, query, where, orderBy, doc, getDoc, updateDoc, setDoc } from 'firebase/firestore';
import type { Offer, VendorOffer, Client } from './mock-data';

const db = getFirestore(app);

// Define a type for the offer data when creating it (without the 'id')
export type OfferData = Omit<Offer, 'id'>;
export type VendorOfferData = Omit<VendorOffer, 'id'>;
export type ClientData = Omit<Client, 'id'>;


// Function to save a new offer to Firestore
export const saveOffer = async (offerData: OfferData): Promise<Offer> => {
  try {
    const docRef = await addDoc(collection(db, 'offers'), offerData);
    return { id: docRef.id, ...offerData };
  } catch (e) {
    console.error("Error adding document: ", e);
    throw new Error("Could not save offer.");
  }
};

// Function to get all offers for a specific client
export const getOffersForClient = async (clientId: string): Promise<Offer[]> => {
  try {
    const offersCol = collection(db, 'offers');
    const q = query(offersCol, where("clientId", "==", clientId), orderBy("dateSent", "desc"));
    const querySnapshot = await getDocs(q);
    const offers: Offer[] = [];
    querySnapshot.forEach((doc) => {
      offers.push({ id: doc.id, ...(doc.data() as OfferData) });
    });
    return offers;
  } catch (e) {
    console.error("Error getting documents: ", e);
    throw new Error("Could not fetch offers.");
  }
};


// Function to save a new vendor offer to Firestore
export const saveVendorOffer = async (offerData: VendorOfferData): Promise<VendorOffer> => {
  try {
    const docRef = await addDoc(collection(db, 'vendorOffers'), offerData);
    return { id: docRef.id, ...offerData };
  } catch (e) {
    console.error("Error adding document: ", e);
    throw new Error("Could not save vendor offer.");
  }
};

// Function to get all offers for a specific vendor
export const getOffersForVendor = async (vendorId: string): Promise<VendorOffer[]> => {
  try {
    const offersCol = collection(db, 'vendorOffers');
    const q = query(offersCol, where("vendorId", "==", vendorId), orderBy("dateSent", "desc"));
    const querySnapshot = await getDocs(q);
    const offers: VendorOffer[] = [];
    querySnapshot.forEach((doc) => {
      offers.push({ id: doc.id, ...(doc.data() as VendorOfferData) });
    });
    return offers;
  } catch (e) {
    console.error("Error getting documents: ", e);
    throw new Error("Could not fetch vendor offers.");
  }
};


// === Client Functions ===

export const getClients = async (): Promise<Client[]> => {
  try {
    const clientsCol = collection(db, 'clients');
    const querySnapshot = await getDocs(clientsCol);
    if (querySnapshot.empty) {
        console.log('No clients found, seeding database...');
        // If the collection is empty, seed it from the JSON file.
        const clientsSeed = await import('@/lib/data/clients.json');
        const seedPromises = clientsSeed.default.map(client => 
            setDoc(doc(db, 'clients', client.id), client)
        );
        await Promise.all(seedPromises);
        // After seeding, fetch again
        const seededSnapshot = await getDocs(clientsCol);
        return seededSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Client));
    }
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Client));
  } catch (e) {
    console.error("Error getting clients: ", e);
    throw new Error("Could not fetch clients.");
  }
};

export const getClient = async (id: string): Promise<Client | undefined> => {
    try {
        const clientDocRef = doc(db, 'clients', id);
        const docSnap = await getDoc(clientDocRef);
        if (docSnap.exists()) {
            return { id: docSnap.id, ...docSnap.data() } as Client;
        }
        return undefined;
    } catch (e) {
        console.error("Error getting client: ", e);
        throw new Error("Could not fetch client.");
    }
};

export const updateClientStatus = async (id: string, status: Client['status']): Promise<void> => {
    try {
        const clientDocRef = doc(db, 'clients', id);
        await updateDoc(clientDocRef, { status });
    } catch (e) {
        console.error("Error updating client status: ", e);
        throw new Error("Could not update client status.");
    }
}
