'use client';

import { motion } from 'framer-motion';
import { Calendar, MapPin, Users } from 'lucide-react';
import Image from 'next/image';
import GradientHover from '@/components/ui/GradientHover';
import { useTheme } from '@/contexts/ThemeContext';

interface Event {
  id: string;
  name: string;
  status: "upcoming" | "live" | "past";
  description: string;
  organizers: string[];
  images: string[];
  link: string;
}

const events = [
  {
    id: "0",
    name: "GSOC Webinar",
    description: "Meet GSOC Member, and get to know the ins and outs of the Google Summer Of Code. An opportunity to get your doubts cleared and get a chance to know more about GSOC.",
    status: "past",
    organizers: ["Aakash Amod Rajput", "Krish Khanna", "Sreehitha Thati"],
    images: ["/Events/GSOCwebinar.png"],
    link: "#"
  },
  {
    id: "1",
    name: "Portfolio Challenge",
    description: "Develop a Website Portfolio to showcase your skills, and get feedback from industry experts.",
    status: "past",
    organizers: ["Krish Khanna", "Sooraj Nambiar", "Nikhil Verma", "Sreehitha Thati"],
    images: ["/Events/portfolioLeaderboard.jpg"],
    link: "#"
  },
  {
    id: "2",
    name: "DSA Challenge I",
    description: "Tackle Challenging DSA Questions prepared by us, focused to level up your thinking and logical skills.",
    status: "past",
    organizers: ["Aayush Singh", "Shivangi Bhartiya", "Sreehitha Thati", "Manisha", "Rianna Bansal"],
    images: ["/Events/week1.jpg"],
    link: "#"
  },
  {
    id: "3",
    name: "DSA Challenge II",
    description: "Tackle Challenging DSA Questions prepared by us, focused to level up your thinking and logical skills.",
    status: "past",
    organizers: ["Aayush Singh", "Shivangi Bhartiya", "Sreehitha Thati", "Manisha", "Rianna Bansal"],
    images: ["/Events/week2.jpg"],
    link: "#"
  },
  {
    id: "4",
    name: "ThinkTank Ideathon",
    description: "Create an Innovative Solution to a Problem and win exciting prizes. Get a chance to work with Industry Professionals.",
    status: "past",
    organizers: ["Krish Khanna", "Sooraj Nambiar", "Aayush Singh", "Adista Nautiyal", "Shivangi Bhartiya"],
    images: ["/Events/ThinkTank.png", "/Events/ThinkTankWinners.png"],
    link: "#"
  },
  {
    id: "5",
    name: "Cloud Computing Webinar",
    description: "Get Familiar with popular Cloud Computing Platforms and gain a chance to talk with industry professionals, and get to know more about Cloud computing in general.",
    status: "past",
    organizers: ["Aayush Singh", "Shivang Shukla", "Shivangi Bhartiya", "Adista Nautiyal", "Sooraj Nambiar"],
    images: ["/Events/CloudComputingWebinar.jpg"],
    link: "#"
  }
];

const EventsHosted = () => {
  const { theme } = useTheme();
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
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

  return (
    <div className={`min-h-screen py-16 px-4 pt-32 ${
      theme === 'dark' ? 'bg-black text-white' : 'bg-white text-gray-900'
    }`}>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="max-w-7xl mx-auto"
      >
        {/* Hero Section */}
        <motion.div
          variants={itemVariants}
          className="text-center mb-20"
        >
          <h1 className="text-5xl sm:text-6xl font-bold mb-6">
            Our{" "}
            <span className="bg-gradient-to-r from-purple-400 via-emerald-400 to-blue-400 text-transparent bg-clip-text">
              Events
            </span>
          </h1>
          <p className={`text-lg md:text-xl max-w-2xl mx-auto ${
            theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'
          }`}>
            Join us for exciting workshops, hackathons, and tech talks to enhance your skills and connect with fellow developers.
          </p>
        </motion.div>

        {/* Events Grid - Reversed to show latest first */}
        <div className="grid gap-12 lg:grid-cols-2">
          {[...events].reverse().map((event, index) => (
            <motion.div
              key={event.id}
              variants={itemVariants}
            >
              <GradientHover className={`group relative rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/10 ${
                theme === 'dark' 
                  ? 'bg-zinc-900/50 backdrop-blur-lg'
                  : 'bg-gray-50/50 backdrop-blur-lg'
              }`}>
                {/* Image Container */}
                <div className="aspect-[16/9] relative overflow-hidden">
                  <Image
                    src={event.images[0]}
                    alt={event.name}
                    width={800}
                    height={450}
                    className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                </div>

                {/* Content Container */}
                <div className="relative p-8">
                  {/* Status Badge */}
                  <span className={`absolute top-0 right-8 -translate-y-1/2 text-sm px-4 py-1.5 rounded-full font-medium ${
                    event.status === 'upcoming' 
                      ? 'bg-emerald-400/20 text-emerald-400 border border-emerald-400/20' 
                      : event.status === 'live'
                      ? 'bg-red-400/20 text-red-400 border border-red-400/20'
                      : 'bg-zinc-400/20 text-zinc-400 border border-zinc-400/20'
                  }`}>
                    {event.status}
                  </span>

                  {/* Title and Description */}
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold tracking-tight">{event.name}</h3>
                    <p className={theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}>
                      {event.description}
                    </p>
                  </div>

                  {/* Organizers Section */}
                  <div className="mt-8 space-y-3">
                    <div className={`flex items-center gap-2 ${
                      theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'
                    }`}>
                      <Users className="w-5 h-5" />
                      <span className="text-sm font-medium">Organized by:</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {event.organizers.map((organizer, idx) => (
                        <span 
                          key={idx} 
                          className={`text-sm px-3 py-1.5 rounded-full transition-colors ${
                            theme === 'dark'
                              ? 'bg-zinc-800/50 border border-zinc-700/50 hover:border-zinc-600/50'
                              : 'bg-gray-100/50 border border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          {organizer}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="mt-8">
                    <a 
                      href={event.link}
                      className={`inline-flex items-center justify-center px-6 py-3 rounded-xl transition-colors text-sm font-medium ${
                        theme === 'dark'
                          ? 'bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700 group-hover:bg-purple-500/10 group-hover:text-purple-400 hover:border-purple-500/50'
                          : 'bg-gray-100 hover:bg-gray-200 text-gray-900 border border-gray-200 group-hover:bg-purple-500/10 group-hover:text-purple-600 hover:border-purple-500/50'
                      }`}
                    >
                      {event.status === 'upcoming' ? 'Register Now' : 'Learn More'}
                    </a>
                  </div>
                </div>
              </GradientHover>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default EventsHosted;
