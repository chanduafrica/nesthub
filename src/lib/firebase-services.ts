

import type { Offer, Client, Vendor, Transaction, Property, Stay, HolidayPackage, Product, TravelListing, StayListing } from './mock-data';
import clientsData from './data/clients.json';
import vendorsData from './data/vendors.json';
import transactionsData from './data/transactions.json';
import propertiesData from './data/properties.json';
import staysData from './data/stays.json';
import packagesData from './data/packages.json';
import productsData from './data/products.json';
import offersData from './data/offers.json';
import buildProjectsData from './data/build-projects.json';
import viewingRequestsData from './data/viewing-requests.json';
import mortgageLeadsData from './data/mortgage-leads.json';
import insuranceQuotesData from './data/insurance-quotes.json';
import back2schoolData from './data/back2school.json';
import travelListingsData from './data/travel-listings.json';
import nestStaysListingsData from './data/nest-stays.json';

// This is a workaround to make sure the type assertion works
const clients: Client[] = clientsData as Client[];
const vendors: Vendor[] = vendorsData as Vendor[];
const transactions: Transaction[] = transactionsData as Transaction[];
const properties: Property[] = propertiesData as Property[];
const stays: Stay[] = staysData as Stay[];
const packages: HolidayPackage[] = packagesData as HolidayPackage[];
const products: Product[] = productsData as Product[];
const offers: Offer[] = offersData as Offer[];
const buildProjects: any[] = buildProjectsData as any[];
const viewingRequests: any[] = viewingRequestsData as any[];
const mortgageLeads: any[] = mortgageLeadsData as any[];
const insuranceQuotes: any[] = insuranceQuotesData as any[];
const back2school: any[] = back2schoolData as any[];
const travelListings: TravelListing[] = travelListingsData as TravelListing[];
const nestStaysListings: StayListing[] = nestStaysListingsData as StayListing[];


function createSlug(title: string) {
    if (!title) return '';
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

// --- Service Functions for Data Reading ---

// CLIENTS
export const getClients = async (): Promise<Client[]> => {
    return JSON.parse(JSON.stringify(clients));
};

export const getClient = async (id: string): Promise<Client | undefined> => {
    return (await getClients()).find(c => c.id === id);
};

// VENDORS
export const getVendors = async (): Promise<Vendor[]> => {
    return JSON.parse(JSON.stringify(vendors));
};

export const getVendor = async (id: string): Promise<Vendor | undefined> => {
    return (await getVendors()).find(v => v.id === id);
};

// TRANSACTIONS
export const getTransactions = async (): Promise<Transaction[]> => {
    return JSON.parse(JSON.stringify(transactions));
};

// PROPERTIES
export const getProperties = async (): Promise<Property[]> => {
    return JSON.parse(JSON.stringify(properties)).map((p: Property) => ({
        ...p,
        slug: createSlug(p.title)
    }));
};

export const getPropertyBySlug = async (slug: string): Promise<Property | undefined> => {
    const allProperties = await getProperties();
    return allProperties.find(p => p.slug === slug);
};

// STAYS
export const getStays = async (): Promise<Stay[]> => {
    return JSON.parse(JSON.stringify(stays));
};

// HOLIDAY PACKAGES
export const getHolidayPackages = async (): Promise<HolidayPackage[]> => {
    return JSON.parse(JSON.stringify(packages)).map((p: HolidayPackage) => ({
        ...p,
        slug: createSlug(p.title)
    }));
};

export const getPackageBySlug = async (slug: string): Promise<HolidayPackage | undefined> => {
    const allPackages = await getHolidayPackages();
    return allPackages.find(p => p.slug === slug);
};

// PRODUCTS
export const getProducts = async (): Promise<Product[]> => {
    const allProducts = JSON.parse(JSON.stringify(products));
    return allProducts.map((p: Product) => ({
        ...p,
        slug: createSlug(p.title)
    }));
};

// OFFERS
export const getOffers = async(): Promise<Offer[]> => {
    return JSON.parse(JSON.stringify(offers));
};

// BUILD PROJECTS
export const getBuildProjects = async(): Promise<any[]> => {
    return JSON.parse(JSON.stringify(buildProjects));
};

// VIEWING REQUESTS
export const getViewingRequests = async(): Promise<any[]> => {
    return JSON.parse(JSON.stringify(viewingRequests));
};

// MORTGAGE LEADS
export const getMortgageLeads = async(): Promise<any[]> => {
    return JSON.parse(JSON.stringify(mortgageLeads));
};

// INSURANCE QUOTES
export const getInsuranceQuotes = async(): Promise<any[]> => {
    return JSON.parse(JSON.stringify(insuranceQuotes));
};

// BACK TO SCHOOL
export const getBack2SchoolProducts = async(): Promise<any[]> => {
    return JSON.parse(JSON.stringify(back2school));
};

// TRAVEL LISTINGS
export const getTravelListings = async(): Promise<TravelListing[]> => {
    return JSON.parse(JSON.stringify(travelListings));
};

// NESTSTAYS LISTINGS
export const getStayListings = async(): Promise<StayListing[]> => {
    return JSON.parse(JSON.stringify(nestStaysListings));
};
