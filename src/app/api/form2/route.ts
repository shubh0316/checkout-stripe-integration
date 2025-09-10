// app/api/timelife-application/route.js
//@ts-nocheck
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request) {
  console.log('API endpoint hit at:', new Date().toISOString());

  try {
    const { formData, email } = await request.json();
    
    console.log('Received email request from:', email);

    // Validate environment variables
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error('Missing email credentials in environment variables');
      return NextResponse.json(
        { message: 'Email service not configured properly' },
        { status: 500 }
      );
    }

    // ✅ CORRECT: createTransport (not createTransporter)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    // Verify connection
    await transporter.verify();
    console.log('SMTP connection verified successfully');

    // Email options
    const mailOptions = {
      from: `"Timelife Club" <${process.env.EMAIL_USER}>`,
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
            <div class="info-item"><strong>Name:</strong> ${formData.salutation || ''} ${formData.firstName || ''} ${formData.lastName || ''}</div>
            <div class="info-item"><strong>Gender:</strong> ${formData.gender || 'Not provided'}</div>
            <div class="info-item"><strong>Birth Date:</strong> ${formData.birthDate || 'Not provided'}</div>
            <div class="info-item"><strong>Nationality:</strong> ${formData.nationality || 'Not provided'}</div>
            <div class="info-item"><strong>Email:</strong> ${formData.email || email || 'Not provided'}</div>
            <div class="info-item"><strong>Phone:</strong> ${formData.phone || 'Not provided'}</div>
            <div class="info-item"><strong>Address:</strong> ${formData.address || 'Not provided'}, ${formData.postalCode || ''} ${formData.city || ''}, ${formData.countryOfResidence || ''}</div>
            <div class="info-item"><strong>Insurance:</strong> ${formData.insurance || 'Not provided'}</div>
          </div>

          <div class="section">
            <h2>📋 Program Selection</h2>
            <div class="info-item"><strong>Country:</strong> ${formData.country || 'Not provided'}</div>
            <div class="info-item"><strong>Duration:</strong> ${formData.duration || 'Not provided'} Days</div>
            <div class="info-item"><strong>Selected Modules:</strong> ${(formData.modules || []).join(', ') || 'Not provided'}</div>
          </div>

          <div class="section">
            <h2>💭 Application Questions</h2>
            <div class="info-item"><strong>Expectations:</strong><br>${formData.expectations || 'Not provided'}</div>
            <div class="info-item"><strong>Current Situation:</strong><br>${formData.currentSituation || 'Not provided'}</div>
            <div class="info-item"><strong>Motivation:</strong><br>${formData.motivation || 'Not provided'}</div>
            <div class="info-item"><strong>Theme Focus:</strong><br>${formData.themeFocus || 'Not provided'}</div>
            <div class="info-item"><strong>Community & Team:</strong><br>${formData.communityTeam || 'Not provided'}</div>
            <div class="info-item"><strong>School/Study Time:</strong><br>${formData.schoolStudyTime || 'Not provided'}</div>
            <div class="info-item"><strong>Openness:</strong><br>${formData.openness || 'Not provided'}</div>
          </div>

          <div class="footer">
            <p><strong>Application Summary</strong></p>
            <p>Applicant: ${formData.firstName} ${formData.lastName} (${formData.email || email})</p>
            <p>Program: ${formData.duration} Days in ${formData.country}</p>
            <p>Submission: ${new Date().toLocaleString('de-DE')}</p>
          </div>
        </body>
        </html>
      `,
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.messageId);

    return NextResponse.json(
      { 
        message: 'Application sent successfully!', 
        messageId: info.messageId 
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
