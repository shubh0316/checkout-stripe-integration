//@ts-nocheck
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
});

export interface PaymentLinkData {
  email: string;
  duration: number;
  firstName?: string;
  lastName?: string;
}

export async function generatePaymentLink(data: PaymentLinkData): Promise<string> {
  try {
    const priceMap: Record<number, string> = {
      15: "price_1RzkFO1PENxTjNgb4p1Rogjn", 
      30: "price_1RzkFx1PENxTjNgbvkswU0yF", 
    };

    const durationKey = Number(data.duration);
    if (!priceMap[durationKey]) {
      throw new Error("Invalid plan duration");
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceMap[durationKey], 
          quantity: 1,
        },
      ],
      mode: "payment",
      customer_email: data.email,
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cancel`,
      metadata: {
        firstName: data.firstName || '',
        lastName: data.lastName || '',
        duration: data.duration.toString(),
      },
    });

    return session.url!;
  } catch (error: any) {
    console.error("Error generating payment link:", error);
    throw new Error(`Failed to generate payment link: ${error.message}`);
  }
}

export function getProgramPrice(duration: number): number {
  const priceMap: Record<number, number> = {
    15: 2800,
    30: 4200,
  };
  return priceMap[duration] || 0;
}

export function formatPrice(amount: number): string {
  return `€${amount.toLocaleString('de-DE')}`;
}
