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
        {/* Safe Google Translate Implementation */}
        <Script id="google-translate" strategy="afterInteractive">
          {`
            function googleTranslateElementInit() {
              new google.translate.TranslateElement(
                {
                  pageLanguage: 'en',
                  includedLanguages: 'de,en',
                  autoDisplay: false,
                  layout: google.translate.TranslateElement.InlineLayout.SIMPLE
                },
                'google_translate_element'
              );

              // Set German cookie immediately
              setCookie('googtrans', '/en/de', 365);
              
              // Force German translation
              setTimeout(forceGermanTranslation, 1500);
            }

            function forceGermanTranslation() {
              try {
                const iframe = document.querySelector('iframe.goog-te-menu-frame');
                if (iframe?.contentDocument) {
                  const germanOption = [...iframe.contentDocument.querySelectorAll("span")]
                    .find(el => el.innerText?.includes("Deutsch"));
                  if (germanOption) {
                    germanOption.click();
                  }
                }
              } catch (e) {
                // Fallback: Reload with German cookie
                if (!window.location.hash.includes('googtrans')) {
                  window.location.hash = '#googtrans(en|de)';
                  setTimeout(() => window.location.reload(), 500);
                }
              }
            }

            function setCookie(name, value, days) {
              const expires = new Date();
              expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
              document.cookie = name + '=' + value + '; expires=' + expires.toUTCString() + '; path=/';
            }

            // Minimal protection - only when absolutely necessary
            function protectCriticalElements() {
              // Only protect elements that are actively causing errors
              document.querySelectorAll('[data-radix-select-content]').forEach(element => {
                if (!element.hasAttribute('data-protected')) {
                  element.style.isolation = 'isolate';
                  element.style.transform = 'translateZ(0)';
                  element.setAttribute('data-protected', 'true');
                }
              });
            }

            // Smart observer - only protect when dropdowns are opening
            const observer = new MutationObserver(function(mutations) {
              mutations.forEach(function(mutation) {
                if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                  mutation.addedNodes.forEach(function(node) {
                    if (node.nodeType === 1 && node.hasAttribute && 
                        node.hasAttribute('data-radix-select-content')) {
                      setTimeout(protectCriticalElements, 0);
                    }
                  });
                }
              });
            });

            // Initialize everything
            document.addEventListener('DOMContentLoaded', function() {
              observer.observe(document.body, {
                childList: true,
                subtree: true
              });
            });

            // Check for existing German cookie
            window.addEventListener('load', function() {
              const cookie = document.cookie.split(';').find(c => c.trim().startsWith('googtrans='));
              if (!cookie || !cookie.includes('/en/de')) {
                setCookie('googtrans', '/en/de', 365);
              }
            });
          `}
        </Script>
        
        <Script
          src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
          strategy="afterInteractive"
        />

        <div id="google_translate_element" style={{ display: "none" }}></div>

        {children}

        <Toaster position="top-center" expand={true} richColors closeButton />
      </body>
    </html>
  );
}
