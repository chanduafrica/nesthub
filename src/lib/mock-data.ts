

export type Client = {
  id: string;
  name: string;
  email: string;
  phone: string;
  business: number;
  status: ClientStatus;
};

export const mockClients: Client[] = [
    { id: '1', name: 'Wanjiku Kamau', email: 'wanjiku.kamau@gmail.com', phone: '254712345678', business: 125500, status: 'Active' },
    { id: '2', name: 'Musa Okello', email: 'musa.okello@yahoo.com', phone: '254787654321', business: 89000, status: 'Active' },
    { id: '3', name: 'Abebe Bikila', email: 'abebe.b@outlook.com', phone: '254711223344', business: 45000, status: 'Inactive' },
    { id: '4', name: 'Fatuma Al-Hassan', email: 'fatuma.hassan@protonmail.com', phone: '254722334455', business: 250000, status: 'Active' },
    { id: '5', name: 'Mzee Jembe', email: 'mzee.jembe@tanzaniamail.com', phone: '255767123456', business: 15200, status: 'Suspended' },
    { id: '6', name: 'Amina Yusuf', email: 'amina.yusuf@zoho.com', phone: '254701234567', business: 76500, status: 'Active' },
    { id: '7', name: 'Supa Modo', email: 'supa.modo@gov.tz', phone: '255655123456', business: 180000, status: 'Active' },
    { id: '8', name: 'Zainabu Ibrahim', email: 'zainabu.ibrahim@mail.com', phone: '254744556677', business: 32000, status: 'Inactive' },
    { id: '9', name: 'Juma Omondi', email: 'juma.omondi@yandex.com', phone: '254755667788', business: 99000, status: 'Active' },
    { id: '10', name: 'Bwana Drip', email: 'bwanadrip@rwandanet.rw', phone: '250788123456', business: 550000, status: 'Active' },
    { id: '11', name: 'Halima Aden', email: 'halima.aden@somalinet.so', phone: '252615123456', business: 12000, status: 'Active' },
    { id: '12', name: 'Idris Sultan', email: 'idris.sultan@bongomail.com', phone: '255715123456', business: 68000, status: 'Active' },
    { id: '13', name: 'Vanessa Mdee', email: 'vanessa.mdee@gmail.com', phone: '255754123456', business: 210000, status: 'Active' },
    { id: '14', name: 'Lupita Nyong\'o', email: 'lupita.n@hollywood.com', phone: '254721123456', business: 1200000, status: 'Active' },
    { id: '15', name: 'Eddy Kenzo', email: 'eddy.kenzo@ugandabeats.ug', phone: '256772123456', business: 95000, status: 'Active' },
    { id: '16',name: 'Juliana Kanyomozi', email: 'juliana.k@yahoo.com', phone: '256701123456', business: 150000, status: 'Inactive' },
    { id: '17', name: 'Ali Kiba', email: 'alikiba@outlook.com', phone: '255713123456', business: 320000, status: 'Active' },
    { id: '18', name: 'Brenda Wairimu', email: 'brenda.wairimu@me.com', phone: '254722987654', business: 58000, status: 'Active' },
    { id: '19', name: 'Eric Omondi', email: 'eric.omondi@gmail.com', phone: '254720123456', business: 45000, status: 'Suspended' },
    { id: '20', name: 'Jose Chameleone', email: 'jose.chameleone@music.ug', phone: '256782123456', business: 890000, status: 'Active' },
    { id: '21', name: 'Wema Sepetu', email: 'wema.sepetu@bongomovie.com', phone: '255772123456', business: 75000, status: 'Inactive' },
    { id: '22', name: 'John Garang', email: 'john.garang@southsudan.gov', phone: '211912123456', business: 43000, status: 'Active' },
    { id: '23', name: 'Pierre Nkurunziza', email: 'pierre.n@burundimail.bi', phone: '25779123456', business: 22000, status: 'Active' },
    { id: '24', name: 'Naliaka Shukisha', email: 'naliaka.shukisha@icloud.com', phone: '25775123456', business: 19000, status: 'Active' },
    { id: '25', name: 'Churchill Ndambuki', email: 'mwalimuchurchill@gmail.com', phone: '254722222222', business: 180000, status: 'Active' },
    { id: '26', name: 'Diamond Platnumz', email: 'diamond.p@wcbwasafi.com', phone: '255718123456', business: 1500000, status: 'Active' },
    { id: '27', name: 'Fena Gitu', email: 'fena.gitu@fenamenal.com', phone: '254711123456', business: 92000, status: 'Active' },
    { id: '28', name: 'Onyi Papa Jey', email: 'onyi.papajey@gmail.com', phone: '254700123456', business: 2500000, status: 'Inactive' },
    { id: '29', name: 'Consolata Mrembo', email: 'consolata.mrembo@outlook.com', phone: '254733123456', business: 450000, status: 'Active' },
    { id: '30', name: 'Brayo Yule Msee', email: 'brayo.yulemsee@protonmail.com', phone: '256752123456', business: 130000, status: 'Suspended' },
    { id: '31', name: 'Zari Hassan', email: 'zari.hassan@gmail.com', phone: '256776123456', business: 600000, status: 'Active' },
];

export const mockTransactions = [
  { id: 'txn_1', date: '2024-07-22', module: 'NestMall', description: 'Purchase of "Super-fly Sneakers"', amount: 5500, currency: 'KES', status: 'Completed' },
  { id: 'txn_2', date: '2024-07-21', module: 'NestTravel', description: 'Flight booking NBO-MBA', amount: 8200, currency: 'KES', status: 'Completed' },
  { id: 'txn_3', date: '2024-07-20', module: 'MamaAfrica', description: 'Order from "Mama\'s Kitchen"', amount: 1500, currency: 'KES', status: 'Completed' },
  { id: 'txn_4', date: '2024-07-19', module: 'NestEvents', description: 'Ticket for "Sauti Sol Concert"', amount: 3000, currency: 'KES', status: 'Completed' },
  { id: 'txn_5', date: '2024-07-18', module: 'NestParcel', description: 'Delivery to Westlands', amount: 500, currency: 'KES', status: 'Completed' },
  { id: 'txn_6', date: '2024-07-15', module: 'NestMall', description: 'Refund for "Faulty Earbuds"', amount: -2500, currency: 'KES', status: 'Refunded' },
  { id: 'txn_7', date: '2024-07-12', module: 'NestBiz', description: 'Subscription Fee', amount: 1000, currency: 'KES', status: 'Completed' },
];

export const mockModuleEngagement = [
    { name: 'NestMall', value: 45000 },
    { name: 'NestTravel', value: 32000 },
    { name: 'NestEvents', value: 18500 },
    { name: 'MamaAfrica', value: 12000 },
    { name: 'NestParcel', value: 9500 },
    { name: 'NestBiz', value: 8500 },
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

export type ClientStatus = 'Active' | 'Inactive' | 'Suspended';

    