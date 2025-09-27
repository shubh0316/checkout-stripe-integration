import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";
import { Toaster } from "sonner";
import Script from "next/script";
import { LanguageSelector } from "@/components/LanguageSelector";

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
    <html lang="de" className="translated-ltr">
      <body
        className={`${customFont.variable} ${secondFont.variable} ${arial.variable} antialiased`}
        style={{ fontFamily: "var(--font-custom)" }}
      >
        <Script id="dom-protection" strategy="beforeInteractive">
          {`
            // Patch DOM methods to prevent removeChild errors
            (function() {
              if (typeof Node !== 'undefined' && Node.prototype && !window.__domProtectionApplied) {
                const originalRemoveChild = Node.prototype.removeChild;
                const originalInsertBefore = Node.prototype.insertBefore;
                
                Node.prototype.removeChild = function(child) {
                  try {
                    if (child && child.parentNode === this) {
                      return originalRemoveChild.call(this, child);
                    }
                    return child;
                  } catch (error) {
                    console.warn('removeChild prevented crash:', error.message);
                    return child;
                  }
                };
                
                Node.prototype.insertBefore = function(newNode, referenceNode) {
                  try {
                    return originalInsertBefore.call(this, newNode, referenceNode);
                  } catch (error) {
                    console.warn('insertBefore prevented crash:', error.message);
                    try {
                      return this.appendChild(newNode);
                    } catch (e) {
                      return newNode;
                    }
                  }
                };
                
                window.__domProtectionApplied = true;
              }
            })();
          `}
        </Script>
        {/* Simplified Google Translate Implementation */}
        <Script id="google-translate" strategy="afterInteractive">
          {`
            window.googleTranslateElementInit = function() {
              try {
                new google.translate.TranslateElement(
                  {
                    pageLanguage: 'en',
                    includedLanguages: 'de,en,fr,es,it,pt,ru,ja,ko,zh-cn,zh-tw,ar,hi',
                    autoDisplay: false,
                    layout: google.translate.TranslateElement.InlineLayout.SIMPLE
                  },
                  'google_translate_element'
                );
                
                // Set German translation cookie with proper domain
                setCookie('googtrans', '/en/de', 365);
                
                // Apply translation after a short delay
                setTimeout(applyGermanTranslation, 2000);
                
              } catch (error) {
                console.warn('Google Translate initialization failed:', error);
              }
            };

            function applyGermanTranslation() {
              try {
                // Check if already translated
                if (document.body.classList.contains('translated-ltr')) {
                  return;
                }
                
                // Force translation using URL parameter
                const url = new URL(window.location);
                if (!url.searchParams.has('googtrans')) {
                  url.searchParams.set('googtrans', '/en/de');
                  window.history.replaceState({}, '', url);
                  
                  // Reload to apply translation
                  setTimeout(() => {
                    window.location.reload();
                  }, 100);
                }
              } catch (error) {
                console.warn('Translation application failed:', error);
              }
            }

            function setCookie(name, value, days) {
              try {
                const expires = new Date();
                expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
                const domain = window.location.hostname === 'localhost' ? '' : '; domain=' + window.location.hostname;
                document.cookie = name + '=' + value + '; expires=' + expires.toUTCString() + '; path=/' + domain;
              } catch (error) {
                console.warn('Cookie setting failed:', error);
              }
            }

            // Initialize on DOM ready
            document.addEventListener('DOMContentLoaded', function() {
              // Check for existing translation
              const urlParams = new URLSearchParams(window.location.search);
              const googtrans = urlParams.get('googtrans');
              
              if (!googtrans) {
                // Set initial German cookie
                setCookie('googtrans', '/en/de', 365);
              }
            });

            // Add error handling for script loading
            window.addEventListener('error', function(e) {
              if (e.message && e.message.includes('translate')) {
                console.warn('Google Translate script failed to load');
                const fallbackSelector = document.getElementById('language-selector');
                if (fallbackSelector) {
                  fallbackSelector.style.display = 'block';
                }
              }
            });

            // Fallback: If Google Translate fails to load, show language selector
            setTimeout(function() {
              if (typeof google === 'undefined' || !google.translate) {
                console.warn('Google Translate failed to load, showing fallback selector');
                const fallbackSelector = document.getElementById('language-selector');
                if (fallbackSelector) {
                  fallbackSelector.style.display = 'block';
                }
              }
            }, 10000);
          `}
        </Script>
        
        <Script
          src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
          strategy="afterInteractive"
        />

        <div id="google_translate_element" style={{ display: "none" }}></div>
        
        {/* Fallback Language Selector */}
        <LanguageSelector />

        {children}

        <Toaster position="top-center" expand={true} richColors closeButton />
      </body>
    </html>
  );
}
