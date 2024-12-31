'use client';

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

const Hero = () => {
  const { theme } = useTheme();

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-black' : 'bg-white'}`}>
      <div className="pt-32 md:pt-40 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20">
          {/* Text Content */}
          <div className="flex-1 space-y-8">
            <div className="space-y-4">
              <h1 className={`text-4xl sm:text-5xl md:text-6xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Kaizen Technical{" "}
                <span className="bg-gradient-to-r from-purple-400 via-emerald-400 to-blue-400 text-transparent bg-clip-text">
                  Community
                </span>
              </h1>
              <p className={`text-lg sm:text-xl leading-relaxed ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`}>
                We aim to provide a gateway for the people in our institute to join
                the coding community. We create a platform which allows students to
                gain assistance and mentorship to enhance their coding ability.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Link href="/challenges">
                <button className="px-6 py-3 bg-gradient-to-r from-purple-500 to-emerald-500 text-white rounded-lg font-medium text-lg flex items-center gap-2 hover:from-purple-600 hover:to-emerald-600 transition-all">
                  Start Learning
                  <ArrowRight className="w-5 h-5" />
                </button>
              </Link>
              <Link href="/team">
                <button className={`px-6 py-3 rounded-lg font-medium text-lg transition-colors ${theme === 'dark'
                    ? 'bg-zinc-900 text-white hover:bg-zinc-800 border border-zinc-800'
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200 border border-gray-200'
                  }`}>
                  Meet the Team
                </button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-8">
              <div className="space-y-2">
                <h3 className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>650+</h3>
                <p className={theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}>Active Members</p>
              </div>
              <div className="space-y-2">
                <h3 className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>5+</h3>
                <p className={theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}>Events Hosted</p>
              </div>
              <div className="space-y-2">
                <h3 className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>1000+</h3>
                <p className={theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}>Challenges Solved</p>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="flex-1 relative">
            <div className={`absolute inset-0 rounded-2xl blur-3xl ${theme === 'dark'
                ? 'bg-gradient-to-tr from-purple-500/20 to-emerald-500/20'
                : 'bg-gradient-to-tr from-purple-500/10 to-emerald-500/10'
              }`} />
            <Image
              src="/hero.jpg"
              alt="Kaizen Community"
              width={500}
              height={500}
              className={`rounded-2xl relative z-10 ${theme === 'dark'
                  ? 'border border-zinc-800/50'
                  : 'border border-gray-200'
                }`}
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;

