'use client';

import { motion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';
import { Github, ExternalLink, Code2 } from 'lucide-react';
import Image from 'next/image';

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

const projects = [
  {
    id: 'career-compass',
    title: 'Career Compass',
    description: 'An AI-powered career guidance platform that helps students and professionals find their perfect career path through personalized assessments and industry insights.',
    technologies: ['Next.js', 'TailwindCSS', 'OpenAI', 'MongoDB', 'TypeScript'],
    liveUrl: 'https://careercompass.demo',
    githubUrl: 'https://github.com/demo/careercompass',
    image: '/projects/career.jpg'
  },
  {
    id: 'study-sync',
    title: 'StudySync',
    description: 'A collaborative note-taking app designed for students, featuring real-time collaboration, smart organization, and AI-powered study recommendations.',
    technologies: ['React', 'Node.js', 'Socket.io', 'Redis', 'PostgreSQL'],
    liveUrl: 'https://studysync.demo',
    githubUrl: 'https://github.com/demo/studysync',
    image: '/projects/notes.jpg'
  },
  {
    id: 'code-mentor',
    title: 'CodeMentor',
    description: 'A platform connecting coding beginners with experienced mentors, featuring code reviews, pair programming sessions, and personalized learning paths.',
    technologies: ['Vue.js', 'Express', 'WebRTC', 'MongoDB', 'Docker'],
    liveUrl: 'https://codementor.demo',
    githubUrl: 'https://github.com/demo/codementor',
    image: '/projects/codementor.jpg'
  },
  {
    id: 'event-hub',
    title: 'TechEvents',
    description: 'A comprehensive platform for discovering and managing tech events, hackathons, and workshops, with features for event creation, registration, and community engagement.',
    technologies: ['Next.js', 'GraphQL', 'PostgreSQL', 'AWS', 'Stripe'],
    liveUrl: 'https://techevents.demo',
    githubUrl: 'https://github.com/demo/techevents',
    image: '/projects/techevents.jpg'
  }
];

export default function Projects() {
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
        <motion.div variants={itemVariants} className="text-center mb-20">
          <div className="flex items-center justify-center mb-6">
            <Code2 className="w-12 h-12 text-purple-400 mr-4" />
            <h1 className="text-4xl sm:text-6xl font-bold">
              Our{" "}
              <span className="bg-gradient-to-r from-purple-400 via-emerald-400 to-blue-400 text-transparent bg-clip-text">
                Projects
              </span>
            </h1>
          </div>
          <p className={`text-lg max-w-3xl mx-auto ${
            theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'
          }`}>
            Explore our innovative projects that showcase our commitment to excellence and technological advancement.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <motion.div variants={containerVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className={`group rounded-xl overflow-hidden ${
                theme === 'dark'
                  ? 'bg-zinc-900/50 border border-zinc-800/50'
                  : 'bg-gray-50/50 border border-gray-200'
              }`}
            >
              {/* Project Image */}
              <div className="relative h-64 overflow-hidden">
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
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                </motion.div>
              </div>

              {/* Project Details */}
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-3">{project.title}</h3>
                <p className={`mb-4 ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`}>
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className={`px-3 py-1 rounded-full text-sm ${
                        theme === 'dark'
                          ? 'bg-zinc-800 text-zinc-300'
                          : 'bg-gray-200 text-gray-700'
                      }`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex gap-4">
                  <motion.a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                      theme === 'dark'
                        ? 'bg-purple-400/10 text-purple-400 hover:bg-purple-400/20'
                        : 'bg-purple-50 text-purple-600 hover:bg-purple-100'
                    }`}
                  >
                    <ExternalLink className="w-4 h-4" />
                    Live Demo
                  </motion.a>
                  <motion.a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                      theme === 'dark'
                        ? 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    <Github className="w-4 h-4" />
                    Source Code
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
} 