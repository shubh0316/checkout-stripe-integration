// app/api/send-email/route.ts
//@ts-nocheck
import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
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

    // Create a Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Format the form data for email - updated to match your FormData structure
    const formatFormData = (data: any) => {
      return `
        <h2>Application Details</h2>
        
        <h3>Program Information</h3>
        <p><strong>Country:</strong> ${data.country || 'Not provided'}</p>
        <p><strong>Duration:</strong> ${data.duration || 'Not provided'} days</p>
        <p><strong>Module:</strong> ${data.module || 'Not provided'}</p>
        
        <h3>Personal Information</h3>
        <p><strong>Salutation:</strong> ${data.salutation || 'Not provided'}</p>
        <p><strong>First Name:</strong> ${data.firstName || 'Not provided'}</p>
        <p><strong>Last Name:</strong> ${data.lastName || 'Not provided'}</p>
        <p><strong>Gender:</strong> ${data.gender || 'Not provided'}</p>
        <p><strong>Birth Date:</strong> ${data.birthDate || 'Not provided'}</p>
        <p><strong>Nationality:</strong> ${data.nationality || 'Not provided'}</p>
        <p><strong>Address:</strong> ${data.address || 'Not provided'}</p>
        <p><strong>Postal Code:</strong> ${data.postalCode || 'Not provided'}</p>
        <p><strong>City:</strong> ${data.city || 'Not provided'}</p>
        <p><strong>Country of Residence:</strong> ${data.countryOfResidence || 'Not provided'}</p>
        <p><strong>Phone:</strong> ${data.phone || 'Not provided'}</p>
        <p><strong>Email:</strong> ${data.email || 'Not provided'}</p>
        
        <h3>Skills & Background</h3>
        <p><strong>Experience:</strong> ${data.experience || 'Not provided'}</p>
        <p><strong>Motivation:</strong> ${data.motivation || 'Not provided'}</p>
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
        <p><strong>Program Fee:</strong> $${data.duration === 15 ? 2800 : 4200}</p>
      `;
    };

    // Email options
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: "info@timelifeclub.com",
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

    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.messageId);

    return NextResponse.json(
      { message: 'Email sent successfully!' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { message: 'Failed to send email', error: error.message },
      { status: 500 }
    );
  }
}