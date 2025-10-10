// USAGE EXAMPLES for Email Templates
// This file shows how to use the different email templates

import { 
  generateApplicationConfirmationEmail, 
  generateApplicationConfirmationPlainText,
  generateBookingConfirmationEmail,
  generateBookingConfirmationPlainText 
} from './emailTemplates';

// ============================================
// 1. APPLICATION CONFIRMATION EMAIL
// ============================================
// Use this when a user FIRST SUBMITS the application form
// This is sent immediately after form submission, before any payment

export function sendApplicationConfirmationExample(formData: any) {
  // Helper to calculate dates
  const calculateDates = (duration: number, modules: string[]) => {
    const fullProgramStart = 'July 29, 2026';
    const fullProgramEnd = 'August 28, 2026';
    const halfwayDate = 'August 13, 2026';
    
    if (duration === 30) {
      return { startDate: fullProgramStart, endDate: fullProgramEnd };
    } else if (duration === 15) {
      const isFirstHalf = modules && modules.includes('module1');
      return {
        startDate: isFirstHalf ? fullProgramStart : halfwayDate,
        endDate: isFirstHalf ? halfwayDate : fullProgramEnd
      };
    }
    
    return { startDate: fullProgramStart, endDate: fullProgramEnd };
  };

  const dates = calculateDates(formData.duration, formData.modules || []);

  // Prepare data for the application confirmation email
  const applicationEmailData = {
    firstName: formData.firstName,
    duration: formData.duration,
    startDate: dates.startDate,
    endDate: dates.endDate,
    modules: formData.moduleTitles || [],
    consultationBookingLink: 'https://timelifeclub.com/book-consultation', // Update with actual link
    whatsappLink: 'https://wa.me/message/OHPC4XVQP537F1'
  };

  // Generate the HTML and plain text versions
  const htmlEmail = generateApplicationConfirmationEmail(applicationEmailData);
  const textEmail = generateApplicationConfirmationPlainText(applicationEmailData);

  // Use these in your email service (nodemailer, etc.)
  const mailOptions = {
    from: '"Time Life Club" <info@timelifeclub.com>',
    to: formData.email,
    subject: 'Your next adventure starts now! Time Life Club 🚀',
    html: htmlEmail,
    text: textEmail,
  };

  // Send with your mail transporter...
  // await transporter.sendMail(mailOptions);
}

// ============================================
// 2. BOOKING CONFIRMATION EMAIL
// ============================================
// Use this AFTER the application is approved and a payment link is generated
// This is sent 2-3 days after the application with the binding booking link

export function sendBookingConfirmationExample(formData: any, paymentLink: string, price: number) {
  // Helper to calculate dates (German format)
  const calculateDates = (duration: number, modules: string[]) => {
    const fullProgramStart = '29. Juli 2026';
    const fullProgramEnd = '28. August 2026';
    const halfwayDate = '13. August 2026';
    
    if (duration === 30) {
      return { startDate: fullProgramStart, endDate: fullProgramEnd };
    } else if (duration === 15) {
      const isFirstHalf = modules && modules.includes('module1');
      return {
        startDate: isFirstHalf ? fullProgramStart : halfwayDate,
        endDate: isFirstHalf ? halfwayDate : fullProgramEnd
      };
    }
    
    return { startDate: fullProgramStart, endDate: fullProgramEnd };
  };

  const dates = calculateDates(formData.duration, formData.modules || []);

  // Prepare data for the booking confirmation email
  const bookingEmailData = {
    firstName: formData.firstName,
    duration: formData.duration,
    startDate: dates.startDate,
    endDate: dates.endDate,
    modules: formData.moduleTitles || [],
    price: price, // e.g., 4200 for 30 days, 2800 for 15 days
    paymentLink: paymentLink, // The actual Stripe payment link
    whatsappLink: 'https://wa.me/message/OHPC4XVQP537F1',
    termsLink: 'https://timelifeclub.com/agb'
  };

  // Generate the HTML and plain text versions
  const htmlEmail = generateBookingConfirmationEmail(bookingEmailData);
  const textEmail = generateBookingConfirmationPlainText(bookingEmailData);

  // Use these in your email service
  const mailOptions = {
    from: '"Time Life Club" <info@timelifeclub.com>',
    to: formData.email,
    subject: '🎉 Deine verbindliche Buchung für den Time Life Club ist bestätigt!',
    html: htmlEmail,
    text: textEmail,
  };

  // Send with your mail transporter...
  // await transporter.sendMail(mailOptions);
}

// ============================================
// WORKFLOW SUMMARY
// ============================================
/*
  USER FLOW:
  
  1. User fills out application form
     ↓
  2. SEND: Application Confirmation Email (no payment link yet)
     - Thanks them for applying
     - Shows program details
     - Offers consultation booking with Florian
     - Explains they'll hear back in 2-3 days
     ↓
  3. Admin reviews application (2-3 days)
     ↓
  4. Admin approves & generates payment link
     ↓
  5. SEND: Booking Confirmation Email (with payment link)
     - Confirms the booking
     - Provides payment link
     - Shows all next steps
     - Flight booking instructions
     - WhatsApp group info
     - Preparation workshop details
     ↓
  6. User completes payment
     ↓
  7. Booking is finalized!
*/

