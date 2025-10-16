//@ts-nocheck
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import nodemailer from "nodemailer";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
});

export async function POST(req: NextRequest) {
  try {
    const { email, duration, modules } = await req.json();
    
    let priceId: string;
    
    if (duration === 15) {
      // Extract module numbers from comma-separated string like "module1,module2,module3"
      const moduleNumbers: number[] = [];
      if (modules) {
        const moduleStrings = modules.split(',');
        for (const m of moduleStrings) {
          const match = m.trim().match(/module(\d+)/);
          if (match) {
            moduleNumbers.push(parseInt(match[1]));
          } else {
            // Also support plain numbers like "1,2,3"
            const num = parseInt(m.trim());
            if (!isNaN(num)) {
              moduleNumbers.push(num);
            }
          }
        }
      }
      
      const hasModules1to3 = moduleNumbers.some((m: number) => m >= 1 && m <= 3);
      const hasModules4to6 = moduleNumbers.some((m: number) => m >= 4 && m <= 6);
      
      if (hasModules1to3 && !hasModules4to6) {
        // Only modules 1-3
        priceId = "price_1SGze3KelalxvISGIsHmWIP1";
      } else if (hasModules4to6 && !hasModules1to3) {
        // Only modules 4-6
        priceId = "price_1SGzyJKelalxvISGf3VXiZj5";
      } else {
        return NextResponse.json({ error: "Invalid modules for 15-day plan. Must select either modules 1-3 OR modules 4-6, not both." }, { status: 400 });
      }
    } else if (duration === 30) {
      priceId = "price_1SH006KelalxvISGOY7UksrC";
    } else {
      return NextResponse.json({ error: "Invalid plan duration" }, { status: 400 });
    }
    
    const session = await stripe.checkout.sessions.create({
      payment_method_types: [
        "card",
        "paypal",
        "link",
        "amazon_pay",
      ],
      line_items: [
        {
          price: priceId, 
          quantity: 1,
        },
      ],
      mode: "payment",
      customer_email: email,
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cancel`,
    });
    return NextResponse.json({ 
      message: "Payment link generated successfully", 
      paymentUrl: session.url,
      sessionId: session.id 
    });
  } catch (err: any) {
    console.error("Stripe checkout error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}