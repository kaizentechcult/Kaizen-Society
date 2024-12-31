'use client';

import { motion } from 'framer-motion';
import TeamMemberCard from './TeamMemberCard';
import { MemberType } from '@/types';

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

interface TeamGridProps {
  members: MemberType[];
}

export default function TeamGrid({ members }: TeamGridProps) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {members.map((member, index) => (
        <TeamMemberCard
          key={member._id}
          name={member.name}
          role={member.position}
          image={member.img}
          github={member.github}
          linkedin={member.linkedin}
          index={index}
        />
      ))}
    </motion.div>
  );
} 