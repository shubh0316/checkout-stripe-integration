import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";
import { Toaster } from "sonner";
import Script from "next/script";

// Local Custom Font
const customFont = localFont({
  src: [
    {
      path: "../../public/fonts/pintassilgoprints-salted.ttf",
      weight: "600",
      style: "normal",
    },
  ],
  variable: "--font-custom",
  display: "swap",
});

// Second custom font from public folder
const secondFont = localFont({
  src: [
    {
      path: "../../public/fonts/FacultyGlyphic-Regular.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-second",
  display: "swap",
});

// Arial font family variable
const arial = {
  variable: "--font-arial",
};

export const metadata: Metadata = {
  title: "My Next.js App",
  description: "Using custom TTF fonts and Arial",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${customFont.variable} ${secondFont.variable} ${arial.variable} antialiased`}
        style={{ fontFamily: "var(--font-custom)" }}
      >
        {/* Google Translate Script */}
        <Script id="google-translate" strategy="afterInteractive">
          {`
            function googleTranslateElementInit() {
              new google.translate.TranslateElement(
                {
                  pageLanguage: 'en',
                  includedLanguages: 'de,en',
                  autoDisplay: false
                },
                'google_translate_element'
              );

              // Auto switch to German
              const interval = setInterval(() => {
                const frame = document.querySelector('iframe.goog-te-menu-frame');
                if (frame) {
                  const innerDoc = frame.contentDocument || frame.contentWindow.document;
                  if (innerDoc) {
                    const germanOption = [...innerDoc.querySelectorAll("span")]
                      .find(el => el.innerText.includes("Deutsch"));
                    if (germanOption) {
                      germanOption.click();
                      clearInterval(interval);
                    }
                  }
                }
              }, 500);
            }
          `}
        </Script>
        <Script
          src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
          strategy="afterInteractive"
        />

        {/* Hidden Google Translate widget (dropdown rahega fallback ke liye) */}
        <div id="google_translate_element" style={{ display: "none" }}></div>

        {children}

        <Toaster position="top-center" expand={true} richColors closeButton />
      </body>
    </html>
  );
}
