
import { NextResponse } from 'next/server';

/**
 * API Endpoint: sendPartnerOrderDetails
 * 
 * Receives order details from partner portals for payment processing and checkout within the Nest ecosystem.
 * 
 * @param {Request} request The incoming request object containing order data in the body.
 * @returns {NextResponse} A JSON response confirming order receipt and providing a Nest Order ID.
 */
export async function POST(request: Request) {
  try {
    const orderDetails = await request.json();

    // 1. Validate the incoming order details
    if (!orderDetails.partnerId || !orderDetails.items || orderDetails.items.length === 0) {
      return NextResponse.json({ message: 'Invalid order data provided.' }, { status: 400 });
    }

    // 2. Log the order details and prepare for processing
    // In a real application, you would save this to a database,
    // calculate totals, and generate a secure checkout session.
    console.log('[API - sendPartnerOrderDetails] Received order from:', orderDetails.partnerId, orderDetails);

    // 3. Generate a unique Nest Order ID
    const nestOrderId = `NEST-${Date.now()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

    // 4. Respond with confirmation and the Nest Order ID
    return NextResponse.json({
      success: true,
      message: 'Order details received and are being processed.',
      nestOrderId: nestOrderId,
      // You could also return a checkout URL here
      // checkoutUrl: `https://nest.com/checkout?order_id=${nestOrderId}`
    });

  } catch (error) {
    console.error('[API - sendPartnerOrderDetails] Error:', error);
    return NextResponse.json({ message: 'Failed to process order details' }, { status: 500 });
  }
}
