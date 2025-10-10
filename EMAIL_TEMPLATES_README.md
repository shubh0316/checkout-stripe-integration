# Email Templates Documentation

## Overview
This project now has **TWO** professional email templates for different stages of the user journey:

1. **Application Confirmation Email** - Sent immediately after form submission
2. **Booking Confirmation Email** - Sent after approval with payment link

---

## 1. Application Confirmation Email 📝

### When to Use
- Sent **immediately** after user submits the application form
- **No payment link** included yet
- Purpose: Acknowledge application and set expectations

### Features
- 🚀 Exciting "Your adventure starts now!" theme
- Travel dates and duration
- Full list of selected modules
- **Call-to-action**: Book 30-minute consultation with Florian
- WhatsApp contact button
- Clear next steps: "Review within 2-3 business days"
- Motivational closing message

### Dynamic Fields
```typescript
{
  firstName: string;          // User's first name
  duration: number;            // 15 or 30 days
  startDate: string;           // "July 29, 2026"
  endDate: string;             // "August 28, 2026"
  modules: string[];           // Array of module titles
  consultationBookingLink: string;  // Optional
  whatsappLink: string;        // Optional
}
```

### Subject Line
```
Your next adventure starts now! Time Life Club 🚀
```

---

## 2. Booking Confirmation Email 🎉

### When to Use
- Sent **2-3 days after** application review
- **Includes payment link** (Stripe)
- Purpose: Confirm booking and guide user through payment & preparation

### Features
- 🎉 Celebratory "Booking confirmed!" theme
- Complete program details in German
- **Payment link** with 15-day deadline warning
- 4-step guide:
  1. Payment instructions
  2. Flight booking guidance
  3. WhatsApp group invitation (4-6 weeks before)
  4. Online preparation workshop info
- Terms & Conditions link

### Dynamic Fields
```typescript
{
  firstName: string;          // User's first name
  duration: number;            // 15 or 30 days
  startDate: string;           // "29. Juli 2026" (German format)
  endDate: string;             // "28. August 2026"
  modules: string[];           // Array of module titles
  price: number;               // 4200 or 2800
  paymentLink: string;         // Stripe payment URL
  whatsappLink: string;        // Optional
  termsLink: string;           // Optional
}
```

### Subject Line
```
🎉 Deine verbindliche Buchung für den Time Life Club ist bestätigt!
```

---

## User Journey Flow

```
┌─────────────────────────────────────────────┐
│ 1. User Fills Application Form             │
└────────────────┬────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────┐
│ 2. SEND: Application Confirmation Email    │
│    - No payment link                        │
│    - Consultation booking offer             │
│    - "We'll review in 2-3 days"            │
└────────────────┬────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────┐
│ 3. Admin Reviews (2-3 business days)        │
└────────────────┬────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────┐
│ 4. Admin Generates Payment Link            │
└────────────────┬────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────┐
│ 5. SEND: Booking Confirmation Email        │
│    - WITH payment link                      │
│    - Complete next steps guide              │
│    - 15-day payment deadline                │
└────────────────┬────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────┐
│ 6. User Completes Payment                   │
└────────────────┬────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────┐
│ 7. Booking Finalized! ✅                     │
└─────────────────────────────────────────────┘
```

---

## File Locations

### Templates
- **Main File**: `/src/lib/emailTemplates.ts`
  - `generateApplicationConfirmationEmail(data)` - HTML version
  - `generateApplicationConfirmationPlainText(data)` - Plain text version
  - `generateBookingConfirmationEmail(data)` - HTML version
  - `generateBookingConfirmationPlainText(data)` - Plain text version

### Usage Examples
- **Example File**: `/src/lib/emailTemplates.usage.example.ts`
  - Shows how to use both templates
  - Includes date calculation helpers
  - Complete nodemailer integration examples

### Current Integration
- **API Route**: `/src/app/api/send-email/route.ts`
  - Currently configured for **Booking Confirmation Email**
  - Can be updated to use Application Confirmation Email

---

## How to Use

### For Application Confirmation (First Email)

```typescript
import { 
  generateApplicationConfirmationEmail,
  generateApplicationConfirmationPlainText 
} from '@/lib/emailTemplates';

// Prepare data
const emailData = {
  firstName: 'John',
  duration: 30,
  startDate: 'July 29, 2026',
  endDate: 'August 28, 2026',
  modules: [
    'Sport and Nutrition',
    'Mental Strength',
    'Teamwork',
    // ... etc
  ],
  consultationBookingLink: 'https://timelifeclub.com/book-consultation',
  whatsappLink: 'https://wa.me/message/OHPC4XVQP537F1'
};

// Generate emails
const htmlEmail = generateApplicationConfirmationEmail(emailData);
const textEmail = generateApplicationConfirmationPlainText(emailData);

// Send via nodemailer
await transporter.sendMail({
  from: '"Time Life Club" <info@timelifeclub.com>',
  to: userEmail,
  subject: 'Your next adventure starts now! Time Life Club 🚀',
  html: htmlEmail,
  text: textEmail
});
```

### For Booking Confirmation (Second Email - With Payment)

```typescript
import { 
  generateBookingConfirmationEmail,
  generateBookingConfirmationPlainText 
} from '@/lib/emailTemplates';

// This is already integrated in /src/app/api/send-email/route.ts
// See that file for the complete implementation
```

---

## Design Features

### Both Templates Include:
- ✅ Mobile-responsive design
- ✅ Professional styling with brand colors (red theme)
- ✅ Clear call-to-action buttons
- ✅ Emoji usage for visual appeal
- ✅ Proper email client compatibility
- ✅ Both HTML and plain text versions
- ✅ Structured sections with dividers
- ✅ Highlighted important information

### Styling
- Primary Color: `#dc2626` (Red)
- Secondary Colors: Orange accents, green for success messages
- Typography: System fonts for best compatibility
- Responsive breakpoints at 600px

---

## Configuration

### Update Links
Edit these default values in `/src/lib/emailTemplates.ts`:

```typescript
// Application Confirmation defaults
consultationBookingLink = "https://timelifeclub.com/book-consultation"
whatsappLink = "https://wa.me/message/OHPC4XVQP537F1"

// Booking Confirmation defaults
whatsappLink = "https://wa.me/message/OHPC4XVQP537F1"
termsLink = "https://timelifeclub.com/agb"
```

### Update Dates
For different program years, update the date calculation logic in your API routes or use the helpers in the usage example file.

---

## Testing

Before deploying, test both templates:

1. **Visual Testing**: Send test emails to different email clients
   - Gmail
   - Outlook
   - Apple Mail
   - Mobile devices

2. **Dynamic Content**: Verify all dynamic fields populate correctly
   - Different names
   - Different durations (15 vs 30 days)
   - Different module combinations

3. **Links**: Ensure all links work
   - Payment links
   - WhatsApp links
   - Consultation booking links
   - Terms & Conditions links

---

## Notes

- Both templates support German and English content
- The Application Confirmation uses English
- The Booking Confirmation uses German (as per requirements)
- All templates are fully typed with TypeScript interfaces
- Plain text versions are provided for email clients that don't support HTML

---

## Support

For questions or modifications, refer to:
- `/src/lib/emailTemplates.ts` - Template definitions
- `/src/lib/emailTemplates.usage.example.ts` - Usage examples
- `/src/app/api/send-email/route.ts` - Current implementation

