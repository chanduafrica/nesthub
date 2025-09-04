import app from './firebase';
import { getFirestore, collection, addDoc, getDocs, query, where, orderBy } from 'firebase/firestore';
import type { Offer, VendorOffer } from './mock-data';

const db = getFirestore(app);

// Define a type for the offer data when creating it (without the 'id')
export type OfferData = Omit<Offer, 'id'>;
export type VendorOfferData = Omit<VendorOffer, 'id'>;


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
