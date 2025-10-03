
import { NextResponse } from 'next/server';
import { getBack2SchoolProducts } from '@/lib/firebase-services';

/**
 * API Endpoint: getBack2SchoolProducts
 * 
 * Fetches "Back to School" products from an external partner source.
 * This engine is used by all partners to get standardized product information.
 * 
 * @returns {NextResponse} A JSON response containing an array of products.
 */
export async function GET() {
  try {
    const products = await getBack2SchoolProducts();
    
    // In a real scenario, this would involve an API call to an external partner's e-commerce platform.
    // The data would then be transformed into our standard product format.
    
    return NextResponse.json(products);
  } catch (error) {
    console.error('[API - getBack2SchoolProducts] Error:', error);
    return NextResponse.json({ message: 'Failed to fetch products' }, { status: 500 });
  }
}
