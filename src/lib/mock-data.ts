

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

export type PropertyStatus = 'Available' | 'Booked' | 'Sold' | 'Pending';

export type Property = {
  id: string;
  vendorId: string;
  title: string;
  slug: string;
  description?: string;
  location: string;
  price: number;
  type: 'For Sale' | 'For Rent' | 'Short Stay' | 'Airbnb';
  category: 'Apartment' | 'Villa' | 'Townhouse' | 'Office' | 'Plot' | 'Land' | 'Bungalow';
  beds: number;
  baths: number;
  area: number; // in sqft
  amenities?: string[];
  imageUrl: string;
  images?: string[];
  videoUrl?: string;
  status: PropertyStatus;
  shariaCompliant: boolean;
  agent: {
    name: string;
    avatarUrl: string;
  };
  views?: number;
  leads?: number;
  commission?: string;
  seo?: {
    title: string;
    description: string;
    tags: string[];
  }
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

export type ProductStatus = 'Active' | 'Inactive';
export type ProductVisibility = 'Published' | 'Draft';
export type ProductType = 'Physical' | 'Digital';

export type Product = {
    id: string;
    slug: string;
    image: string; // Main image
    galleryImages?: string[];
    videoUrl?: string;
    title: string;
    vendor: string;
    vendorId?: string;
    rating: number;
    price: number;
    discountPrice?: number;
    taxable?: boolean;
    sku?: string;
    stock?: number;
    category: string[];
    status: ProductStatus;
    visibility?: ProductVisibility;
    productType?: ProductType;
    isCeoPick?: boolean;
    inMiddayVault?: boolean;
    inExplosiveDeal?: boolean;
    description?: string;
    specifications?: { key: string; value: string; }[];
    faqs?: { question: string; answer: string; }[];
    seo?: {
        title: string;
        description: string;
        slug: string;
    };
};

export type TravelListingType = 'Flight' | 'SGR' | 'Bus' | 'Hotel' | 'Tour';
export type TravelListingStatus = 'Active' | 'Pending' | 'Expired';

export type TravelListing = {
    id: string;
    vendorId: string;
    listingType: TravelListingType;
    status: TravelListingStatus;
    title: string;
    description: string;
    location: string;
    price: number;
    imageUrl: string;
    views?: number;
    bookings?: number;
    // Type-specific fields
    airline?: string;
    departure?: string;
    arrival?: string;
    departureTime?: string;
    seats?: number;
    hotelName?: string;
    amenities?: string[];
    duration?: string;
    inclusions?: string[];
};

export type StayListingStatus = 'Active' | 'Pending' | 'Booked' | 'Archived';
export type StayPropertyType = 'Home' | 'Apartment' | 'Villa' | 'Cottage' | 'Farm Stay' | 'Studio';

export type StayListing = {
    id: string;
    vendorId: string;
    title: string;
    description: string;
    propertyType: StayPropertyType;
    categoryTags: string[];
    location: {
        county: string;
        town: string;
        mapEmbed?: string;
    };
    coverImage: string;
    gallery: string[];
    videoUrl?: string;
    pricing: {
        perNight: number;
        weeklyDiscount?: number;
        monthlyDiscount?: number;
        cleaningFee?: number;
    };
    amenities: string[];
    safetyFeatures: string[];
    houseRules: string[];
    bookingSettings: {
        instantBooking: boolean;
        maxGuests: number;
        bedrooms: number;
        beds: number;
        bathrooms: number;
        cancellationPolicy: 'Flexible' | 'Moderate' | 'Strict';
    };
    status: StayListingStatus;
    rating?: number;
    totalBookings?: number;
};

export type AutoPartListingStatus = 'Active' | 'Pending' | 'Out of Stock' | 'Archived';

export type AutoPartListing = {
    id: string;
    vendorId: string;
    name: string;
    category: string;
    brand: string;
    condition: 'New' | 'Used' | 'Refurbished';
    description: string;
    compatibility: {
        make: string;
        model: string;
        yearRange: string;
        fuelType?: 'Petrol' | 'Diesel' | 'Hybrid';
        transmission?: 'Manual' | 'Automatic';
    };
    pricing: {
        unitPrice: number;
        bulkPrice?: number;
    };
    stock: {
        quantity: number;
        minOrderQuantity?: number;
    };
    media: {
        mainImage: string;
        gallery: string[];
        videoUrl?: string;
    };
    logistics: {
        deliveryOptions: ('Vendor Delivery' | 'Courier' | 'Pick-up')[];
        shippingCostPolicy: 'Flat Rate' | 'Free Delivery' | 'Buyer Pays';
        location: {
            county: string;
            town: string;
        };
    };
    status: AutoPartListingStatus;
    views?: number;
    orders?: number;
    totalSales?: number;
};
