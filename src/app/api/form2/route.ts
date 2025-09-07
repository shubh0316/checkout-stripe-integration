// app/api/timelife-application/route.js
//@ts-nocheck
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request) {
  console.log('API endpoint hit at:', new Date().toISOString());

  try {
    const { formData, email } = await request.json();
    
    console.log('Received email request from:', email);
    console.log('Form data received:', JSON.stringify(formData, null, 2));

    // Validate environment variables
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error('Missing email credentials in environment variables');
      return NextResponse.json(
        { message: 'Email service not configured properly' },
        { status: 500 }
      );
    }

    const {
      expectations,
      currentSituation,
      motivation,
      themeFocus,
      communityTeam,
      schoolStudyTime,
      openness
    } = formData;

    // Create a Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.RECIPIENT_EMAIL || 'shubhankersaxena5@gmail.com',
      replyTo: email,
      subject: 'New Timelife Club Application',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { 
              font-family: Arial, sans-serif; 
              line-height: 1.6; 
              color: #333; 
              max-width: 600px; 
              margin: 0 auto; 
            }
            h1 { 
              color: #dc2626; 
              text-align: center; 
              border-bottom: 2px solid #dc2626; 
              padding-bottom: 10px;
            }
            h2 { 
              color: #dc2626; 
              border-bottom: 1px solid #dc2626; 
              padding-bottom: 5px; 
              margin-top: 20px;
            }
            .applicant-info {
              background-color: #fef2f2;
              padding: 15px;
              border-radius: 5px;
              margin-bottom: 20px;
            }
            .answer {
              background-color: #fef2f2;
              padding: 15px;
              border-radius: 5px;
              margin-bottom: 15px;
            }
            .footer {
              margin-top: 30px;
              padding-top: 15px;
              border-top: 1px solid #ddd;
              text-align: center;
              color: #666;
              font-size: 12px;
            }
          </style>
        </head>
        <body>
          <h1>New Timelife Club Application</h1>
          
          <div class="applicant-info">
            <p><strong>Applicant Email:</strong> ${email || 'Not provided'}</p>
            <p><strong>Submission Date:</strong> ${new Date().toLocaleDateString()}</p>
          </div>
          
          <h2>1. Erwartungen</h2>
          <div class="answer">${expectations || 'Not provided'}</div>
          
          <h2>2. Aktuelle Situation</h2>
          <div class="answer">${currentSituation || 'Not provided'}</div>
          
          <h2>3. Motivation</h2>
          <div class="answer">${motivation || 'Not provided'}</div>
          
          <h2>4. Themenschwerpunkt</h2>
          <div class="answer">${themeFocus || 'Not provided'}</div>
          
          <h2>5. Community & Team</h2>
          <div class="answer">${communityTeam || 'Not provided'}</div>
          
          <h2>6. Deine Schul- & Studienzeit</h2>
          <div class="answer">${schoolStudyTime || 'Not provided'}</div>
          
          <h2>7. Offenheit</h2>
          <div class="answer">${openness || 'Not provided'}</div>
          
          <div class="footer">
            <p>This application was submitted through the Timelife Club website.</p>
          </div>
        </body>
        </html>
      `,
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.messageId);

    return NextResponse.json(
      { message: 'Application sent successfully!' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { message: 'Failed to send application', error: error.message },
      { status: 500 }
    );
  }
}