

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
        deliveryOptions: ('Vendor Delivery' | 'Courier' | 'Pick-up at Shop')[];
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

export type MamaAfricaListingStatus = 'Active' | 'Pending' | 'Sold Out' | 'Hidden';
export type MamaAfricaDishType = 'Ready Meal' | 'DIY Recipe' | 'Ingredient Pack' | 'Lunch Box';

export type MamaAfricaListing = {
    id: string;
    vendorId: string;
    name: string;
    category: string;
    cuisine: string;
    dishType: MamaAfricaDishType;
    recipeStory: string;
    cookingTime?: number; // in minutes
    difficulty?: 'Easy' | 'Medium' | 'Hard';
    servings?: number;
    ingredients: { name: string; quantity: string; unit: string }[];
    preparationSteps: { description: string; imageUrl?: string }[];
    isForSale: boolean;
    pricing: {
        price?: number;
        portionSize?: string;
    };
    delivery: {
        deliveryTime?: string;
    };
    allergens: string[];
    mainImage: string;
    status: MamaAfricaListingStatus;
    rating?: number;
    orders?: number;
};

export type BuyMyCarListingStatus = 'Active' | 'Pending' | 'Sold' | 'Archived';

export type BuyMyCarListing = {
  id: string;
  vendorId: string;
  title: string;
  vehicleType: 'Sedan' | 'SUV' | 'Pickup' | 'Van' | 'Truck' | 'Motorbike';
  make: string;
  model: string;
  year: number;
  condition: 'New' | 'Used' | 'Foreign Used' | 'Locally Used';
  transmission: 'Manual' | 'Automatic' | 'CVT';
  fuelType: 'Petrol' | 'Diesel' | 'Hybrid' | 'Electric';
  mileage: number;
  color: string;
  description: string;
  features: string[];
  price: number;
  isNegotiable: boolean;
  aiSuggestedValue?: number;
  registrationNumber?: string;
  chassisNumber?: string;
  mainImage: string;
  gallery: string[];
  videoUrl?: string;
  location: {
    county: string;
    town: string;
  };
  availability: 'Immediate' | '1-3 Days' | '1 Week';
  status: BuyMyCarListingStatus;
  useEscrow: boolean;
  views?: number;
  leads?: number;
};

export type Back2SchoolListingStatus = 'Active' | 'Pending' | 'Out of Stock' | 'Archived';

export type Back2SchoolListing = {
  id: string;
  vendorId: string;
  title: string;
  category: 'Uniforms' | 'Books & Stationery' | 'Electronics' | 'School Furniture' | 'Art & Music Supplies';
  brand?: string;
  description: string;
  pricing: {
    unitPrice: number;
    bulkDiscounts?: { quantity: number; discount: number }[];
    schoolSpecificPricing?: { schoolId: string; price: number }[];
  };
  stock: {
    quantity: number;
    restockAlertThreshold?: number;
  };
  media: {
    mainImage: string;
    gallery: string[];
    videoUrl?: string;
  };
  variations?: {
    size?: string[];
    color?: string[];
    gradeLevel?: string[];
  };
  delivery: {
    method: 'Courier' | 'Pickup' | 'Partner School Distribution';
    estimatedTime: string; // e.g., '1-3 days'
    returnPolicy: 'No Returns' | '7-Day Return' | 'Exchange Only';
  };
  status: Back2SchoolListingStatus;
  views?: number;
  orders?: number;
};

export type DukaListingStatus = 'Active' | 'Pending' | 'Out of Stock' | 'Archived';

export type DukaListing = {
  id: string;
  vendorId: string;
  name: string;
  brand?: string;
  category: 'Beverages' | 'Food & Snacks' | 'Household & Cleaning' | 'Personal Care' | 'Baby Products' | 'Dairy' | 'Cooking Essentials' | 'Electronics (Small)';
  description: string;
  sku?: string;
  images: string[];
  unitSize: string;
  price: number;
  discountedPrice?: number;
  stock: number;
  reorderLevel?: number;
  expiryDate?: string;
  status: DukaListingStatus;
};

export type NestBizListingStatus = 'Active' | 'Pending' | 'Archived';

export type NestBizListing = {
  id: string;
  vendorId: string;
  businessName: string;
  registrationType: string;
  registrationNumber?: string;
  industryCategory: string;
  tagline?: string;
  description: string;
  contact: {
    address: string;
    county: string;
    phone: string;
    secondaryPhone?: string;
    email: string;
    website?: string;
    socials: {
      facebook?: string;
      instagram?: string;
      linkedin?: string;
      youtube?: string;
      x?: string;
    };
  };
  media: {
    logo: string;
    coverBanner: string;
    gallery: string[];
    introVideo?: string;
  };
  operatingDetails: {
    businessHours: { day: string; open: string; close: string; }[];
    availableOnlineServices: string[];
    paymentMethods: string[];
  };
  services: {
    name: string;
    description: string;
    priceRange: string;
    duration?: string;
    image?: string;
  }[];
  offers: {
    title: string;
    description: string;
    startDate: string;
    endDate: string;
    type: 'Discount' | 'Bundle' | 'Free Consultation';
  }[];
  status: NestBizListingStatus;
};
