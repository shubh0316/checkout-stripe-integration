// app/api/send-email/route.ts
import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { generatePaymentLink, getProgramPrice, formatPrice } from '../../../lib/payment';

export async function POST(request: NextRequest) {
  console.log('API endpoint hit at:', new Date().toISOString());
  
  try {
    const { formData, email } = await request.json();
    
    console.log('Received email request from:', email);
    console.log('Form data received:', JSON.stringify(formData, null, 2));

    // Generate payment link
    let paymentLink = '';
    try {
      paymentLink = await generatePaymentLink({
        email: formData.email || email,
        duration: formData.duration,
        firstName: formData.firstName,
        lastName: formData.lastName,
      });
      console.log('Payment link generated successfully');
    } catch (paymentError: any) {
      console.error('Error generating payment link:', paymentError);
      return NextResponse.json(
        { message: 'Failed to generate payment link', error: paymentError.message },
        { status: 500 }
      );
    }

    // Validate environment variables
    if (!process.env.IONOS_EMAIL_USER || !process.env.IONOS_EMAIL_PASS) {
      console.error('Missing IONOS email credentials in environment variables');
      return NextResponse.json(
        { message: 'Email service not configured properly' },
        { status: 500 }
      );
    }

    // ✅ CORRECTED: Updated IONOS SMTP configuration with better error handling
    const transporter = nodemailer.createTransport({
      host: 'smtp.ionos.com', // Correct IONOS SMTP host
      port: 587, // Use port 587 with STARTTLS
      secure: false, // false for port 587, true for port 465
      auth: {
        user: process.env.IONOS_EMAIL_USER?.trim(), // Your full IONOS email address
        pass: process.env.IONOS_EMAIL_PASS?.trim(), // Your IONOS email password
      },
      // ✅ IMPROVED TLS settings for IONOS
      tls: {
        rejectUnauthorized: false, // Only for development/testing
        ciphers: 'SSLv3',
      },
      // ✅ ADDED connection timeout and retry settings
      connectionTimeout: 60000, // 60 seconds
      greetingTimeout: 30000, // 30 seconds
      socketTimeout: 60000, // 60 seconds
      // ✅ ADDED retry settings
      pool: true,
      maxConnections: 1,
      maxMessages: 3,
    });

    // Verify connection with better error handling and fallback
    let transporterToUse: any = transporter;
    try {
      await transporter.verify();
      console.log('IONOS SMTP connection verified successfully');
    } catch (verifyError: any) {
      console.error('IONOS SMTP verification failed:', verifyError);
      
      // ✅ ADDED fallback to Gmail if IONOS fails
      console.log('Attempting fallback to Gmail...');
      
      if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
        return NextResponse.json(
          { 
            message: 'Both IONOS and Gmail email services are not configured properly',
            error: 'Missing email credentials'
          },
          { status: 500 }
        );
      }
      
      // Create Gmail transporter as fallback
      transporterToUse = nodemailer.createTransport({
        service: "gmail", 
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });
      
      try {
        await transporterToUse.verify();
        console.log('Gmail SMTP connection verified successfully (fallback)');
      } catch (gmailError: any) {
        console.error('Gmail SMTP verification also failed:', gmailError);
        return NextResponse.json(
          { 
            message: 'Both email services failed. Please check your email credentials.',
            error: 'IONOS failed: ' + verifyError.message + ' | Gmail failed: ' + gmailError.message
          },
          { status: 500 }
        );
      }
    }

    // Format the form data for email - updated to match your FormData structure
    const formatFormData = (data: any) => {
      return `
        <h2>Application Details</h2>
        
        <h3>Program Information</h3>
        <p><strong>Duration:</strong> ${data.duration || 'Not provided'} days</p>
        <p><strong>Selected Modules:</strong> ${(data.moduleTitles || []).join(', ') || 'Not provided'}</p>
        
        <h3>Personal Information</h3>
        <p><strong>First Name:</strong> ${data.firstName || 'Not provided'}</p>
        <p><strong>Last Name:</strong> ${data.lastName || 'Not provided'}</p>
        <p><strong>Gender:</strong> ${data.gender || 'Not provided'}</p>
        <p><strong>Birth Date:</strong> ${data.birthDate || 'Not provided'}</p>
        <p><strong>Nationality:</strong> ${data.nationality || 'Not provided'}</p>
        <p><strong>Address:</strong> ${data.address || 'Not provided'}</p>
        <p><strong>Postal Code:</strong> ${data.postalCode || 'Not provided'}</p>
        <p><strong>City:</strong> ${data.city || 'Not provided'}</p>
        <p><strong>Phone:</strong> ${data.phone || 'Not provided'}</p>
        <p><strong>Email:</strong> ${data.email || 'Not provided'}</p>
        
        <h3>Background</h3>
        <p><strong>Insurance:</strong> ${data.insurance || 'Not provided'}</p>
        
        <h3>Preferences</h3>
        <p><strong>Accommodation:</strong> ${data.accommodation || 'Not provided'}</p>
        <p><strong>Diet:</strong> ${data.diet || 'Not provided'}</p>
        <p><strong>Allergies:</strong> ${data.allergies || 'Not provided'}</p>
        
        <h4>Emergency Contact</h4>
        <p><strong>Name:</strong> ${data.emergencyContact?.name || 'Not provided'}</p>
        <p><strong>Relation:</strong> ${data.emergencyContact?.relation || 'Not provided'}</p>
        <p><strong>Phone:</strong> ${data.emergencyContact?.phone || 'Not provided'}</p>
        <p><strong>Email:</strong> ${data.emergencyContact?.email || 'Not provided'}</p>
        <p><strong>Terms Accepted:</strong> ${data.termsAccepted ? 'Yes' : 'No'}</p>
        <h3>Payment Information</h3>
        <p><strong>Program Fee:</strong> ${formatPrice(getProgramPrice(data.duration))}</p>
        <p><strong>Payment Link:</strong> <a href="${paymentLink}" style="color: #dc2626; text-decoration: none;">Complete Payment</a></p>
      `;
    };

    // Email to admin (notification)
    const adminMailOptions = {
      from: `"Timelife Club" <${transporterToUse === transporter ? process.env.IONOS_EMAIL_USER : process.env.EMAIL_USER}>`,
      to: "info@timelifeclub.com",
      replyTo: formData.email || email,
      subject: `New Application Submission from ${formData.firstName || 'Unknown'} ${formData.lastName || ''}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            h2 { color: #7f1d1d; border-bottom: 2px solid #7f1d1d; padding-bottom: 5px; }
            h3 { color: #991b1b; margin-top: 20px; }
            h4 { color: #b91c1c; margin-top: 15px; }
            p { margin: 8px 0; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e5e5e5; border-radius: 5px; }
            .header { background-color: #7f1d1d; color: white; padding: 15px; text-align: center; border-radius: 5px 5px 0 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>New Program Application</h1>
            </div>
            ${formatFormData(formData)}
          </div>
        </body>
        </html>
      `,
    };

    // Thank you email to user
  // Thank you email to user (Booking Confirmation Template)
// Buchungsbestätigung an den User (Deutsch)
const userMailOptions = {
  from: `"Time Life Club" <${transporterToUse === transporter ? process.env.IONOS_EMAIL_USER : process.env.EMAIL_USER}>`,
  to: formData.email || email,
  subject: `Deine Buchungsbestätigung – Time Life Club Reise (${formData.duration}-Tage Programm)`,
  html: `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; background: #f9f9f9; }
        .container { max-width: 650px; margin: 20px auto; background: white; padding: 25px; border-radius: 8px; border: 1px solid #e5e5e5; }
        .header { background-color: #7f1d1d; color: white; padding: 15px; text-align: center; border-radius: 8px 8px 0 0; }
        h1 { margin: 0; font-size: 22px; }
        h2 { color: #7f1d1d; margin-top: 25px; }
        h3 { color: #991b1b; margin-top: 20px; }
        p { margin: 8px 0; }
        a.button { display: inline-block; margin-top: 15px; padding: 12px 20px; background: #7f1d1d; color: white; text-decoration: none; border-radius: 5px; }
        a.button:hover { background: #991b1b; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Buchungsbestätigung</h1>
        </div>
        <p>Hallo ${formData.firstName},</p>
        <p>Herzlichen Glückwunsch 🎉 – deine verbindliche Anmeldung für die <strong>Time Life Club Reise</strong> ist erfolgreich bei uns eingegangen!</p>
        <p>Wir freuen uns riesig, dich bald in Marokko begrüßen zu dürfen.</p>

        <h2>Deine Reisedaten</h2>
        <p><strong>Programmdauer:</strong> ${formData.duration} Tage</p>
        <p><strong>Module:</strong> ${(formData.moduleTitles || []).join(', ') || 'Keine Angabe'}</p>
        <p><strong>Reisedaten:</strong> ${
          formData.duration === 30 
            ? 'Vom 29. Juli bis zum 28. August 2026' 
            : formData.modules && formData.modules.includes('module1') 
              ? '29. Juli bis 13. August 2026'
              : '13. bis 28. August 2026'
        }</p>
        <p><strong>Ort:</strong> Marrakesch, Marokko, Domaine Yakourt</p>

        <h2>Deine nächsten Schritte</h2>
        
        <h3>1. Zahlung</h3>
        <p>Hier ist dein persönlicher Zahlungslink:</p>
        <p><strong>Programmgebühr:</strong> ${formatPrice(getProgramPrice(formData.duration))}</p>
        <p><a class="button" href="${paymentLink}">Jetzt bezahlen</a></p>
        <p>👉 Bitte beachte: Der gesamte Betrag muss innerhalb von <strong>15 Tagen</strong> ab heute beglichen sein.</p>
        
        <h3>2. Flugbuchung ✈</h3>
        <p>Den Flug nach Marrakesch buchst du bitte selbst.</p>
        <p>Wir empfehlen dir, spätestens am Anreisetag oder idealerweise einen Tag früher zu landen.</p>
        <p>Bitte teile uns deine Flugdaten rechtzeitig per E-Mail oder WhatsApp mit – wir organisieren dann den Transfer und holen dich direkt am Flughafen ab.</p>
        
        <h3>3. WhatsApp-Gruppe</h3>
        <p>Etwa 4–6 Wochen vor Reisebeginn laden wir dich in unsere exklusive WhatsApp-Gruppe ein.  
        Dort lernst du alle anderen Teilnehmer:innen kennen und erhältst alle Updates gesammelt an einem Ort.</p>
        <p><a class="button" href="https://wa.me/message/OHPC4XVQP537F1">WhatsApp beitreten</a></p>
        
        <h3>4. Vorbereitungs-Workshop (Online)</h3>
        <p>Zwei Wochen vor Abreise findet unser Online-Workshop statt.  
        Dort erfährst du alles zum Ablauf, zur Packliste und zu den Modulen. Außerdem kannst du direkt Fragen stellen.</p>
        <p>👉 Den Zoom-Link erhältst du rechtzeitig per Mail.</p>
        
        <p>Falls du vorab Fragen hast, melde dich jederzeit bei uns per E-Mail oder WhatsApp.</p>
        
        <p>Wir freuen uns schon jetzt auf eine unvergessliche Zeit mit dir! 🌍✨</p>
        
        <p>Liebe Grüße,<br><strong>Dein Time Life Club Team</strong></p>
        
        <p><a href="https://timelifeclub.com/agb">Es gelten unsere AGB</a></p>
      </div>
    </body>
    </html>
  `,
};



    // Send both emails with better error handling
    try {
      const adminInfo = await transporterToUse.sendMail(adminMailOptions);
      console.log('Admin notification email sent successfully:', adminInfo.messageId);
      
      const userInfo = await transporterToUse.sendMail(userMailOptions);
      console.log('User thank you email sent successfully:', userInfo.messageId);

      return NextResponse.json(
        { 
          message: 'Emails sent successfully!', 
          adminMessageId: adminInfo.messageId,
          userMessageId: userInfo.messageId
        },
        { status: 200 }
      );
    } catch (sendError: any) {
      console.error('Error sending emails:', sendError);
      return NextResponse.json(
        { message: 'Failed to send emails', error: sendError.message },
        { status: 500 }
      );
    }

  } catch (error: any) {
    console.error('General error in email route:', error);
    return NextResponse.json(
      { message: 'Internal server error', error: error.message },
      { status: 500 }
    );
  }
}