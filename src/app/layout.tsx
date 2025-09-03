import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";
import { Toaster } from "sonner";

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
      path: "../../public/fonts/FacultyGlyphic-Regular.ttf", // Replace with your actual font filename
      weight: "400", // Adjust weight as needed
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
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${customFont.variable} ${secondFont.variable} ${arial.variable} antialiased`}
        style={{ fontFamily: "var(--font-custom)" }}
      >
        {children}
        <Toaster
          position="top-center"
          expand={true}
          richColors
          closeButton
        />
      </body>
    </html>
  );
}