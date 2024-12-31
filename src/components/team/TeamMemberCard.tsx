'use client';

import { motion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';
import Image from 'next/image';
import { Github, Linkedin } from 'lucide-react';
import GradientHover from '@/components/ui/GradientHover';

interface TeamMemberProps {
  name: string;
  role: string;
  image: string;
  github?: string;
  linkedin?: string;
  index: number;
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10
    }
  }
};

export default function TeamMemberCard({ name, role, image, github, linkedin, index }: TeamMemberProps) {
  const { theme } = useTheme();

  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ 
        y: -10,
        transition: { type: "spring", stiffness: 300, damping: 20 }
      }}
      className="group relative"
    >
      <GradientHover className="h-full">
        <motion.div 
          className={`p-8 rounded-xl relative z-10 h-full ${
            theme === 'dark'
              ? 'bg-gradient-to-b from-zinc-900 via-zinc-900 to-zinc-900/50 border border-zinc-800/50'
              : 'bg-gradient-to-b from-gray-50 via-gray-50 to-gray-50/50 border border-gray-200'
          }`}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1 }}
        >
          <div className="flex flex-col items-center">
            <motion.div 
              className="mb-6 relative"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <motion.div 
                className="absolute inset-0 bg-gradient-to-b from-purple-500/20 to-emerald-500/20 rounded-full blur-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.5, 0] }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              />
              <Image
                src={image}
                alt={name}
                width={120}
                height={120}
                className={`rounded-full object-cover relative z-10 transition-all duration-300 ${
                  theme === 'dark'
                    ? 'border-2 border-zinc-800/50 group-hover:border-purple-500/50'
                    : 'border-2 border-gray-200 group-hover:border-purple-500/50'
                }`}
              />
            </motion.div>
            <motion.h3 
              className="text-xl font-bold mb-2"
              whileHover={{ scale: 1.05 }}
            >
              {name}
            </motion.h3>
            <motion.p 
              className={theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.1 + 0.2 }}
            >
              {role}
            </motion.p>
            <motion.div 
              className="flex gap-6 mt-auto"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.3 }}
            >
              {github && (
                <motion.a
                  href={github}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className={`transition-colors ${
                    theme === 'dark'
                      ? 'text-zinc-400 hover:text-white'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Github className="w-5 h-5" />
                </motion.a>
              )}
              {linkedin && (
                <motion.a
                  href={linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, rotate: -5 }}
                  whileTap={{ scale: 0.9 }}
                  className={`transition-colors ${
                    theme === 'dark'
                      ? 'text-zinc-400 hover:text-white'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Linkedin className="w-5 h-5" />
                </motion.a>
              )}
            </motion.div>
          </div>
        </motion.div>
      </GradientHover>
    </motion.div>
  );
} 