"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { MemberType } from "@/types";
import { motion } from 'framer-motion';
import { Users, Code2, Brain, Github, Linkedin } from 'lucide-react';
import GradientHover from '@/components/ui/GradientHover';
import { useTheme } from '@/contexts/ThemeContext';

type TeamContextType = MemberType[];

const Page = () => {
  const [teamMembers, setTeamMembers] = useState<TeamContextType>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { theme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/users");
        if (!response.ok) {
          throw new Error('Failed to fetch team members');
        }
        const data = await response.json();
        if (Array.isArray(data)) {
          setTeamMembers(data);
        } else {
          console.error('Received non-array data:', data);
          setError('Invalid data format received');
        }
      } catch (error) {
        console.error("Error fetching team members:", error);
        setError(error instanceof Error ? error.message : 'Failed to load team members');
      } finally {
        setLoading(false);
      }
    };

    fetchTeamMembers();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  const textVariants = {
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

  const gradientVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  const stats = [
    {
      icon: <Users className="w-6 h-6 text-purple-400" />,
      title: "Techies",
      value: "650+"
    },
    {
      icon: <Brain className="w-6 h-6 text-blue-400" />,
      title: "Events Organized",
      value: "5+"
    }
  ];

  if (error) {
    return (
      <div className={`min-h-screen pt-32 flex items-center justify-center ${
        theme === 'dark' ? 'bg-black text-white' : 'bg-white text-gray-900'
      }`}>
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-400 mb-4">Error</h2>
          <p className={theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen pt-32 ${
      theme === 'dark' ? 'bg-black text-white' : 'bg-white text-gray-900'
    }`}>
      {isMounted && (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="container mx-auto px-4"
        >
          {/* Hero Section with Stats */}
          <div className="py-20">
            <motion.div
              variants={textVariants}
              className="text-center max-w-4xl mx-auto mb-16"
            >
              <motion.h1 
                className="text-5xl sm:text-7xl font-bold mb-6"
                variants={gradientVariants}
              >
                Our{" "}
                <motion.span 
                  className="bg-gradient-to-r from-purple-400 via-emerald-400 to-blue-400 text-transparent bg-clip-text"
                  animate={{ 
                    backgroundPosition: ["0%", "100%"],
                    transition: { 
                      duration: 5, 
                      repeat: Infinity, 
                      repeatType: "reverse" 
                    }
                  }}
                  style={{ backgroundSize: "200%" }}
                >
                  Community
                </motion.span>
              </motion.h1>
              <motion.p 
                variants={textVariants}
                className={`text-lg md:text-xl leading-relaxed max-w-2xl mx-auto ${
                  theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'
                }`}
              >
                Meet the passionate individuals driving innovation and excellence at Kaizen Society.
                Together, we&apos;re building future with emerging technologies.
              </motion.p>
            </motion.div>

            {/* Stats Grid */}
            <motion.div
              variants={containerVariants}
              className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-20"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className={`backdrop-blur-sm rounded-xl p-6 text-center ${
                    theme === 'dark'
                      ? 'bg-zinc-900/50 border border-zinc-800/50'
                      : 'bg-gray-50/50 border border-gray-200'
                  }`}
                >
                  <div className="flex justify-center mb-4">{stat.icon}</div>
                  <h3 className="text-3xl font-bold mb-2">{stat.value}</h3>
                  <p className={theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}>{stat.title}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Team Section */}
          <motion.div
            variants={itemVariants}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Meet the{" "}
              <span className="bg-gradient-to-r from-purple-400 to-emerald-400 text-transparent bg-clip-text">
                Active Contributors
              </span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-emerald-400 mx-auto rounded-full mb-6"></div>
            <p className={`text-lg max-w-2xl mx-auto ${
              theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'
            }`}>
              Our diverse team brings together expertise from various domains of software development,
              creating a powerhouse of innovation and creativity.
            </p>
          </motion.div>

          {/* Team Members Grid */}
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-12"
          >
            {loading ? (
              // Loading skeletons with animation
              Array.from({ length: 6 }).map((_, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: index * 0.1 }}
                >
                  <MemberLoading theme={theme} />
                </motion.div>
              ))
            ) : teamMembers.length > 0 ? (
              teamMembers.map((member, index) => (
                <motion.div
                  key={member._id}
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
                            src={member.img}
                            alt={member.name}
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
                          {member.name}
                        </motion.h3>
                        <motion.p 
                          className={theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: index * 0.1 + 0.2 }}
                        >
                          {member.position}
                        </motion.p>
                        <motion.div 
                          className="flex gap-6 mt-auto"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 + 0.3 }}
                        >
                          {member.github && (
                            <motion.a
                              href={member.github}
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
                          {member.linkedin && (
                            <motion.a
                              href={member.linkedin}
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
              ))
            ) : (
              <motion.div 
                className="col-span-full text-center py-12"
                variants={textVariants}
              >
                <p className={theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}>
                  No team members found.
                </p>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

const MemberLoading = ({ theme }: { theme: 'dark' | 'light' }) => {
  return (
    <div className={`p-8 rounded-xl animate-pulse ${
      theme === 'dark'
        ? 'bg-gradient-to-b from-zinc-900 via-zinc-900 to-zinc-900/50 border border-zinc-800/50'
        : 'bg-gradient-to-b from-gray-50 via-gray-50 to-gray-50/50 border border-gray-200'
    }`}>
      <div className="flex flex-col items-center">
        <div className={`w-28 h-28 rounded-full mb-6 ${
          theme === 'dark' ? 'bg-zinc-800/50' : 'bg-gray-200/50'
        }`}></div>
        <div className={`h-4 w-3/4 rounded mb-2 ${
          theme === 'dark' ? 'bg-zinc-800/50' : 'bg-gray-200/50'
        }`}></div>
        <div className={`h-3 w-1/2 rounded mb-6 ${
          theme === 'dark' ? 'bg-zinc-800/50' : 'bg-gray-200/50'
        }`}></div>
        <div className="flex gap-6">
          <div className={`w-6 h-6 rounded-full ${
            theme === 'dark' ? 'bg-zinc-800/50' : 'bg-gray-200/50'
          }`}></div>
          <div className={`w-6 h-6 rounded-full ${
            theme === 'dark' ? 'bg-zinc-800/50' : 'bg-gray-200/50'
          }`}></div>
        </div>
      </div>
    </div>
  );
};

export default Page;