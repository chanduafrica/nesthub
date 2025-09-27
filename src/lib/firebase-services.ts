

import { promises as fs } from 'fs';
import path from 'path';
import type { Offer, VendorOffer, Client, Vendor, Transaction, Property, Stay, HolidayPackage, Product, VendorStatus } from './mock-data';

// --- Helper Functions to interact with JSON files ---

const dataDirectory = path.join(process.cwd(), 'src', 'lib', 'data');

async function readData<T>(filename: string): Promise<T[]> {
    const filePath = path.join(dataDirectory, filename);
    try {
        await fs.access(filePath);
        const fileContent = await fs.readFile(filePath, 'utf8');
        return JSON.parse(fileContent) as T[];
    } catch (error: any) {
        if (error.code === 'ENOENT') {
            await writeData(filename, []);
            return [];
        }
        console.error(`Error reading or parsing ${filename}:`, error);
        return [];
    }
}

async function writeData<T>(filename: string, data: T[]): Promise<void> {
    const filePath = path.join(dataDirectory, filename);
    try {
        await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');
    } catch (error) {
        console.error(`Error writing to ${filename}:`, error);
    }
}

function createSlug(title: string) {
    if (!title) return '';
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}


// --- Type Definitions for Data Payloads ---

export type OfferData = Omit<Offer, 'id'>;
export type VendorOfferData = Omit<VendorOffer, 'id'>;
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
export type VendorRegistrationData = {
    businessName: string;
    businessType: string;
    email: string;
    phone: string;
    portals: string[];
}

// --- Service Functions for CRUD Operations ---

// OFFERS
export const saveOffer = async (offerData: OfferData): Promise<Offer> => {
  const offers = await readData<Offer>('offers.json');
  const newOffer: Offer = { 
    id: `offer_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`, 
    ...offerData 
  };
  offers.push(newOffer);
  await writeData('offers.json', offers);
  return newOffer;
};

export const getOffersForClient = async (clientId: string): Promise<Offer[]> => {
  const offers = await readData<Offer>('offers.json');
  return offers.filter(o => o.clientId === clientId).sort((a, b) => new Date(b.dateSent).getTime() - new Date(a.dateSent).getTime());
};

export const saveVendorOffer = async (offerData: VendorOfferData): Promise<VendorOffer> => {
  const vendorOffers = await readData<VendorOffer>('vendorOffers.json');
  const newOffer: VendorOffer = { 
    id: `voffer_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`, 
    ...offerData 
  };
  vendorOffers.push(newOffer);
  await writeData('vendorOffers.json', vendorOffers);
  return newOffer;
};

export const getOffersForVendor = async (vendorId: string): Promise<VendorOffer[]> => {
    const offers = await readData<VendorOffer>('vendorOffers.json');
    return offers.filter(o => o.vendorId === vendorId).sort((a, b) => new Date(b.dateSent).getTime() - new Date(a.dateSent).getTime());
};

// CLIENTS
export const getClients = async (): Promise<Client[]> => {
    return await readData<Client>('clients.json');
};

export const getClient = async (id: string): Promise<Client | undefined> => {
    const clients = await getClients();
    return clients.find(c => c.id === id);
};

export const updateClientStatus = async (id: string, status: Client['status']): Promise<void> => {
    let clients = await getClients();
    const clientIndex = clients.findIndex(c => c.id === id);
    if (clientIndex !== -1) {
        clients[clientIndex].status = status;
        await writeData('clients.json', clients);
    } else {
        throw new Error(`Client with id ${id} not found.`);
    }
};

// VENDORS
export const getVendors = async (): Promise<Vendor[]> => {
    return await readData<Vendor>('vendors.json');
};

export const getVendor = async (id: string): Promise<Vendor | undefined> => {
    const vendors = await getVendors();
    return vendors.find(v => v.id === id);
};

export const updateVendorStatus = async (id: string, status: Vendor['status']): Promise<void> => {
    let vendors = await getVendors();
    const vendorIndex = vendors.findIndex(v => v.id === id);
    if (vendorIndex !== -1) {
        vendors[vendorIndex].status = status;
        await writeData('vendors.json', vendors);
    } else {
        throw new Error(`Vendor with id ${id} not found.`);
    }
};

export const registerVendor = async (vendorData: VendorRegistrationData): Promise<Vendor> => {
    const vendors = await getVendors();
    const newId = `v${vendors.length + 1}_${Date.now()}`;

    // A bit simplistic, in a real app you'd join the selected portals
    const portalName = vendorData.portals.length > 1 ? 'Multiple' : vendorData.portals[0] || 'N/A';

    const newVendor: Vendor = {
        id: newId,
        name: vendorData.businessName,
        email: vendorData.email,
        phone: vendorData.phone,
        country: "Kenya", // Default for now
        portal: portalName,
        products: 0,
        rating: 0,
        status: 'Pending' as VendorStatus,
    };
    vendors.push(newVendor);
    await writeData('vendors.json', vendors);
    return newVendor;
};

// TRANSACTIONS
export const getTransactions = async (): Promise<Transaction[]> => {
    return await readData<Transaction>('transactions.json');
};

// PROPERTIES
export const getProperties = async (): Promise<Property[]> => {
    const properties = await readData<Property>('properties.json');
    return properties.map(p => ({
        ...p,
        slug: createSlug(p.title)
    }));
};

export const getPropertyBySlug = async (slug: string): Promise<Property | undefined> => {
    const properties = await getProperties();
    return properties.find(p => p.slug === slug);
};

// BUILD PROJECTS
export const saveBuildProject = async (projectData: BuildProjectData) => {
    const projects = await readData<any>('build-projects.json');
    const newProject = { 
        id: `proj_${Date.now()}`,
        ...projectData,
        submittedAt: new Date().toISOString(),
    };
    projects.push(newProject);
    await writeData('build-projects.json', projects);
    return newProject;
};

// VIEWING REQUESTS
export const saveViewingRequest = async (requestData: ViewingRequestData) => {
    const requests = await readData<any>('viewing-requests.json');
    const newRequest = {
        id: `vr_${Date.now()}`,
        ...requestData,
        submittedAt: new Date().toISOString(),
    };
    requests.push(newRequest);
    await writeData('viewing-requests.json', requests);
    return newRequest;
};

// MORTGAGE LEADS
export const saveMortgageLead = async (leadData: MortgageLeadData) => {
    const leads = await readData<any>('mortgage-leads.json');
    const newLead = {
        id: `ml_${Date.now()}`,
        ...leadData,
        submittedAt: new Date().toISOString(),
    };
    leads.push(newLead);
await writeData('mortgage-leads.json', leads);
    return newLead;
};

// INSURANCE QUOTES
export const saveInsuranceQuote = async (quoteData: InsuranceQuoteData) => {
    const quotes = await readData<any>('insurance-quotes.json');
    const newQuote = {
        id: `iq_${Date.now()}`,
        ...quoteData,
        submittedAt: new Date().toISOString(),
    };
    quotes.push(newQuote);
    await writeData('insurance-quotes.json', quotes);
    return newQuote;
};

// STAYS
export const getStays = async (): Promise<Stay[]> => {
    return await readData<Stay>('stays.json');
};

// HOLIDAY PACKAGES
export const getHolidayPackages = async (): Promise<HolidayPackage[]> => {
    const packages = await readData<HolidayPackage>('packages.json');
    return packages.map(p => ({
        ...p,
        slug: createSlug(p.title)
    }));
};

export const getPackageBySlug = async (slug: string): Promise<HolidayPackage | undefined> => {
    const packages = await getHolidayPackages();
    return packages.find(p => p.slug === slug);
};

// PRODUCTS
export const getProducts = async (): Promise<Product[]> => {
    const products = await readData<Product>('products.json');
    return products.map(p => ({
        ...p,
        slug: createSlug(p.title)
    }));
};
