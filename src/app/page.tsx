'use client';

import Hero from "@/components/Hero/Hero";
import { useTheme } from '@/contexts/ThemeContext';

export default function Home() {
  const { theme } = useTheme();

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-black text-white' : 'bg-white text-gray-900'
      }`}>
      <Hero />
    </div>
  );
}