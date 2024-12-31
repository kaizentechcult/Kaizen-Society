'use client';

import { motion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';
import { Users, Rocket, Heart, Target } from 'lucide-react';

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

const timelineEvents = [
  {
    date: "September 2023",
    title: "The Beginning",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
  },
  {
    date: "October 2023",
    title: "First Webinar: GSOC Insights",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris."
  },
  {
    date: "November 2023",
    title: "Portfolio Challenge Launch",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis aute irure dolor in reprehenderit in voluptate velit esse."
  },
  {
    date: "December 2023",
    title: "DSA Challenge Series",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Excepteur sint occaecat cupidatat non proident, sunt in culpa."
  },
  {
    date: "January 2024",
    title: "Cloud Computing Workshop",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Mauris efficitur metus eu lectus faucibus."
  },
  {
    date: "Present",
    title: "Growing Strong",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ac diam sit amet quam vehicula elementum."
  }
];

export default function About() {
  const { theme } = useTheme();

  return (
    <div className={`min-h-screen pt-32 ${
      theme === 'dark' ? 'bg-black text-white' : 'bg-white text-gray-900'
    }`}>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        {/* Hero Section */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            About{" "}
            <span className="bg-gradient-to-r from-purple-400 via-emerald-400 to-blue-400 text-transparent bg-clip-text">
              Kaizen Society
            </span>
          </h1>
          <p className={`text-base sm:text-lg max-w-3xl mx-auto ${
            theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'
          }`}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mb-16">
          {[
            {
              icon: <Target className="w-6 h-6 sm:w-8 sm:h-8 text-purple-400" />,
              title: "Our Mission",
              description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            },
            {
              icon: <Rocket className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-400" />,
              title: "What We Do",
              description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            },
            {
              icon: <Users className="w-6 h-6 sm:w-8 sm:h-8 text-blue-400" />,
              title: "Our Community",
              description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            },
            {
              icon: <Heart className="w-6 h-6 sm:w-8 sm:h-8 text-red-400" />,
              title: "Our Impact",
              description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            }
          ].map((feature, index) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className={`p-4 sm:p-6 rounded-xl ${
                theme === 'dark'
                  ? 'bg-zinc-900/50 border border-zinc-800/50'
                  : 'bg-gray-50/50 border border-gray-200'
              }`}
            >
              <div className="mb-3 sm:mb-4">{feature.icon}</div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2">{feature.title}</h3>
              <p className={`text-sm sm:text-base ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`}>
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* History Timeline */}
        <motion.div variants={itemVariants} className="mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12">Our Journey</h2>
          <div className="relative">
            {/* Timeline Line */}
            <div className={`absolute left-4 sm:left-1/2 top-0 h-full w-0.5 ${
              theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-200'
            }`} />

            {/* Timeline Events */}
            <div className="space-y-8">
              {timelineEvents.map((event, index) => (
                <motion.div
                  key={event.date}
                  variants={itemVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  className="relative flex flex-col sm:flex-row items-start sm:items-center"
                >
                  {/* Content */}
                  <div className={`pl-12 sm:pl-0 w-full sm:w-1/2 ${
                    index % 2 === 0 ? 'sm:pr-8 sm:text-right' : 'sm:pl-8'
                  } ${index % 2 === 0 ? 'sm:mr-auto' : 'sm:ml-auto'}`}>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className={`p-4 sm:p-6 rounded-xl ${
                        theme === 'dark'
                          ? 'bg-zinc-900/50 border border-zinc-800/50'
                          : 'bg-gray-50/50 border border-gray-200'
                      }`}
                    >
                      <span className={`text-xs sm:text-sm font-medium ${
                        theme === 'dark' ? 'text-purple-400' : 'text-purple-600'
                      }`}>
                        {event.date}
                      </span>
                      <h3 className="text-base sm:text-xl font-semibold mt-1 mb-2">{event.title}</h3>
                      <p className={`text-sm sm:text-base ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`}>
                        {event.description}
                      </p>
                    </motion.div>
                  </div>

                  {/* Timeline Dot */}
                  <motion.div
                    whileHover={{ scale: 1.2 }}
                    className={`absolute left-4 sm:left-1/2 top-6 sm:top-1/2 transform -translate-x-1/2 sm:-translate-y-1/2 w-3 h-3 sm:w-4 sm:h-4 rounded-full border-2 ${
                      theme === 'dark'
                        ? 'bg-black border-purple-400'
                        : 'bg-white border-purple-600'
                    }`}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
} 