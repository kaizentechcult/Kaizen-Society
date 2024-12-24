'use client';

import { Providers } from "@/components/Providers";
import Navbar from "@/components/Navbar/Navbar";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <Providers>
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        {children}
      </div>
    </Providers>
  );
} 