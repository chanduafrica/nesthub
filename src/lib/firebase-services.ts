
import app from './firebase';
import { getFirestore, collection, addDoc, getDocs, query, where, orderBy, doc, getDoc, updateDoc, setDoc } from 'firebase/firestore';
import type { Offer, VendorOffer, Client, Vendor, Transaction, Property, Stay, HolidayPackage, Product } from './mock-data';

import clientsData from '@/lib/data/clients.json';
import vendorsData from '@/lib/data/vendors.json';
import transactionsData from '@/lib/data/transactions.json';
import propertiesData from '@/lib/data/properties.json';
import staysData from '@/lib/data/stays.json';
import packagesData from '@/lib/data/packages.json';
import productsData from '@/lib/data/products.json';


const db = getFirestore(app);

// Define a type for the offer data when creating it (without the 'id')
export type OfferData = Omit<Offer, 'id'>;
export type VendorOfferData = Omit<VendorOffer, 'id'>;
export type ClientData = Omit<Client, 'id'>;
export type VendorData = Omit<Vendor, 'id'>;
export type TransactionData = Omit<Transaction, 'id'>;
export type PropertyData = Omit<Property, 'id'>;
export type StayData = Omit<Stay, 'id'>;
export type HolidayPackageData = Omit<HolidayPackage, 'id'>;
export type ProductData = Omit<Product, 'id'>;
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
    return clientsData as Client[];
};

export const getClient = async (id: string): Promise<Client | undefined> => {
    return (clientsData as Client[]).find(c => c.id === id);
};

export const updateClientStatus = async (id: string, status: Client['status']): Promise<void> => {
    // This is a mock implementation. In a real app, you'd update the persistent data source.
    console.log(`Updating client ${id} to status ${status}`);
    const client = (clientsData as Client[]).find(c => c.id === id);
    if(client) {
      client.status = status;
    }
    return Promise.resolve();
}

// === Vendor Functions ===

export const getVendors = async (): Promise<Vendor[]> => {
    return vendorsData as Vendor[];
};

export const getVendor = async (id: string): Promise<Vendor | undefined> => {
    return (vendorsData as Vendor[]).find(v => v.id === id);
};

export const updateVendorStatus = async (id: string, status: Vendor['status']): Promise<void> => {
    // This is a mock implementation.
    console.log(`Updating vendor ${id} to status ${status}`);
    const vendor = (vendorsData as Vendor[]).find(v => v.id === id);
    if(vendor) {
      vendor.status = status;
    }
    return Promise.resolve();
}

// === Transaction Functions ===

export const getTransactions = async (): Promise<Transaction[]> => {
    return transactionsData as Transaction[];
};

// === Property Functions ===

export const getProperties = async (): Promise<Property[]> => {
    return propertiesData.map(p => ({
        ...p,
        slug: createSlug(p.title)
    })) as Property[];
};

export const getPropertyBySlug = async (slug: string): Promise<Property | undefined> => {
    const properties = await getProperties();
    return properties.find(p => p.slug === slug);
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

// === Mortgage Lead Functions ===
export const saveMortgageLead = async (leadData: MortgageLeadData) => {
    try {
        const docRef = await addDoc(collection(db, 'mortgage-leads'), {
            ...leadData,
            submittedAt: new Date().toISOString(),
        });
        return { id: docRef.id, ...leadData };
    } catch (e) {
        console.error("Error adding mortgage lead: ", e);
        throw new Error("Could not save mortgage lead.");
    }
};


// === Insurance Quote Functions ===
export const saveInsuranceQuote = async (quoteData: InsuranceQuoteData) => {
    try {
        const docRef = await addDoc(collection(db, 'insurance-quotes'), {
            ...quoteData,
            submittedAt: new Date().toISOString(),
        });
        return { id: docRef.id, ...quoteData };
    } catch (e) {
        console.error("Error adding insurance quote: ", e);
        throw new Error("Could not save insurance quote.");
    }
};

// === Stays Functions ===
export const getStays = async (): Promise<Stay[]> => {
    return staysData as Stay[];
};

// === Holiday Packages Functions ===
export const getHolidayPackages = async (): Promise<HolidayPackage[]> => {
    return packagesData as HolidayPackage[];
};

// === Products Functions ===
export const getProducts = async (): Promise<Product[]> => {
    return productsData as Product[];
};
