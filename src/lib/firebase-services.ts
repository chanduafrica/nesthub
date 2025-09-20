

import app from './firebase';
import { getFirestore, collection, addDoc, getDocs, query, where, orderBy, doc, getDoc, updateDoc, setDoc } from 'firebase/firestore';
import type { Offer, VendorOffer, Client, Vendor, Transaction, Property } from './mock-data';

const db = getFirestore(app);

// Define a type for the offer data when creating it (without the 'id')
export type OfferData = Omit<Offer, 'id'>;
export type VendorOfferData = Omit<VendorOffer, 'id'>;
export type ClientData = Omit<Client, 'id'>;
export type VendorData = Omit<Vendor, 'id'>;
export type TransactionData = Omit<Transaction, 'id'>;
export type PropertyData = Omit<Property, 'id'>;
export type BuildProjectData = {
    designName: string;
    designId: string;
    totalCost: number;
    depositPaid: number;
    paymentMethod: string;
    contractNo: string;
    projectManager: string;
    status: string;
};
export type ViewingRequestData = {
    propertyId: string;
    propertyTitle: string;
    agentName: string;
    date: string;
    time: string;
    name: string;
    phone: string;
};


function createSlug(title: string) {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}


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

// === Vendor Functions ===

export const getVendors = async (): Promise<Vendor[]> => {
  try {
    const vendorsCol = collection(db, 'vendors');
    const querySnapshot = await getDocs(vendorsCol);
    if (querySnapshot.empty) {
        console.log('No vendors found, seeding database...');
        const vendorsSeed = await import('@/lib/data/vendors.json');
        const seedPromises = vendorsSeed.default.map(vendor => 
            setDoc(doc(db, 'vendors', vendor.id), vendor)
        );
        await Promise.all(seedPromises);
        const seededSnapshot = await getDocs(vendorsCol);
        return seededSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Vendor));
    }
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Vendor));
  } catch (e) {
    console.error("Error getting vendors: ", e);
    throw new Error("Could not fetch vendors.");
  }
};

export const getVendor = async (id: string): Promise<Vendor | undefined> => {
    try {
        const vendorDocRef = doc(db, 'vendors', id);
        const docSnap = await getDoc(vendorDocRef);
        if (docSnap.exists()) {
            return { id: docSnap.id, ...docSnap.data() } as Vendor;
        }
        return undefined;
    } catch (e) {
        console.error("Error getting vendor: ", e);
        throw new Error("Could not fetch vendor.");
    }
};

export const updateVendorStatus = async (id: string, status: Vendor['status']): Promise<void> => {
    try {
        const vendorDocRef = doc(db, 'vendors', id);
        await updateDoc(vendorDocRef, { status });
    } catch (e) {
        console.error("Error updating vendor status: ", e);
        throw new Error("Could not update vendor status.");
    }
}

// === Transaction Functions ===

export const getTransactions = async (): Promise<Transaction[]> => {
  try {
    const transactionsCol = collection(db, 'transactions');
    const querySnapshot = await getDocs(transactionsCol);
    if (querySnapshot.empty) {
        console.log('No transactions found, seeding database...');
        const transactionsSeed = await import('@/lib/data/transactions.json');
        const seedPromises = transactionsSeed.default.map(tx => 
            setDoc(doc(db, 'transactions', tx.id), tx)
        );
        await Promise.all(seedPromises);
        const seededSnapshot = await getDocs(transactionsCol);
        return seededSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Transaction));
    }
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Transaction));
  } catch (e) {
    console.error("Error getting transactions: ", e);
    throw new Error("Could not fetch transactions.");
  }
};

// === Property Functions ===

export const getProperties = async (): Promise<Property[]> => {
  try {
    const propertiesCol = collection(db, 'properties');
    const querySnapshot = await getDocs(propertiesCol);
    if (querySnapshot.empty) {
        console.log('No properties found, seeding database...');
        const propertiesSeed = (await import('@/lib/data/properties.json')).default;
        const seedPromises = propertiesSeed.map(property => {
            const propertyWithSlug = { ...property, slug: createSlug(property.title) };
            return setDoc(doc(db, 'properties', property.id), propertyWithSlug);
        });
        await Promise.all(seedPromises);
        const seededSnapshot = await getDocs(propertiesCol);
        return seededSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Property));
    }
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Property));
  } catch (e) {
    console.error("Error getting properties: ", e);
    throw new Error("Could not fetch properties.");
  }
};

export const getPropertyBySlug = async (slug: string): Promise<Property | undefined> => {
    try {
        const propertiesCol = collection(db, 'properties');
        const q = query(propertiesCol, where("slug", "==", slug));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
            const docSnap = querySnapshot.docs[0];
            return { id: docSnap.id, ...docSnap.data() } as Property;
        }
        return undefined;
    } catch (e) {
        console.error("Error getting property by slug: ", e);
        throw new Error("Could not fetch property.");
    }
};

// === Build Project Functions ===
export const saveBuildProject = async (projectData: BuildProjectData) => {
    try {
        const docRef = await addDoc(collection(db, 'build-projects'), {
            ...projectData,
            submittedAt: new Date().toISOString(),
        });
        return { id: docRef.id, ...projectData };
    } catch (e) {
        console.error("Error adding build project: ", e);
        throw new Error("Could not save build project.");
    }
};

// === Viewing Request Functions ===
export const saveViewingRequest = async (requestData: ViewingRequestData) => {
    try {
        const docRef = await addDoc(collection(db, 'viewing-requests'), {
            ...requestData,
            submittedAt: new Date().toISOString(),
        });
        return { id: docRef.id, ...requestData };
    } catch (e) {
        console.error("Error adding viewing request: ", e);
        throw new Error("Could not save viewing request.");
    }
};
