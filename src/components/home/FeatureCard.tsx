'use client';

import { motion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
  index: number;
}

const cardVariants = {
  initial: { scale: 1 },
  hover: { 
    scale: 1.02,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 10
    }
  }
};

export default function FeatureCard({ title, description, href, icon: Icon, index }: FeatureCardProps) {
  const { theme } = useTheme();

  return (
    <motion.a
      href={href}
      variants={cardVariants}
      whileHover="hover"
      className={`group rounded-xl border px-5 py-4 transition-all ${
        theme === 'dark'
          ? 'border-zinc-800 bg-zinc-900/30 hover:bg-zinc-800/50 hover:border-zinc-700'
          : 'border-gray-200 bg-white/50 hover:bg-gray-50 hover:border-gray-300'
      }`}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
      >
        <h2 className={`mb-3 text-2xl font-semibold ${
          theme === 'dark' ? 'text-zinc-100' : 'text-gray-900'
        }`}>
          {title}{' '}
          <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
            -&gt;
          </span>
        </h2>
        <p className={`m-0 max-w-[30ch] text-sm ${
          theme === 'dark' ? 'text-zinc-400' : 'text-gray-500'
        }`}>
          {description}
        </p>
      </motion.div>
    </motion.a>
  );
} 