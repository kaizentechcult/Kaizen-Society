"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { MemberType } from "@/types";
import { motion } from 'framer-motion';
import { Users, Code2, Brain } from 'lucide-react';

type TeamContextType = MemberType[] | null;

const Page = () => {
  const [teamMembers, setTeamMembers] = useState<TeamContextType>();

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const response = await fetch("/api/users");
        const data: MemberType[] = await response.json();
        setTeamMembers(data);
      } catch (error) {
        console.error("Error fetching team members:", error);
      }
    };

    fetchTeamMembers();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  const stats = [
    {
      icon: <Users className="w-6 h-6 text-purple-400" />,
      title: "Techies",
      value: "650+"
    },
    // {
    //   icon: <Code2 className="w-6 h-6 text-emerald-400" />,
    //   title: "Projects Completed",
    //   value: "2+"
    // },
    {
      icon: <Brain className="w-6 h-6 text-blue-400" />,
      title: "Events Organized",
      value: "5+"
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="container mx-auto px-4"
      >
        {/* Hero Section with Stats */}
        <div className="py-20">
          <motion.div
            variants={itemVariants}
            className="text-center max-w-4xl mx-auto mb-16"
          >
            <h1 className="text-5xl sm:text-7xl font-bold mb-6">
              Our{" "}
              <span className="bg-gradient-to-r from-purple-400 via-emerald-400 to-blue-400 text-transparent bg-clip-text">
                Team
              </span>
            </h1>
            <p className="text-zinc-400 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
              Meet the passionate individuals driving innovation and excellence at Kaizen Society.
              Together, we&apos;re building the future of software development.
            </p>
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
                className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-6 text-center"
              >
                <div className="flex justify-center mb-4">{stat.icon}</div>
                <h3 className="text-3xl font-bold mb-2">{stat.value}</h3>
                <p className="text-zinc-400">{stat.title}</p>
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
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
            Our diverse team brings together expertise from various domains of software development,
            creating a powerhouse of innovation and creativity.
          </p>
        </motion.div>

        {/* Team Members Grid */}
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-12"
        >
          {teamMembers === undefined ? (
            Array.from({ length: 12 }).map((_, index) => (
              <MemberLoading key={index} />
            ))
          ) : (
            teamMembers?.map((membersData, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-purple-600/10 to-emerald-600/10 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="bg-gradient-to-b from-zinc-900 via-zinc-900 to-zinc-900/50 p-8 rounded-xl border border-zinc-800/50 relative z-10 h-full">
                  <div className="flex flex-col items-center">
                    <div className="mb-6 relative">
                      <div className="absolute inset-0 bg-gradient-to-b from-purple-500/20 to-emerald-500/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      <Image
                        src={membersData.img}
                        alt={membersData.name}
                        width={120}
                        height={120}
                        className="rounded-full object-cover border-2 border-zinc-800/50 group-hover:border-purple-500/50 transition-colors relative z-10"
                      />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      {membersData.name}
                    </h3>
                    <p className="text-zinc-400 mb-6">{membersData.position}</p>
                    <div className="flex gap-6 mt-auto">
                      {membersData.github && (
                        <a
                          href={membersData.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="transform transition-all hover:scale-110 hover:text-emerald-400"
                        >
                          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                          </svg>
                        </a>
                      )}
                      {membersData.linkedin && (
                        <a
                          href={membersData.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="transform transition-all hover:scale-110 hover:text-purple-400"
                        >
                          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                          </svg>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </motion.div>
      </motion.div>
    </div>
  );
};

const MemberLoading = () => {
  return (
    <div className="bg-gradient-to-b from-zinc-900 via-zinc-900 to-zinc-900/50 p-8 rounded-xl border border-zinc-800/50 animate-pulse">
      <div className="flex flex-col items-center">
        <div className="w-28 h-28 bg-zinc-800/50 rounded-full mb-6"></div>
        <div className="h-4 w-3/4 bg-zinc-800/50 rounded mb-2"></div>
        <div className="h-3 w-1/2 bg-zinc-800/50 rounded mb-6"></div>
        <div className="flex gap-6">
          <div className="w-6 h-6 bg-zinc-800/50 rounded-full"></div>
          <div className="w-6 h-6 bg-zinc-800/50 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default Page;