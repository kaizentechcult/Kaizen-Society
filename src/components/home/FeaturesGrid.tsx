'use client';

import { motion } from 'framer-motion';
import { Rocket, MessageCircle, Code2, Users } from 'lucide-react';
import FeatureCard from './FeatureCard';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const features = [
  {
    title: 'Challenges',
    description: 'Test your skills with our coding challenges.',
    href: '/challenges',
    icon: Code2
  },
  {
    title: 'Events',
    description: 'Explore our comprehensive learning resources and tutorials.',
    href: '/events-hosted',
    icon: Rocket
  },
  {
    title: 'Projects',
    description: 'Build real-world projects with our community.',
    href: '/projects',
    icon: MessageCircle
  },
  {
    title: 'Team',
    description: 'Meet our passionate community members.',
    href: '/team',
    icon: Users
  }
];

export default function FeaturesGrid() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left gap-6"
    >
      {features.map((feature, index) => (
        <FeatureCard
          key={feature.title}
          {...feature}
          index={index}
        />
      ))}
    </motion.div>
  );
} 