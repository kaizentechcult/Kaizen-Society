'use client';

import { motion } from 'framer-motion';
import { Calendar, MapPin, Users, ExternalLink, Calendar as CalendarIcon } from 'lucide-react';
import Image from 'next/image';
import { useTheme } from '@/contexts/ThemeContext';

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

const events = [
  {
    id: "0",
    name: "GSOC Webinar",
    description: "Meet GSOC Member, and get to know the ins and outs of the Google Summer Of Code. An opportunity to get your doubts cleared and get a chance to know more about GSOC.",
    status: "past",
    date: "September 15, 2023",
    venue: "Online",
    organizers: ["Aakash Amod Rajput", "Krish Khanna", "Sreehitha Thati"],
    images: ["/Events/GSOCwebinar.png"],
    link: "#",
    attendees: "200+"
  },
  {
    id: "1",
    name: "Portfolio Challenge",
    description: "Develop a Website Portfolio to showcase your skills, and get feedback from industry experts.",
    status: "past",
    date: "October 10, 2023",
    venue: "Online",
    organizers: ["Krish Khanna", "Sooraj Nambiar", "Nikhil Verma", "Sreehitha Thati"],
    images: ["/Events/portfolioLeaderboard.jpg"],
    link: "#",
    attendees: "150+"
  },
  {
    id: "2",
    name: "DSA Challenge I",
    description: "Tackle Challenging DSA Questions prepared by us, focused to level up your thinking and logical skills.",
    status: "past",
    date: "November 5, 2023",
    venue: "Online",
    organizers: ["Aayush Singh", "Shivangi Bhartiya", "Sreehitha Thati", "Manisha", "Rianna Bansal"],
    images: ["/Events/week1.jpg"],
    link: "#",
    attendees: "300+"
  },
  {
    id: "3",
    name: "DSA Challenge II",
    description: "Tackle Challenging DSA Questions prepared by us, focused to level up your thinking and logical skills.",
    status: "past",
    date: "December 1, 2023",
    venue: "Online",
    organizers: ["Aayush Singh", "Shivangi Bhartiya", "Sreehitha Thati", "Manisha", "Rianna Bansal"],
    images: ["/Events/week2.jpg"],
    link: "#",
    attendees: "350+"
  },
  {
    id: "4",
    name: "ThinkTank Ideathon",
    description: "Create an Innovative Solution to a Problem and win exciting prizes. Get a chance to work with Industry Professionals.",
    status: "past",
    date: "January 15, 2024",
    venue: "Online",
    organizers: ["Krish Khanna", "Sooraj Nambiar", "Aayush Singh", "Adista Nautiyal", "Shivangi Bhartiya"],
    images: ["/Events/ThinkTank.png", "/Events/ThinkTankWinners.png"],
    link: "#",
    attendees: "250+"
  },
  {
    id: "5",
    name: "Cloud Computing Webinar",
    description: "Get Familiar with popular Cloud Computing Platforms and gain a chance to talk with industry professionals, and get to know more about Cloud computing in general.",
    status: "past",
    date: "February 1, 2024",
    venue: "Online",
    organizers: ["Aayush Singh", "Shivang Shukla", "Shivangi Bhartiya", "Adista Nautiyal", "Sooraj Nambiar"],
    images: ["/Events/CloudComputingWebinar.jpg"],
    link: "#",
    attendees: "400+"
  }
];

export default function EventsHosted() {
  const { theme } = useTheme();

  return (
    <div className={`min-h-screen pt-32 ${
      theme === 'dark' ? 'bg-black text-white' : 'bg-white text-gray-900'
    }`}>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        {/* Hero Section */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <CalendarIcon className="w-10 h-10 text-purple-400 mr-3" />
            <h1 className="text-3xl sm:text-5xl font-bold">
              Our{" "}
              <span className="bg-gradient-to-r from-purple-400 via-emerald-400 to-blue-400 text-transparent bg-clip-text">
                Events
              </span>
            </h1>
          </div>
          <p className={`text-base sm:text-lg max-w-2xl mx-auto ${
            theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'
          }`}>
            Join us in our journey of learning and growth through various events and workshops.
          </p>
        </motion.div>

        {/* Events Timeline */}
        <motion.div variants={containerVariants} className="relative">
          {/* Timeline Line */}
          <div className={`absolute left-12 sm:left-[8.5rem] top-0 bottom-0 w-0.5 ${
            theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-200'
          }`} />

          {/* Events */}
          <div className="space-y-8">
            {events.map((event, index) => (
              <motion.div
                key={event.id}
                variants={itemVariants}
                whileHover={{ x: 5 }}
                className="relative flex"
              >
                {/* Timeline Dot and Date */}
                <div className="flex-none w-24 sm:w-36 relative">
                  <motion.div
                    whileHover={{ scale: 1.2 }}
                    className={`absolute left-12 sm:left-[8.5rem] top-8 -translate-x-1/2 w-3 h-3 rounded-full border-2 ${
                      theme === 'dark'
                        ? 'bg-black border-purple-400'
                        : 'bg-white border-purple-600'
                    }`}
                  />
                  <div className="pr-8 pt-6 text-right">
                    <span className={`text-sm font-medium ${
                      theme === 'dark' ? 'text-purple-400' : 'text-purple-600'
                    }`}>
                      {event.date.split(',')[0]}
                    </span>
                  </div>
                </div>

                {/* Event Content */}
                <div className="flex-1">
                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    className={`rounded-lg overflow-hidden ${
                      theme === 'dark'
                        ? 'bg-zinc-900/50 border border-zinc-800/50'
                        : 'bg-gray-50/50 border border-gray-200'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row">
                      {/* Event Image */}
                      <div className="relative h-48 sm:h-auto sm:w-48 flex-none">
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 z-10"
                          initial={{ opacity: 0 }}
                          whileHover={{ opacity: 1 }}
                        />
                        <motion.div
                          className="relative h-full w-full"
                          whileHover={{ scale: 1.05 }}
                          transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        >
                          <Image
                            src={event.images[0]}
                            alt={event.name}
                            fill
                            className="object-cover"
                          />
                        </motion.div>
                      </div>

                      {/* Event Details */}
                      <div className="p-4 sm:p-5 flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-lg font-bold">{event.name}</h3>
                          <span className={`px-2 py-0.5 rounded-full text-xs ${
                            theme === 'dark'
                              ? 'bg-purple-400/10 text-purple-400'
                              : 'bg-purple-50 text-purple-600'
                          }`}>
                            {event.attendees} Attendees
                          </span>
                        </div>

                        <p className={`text-sm mb-3 line-clamp-2 ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`}>
                          {event.description}
                        </p>

                        {/* Event Metadata */}
                        <div className="flex flex-wrap gap-3 text-xs mb-3">
                          <div className={`flex items-center ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`}>
                            <MapPin className="w-4 h-4 mr-1" />
                            {event.venue}
                          </div>
                          <div className={`flex items-center ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`}>
                            <Users className="w-4 h-4 mr-1" />
                            {event.organizers.length} Organizers
                          </div>
                        </div>

                        {/* Link Button */}
                        <button
                          disabled
                          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm cursor-not-allowed opacity-50 ${
                            theme === 'dark'
                              ? 'bg-zinc-800 text-zinc-400'
                              : 'bg-gray-100 text-gray-500'
                          }`}
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          Past Event
                        </button>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
