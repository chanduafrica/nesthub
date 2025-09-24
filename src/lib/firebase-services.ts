
'use server';

import fs from 'fs';
import path from 'path';
import type { Offer, VendorOffer, Client, Vendor, Transaction, Property, Stay, HolidayPackage, Product } from './mock-data';

// --- Helper Functions to interact with JSON files ---

const dataDirectory = path.join(process.cwd(), 'src', 'lib', 'data');

function readData<T>(filename: string): T[] {
    const filePath = path.join(dataDirectory, filename);
    try {
        if (fs.existsSync(filePath)) {
            const fileContent = fs.readFileSync(filePath, 'utf8');
            return JSON.parse(fileContent) as T[];
        }
        return [];
    } catch (error) {
        console.error(`Error reading or parsing ${filename}:`, error);
        return [];
    }
}

function writeData<T>(filename: string, data: T[]): void {
    const filePath = path.join(dataDirectory, filename);
    try {
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
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


// --- Service Functions for CRUD Operations ---

// OFFERS
export const saveOffer = async (offerData: OfferData): Promise<Offer> => {
  const offers = readData<Offer>('offers.json');
  const newOffer: Offer = { 
    id: `offer_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`, 
    ...offerData 
  };
  offers.push(newOffer);
  writeData('offers.json', offers);
  return newOffer;
};

export const getOffersForClient = async (clientId: string): Promise<Offer[]> => {
  const offers = readData<Offer>('offers.json');
  return offers.filter(o => o.clientId === clientId).sort((a, b) => new Date(b.dateSent).getTime() - new Date(a.dateSent).getTime());
};

export const saveVendorOffer = async (offerData: VendorOfferData): Promise<VendorOffer> => {
  const vendorOffers = readData<VendorOffer>('vendorOffers.json');
  const newOffer: VendorOffer = { 
    id: `voffer_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`, 
    ...offerData 
  };
  vendorOffers.push(newOffer);
  writeData('vendorOffers.json', vendorOffers);
  return newOffer;
};

export const getOffersForVendor = async (vendorId: string): Promise<VendorOffer[]> => {
    const offers = readData<VendorOffer>('vendorOffers.json');
    return offers.filter(o => o.vendorId === vendorId).sort((a, b) => new Date(b.dateSent).getTime() - new Date(a.dateSent).getTime());
};

// CLIENTS
export const getClients = async (): Promise<Client[]> => {
    return readData<Client>('clients.json');
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
        writeData('clients.json', clients);
    } else {
        throw new Error(`Client with id ${id} not found.`);
    }
};

// VENDORS
export const getVendors = async (): Promise<Vendor[]> => {
    return readData<Vendor>('vendors.json');
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
        writeData('vendors.json', vendors);
    } else {
        throw new Error(`Vendor with id ${id} not found.`);
    }
};

// TRANSACTIONS
export const getTransactions = async (): Promise<Transaction[]> => {
    return readData<Transaction>('transactions.json');
};

// PROPERTIES
export const getProperties = async (): Promise<Property[]> => {
    const properties = readData<Property>('properties.json');
    return properties.map(p => ({
        ...p,
        slug: p.slug || createSlug(p.title)
    }));
};

export const getPropertyBySlug = async (slug: string): Promise<Property | undefined> => {
    const properties = await getProperties();
    return properties.find(p => p.slug === slug);
};

// BUILD PROJECTS
export const saveBuildProject = async (projectData: BuildProjectData) => {
    const projects = readData<any>('build-projects.json');
    const newProject = { 
        id: `proj_${Date.now()}`,
        ...projectData,
        submittedAt: new Date().toISOString(),
    };
    projects.push(newProject);
    writeData('build-projects.json', projects);
    return newProject;
};

// VIEWING REQUESTS
export const saveViewingRequest = async (requestData: ViewingRequestData) => {
    const requests = readData<any>('viewing-requests.json');
    const newRequest = {
        id: `vr_${Date.now()}`,
        ...requestData,
        submittedAt: new Date().toISOString(),
    };
    requests.push(newRequest);
    writeData('viewing-requests.json', requests);
    return newRequest;
};

// MORTGAGE LEADS
export const saveMortgageLead = async (leadData: MortgageLeadData) => {
    const leads = readData<any>('mortgage-leads.json');
    const newLead = {
        id: `ml_${Date.now()}`,
        ...leadData,
        submittedAt: new Date().toISOString(),
    };
    leads.push(newLead);
writeData('mortgage-leads.json', leads);
    return newLead;
};

// INSURANCE QUOTES
export const saveInsuranceQuote = async (quoteData: InsuranceQuoteData) => {
    const quotes = readData<any>('insurance-quotes.json');
    const newQuote = {
        id: `iq_${Date.now()}`,
        ...quoteData,
        submittedAt: new Date().toISOString(),
    };
    quotes.push(newQuote);
    writeData('insurance-quotes.json', quotes);
    return newQuote;
};

// STAYS
export const getStays = async (): Promise<Stay[]> => {
    return readData<Stay>('stays.json');
};

// HOLIDAY PACKAGES
export const getHolidayPackages = async (): Promise<HolidayPackage[]> => {
    const packages = readData<HolidayPackage>('packages.json');
    return packages.map(p => ({
        ...p,
        slug: p.slug || createSlug(p.title)
    }));
};

export const getPackageBySlug = async (slug: string): Promise<HolidayPackage | undefined> => {
    const packages = await getHolidayPackages();
    return packages.find(p => p.slug === slug);
};

// PRODUCTS
export const getProducts = async (): Promise<Product[]> => {
    const products = readData<Product>('products.json');
    return products.map(p => ({
        ...p,
        slug: p.slug || createSlug(p.title)
    }));
};
