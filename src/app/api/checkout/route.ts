//@ts-nocheck
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import nodemailer from "nodemailer";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
});

export async function POST(req: NextRequest) {
  try {
    const { email, duration } = await req.json();
    const priceMap: Record<number, string> = {
      
      15: "price_1RzkFO1PENxTjNgb4p1Rogjn", 
      30: "price_1RzkFx1PENxTjNgbvkswU0yF", 
    };
    const durationKey = Number(duration);
    if (!priceMap[durationKey]) {
      return NextResponse.json({ error: "Invalid plan duration" }, { status: 400 });
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