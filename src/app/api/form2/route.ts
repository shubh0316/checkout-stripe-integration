// app/api/timelife-application/route.js
//@ts-nocheck
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { generatePaymentLink, getProgramPrice, formatPrice } from '../../../lib/payment';

export async function POST(request) {
  console.log('API endpoint hit at:', new Date().toISOString());

  try {
    const { formData, email } = await request.json();
    
    console.log('Received email request from:', email);

    // Generate payment link
    let paymentLink = '';
    try {
      paymentLink = await generatePaymentLink({
        email: formData.email || email,
        duration: formData.duration,
        firstName: formData.firstName,
        lastName: formData.lastName,
        modules: formData.modules,
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

    // Admin notification email
    const adminMailOptions = {
      from: `"Timelife Club" <${transporterToUse === transporter ? process.env.IONOS_EMAIL_USER : process.env.EMAIL_USER}>`,
      to: "info@timelifeclub.com",
      replyTo: formData.email || email,
      subject: `New Timelife Club Application - ${formData.firstName} ${formData.lastName}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 800px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #dc2626, #b91c1c); color: white; padding: 20px; border-radius: 10px; text-align: center; margin-bottom: 30px; }
            .section { background: #fef2f2; border: 2px solid #dc2626; border-radius: 10px; padding: 20px; margin-bottom: 25px; }
            .section h2 { color: #dc2626; border-bottom: 2px solid #dc2626; padding-bottom: 10px; margin-top: 0; }
            .info-item { background: white; padding: 10px; margin-bottom: 10px; border-radius: 5px; border-left: 4px solid #dc2626; }
            .footer { margin-top: 30px; padding: 20px; background: #f9fafb; border-radius: 5px; text-align: center; color: #666; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>🏆 New Timelife Club Application</h1>
            <p>Eingereicht am: ${new Date().toLocaleDateString('de-DE')} um ${new Date().toLocaleTimeString('de-DE')}</p>
          </div>

          <div class="section">
            <h2>👤 Personal Information</h2>
            <div class="info-item"><strong>Name:</strong> ${formData.firstName || ''} ${formData.lastName || ''}</div>
            <div class="info-item"><strong>Gender:</strong> ${formData.gender || 'Not provided'}</div>
            <div class="info-item"><strong>Birth Date:</strong> ${formData.birthDate || 'Not provided'}</div>
            <div class="info-item"><strong>Nationality:</strong> ${formData.nationality || 'Not provided'}</div>
            <div class="info-item"><strong>Email:</strong> ${formData.email || email || 'Not provided'}</div>
            <div class="info-item"><strong>Phone:</strong> ${formData.phone || 'Not provided'}</div>
            <div class="info-item"><strong>Address:</strong> ${formData.address || 'Not provided'}, ${formData.postalCode || ''} ${formData.city || ''}</div>
            <div class="info-item"><strong>Insurance:</strong> ${formData.insurance || 'Not provided'}</div>
          </div>

          <div class="section">
            <h2>📋 Program Selection</h2>
            <div class="info-item"><strong>Duration:</strong> ${formData.duration || 'Not provided'} Days</div>
            <div class="info-item"><strong>Selected Modules:</strong> ${(formData.moduleTitles || []).join(', ') || 'Not provided'}</div>
          </div>

          <div class="section">
            <h2>💭 Application Questions</h2>
            <div class="info-item"><strong>Expectations:</strong><br>${formData.expectations || 'Not provided'}</div>
            <div class="info-item"><strong>Current Situation:</strong><br>${formData.currentSituation || 'Not provided'}</div>
            <div class="info-item"><strong>Theme Focus:</strong><br>${formData.themeFocus || 'Not provided'}</div>
            <div class="info-item"><strong>Community & Team:</strong><br>${formData.communityTeam || 'Not provided'}</div>
            <div class="info-item"><strong>School/Study Time:</strong><br>${formData.schoolStudyTime || 'Not provided'}</div>
            <div class="info-item"><strong>Openness:</strong><br>${formData.openness || 'Not provided'}</div>
          </div>

          <div class="section">
            <h2>💳 Payment Information</h2>
            <div class="info-item"><strong>Program Fee:</strong> ${formatPrice(getProgramPrice(formData.duration))}</div>
            <div class="info-item"><strong>Payment Link:</strong> <a href="${paymentLink}" style="color: #dc2626; text-decoration: none;">View Payment Link</a></div>
            <div class="info-item"><strong>Payment Status:</strong> Pending</div>
          </div>

          <div class="footer">
            <p><strong>Application Summary</strong></p>
            <p>Applicant: ${formData.firstName} ${formData.lastName} (${formData.email || email})</p>
            <p>Program: ${formData.duration} Days - ${formatPrice(getProgramPrice(formData.duration))}</p>
            <p>Submission: ${new Date().toLocaleString('de-DE')}</p>
          </div>
        </body>
        </html>
      `,
    };
// if 15 dates program selected with modules 1-3 then start date will be 29 july 2026 and end date will be 13 august 2026
// if 15 dates program selected with modules 4-6 then start date will be 13 august 2026 and end date will be 28 august 2026
// if 30 dates program selected then start date will be 29 july 2026 and end date will be 28 august 2026
    // Thank you email to applicant
  // Determine start and end dates based on duration
let programStartDate, programEndDate;

if (formData.duration == 15) {
  // Check which modules are selected to determine dates
  if (formData.modules && formData.modules.includes('module1')) {
    // Modules 1-3: 29. Juli - 13. August
    programStartDate = '29 Juli 2026';
    programEndDate = '13 August 2026';
  } else {
    // Modules 4-6: 13. - 28. August
    programStartDate = '13 August 2026';
    programEndDate = '28 August 2026';
  }
} else if (formData.duration == 30) {
  programStartDate = '29 Juli 2026';
  programEndDate = '28 August 2026';
} else {
  programStartDate = 'Not specified';
  programEndDate = 'Not specified';
}

// Thank you email to applicant (in German with dates and Calendly link)
const userMailOptions = {
  from: `"Timelife Club" <${transporterToUse === transporter ? process.env.IONOS_EMAIL_USER : process.env.EMAIL_USER}>`,
  to: formData.email || email,
  subject: `Dein nächstes Abenteuer beginnt jetzt! Time Life Club 🚀`,
  html: `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.8; color: #333; max-width: 650px; margin: 0 auto; padding: 20px; background: #f9fafb; }
        .header { background: linear-gradient(135deg, #dc2626, #b91c1c); color: white; padding: 25px; border-radius: 10px; text-align: center; margin-bottom: 30px; }
        .header h1 { margin: 0; font-size: 28px; }
        .content { background: #fff5f5; border: 2px solid #dc2626; border-radius: 10px; padding: 30px; }
        .highlight { background: white; padding: 20px; border-radius: 8px; border-left: 5px solid #dc2626; margin: 25px 0; }
        .modules-list { background: #fef2f2; padding: 15px; border-radius: 5px; margin: 15px 0; }
        .modules-list ul { margin: 10px 0; padding-left: 20px; }
        .modules-list li { margin: 8px 0; }
        .btn { display: inline-block; margin: 15px 10px; padding: 14px 25px; background-color: #dc2626; color: white; text-decoration: none; border-radius: 8px; font-weight: bold; }
        .divider { border-top: 2px dashed #dc2626; margin: 30px 0; opacity: 0.3; }
        .footer { margin-top: 30px; padding: 20px; background: #f3f4f6; border-radius: 5px; text-align: center; color: #666; font-size: 0.9em; }
        p { margin-bottom: 15px; }
        h3 { margin-top: 0; color: #b91c1c; }
        strong { color: #dc2626; }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>🚀 Dein nächstes Abenteuer beginnt jetzt!</h1>
        <p style="margin: 0; font-size: 18px;">Time Life Club</p>
      </div>
      
      <div class="content">
        <p>Hallo ${formData.firstName},</p>
        
        <p>mega, dass du dich für das <strong>Time Life Club ${formData.duration}-Tage-Programm</strong> beworben hast!<br>
        Du hast damit den ersten Schritt in Richtung einer Erfahrung gemacht, die dein Leben verändern kann.</p>
        
        <div class="divider"></div>

        <div class="highlight">
          <h3>📅 Deine Reisedaten</h3>
          <p><strong>Programmdauer:</strong> ${formData.duration} Tage voller Lernen, Abenteuer, Gemeinschaft und Wachstum</p>
          
          <div class="modules-list">
            <p><strong>Deine ausgewählten Module:</strong></p>
            <ul>
              ${(formData.moduleTitles || []).map(module => `<li>${module}</li>`).join('')}
            </ul>
          </div>
          
          <p><strong>Start:</strong> ${programStartDate}</p>
          <p><strong>Ende:</strong> ${programEndDate}</p>
          <p><strong>Location:</strong> 🌍 Marrakech, Marokko</p>
        </div>

        <div class="divider"></div>

        <div class="highlight">
          <h3>💬 Deine Fragen persönlich klären</h3>
          <p>Du kannst dir schon jetzt einen 30-Minuten-Call mit Florian, dem Gründer des Time Life Club, sichern – um deine Bewerbung und alle Fragen direkt zu besprechen:</p>
          <div style="text-align: center;">
            <a href="https://calendly.com/timelifeclub/beratungscall" class="btn" style="background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%); box-shadow: 0 4px 15px rgba(220, 38, 38, 0.3); color: white !important;">👉 30 Min 1:1 Beratungstermin buchen</a>
          </div>
        </div>

        <div class="divider"></div>

        <div class="highlight">
          <h3>📱 Direkter Kontakt über WhatsApp</h3>
          <p>Oder melde dich direkt über WhatsApp – wir sind da, um dir sofort weiterzuhelfen:</p>
          <div style="text-align: center;">
            <a href="https://wa.me/message/OHPC4XVQP537F1" class="btn" style="background: #25D366; color: white !important;">👉 Schreibe uns auf WhatsApp</a>
          </div>
        </div>

        <div class="divider"></div>

        <div class="highlight">
          <h3>🔄 Wie es jetzt weitergeht</h3>
          <p>Wir prüfen deine Bewerbung sorgfältig. In <strong>2–3 Werktagen</strong> erhältst du deinen persönlichen Buchungslink, über den du dich verbindlich anmelden kannst.</p>
          <p style="font-style: italic; color: #6b7280;">(Davor ist keine verbindliche Anmeldung möglich – wir achten bewusst darauf, dass die Gruppe perfekt zusammenpasst.)</p>
        </div>

        <div class="divider"></div>

        <p style="font-size: 18px; text-align: center; margin: 30px 0;">
          ✨ <strong>Dein Abenteuer startet nicht in Marokko – es startet hier und jetzt, mit deiner Entscheidung, etwas Neues zu wagen.</strong>
        </p>
        
        <p style="margin-top: 30px;">Herzliche Grüße,<br>
        <strong>Dein Time Life Club Team</strong></p>
      </div>
      
      <div class="footer">
        <p>Dies ist eine automatisch generierte Bestätigungs-E-Mail.</p>
        <p>Bei Fragen kontaktieren Sie uns unter <a href="mailto:info@timelifeclub.com" style="color: #dc2626;">info@timelifeclub.com</a></p>
      </div>
    </body>
    </html>
  `,
};


    // Send both emails
    const adminInfo = await transporterToUse.sendMail(adminMailOptions);
    console.log('Admin notification email sent successfully:', adminInfo.messageId);
    
    const userInfo = await transporterToUse.sendMail(userMailOptions);
    console.log('User thank you email sent successfully:', userInfo.messageId);

    return NextResponse.json(
      { 
        message: 'Application sent successfully! Confirmation email sent to applicant.', 
        messageId: adminInfo.messageId 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { 
        message: 'Failed to send application', 
        error: error.message 
      },
      { status: 500 }
    );
  }
}
