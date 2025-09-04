



export type Client = {
  id: string;
  name: string;
  email: string;
  phone: string;
  country: string;
  business: number;
  status: ClientStatus;
};

export const mockClients: Client[] = [
    { id: '1', name: 'Wanjiku Kamau', email: 'wanjiku.kamau@gmail.com', phone: '+254712345678', country: 'Kenya', business: 125500, status: 'Active' },
    { id: '2', name: 'Musa Okello', email: 'musa.okello@yahoo.com', phone: '+254787654321', country: 'Kenya', business: 89850, status: 'Active' },
    { id: '3', name: 'Abebe Bikila', email: 'abebe.b@outlook.com', phone: '+251911223344', country: 'Ethiopia', business: 45500, status: 'Inactive' },
    { id: '4', name: 'Fatuma Al-Hassan', email: 'fatuma.hassan@protonmail.com', phone: '+254722334455', country: 'Kenya', business: 251200, status: 'Active' },
    { id: '5', name: 'Mzee Jembe', email: 'mzee.jembe@tanzaniamail.com', phone: '+255767123456', country: 'Tanzania', business: 15200, status: 'Suspended' },
    { id: '6', name: 'Amina Yusuf', email: 'amina.yusuf@zoho.com', phone: '+254701234567', country: 'Kenya', business: 76500, status: 'Active' },
    { id: '7', name: 'Supa Modo', email: 'supa.modo@gov.tz', phone: '+255655123456', country: 'Tanzania', business: 180000, status: 'Active' },
    { id: '8', name: 'Zainabu Ibrahim', email: 'zainabu.ibrahim@mail.com', phone: '+254744556677', country: 'Kenya', business: 32000, status: 'Inactive' },
    { id: '9', name: 'Juma Omondi', email: 'juma.omondi@yandex.com', phone: '+254755667788', country: 'Kenya', business: 104750, status: 'Active' },
    { id: '10', name: 'Bwana Drip', email: 'bwanadrip@rwandanet.rw', phone: '+250788123456', country: 'Rwanda', business: 547500, status: 'Active' },
    { id: '11', name: 'Halima Aden', email: 'halima.aden@somalinet.so', phone: '+252615123456', country: 'Somalia', business: 12000, status: 'Active' },
    { id: '12', name: 'Idris Sultan', email: 'idris.sultan@bongomail.com', phone: '+255715123456', country: 'Tanzania', business: 68000, status: 'Active' },
    { id: '13', name: 'Vanessa Mdee', email: 'vanessa.mdee@gmail.com', phone: '+255754123456', country: 'Tanzania', business: 220000, status: 'Active' },
    { id: '14', name: 'Lupita Nyong\'o', email: 'lupita.n@hollywood.com', phone: '+254721123456', country: 'Kenya', business: 1350000, status: 'Active' },
    { id: '15', name: 'Eddy Kenzo', email: 'eddy.kenzo@ugandabeats.ug', phone: '+256772123456', country: 'Uganda', business: 95000, status: 'Active' },
    { id: '16',name: 'Juliana Kanyomozi', email: 'juliana.k@yahoo.com', phone: '+256701123456', country: 'Uganda', business: 150000, status: 'Inactive' },
    { id: '17', name: 'Ali Kiba', email: 'alikiba@outlook.com', phone: '+255713123456', country: 'Tanzania', business: 320000, status: 'Active' },
    { id: '18', name: 'Brenda Wairimu', email: 'brenda.wairimu@me.com', phone: '+254722987654', country: 'Kenya', business: 58000, status: 'Active' },
    { id: '19', name: 'Eric Omondi', email: 'eric.omondi@gmail.com', phone: '+254720123456', country: 'Kenya', business: 33000, status: 'Suspended' },
    { id: '20', name: 'Jose Chameleone', email: 'jose.chameleone@music.ug', phone: '+256782123456', country: 'Uganda', business: 890000, status: 'Active' },
    { id: '21', name: 'Wema Sepetu', email: 'wema.sepetu@bongomovie.com', phone: '+255772123456', country: 'Tanzania', business: 75000, status: 'Inactive' },
    { id: '22', name: 'John Garang', email: 'john.garang@southsudan.gov', phone: '+211912123456', country: 'South Sudan', business: 45500, status: 'Active' },
    { id: '23', name: 'Pierre Nkurunziza', email: 'pierre.n@burundimail.bi', phone: '+25779123456', country: 'Burundi', business: 22000, status: 'Active' },
    { id: '24', name: 'Naliaka Shukisha', email: 'naliaka.shukisha@icloud.com', phone: '+25775123456', country: 'Burundi', business: 19000, status: 'Active' },
    { id: '25', name: 'Churchill Ndambuki', email: 'mwalimuchurchill@gmail.com', phone: '+254722222222', country: 'Kenya', business: 180000, status: 'Active' },
    { id: '26', name: 'Diamond Platnumz', email: 'diamond.p@wcbwasafi.com', phone: '+255718123456', country: 'Tanzania', business: 1575000, status: 'Active' },
    { id: '27', name: 'Fena Gitu', email: 'fena.gitu@fenamenal.com', phone: '+254711123456', country: 'Kenya', business: 92000, status: 'Active' },
    { id: '28', name: 'Onyi Papa Jey', email: 'onyi.papajey@gmail.com', phone: '+254700123456', country: 'Kenya', business: 2500000, status: 'Inactive' },
    { id: '29', name: 'Consolata Mrembo', email: 'consolata.mrembo@outlook.com', phone: '+254733123456', country: 'Kenya', business: 450000, status: 'Active' },
    { id: '30', name: 'Brayo Yule Msee', email: 'brayo.yulemsee@protonmail.com', phone: '+256752123456', country: 'Uganda', business: 130000, status: 'Suspended' },
    { id: '31', name: 'Zari Hassan', email: 'zari.hassan@gmail.com', phone: '+256776123456', country: 'Uganda', business: 600000, status: 'Active' },
];

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

export const mockTransactions: Transaction[] = [
  { id: 'txn_1', clientId: '1', vendorId: 'v1', date: '2024-07-22', module: 'NestMall', description: "Purchase of 'Super-fly Sneakers'", amount: 5500, currency: 'KES', status: 'Completed' },
  { id: 'txn_2', clientId: '2', vendorId: 'v5', date: '2024-07-21', module: 'NestTravel', description: 'Flight booking NBO-MBA', amount: 8200, currency: 'KES', status: 'Completed' },
  { id: 'txn_3', clientId: '1', vendorId: 'v2', date: '2024-07-20', module: 'MamaAfrica', description: "Order of 'Pilau & Beef Stew'", amount: 1500, currency: 'KES', status: 'Completed' },
  { id: 'txn_4', clientId: '4', vendorId: 'v6', date: '2024-07-19', module: 'NestEvents', description: "Ticket for 'Sauti Sol Concert'", amount: 3000, currency: 'KES', status: 'Completed' },
  { id: 'txn_5', clientId: '1', vendorId: 'v7', date: '2024-07-18', module: 'NestParcel', description: 'Delivery to Westlands', amount: 500, currency: 'KES', status: 'Pending' },
  { id: 'txn_6', clientId: '10', vendorId: 'v1', date: '2024-07-15', module: 'NestMall', description: "Refund for 'Faulty Earbuds'", amount: -2500, currency: 'KES', status: 'Refunded' },
  { id: 'txn_7', clientId: '10', date: '2024-07-12', module: 'NestBiz', description: 'Subscription Fee', amount: 1000, currency: 'KES', status: 'Completed' },
  { id: 'txn_8', clientId: '14', vendorId: 'v4', date: '2024-07-11', module: 'NestHomes', description: 'Agency Fee for Karen Property', amount: 150000, currency: 'KES', status: 'Completed' },
  { id: 'txn_9', clientId: '26', vendorId: 'v9', date: '2024-07-10', module: 'NestMedia', description: 'Royalty Payout Q2', amount: 75000, currency: 'KES', status: 'Completed' },
  { id: 'txn_10', clientId: '5', vendorId: 'v5', date: '2024-07-09', module: 'NestTravel', description: 'Zanzibar Hotel Booking', amount: 45000, currency: 'KES', status: 'Failed' },
  { id: 'txn_11', clientId: '9', vendorId: 'v2', date: '2024-07-09', module: 'MamaAfrica', description: "Weekly 'Grocery Box'", amount: 4500, currency: 'KES', status: 'Completed' },
  { id: 'txn_12', clientId: '13', vendorId: 'v6', date: '2024-07-08', module: 'NestEvents', description: 'Blankets & Wine VIP', amount: 10000, currency: 'KES', status: 'Completed' },
  { id: 'txn_13', clientId: '19', vendorId: 'v1', date: '2024-07-07', module: 'NestMall', description: "Chargeback on 'Designer Watch'", amount: -12000, currency: 'KES', status: 'Refunded' },
  { id: 'txn_14', clientId: '3', vendorId: 'v10', date: '2024-07-06', module: 'NestJobs', description: 'Featured Job Application', amount: 500, currency: 'KES', status: 'Completed' },
  { id: 'txn_15', clientId: '22', vendorId: 'v7', date: '2024-07-05', module: 'NestParcel', description: 'Juba to Nairobi shipment', amount: 2500, currency: 'KES', status: 'Pending' },
  { id: 'txn_16', clientId: '2', vendorId: 'v2', date: '2024-07-04', module: 'MamaAfrica', description: "Order of 'Chapati & Ndengu'", amount: 850, currency: 'KES', status: 'Completed' },
  { id: 'txn_17', clientId: '1', vendorId: 'v1', date: '2024-07-03', module: 'NestMall', description: "Purchase of 'Ankara Print Dress'", amount: 3500, currency: 'KES', status: 'Completed' },
  { id: 'txn_18', clientId: '4', vendorId: 'v1', date: '2024-07-02', module: 'NestMall', description: "Purchase of 'Beaded Necklace'", amount: 1200, currency: 'KES', status: 'Completed' },
  { id: 'txn_19', clientId: '9', vendorId: 'v2', date: '2024-07-01', module: 'MamaAfrica', description: "Order of 'Mukimo & Beef'", amount: 1250, currency: 'KES', status: 'Completed' },
  { id: 'txn_20', clientId: '10', vendorId: 'v1', date: '2024-06-30', module: 'NestMall', description: "Purchase of 'Leather Sandals'", amount: 3000, currency: 'KES', status: 'Completed' },
];


export const mockModuleEngagement = [
    { name: 'NestMall', value: 45000 },
    { name: 'NestTravel', value: 32000 },
    { name: 'NestEvents', value: 18500 },
    { name: 'MamaAfrica', value: 12000 },
    { name: 'NestParcel', value: 9500 },
    { name: 'NestBiz', value: 8500 },
    { name: 'NestHomes', value: 150000 },
    { name: 'NestMedia', value: 75000 },
    { name: 'NestJobs', value: 500 },
];

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

export const mockVendors: Vendor[] = [
    { id: 'v1', name: 'Kariuki\'s Electronics', email: 'sales@kariuki.com', phone: '+254711111111', country: 'Kenya', portal: 'NestMall', products: 50, rating: 4.5, status: 'Active' },
    { id: 'v2', name: 'Mama Ntilie Foods', email: 'orders@mamantilie.co.tz', phone: '+255788888888', country: 'Tanzania', portal: 'MamaAfrica', products: 25, rating: 4.8, status: 'Active' },
    { id: 'v3', name: 'Safaricom PLC', email: 'corporate@safaricom.co.ke', phone: '+254722000000', country: 'Kenya', portal: 'NestJobs', products: 15, rating: 4.2, status: 'Active' },
    { id: 'v4', name: 'Pam Golding Properties', email: 'info@pamgolding.co.ke', phone: '+254733333333', country: 'Kenya', portal: 'NestHomes', products: 200, rating: 4.7, status: 'Active' },
    { id: 'v5', name: 'Kenya Airways', email: 'contact@kenya-airways.com', phone: '+254709000000', country: 'Kenya', portal: 'NestTravel', products: 100, rating: 3.8, status: 'Active' },
    { id: 'v6', name: 'Blankets & Wine Org', email: 'events@blanketsandwine.com', phone: '+254744444444', country: 'Kenya', portal: 'NestEvents', products: 10, rating: 4.9, status: 'Pending' },
    { id: 'v7', name: 'Sendy Logistics', email: 'support@sendy.it', phone: '+254755555555', country: 'Kenya', portal: 'NestParcel', products: 1, rating: 4.3, status: 'Active' },
    { id: 'v8', name: 'Tuskys Supermarket', email: 'customercare@tuskys.com', phone: '+254766666666', country: 'Kenya', portal: 'NestMall', products: 10000, rating: 3.5, status: 'Inactive' },
    { id: 'v9', name: 'Pulse Live', email: 'editor@pulselive.co.ke', phone: '+254777777777', country: 'Kenya', portal: 'NestMedia', products: 500, rating: 4.6, status: 'Active' },
    { id: 'v10', name: 'Kazi Mtaani Initiative', email: 'jobs@kazimtaani.go.ke', phone: '+254788888888', country: 'Kenya', portal: 'NestJobs', products: 30, rating: 4.1, status: 'Pending' },
];


export type Property = {
  id: string;
  title: string;
  location: string;
  price: number;
  type: 'For Sale' | 'For Rent';
  category: 'Apartment' | 'Villa' | 'Townhouse' | 'Office';
  beds: number;
  baths: number;
  area: number; // in sqft
  imageUrl: string;
  agent: {
    name: string;
    avatarUrl: string;
  };
};

export const mockProperties: Property[] = [
  {
    id: 'prop1',
    title: 'Modern Apartment in Kilimani',
    location: 'Kilimani, Nairobi',
    price: 15000000,
    type: 'For Sale',
    category: 'Apartment',
    beds: 3,
    baths: 2,
    area: 1500,
    imageUrl: 'https://picsum.photos/800/600?random=1',
    agent: {
      name: 'Jane Doe',
      avatarUrl: 'https://picsum.photos/100/100?random=a1',
    },
  },
  {
    id: 'prop2',
    title: 'Spacious Villa in Karen',
    location: 'Karen, Nairobi',
    price: 65000000,
    type: 'For Sale',
    category: 'Villa',
    beds: 5,
    baths: 5,
    area: 4500,
    imageUrl: 'https://picsum.photos/800/600?random=2',
    agent: {
      name: 'John Smith',
      avatarUrl: 'https://picsum.photos/100/100?random=a2',
    },
  },
  {
    id: 'prop3',
    title: 'Cozy Apartment for Rent',
    location: 'Westlands, Nairobi',
    price: 80000,
    type: 'For Rent',
    category: 'Apartment',
    beds: 2,
    baths: 1,
    area: 1200,
    imageUrl: 'https://picsum.photos/800/600?random=3',
    agent: {
      name: 'Peter Jones',
      avatarUrl: 'https://picsum.photos/100/100?random=a3',
    },
  },
  {
    id: 'prop4',
    title: 'Luxury Townhouse in Lavington',
    location: 'Lavington, Nairobi',
    price: 35000000,
    type: 'For Sale',
    category: 'Townhouse',
    beds: 4,
    baths: 4,
    area: 3000,
    imageUrl: 'https://picsum.photos/800/600?random=4',
    agent: {
      name: 'Susan Mwangi',
      avatarUrl: 'https://picsum.photos/100/100?random=a4',
    },
  },
   {
    id: 'prop5',
    title: 'Affordable Office Space',
    location: 'CBD, Nairobi',
    price: 50000,
    type: 'For Rent',
    category: 'Office',
    beds: 0,
    baths: 1,
    area: 800,
    imageUrl: 'https://picsum.photos/800/600?random=5',
    agent: {
      name: 'David Kimani',
      avatarUrl: 'https://picsum.photos/100/100?random=a5',
    },
  },
  {
    id: 'prop6',
    title: 'Beachfront Villa in Diani',
    location: 'Diani, Coast',
    price: 45000000,
    type: 'For Sale',
    category: 'Villa',
    beds: 4,
    baths: 3,
    area: 3500,
    imageUrl: 'https://picsum.photos/800/600?random=6',
    agent: {
      name: 'Fatima Ahmed',
      avatarUrl: 'https://picsum.photos/100/100?random=a6',
    },
  },
];
    
