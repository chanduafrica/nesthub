
import { promises as fs } from 'fs';
import path from 'path';
import type { Offer, Client, Vendor, Transaction, Property, Stay, HolidayPackage, Product } from './mock-data';

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
            const dataPath = path.join(dataDirectory, filename);
            await fs.writeFile(dataPath, JSON.stringify([], null, 2), 'utf8');
            return [];
        }
        console.error(`Error reading or parsing ${filename}:`, error);
        return [];
    }
}

export async function writeData<T>(filename: string, data: T[]): Promise<void> {
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

// --- Service Functions for Data Reading ---

// CLIENTS
export const getClients = async (): Promise<Client[]> => {
    return await readData<Client>('clients.json');
};

export const getClient = async (id: string): Promise<Client | undefined> => {
    const clients = await getClients();
    return clients.find(c => c.id === id);
};

// VENDORS
export const getVendors = async (): Promise<Vendor[]> => {
    return await readData<Vendor>('vendors.json');
};

export const getVendor = async (id: string): Promise<Vendor | undefined> => {
    const vendors = await getVendors();
    return vendors.find(v => v.id === id);
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

// OFFERS
export const getOffers = async(): Promise<Offer[]> => {
    return await readData<Offer>('offers.json');
};

// BUILD PROJECTS
export const getBuildProjects = async(): Promise<any[]> => {
    return await readData<any>('build-projects.json');
};

// VIEWING REQUESTS
export const getViewingRequests = async(): Promise<any[]> => {
    return await readData<any>('viewing-requests.json');
};

// MORTGAGE LEADS
export const getMortgageLeads = async(): Promise<any[]> => {
    return await readData<any>('mortgage-leads.json');
};

// INSURANCE QUOTES
export const getInsuranceQuotes = async(): Promise<any[]> => {
    return await readData<any>('insurance-quotes.json');
};
