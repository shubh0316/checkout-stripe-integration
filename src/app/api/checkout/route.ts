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
    const transporter = nodemailer.createTransport({
      service: "gmail", 
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    await transporter.sendMail({
        from: `"TLC Club" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "Complete Your TLC Club Program Payment - Action Required",
        html: `
      <!DOCTYPE html>
      <html>
      <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Complete Your TLC Club Payment</title>
          <style>
              @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
              
              * {
                  margin: 0;
                  padding: 0;
                  box-sizing: border-box;
              }
              
              body {
                  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                  background-color: #fef2f2;
                  margin: 0;
                  padding: 20px 0;
                  line-height: 1.6;
              }
              
              .email-container {
                  max-width: 600px;
                  margin: 0 auto;
                  background: #ffffff;
                  border-radius: 16px;
                  overflow: hidden;
                  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
                  border: 2px solid #dc2626;
              }
              
              .email-header {
                  background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
                  padding: 40px 30px;
                  text-align: center;
                  color: white;
              }
              
              .email-logo {
                  font-size: 32px;
                  font-weight: 700;
                  margin-bottom: 10px;
                  letter-spacing: 1px;
              }
              
              .email-title {
                  font-size: 28px;
                  font-weight: 600;
                  margin: 20px 0 10px;
              }
              
              .email-subtitle {
                  font-size: 16px;
                  opacity: 0.9;
                  font-weight: 400;
              }
              
              .email-body {
                  padding: 40px 30px;
              }
              
              .email-content {
                  margin-bottom: 30px;
              }
              
              .email-text {
                  font-size: 16px;
                  color: #374151;
                  margin-bottom: 20px;
                  line-height: 1.6;
              }
              
              .payment-details {
                  background: #fef2f2;
                  padding: 20px;
                  border-radius: 12px;
                  margin: 25px 0;
                  border-left: 4px solid #dc2626;
              }
              
              .detail-item {
                  display: flex;
                  justify-content: space-between;
                  margin-bottom: 8px;
                  padding: 8px 0;
              }
              
              .detail-label {
                  font-weight: 500;
                  color: #6b7280;
              }
              
              .detail-value {
                  font-weight: 600;
                  color: #374151;
              }
              
              .cta-button {
                  display: inline-block;
                  background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
                  color: white;
                  text-decoration: none;
                  padding: 16px 40px;
                  border-radius: 50px;
                  font-weight: 600;
                  font-size: 16px;
                  text-align: center;
                  margin: 20px 0;
                  transition: all 0.3s ease;
                  box-shadow: 0 4px 15px rgba(220, 38, 38, 0.3);
              }
              
              .cta-button:hover {
                  transform: translateY(-2px);
                  box-shadow: 0 6px 20px rgba(220, 38, 38, 0.4);
              }
              
              .secondary-button {
                  display: inline-block;
                  color: #dc2626;
                  text-decoration: none;
                  padding: 12px 24px;
                  border: 2px solid #dc2626;
                  border-radius: 50px;
                  font-weight: 500;
                  font-size: 14px;
                  margin-top: 10px;
                  transition: all 0.3s ease;
              }
              
              .secondary-button:hover {
                  background: #dc2626;
                  color: white;
              }
              
              .email-footer {
                  background: #fef2f2;
                  padding: 30px;
                  text-align: center;
                  border-top: 1px solid #e5e7eb;
              }
              
              .footer-text {
                  font-size: 14px;
                  color: #6b7280;
                  margin-bottom: 15px;
              }
              
              .social-links {
                  margin: 20px 0;
              }
              
              .social-link {
                  display: inline-block;
                  margin: 0 10px;
                  color: #dc2626;
                  text-decoration: none;
                  font-size: 14px;
              }
              
              .copyright {
                  font-size: 12px;
                  color: #9ca3af;
                  margin-top: 20px;
              }
              
              .highlight {
                  color: #dc2626;
                  font-weight: 600;
              }
              
              @media (max-width: 480px) {
                  .email-header {
                      padding: 30px 20px;
                  }
                  
                  .email-body {
                      padding: 30px 20px;
                  }
                  
                  .email-title {
                      font-size: 24px;
                  }
                  
                  .email-logo {
                      font-size: 28px;
                  }
                  
                  .cta-button {
                      display: block;
                      margin: 20px auto;
                      padding: 14px 32px;
                  }
                  
                  .detail-item {
                      flex-direction: column;
                      gap: 4px;
                  }
              }
          </style>
      </head>
      <body>
          <div class="email-container">
              <div class="email-header">
                  <div class="email-logo">🌟 TLC Club</div>
                  <h1 class="email-title">Complete Your Program Payment</h1>
                  <p class="email-subtitle">Your transformative journey awaits! Secure your spot now.</p>
              </div>
              
              <div class="email-body">
                  <div class="email-content">
                      <p class="email-text">Dear Valued Member,</p>
                      <p class="email-text">Thank you for choosing <span class="highlight">TLC Club</span> for your upcoming program! We're excited to welcome you to our community of passionate travelers and learners.</p>
                      <p class="email-text">To confirm your participation and secure your spot, please complete your payment using the link below:</p>
                      
                      <div class="payment-details">
                          <div class="detail-item">
                              <span class="detail-label">Program Duration:</span>
                              <span class="detail-value">${duration} days</span>
                          </div>
                          
                          <div class="detail-item">
                              <span class="detail-label">Registered Email:</span>
                              <span class="detail-value">${email}</span>
                          </div>
                      </div>
                      
                      <div style="text-align: center;">
                          <a href="${session.url}" class="cta-button">Complete Payment Now</a>
                          <p style="font-size: 14px; color: #fffff; margin-top: 10px;">
                              Secure link expires in 24 hours
                          </p>
                      </div>
                      
                      <p class="email-text" style="margin-top: 30px;">
                          <strong>What happens next?</strong><br>
                          Once your payment is confirmed, you'll receive your program confirmation and detailed itinerary within 24-48 hours.
                      </p>
                      
                      <p class="email-text">
                          Our team is here to support you every step of the way. If you have any questions or need assistance, 
                          please reply to this email or contact our support team at 
                          <a href="mailto:support@tlc-club.com" style="color: #dc2626; text-decoration: none;">support@tlc-club.com</a>
                      </p>
                      
                      <p class="email-text">
                          We can't wait to embark on this incredible journey with you!
                      </p>
                  </div>
              </div>
              
              <div class="email-footer">
                  <p class="footer-text">Warm regards,<br><strong>The TLC Club Team</strong></p>
                  
                 
                  
                  <p class="copyright">
                      © 2024 TLC Club. All rights reserved.<br>
                      Creating transformative travel experiences worldwide
                  </p>
              </div>
          </div>
      </body>
      </html>
        `,
      });
    return NextResponse.json({ message: "Checkout link sent to email" });
  } catch (err: any) {
    console.error("Stripe checkout error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}