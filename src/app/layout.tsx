import type { Metadata } from "next";
import Navbar from "@/components/Navbar/Navbar";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import { AuthProvider } from '@/contexts/AuthContext';

export const metadata: Metadata = {
  title: "Kaizen-Society",
  description: "A society where we share and learn",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-black">
        <AuthProvider>
          <Navbar />
          {children}
          <Analytics />
        </AuthProvider>
      </body>
    </html>
  );
}
