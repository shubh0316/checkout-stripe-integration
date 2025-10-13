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
  modules?: string[];
}

export async function generatePaymentLink(data: PaymentLinkData): Promise<string> {
  try {
    let priceId: string;
    
    if (data.duration === 15) {
      // Extract module numbers from module strings like "module1", "module2"
      const moduleNumbers = (data.modules || []).map(m => {
        const match = m.match(/module(\d+)/);
        return match ? parseInt(match[1]) : 0;
      }).filter(n => n > 0);
      
      const hasModules1to3 = moduleNumbers.some(m => m >= 1 && m <= 3);
      const hasModules4to6 = moduleNumbers.some(m => m >= 4 && m <= 6);
      
      if (hasModules1to3 && !hasModules4to6) {
        // Only modules 1-3
        priceId = "price_1SGze3KelalxvISGIsHmWIP1";
      } else if (hasModules4to6 && !hasModules1to3) {
        // Only modules 4-6
        priceId = "price_1SGzyJKelalxvISGf3VXiZj5";
      } else {
        throw new Error("Invalid modules for 15-day plan. Must select either modules 1-3 OR modules 4-6, not both.");
      }
    } else if (data.duration === 30) {
      priceId = "price_1SH006KelalxvISGOY7UksrC";
    } else {
      throw new Error("Invalid plan duration");
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: [
        "card",             // Credit/Debit cards + Apple Pay (automatic on supported devices)
        "paypal",           // PayPal
      ],
      line_items: [
        {
          price: priceId, 
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
