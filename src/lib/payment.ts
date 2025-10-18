//@ts-nocheck
import Stripe from "stripe";

// Trim and validate Stripe key to avoid deployment issues
const stripeSecretKey = (process.env.STRIPE_SECRET_KEY || '').trim();

if (!stripeSecretKey) {
  throw new Error('STRIPE_SECRET_KEY is not configured');
}

const stripe = new Stripe(stripeSecretKey, {
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
    console.log('Payment link data:', { duration: data.duration, modules: data.modules });
    
    let priceId: string;
    
    // Ensure duration is a number
    const duration = Number(data.duration);
    
    if (duration === 15) {
      // Extract module numbers from module strings like "module1", "module2"
      const moduleNumbers = (data.modules || []).map(m => {
        const match = m.match(/module(\d+)/);
        return match ? parseInt(match[1]) : 0;
      }).filter(n => n > 0);
      
      console.log('15-day plan module numbers:', moduleNumbers);
      
      const hasModules1to3 = moduleNumbers.some(m => m >= 1 && m <= 3);
      const hasModules4to6 = moduleNumbers.some(m => m >= 4 && m <= 6);
      
      if (hasModules1to3 && !hasModules4to6) {
        // Only modules 1-3 (First half)
        priceId = "price_1SGze3KelalxvISGIsHmWIP1";
      } else if (hasModules4to6 && !hasModules1to3) {
        // Only modules 4-6 (Second half)
        priceId = "price_1SGzyJKelalxvISGf3VXiZj5";
      } else if (moduleNumbers.length === 0) {
        // No modules selected, default to first half
        console.warn('No modules selected for 15-day plan, defaulting to first half');
        priceId = "price_1SGze3KelalxvISGIsHmWIP1";
      } else {
        console.error('Invalid module combination for 15-day plan:', { hasModules1to3, hasModules4to6, moduleNumbers });
        throw new Error("For the 15-day plan, please select either modules 1-3 (first half) OR modules 4-6 (second half), not both.");
      }
    } else if (duration === 30) {
      // 30-day plan includes all 6 modules
      priceId = "price_1SH006KelalxvISGOY7UksrC";
    } else {
      console.error('Invalid duration:', duration);
      throw new Error(`Invalid plan duration: ${duration}. Please select either 15 or 30 days.`);
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
