import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import ClientLayout from "./layout.client";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kaizen-Society",
  description: "A society where we share and learn",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen antialiased transition-colors duration-300">
        <ClientLayout>{children}</ClientLayout>
        <Analytics />
      </body>
    </html>
  );
}
