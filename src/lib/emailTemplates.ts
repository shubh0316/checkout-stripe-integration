// Email Templates for Time Life Club

export interface ApplicationConfirmationData {
  firstName: string;
  duration: number;
  startDate: string; // Format: "July 29, 2026"
  endDate: string; // Format: "August 28, 2026"
  modules: string[];
  consultationBookingLink?: string;
  whatsappLink?: string;
}

export interface BookingConfirmationData {
  firstName: string;
  duration: number;
  startDate: string; // Format: "29. Juli 2026"
  endDate: string; // Format: "28. August 2026"
  modules: string[];
  price: number;
  paymentLink: string;
  whatsappLink?: string;
  termsLink?: string;
}

// APPLICATION CONFIRMATION EMAIL (Sent after form submission)
export function generateApplicationConfirmationEmail(data: ApplicationConfirmationData): string {
  const {
    firstName,
    duration,
    startDate,
    endDate,
    modules,
    consultationBookingLink = "https://timelifeclub.com/book-consultation",
    whatsappLink = "https://wa.me/message/OHPC4XVQP537F1"
  } = data;

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your next adventure starts now! - Time Life Club</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background-color: #f9f9f9;
    }
    .email-container {
      background-color: #ffffff;
      border-radius: 12px;
      padding: 40px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
    .header {
      text-align: center;
      margin-bottom: 30px;
    }
    .header h1 {
      color: #dc2626;
      font-size: 26px;
      margin-bottom: 5px;
      line-height: 1.3;
    }
    .greeting {
      font-size: 18px;
      margin-bottom: 20px;
    }
    .intro {
      margin-bottom: 30px;
      font-size: 16px;
    }
    .section {
      margin-bottom: 30px;
      padding: 20px;
      background-color: #fef2f2;
      border-radius: 8px;
      border-left: 4px solid #dc2626;
    }
    .section-title {
      font-size: 18px;
      color: #dc2626;
      font-weight: bold;
      margin-bottom: 15px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .divider {
      border: none;
      border-top: 2px solid #fee2e2;
      margin: 30px 0;
    }
    .info-box {
      background-color: #ffffff;
      border: 1px solid #fee2e2;
      padding: 15px;
      margin-bottom: 15px;
      border-radius: 6px;
    }
    .info-box strong {
      color: #991b1b;
    }
    .modules-list {
      list-style: none;
      padding-left: 0;
      margin: 15px 0;
    }
    .modules-list li {
      padding: 10px 0;
      padding-left: 30px;
      position: relative;
      font-size: 15px;
    }
    .modules-list li:before {
      content: "📚";
      position: absolute;
      left: 0;
    }
    .cta-section {
      background-color: #fff7ed;
      border: 2px solid #fb923c;
      border-radius: 8px;
      padding: 20px;
      margin: 25px 0;
      text-align: center;
    }
    .cta-section h3 {
      color: #ea580c;
      margin-top: 0;
      font-size: 18px;
    }
    .cta-button {
      display: inline-block;
      background-color: #dc2626;
      color: white !important;
      padding: 14px 28px;
      text-decoration: none;
      border-radius: 8px;
      font-weight: bold;
      margin: 15px 0;
      transition: background-color 0.3s;
      font-size: 16px;
    }
    .cta-button:hover {
      background-color: #991b1b;
    }
    .whatsapp-button {
      display: inline-block;
      background-color: #25D366;
      color: white !important;
      padding: 14px 28px;
      text-decoration: none;
      border-radius: 8px;
      font-weight: bold;
      margin: 15px 0;
      font-size: 16px;
    }
    .whatsapp-button:hover {
      background-color: #1fa855;
    }
    .next-steps {
      background-color: #f0fdf4;
      border-left: 4px solid #16a34a;
      padding: 20px;
      border-radius: 8px;
      margin: 25px 0;
    }
    .next-steps h3 {
      color: #166534;
      margin-top: 0;
      font-size: 18px;
    }
    .highlight {
      background-color: #fef3c7;
      padding: 2px 6px;
      border-radius: 3px;
      font-weight: 500;
    }
    .footer {
      margin-top: 40px;
      padding-top: 20px;
      border-top: 2px solid #fee2e2;
      text-align: center;
      font-size: 15px;
    }
    .rocket {
      font-size: 32px;
      margin-bottom: 10px;
    }
    @media only screen and (max-width: 600px) {
      body {
        padding: 10px;
      }
      .email-container {
        padding: 20px;
      }
      .header h1 {
        font-size: 22px;
      }
      .section {
        padding: 15px;
      }
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="header">
      <div class="rocket">🚀</div>
      <h1>Your next adventure starts now!<br>Time Life Club</h1>
    </div>

    <div class="greeting">
      Hello ${firstName},
    </div>

    <div class="intro">
      <p><strong>Great that you applied for the Time Life Club ${duration}-day program!</strong></p>
      <p>You have taken the first step towards an experience that can change your life.</p>
    </div>

    <hr class="divider">

    <div class="section">
      <div class="section-title">📅 Your Travel Dates</div>
      <div class="info-box">
        <p><strong>Program duration:</strong> ${duration} days full of learning, adventure, community and growth</p>
        <p><strong>Start:</strong> ${startDate}</p>
        <p><strong>End:</strong> ${endDate}</p>
        <p><strong>Location:</strong> Marrakech, Morocco</p>
      </div>
      
      <div style="margin-top: 20px;">
        <strong style="color: #991b1b;">Modules:</strong>
        <ul class="modules-list">
          ${modules.map(module => `<li>${module}</li>`).join('')}
        </ul>
      </div>
    </div>

    <hr class="divider">

    <div class="cta-section">
      <h3>🗓️ Clarify your questions personally</h3>
      <p>You can now secure a <strong>30-minute call with Florian</strong>, the founder of the Time Life Club, to discuss your application and any questions directly:</p>
      <a href="${consultationBookingLink}" class="cta-button">📞 Book a 30-minute 1:1 consultation</a>
    </div>

    <hr class="divider">

    <div style="text-align: center; margin: 30px 0;">
      <p style="font-size: 16px; margin-bottom: 15px;">Or contact us directly via WhatsApp – we are here to help you immediately:</p>
      <a href="${whatsappLink}" class="whatsapp-button">💬 Write to us on WhatsApp</a>
    </div>

    <hr class="divider">

    <div class="next-steps">
      <h3>✅ What happens next</h3>
      <p>We will carefully review your application. Within <span class="highlight">2–3 business days</span>, you will receive your personal booking link, which you can use to register.</p>
      <p style="margin-top: 15px;"><em>(No binding registration is possible before this time – we make every effort to ensure a perfect match for the group.)</em></p>
    </div>

    <hr class="divider">

    <div style="text-align: center; padding: 30px 20px; background: linear-gradient(135deg, #fef2f2 0%, #fff7ed 100%); border-radius: 8px; margin: 30px 0;">
      <p style="font-size: 18px; color: #991b1b; font-weight: 500; line-height: 1.6; margin: 0;">
        ✨ <strong>Your adventure doesn't start in Morocco – it starts here and now, with your decision to try something new.</strong>
      </p>
    </div>

    <div class="footer">
      <p><strong>Kind regards<br>
      Your Time Life Club Team</strong></p>
    </div>
  </div>
</body>
</html>
  `.trim();
}

// Plain text version for application confirmation
export function generateApplicationConfirmationPlainText(data: ApplicationConfirmationData): string {
  const {
    firstName,
    duration,
    startDate,
    endDate,
    modules,
    consultationBookingLink = "https://timelifeclub.com/book-consultation",
    whatsappLink = "https://wa.me/message/OHPC4XVQP537F1"
  } = data;

  return `
Your next adventure starts now! Time Life Club 🚀

Hello ${firstName},

Great that you applied for the Time Life Club ${duration}-day program!
You have taken the first step towards an experience that can change your life.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📅 YOUR TRAVEL DATES

Program duration: ${duration} days full of learning, adventure, community and growth

Start: ${startDate}
End: ${endDate}
Location: Marrakech, Morocco

MODULES:
${modules.map((module, index) => `${index + 1}. ${module}`).join('\n')}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🗓️ CLARIFY YOUR QUESTIONS PERSONALLY

You can now secure a 30-minute call with Florian, the founder of the Time Life Club, to discuss your application and any questions directly:

👉 Book a 30-minute 1:1 consultation:
${consultationBookingLink}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Or contact us directly via WhatsApp – we are here to help you immediately:

👉 Write to us on WhatsApp:
${whatsappLink}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ WHAT HAPPENS NEXT

We will carefully review your application. Within 2–3 business days, you will receive your personal booking link, which you can use to register.

(No binding registration is possible before this time – we make every effort to ensure a perfect match for the group.)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✨ Your adventure doesn't start in Morocco – it starts here and now, with your decision to try something new.

Kind regards
Your Time Life Club Team
  `.trim();
}

// BOOKING CONFIRMATION EMAIL (Sent after payment link is generated)
export function generateBookingConfirmationEmail(data: BookingConfirmationData): string {
  const {
    firstName,
    duration,
    startDate,
    endDate,
    modules,
    price,
    paymentLink,
    whatsappLink = "https://wa.me/yourwhatsappnumber",
    termsLink = "https://yourwebsite.com/agbs"
  } = data;

  return `
<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="color-scheme" content="light dark">
  <title>Buchungsbestätigung - Time Life Club</title>
  <style>
    :root {
      color-scheme: light dark;
      supported-color-schemes: light dark;
    }
    
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      color: #1f2937;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background-color: #f3f4f6;
    }
    
    .email-container {
      background-color: #ffffff;
      border-radius: 16px;
      padding: 40px;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    }
    
    .header {
      text-align: center;
      margin-bottom: 32px;
      padding: 24px;
      background: linear-gradient(135deg, #fef2f2 0%, #fff7ed 100%);
      border-radius: 12px;
    }
    
    .header-emoji {
      font-size: 48px;
      margin-bottom: 12px;
      display: block;
    }
    
    .header h1 {
      color: #dc2626;
      font-size: 26px;
      margin: 0;
      line-height: 1.3;
      font-weight: 700;
    }
    
    .greeting {
      font-size: 18px;
      margin-bottom: 20px;
      font-weight: 500;
      color: #374151;
    }
    
    .intro {
      margin-bottom: 32px;
      font-size: 16px;
      color: #4b5563;
    }
    
    .intro p {
      margin: 12px 0;
    }
    
    .section {
      margin-bottom: 32px;
    }
    
    .section-title {
      font-size: 20px;
      color: #dc2626;
      margin-bottom: 16px;
      font-weight: 700;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    
    .info-box {
      background: linear-gradient(135deg, #fef2f2 0%, #ffe4e6 100%);
      border-left: 5px solid #dc2626;
      padding: 20px;
      margin-bottom: 16px;
      border-radius: 8px;
      box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
    }
    
    .info-box p {
      margin: 10px 0;
      color: #374151;
    }
    
    .info-box strong {
      color: #991b1b;
      font-weight: 600;
    }
    
    .modules-list {
      list-style: none;
      padding-left: 0;
      margin: 16px 0;
    }
    
    .modules-list li {
      padding: 12px 16px;
      padding-left: 40px;
      position: relative;
      background-color: #fef2f2;
      margin-bottom: 8px;
      border-radius: 6px;
      color: #374151;
    }
    
    .modules-list li:before {
      content: "📚";
      position: absolute;
      left: 12px;
      font-size: 20px;
    }
    
    .steps-list {
      counter-reset: step-counter;
      list-style: none;
      padding-left: 0;
      margin: 20px 0;
    }
    
    .steps-list li {
      counter-increment: step-counter;
      margin-bottom: 28px;
      padding: 20px;
      padding-left: 60px;
      position: relative;
      background-color: #f9fafb;
      border-radius: 8px;
      border: 1px solid #e5e7eb;
    }
    
    .steps-list li:before {
      content: counter(step-counter);
      position: absolute;
      left: 16px;
      top: 20px;
      background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
      color: white;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      font-size: 16px;
      box-shadow: 0 2px 4px rgba(220, 38, 38, 0.3);
    }
    
    .steps-list h3 {
      margin: 0 0 12px 0;
      font-size: 18px;
      color: #991b1b;
      font-weight: 700;
    }
    
    .steps-list p {
      margin: 8px 0;
      color: #4b5563;
    }
    
    .steps-list ul {
      margin: 12px 0;
      padding-left: 20px;
    }
    
    .steps-list ul li {
      padding: 4px 0;
      margin: 0;
      background: none;
      border: none;
    }
    
    .steps-list ul li:before {
      content: "•";
      position: static;
      background: none;
      color: #dc2626;
      width: auto;
      height: auto;
      box-shadow: none;
      margin-right: 8px;
    }
    
    .cta-button {
      display: inline-block;
      background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
      color: white !important;
      padding: 16px 32px;
      text-decoration: none;
      border-radius: 10px;
      font-weight: 700;
      margin: 16px 0;
      transition: all 0.3s;
      box-shadow: 0 4px 6px -1px rgba(220, 38, 38, 0.3);
      font-size: 16px;
    }
    
    .cta-button:hover {
      background: linear-gradient(135deg, #b91c1c 0%, #991b1b 100%);
      box-shadow: 0 6px 8px -1px rgba(220, 38, 38, 0.4);
      transform: translateY(-1px);
    }
    
    .warning-box {
      background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
      border-left: 5px solid #f59e0b;
      padding: 16px;
      margin: 16px 0;
      border-radius: 8px;
      font-weight: 500;
      color: #78350f;
      box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
    }
    
    .footer {
      margin-top: 40px;
      padding-top: 24px;
      border-top: 2px solid #fee2e2;
      text-align: center;
    }
    
    .footer p {
      color: #6b7280;
    }
    
    .whatsapp-link {
      display: inline-block;
      background: linear-gradient(135deg, #25D366 0%, #1fa855 100%);
      color: white !important;
      padding: 14px 28px;
      text-decoration: none;
      border-radius: 10px;
      font-weight: 700;
      margin: 12px 0;
      box-shadow: 0 4px 6px -1px rgba(37, 211, 102, 0.3);
      transition: all 0.3s;
    }
    
    .whatsapp-link:hover {
      background: linear-gradient(135deg, #1fa855 0%, #128c3f 100%);
      box-shadow: 0 6px 8px -1px rgba(37, 211, 102, 0.4);
      transform: translateY(-1px);
    }
    
    .address {
      font-size: 15px;
      line-height: 1.6;
      color: #4b5563;
    }
    
    /* Dark mode support */
    @media (prefers-color-scheme: dark) {
      body {
        background-color: #111827;
        color: #e5e7eb;
      }
      
      .email-container {
        background-color: #1f2937;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2);
      }
      
      .header {
        background: linear-gradient(135deg, #450a0a 0%, #451a03 100%);
      }
      
      .header h1 {
        color: #fca5a5;
      }
      
      .greeting {
        color: #d1d5db;
      }
      
      .intro {
        color: #d1d5db;
      }
      
      .section-title {
        color: #fca5a5;
      }
      
      .info-box {
        background: linear-gradient(135deg, #450a0a 0%, #7f1d1d 100%);
        border-left-color: #fca5a5;
      }
      
      .info-box p {
        color: #e5e7eb;
      }
      
      .info-box strong {
        color: #fecaca;
      }
      
      .modules-list li {
        background-color: #450a0a;
        color: #e5e7eb;
      }
      
      .steps-list li {
        background-color: #374151;
        border-color: #4b5563;
      }
      
      .steps-list h3 {
        color: #fca5a5;
      }
      
      .steps-list p {
        color: #d1d5db;
      }
      
      .steps-list ul li {
        color: #d1d5db;
      }
      
      .warning-box {
        background: linear-gradient(135deg, #451a03 0%, #78350f 100%);
        border-left-color: #fbbf24;
        color: #fef3c7;
      }
      
      .address {
        color: #d1d5db;
      }
      
      .footer {
        border-top-color: #450a0a;
      }
      
      .footer p {
        color: #9ca3af;
      }
    }
    
    @media only screen and (max-width: 600px) {
      body {
        padding: 10px;
      }
      
      .email-container {
        padding: 24px;
      }
      
      .header {
        padding: 16px;
      }
      
      .header h1 {
        font-size: 20px;
      }
      
      .header-emoji {
        font-size: 36px;
      }
      
      .section-title {
        font-size: 18px;
      }
      
      .steps-list li {
        padding: 16px;
        padding-left: 52px;
      }
      
      .steps-list h3 {
        font-size: 16px;
      }
      
      .cta-button {
        padding: 14px 24px;
        font-size: 15px;
      }
      
      .whatsapp-link {
        padding: 12px 20px;
      }
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="header">
      <span class="header-emoji">🎉</span>
      <h1>Deine verbindliche Buchung für den Time Life Club ist bestätigt!</h1>
    </div>

    <div class="greeting">
      Hallo ${firstName},
    </div>

    <div class="intro">
      <p><strong>herzlichen Glückwunsch 🎉</strong> – deine verbindliche Buchung für die Time Life Club Reise ist erfolgreich bei uns eingegangen!</p>
      
      <p>Wir freuen uns riesig, dich schon ganz bald in Marokko begrüßen zu dürfen.<br>
      Dich erwartet eine außergewöhnliche Zeit voller Wachstum, Erkenntnisse und unvergesslicher Erlebnisse. Du wirst dich weiterentwickeln, großartige Menschen kennenlernen und wertvolles Wissen mit nach Hause nehmen. 🌍✨</p>
    </div>

    <div class="section">
      <div class="section-title">🗓 Deine Reisedaten</div>
      <div class="info-box">
        <p><strong>Programmdauer:</strong> ${duration} Tage voller Lernen, Abenteuer, Gemeinschaft und persönlichem Wachstum</p>
        <p><strong>Start:</strong> ${startDate}</p>
        <p><strong>Ende:</strong> ${endDate}</p>
        <p class="address"><strong>Adresse in Marokko:</strong><br>
        H2FV+J98, Km3 Route de l'Ourika 40000<br>
        Marrakech, Marokko</p>
      </div>
    </div>

    <div class="section">
      <div class="section-title">📚 Deine Module</div>
      <ul class="modules-list">
        ${modules.map(module => `<li>${module}</li>`).join('')}
      </ul>
    </div>

    <div class="section">
      <div class="section-title">✅ Deine nächsten Schritte</div>
      <ol class="steps-list">
        <li>
          <h3>Zahlung</h3>
          <p>Hier ist dein persönlicher Zahlungslink:</p>
          <p><strong>👉 Programmgebühr: €${price.toLocaleString('de-DE')}</strong></p>
          <a href="${paymentLink}" class="cta-button">Jetzt bezahlen</a>
          <div class="warning-box">
            ⚠️ Bitte beachte: Der gesamte Betrag muss innerhalb von 15 Tagen ab heute beglichen werden.
          </div>
        </li>

        <li>
          <h3>Flugbuchung ✈️</h3>
          <p>Den Flug nach Marrakesch buchst du selbst.<br>
          Wir empfehlen dir, spätestens am Anreisetag oder idealerweise einen Tag früher zu landen.</p>
          <p><strong>Bitte teile uns deine Flugdaten rechtzeitig per E-Mail oder WhatsApp mit</strong> – wir organisieren dann deinen Transfer und holen dich direkt am Flughafen ab.</p>
        </li>

        <li>
          <h3>WhatsApp-Gruppe 💬</h3>
          <p>Etwa 4–6 Wochen vor Reisebeginn laden wir dich in unsere Time Life Club WhatsApp-Gruppe ein.</p>
          <p>Dort lernst du die anderen Teilnehmer:innen kennen und erhältst alle wichtigen Updates gesammelt an einem Ort.</p>
        </li>

        <li>
          <h3>Vorbereitungs-Workshop (Online) 💻</h3>
          <p>Drei Wochen vor Abreise findet unser Online-Vorbereitungs-Workshop statt.</p>
          <p>Dort erfährst du alles über:</p>
          <ul>
            <li>Den Ablauf</li>
            <li>Die Packliste</li>
            <li>Zimmeraufteilung</li>
            <li>Transferorganisation</li>
            <li>Beste Vorbereitung auf die Reise</li>
          </ul>
          <p>Natürlich kannst du dort auch direkt alle Fragen stellen.</p>
          <p><em>Den Zoom-Link erhältst du rechtzeitig vorab per E-Mail.</em></p>
        </li>
      </ol>
    </div>

    <div class="section">
      <p>Falls du vorher Fragen hast, melde dich jederzeit per E-Mail oder WhatsApp bei uns.<br>
      Wir freuen uns schon jetzt auf eine unvergessliche Zeit mit dir in Marokko! 🌴✨</p>
      
      <div style="text-align: center; margin: 20px 0;">
        <a href="${whatsappLink}" class="whatsapp-link">💬 Hier direkt per WhatsApp schreiben</a>
      </div>
    </div>

    <div class="footer">
      <p><strong>Liebe Grüße<br>
      Dein Time Life Club Team</strong></p>
      
      <p style="margin-top: 20px; font-size: 12px; color: #666;">
        Es gelten unsere <a href="${termsLink}" style="color: #dc2626;">AGBs</a>
      </p>
    </div>
  </div>
</body>
</html>
  `.trim();
}

// Plain text version for email clients that don't support HTML
export function generateBookingConfirmationPlainText(data: BookingConfirmationData): string {
  const {
    firstName,
    duration,
    startDate,
    endDate,
    modules,
    price,
    paymentLink,
    whatsappLink = "https://wa.me/yourwhatsappnumber",
    termsLink = "https://yourwebsite.com/agbs"
  } = data;

  return `
🎉 Deine verbindliche Buchung für den Time Life Club ist bestätigt!

Hallo ${firstName},

herzlichen Glückwunsch 🎉 – deine verbindliche Buchung für die Time Life Club Reise ist erfolgreich bei uns eingegangen!

Wir freuen uns riesig, dich schon ganz bald in Marokko begrüßen zu dürfen.
Dich erwartet eine außergewöhnliche Zeit voller Wachstum, Erkenntnisse und unvergesslicher Erlebnisse. Du wirst dich weiterentwickeln, großartige Menschen kennenlernen und wertvolles Wissen mit nach Hause nehmen. 🌍✨

🗓 DEINE REISEDATEN
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Programmdauer: ${duration} Tage voller Lernen, Abenteuer, Gemeinschaft und persönlichem Wachstum
Start: ${startDate}
Ende: ${endDate}
Adresse in Marokko: H2FV+J98, Km3 Route de l'Ourika 40000, Marrakech, Marokko

📚 DEINE MODULE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${modules.map((module, index) => `${index + 1}. ${module}`).join('\n')}

✅ DEINE NÄCHSTEN SCHRITTE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. ZAHLUNG
   Hier ist dein persönlicher Zahlungslink:
   
   👉 Programmgebühr: €${price.toLocaleString('de-DE')}
   
   Jetzt bezahlen: ${paymentLink}
   
   ⚠️ Bitte beachte: Der gesamte Betrag muss innerhalb von 15 Tagen ab heute beglichen werden.

2. FLUGBUCHUNG ✈️
   Den Flug nach Marrakesch buchst du selbst.
   Wir empfehlen dir, spätestens am Anreisetag oder idealerweise einen Tag früher zu landen.
   
   Bitte teile uns deine Flugdaten rechtzeitig per E-Mail oder WhatsApp mit – wir organisieren dann deinen Transfer und holen dich direkt am Flughafen ab.

3. WHATSAPP-GRUPPE 💬
   Etwa 4–6 Wochen vor Reisebeginn laden wir dich in unsere Time Life Club WhatsApp-Gruppe ein.
   Dort lernst du die anderen Teilnehmer:innen kennen und erhältst alle wichtigen Updates gesammelt an einem Ort.

4. VORBEREITUNGS-WORKSHOP (ONLINE) 💻
   Drei Wochen vor Abreise findet unser Online-Vorbereitungs-Workshop statt.
   Dort erfährst du alles über den Ablauf, die Packliste, Zimmeraufteilung, Transferorganisation und wie du dich am besten auf die Reise vorbereitest.
   Natürlich kannst du dort auch direkt alle Fragen stellen.
   
   Den Zoom-Link erhältst du rechtzeitig vorab per E-Mail.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Falls du vorher Fragen hast, melde dich jederzeit per E-Mail oder WhatsApp bei uns.
Wir freuen uns schon jetzt auf eine unvergessliche Zeit mit dir in Marokko! 🌴✨

👉 Hier direkt per WhatsApp schreiben: ${whatsappLink}

Liebe Grüße
Dein Time Life Club Team

Es gelten unsere AGBs: ${termsLink}
  `.trim();
}

