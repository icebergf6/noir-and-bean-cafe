import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { orderId, amount, customerName, whatsapp, paymentMethod } = body;

    // Simulate Payment Gateway settlement verification (Midtrans / Xendit Sandbox)
    const paymentResponse = {
      transaction_id: `txn_${Date.now()}`,
      order_id: orderId || '#NB-2048',
      gross_amount: amount,
      payment_type: paymentMethod || 'qris',
      transaction_status: 'settlement',
      fraud_status: 'accept',
      settlement_time: new Date().toISOString(),
      merchant_id: 'M-NOIRBEAN-01'
    };

    // Simulate WhatsApp Notification Dispatcher Payload (Fonnte / Waha API)
    const whatsappPayload = {
      target: whatsapp || '+6281234567890',
      message: `*NOIR & BEAN COFFEE ROASTERY*\nOrder Confirmed: ${orderId}\nCustomer: ${customerName}\nTotal: Rp ${amount?.toLocaleString('id-ID')}\nStatus: Brewing on Slayer Espresso Bar\n\nTrack progress: https://noirandbean.com/order`,
      status: 'DISPATCHED_QUEUED'
    };

    return NextResponse.json({
      success: true,
      payment: paymentResponse,
      whatsappNotification: whatsappPayload,
      message: 'Payment settled instantly and WhatsApp dispatch queued.'
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Simulation dispatch error' },
      { status: 500 }
    );
  }
}
