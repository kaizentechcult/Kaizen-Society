import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <div className="min-h-screen bg-black">
      <div className="pt-32 md:pt-40 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20">
          {/* Text Content */}
          <div className="flex-1 space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white">
                Kaizen Technical{" "}
                <span className="bg-gradient-to-r from-purple-400 via-emerald-400 to-blue-400 text-transparent bg-clip-text">
                  Community
                </span>
              </h1>
              <p className="text-zinc-400 text-lg sm:text-xl leading-relaxed">
                As a part of the Institute Technical Council, we aim to provide a
                gateway for the people in our institute to join the coding community.
                We create a platform which allows students to gain assistance and
                mentorship to enhance their coding ability.
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
                <button className="px-6 py-3 bg-zinc-900 text-white rounded-lg font-medium text-lg hover:bg-zinc-800 transition-colors border border-zinc-800">
                  Meet the Team
                </button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-8">
              <div className="space-y-2">
                <h3 className="text-3xl font-bold text-white">650+</h3>
                <p className="text-zinc-400">Active Members</p>
              </div>
              <div className="space-y-2">
                <h3 className="text-3xl font-bold text-white">5+</h3>
                <p className="text-zinc-400">Events Hosted</p>
              </div>
              <div className="space-y-2">
                <h3 className="text-3xl font-bold text-white">1000+</h3>
                <p className="text-zinc-400">Challenges Solved</p>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="flex-1 relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 to-emerald-500/20 rounded-2xl blur-3xl" />
            <Image 
              src="/hero.jpg"
              alt="Kaizen Community" 
              width={500}
              height={500}
              className="rounded-2xl relative z-10 border border-zinc-800/50"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;

