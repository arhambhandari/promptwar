import type { Metadata } from "next";
import "./globals.css";
import Navbar from "../components/Navbar";
import { LanguageProvider } from "../context/LanguageContext";

export const metadata: Metadata = {
  title: "India Census 2027",
  description: "Digital portal for India's first fully digital census.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-background text-on-background antialiased font-body-md selection:bg-primary-fixed selection:text-on-primary-fixed">
        <LanguageProvider>
          <Navbar />
          <main className="min-h-screen">
            {children}
          </main>
        </LanguageProvider>
      </body>
    </html>
  );
}
