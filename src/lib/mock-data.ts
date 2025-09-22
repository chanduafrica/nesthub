

export type Client = {
  id: string;
  name: string;
  email: string;
  phone: string;
  country: string;
  business: number;
  status: ClientStatus;
};

export type TransactionStatus = 'Completed' | 'Pending' | 'Refunded' | 'Failed';

export type Transaction = {
  id: string;
  clientId: string;
  vendorId?: string;
  date: string;
  module: string;
  description: string;
  amount: number;
  currency: 'KES';
  status: TransactionStatus;
}

export type ModuleEngagement = {
    name: string;
    value: number;
}

export type Offer = {
  id: string;
  clientId: string;
  code: string;
  type: 'percentage' | 'amount';
  value: number;
  portal: string;
  dateSent: string;
  status: 'Sent' | 'Redeemed';
};

export type VendorOffer = {
  id: string;
  vendorId: string;
  code: string;
  type: 'percentage' | 'amount';
  value: number;
  portal: string;
  dateSent: string;
  status: 'Sent' | 'Redeemed';
};

export type ClientStatus = 'Active' | 'Inactive' | 'Suspended';

export type VendorStatus = 'Active' | 'Inactive' | 'Pending';

export type Vendor = {
  id: string;
  name: string;
  email: string;
  phone: string;
  country: string;
  portal: string;
  products: number;
  rating: number;
  status: VendorStatus;
};


export type Property = {
  id: string;
  title: string;
  slug: string;
  location: string;
  price: number;
  type: 'For Sale' | 'For Rent';
  category: 'Apartment' | 'Villa' | 'Townhouse' | 'Office';
  beds: number;
  baths: number;
  area: number; // in sqft
  imageUrl: string;
  shariaCompliant: boolean;
  agent: {
    name: string;
    avatarUrl: string;
  };
};

export type Stay = {
    id: string;
    title: string;
    image: string;
    hint: string;
    rating: number;
    location: string;
    type: string;
    price: number;
};

export type HolidayPackage = {
    id: string;
    title: string;
    slug: string;
    image: string;
    hint: string;
    rating: number;
    location: string;
    duration: string;
    price: number;
    tags: string[];
    highlights: string[];
    description?: string;
};

export type Product = {
    id: string;
    slug: string;
    image: string;
    title: string;
    vendor: string;
    rating: number;
    price: number;
    discountPrice?: number;
    category: string;
};
