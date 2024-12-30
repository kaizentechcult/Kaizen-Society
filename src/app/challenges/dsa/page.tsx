'use client';

import { motion } from 'framer-motion';
import { Brain, CheckCircle2, ExternalLink, Code2, RefreshCw, Filter } from 'lucide-react';
import { useCompletedChallenges } from '@/hooks/useCompletedChallenges';
import { useTheme } from '@/contexts/ThemeContext';
import ProgressBar from '@/components/common/ProgressBar';
import { useEffect, useState } from 'react';
import CompletionConfetti from '@/components/CompletionConfetti';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

type Difficulty = 'Easy' | 'Medium' | 'Hard';

interface Problem {
  _id: string;
  srNo: number;
  name: string;
  title: string;
  topic: string;
  link: string;
  difficulty: Difficulty;
  category: 'DSA' | 'WebDev';
}

export default function DSAChallenges() {
  const { theme } = useTheme();
  const { user } = useAuth();
  const router = useRouter();
  const [problems, setProblems] = useState<Problem[]>([]);
  const [filteredProblems, setFilteredProblems] = useState<Problem[]>([]);
  const [selectedTopic, setSelectedTopic] = useState<string>('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
  const [loading, setLoading] = useState(true);
  const { completedChallenges, toggleChallenge, isInitialized, progress } = useCompletedChallenges('dsa', problems.length);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [activeFilterTab, setActiveFilterTab] = useState<'topic' | 'difficulty'>('topic');

  // Get unique topics and difficulties
  const topics = ['All', ...Array.from(new Set(problems.map(p => p.topic)))];
  const difficulties = ['All', 'Easy', 'Medium', 'Hard'];

  const fetchProblems = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/problems?category=DSA');
      if (!response.ok) throw new Error('Failed to fetch problems');
      const data = await response.json();
      setProblems(data || []);
      setFilteredProblems(data || []);
    } catch (error) {
      console.error('Error fetching problems:', error);
      setProblems([]);
      setFilteredProblems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProblems();
  }, []);

  useEffect(() => {
    let filtered = [...problems];
    
    if (selectedTopic !== 'All') {
      filtered = filtered.filter(p => p.topic === selectedTopic);
    }
    
    if (selectedDifficulty !== 'All') {
      filtered = filtered.filter(p => p.difficulty === selectedDifficulty);
    }
    
    setFilteredProblems(filtered);
  }, [selectedTopic, selectedDifficulty, problems]);

  const getDifficultyColor = (difficulty: Difficulty) => {
    switch (difficulty) {
      case 'Easy':
        return 'bg-emerald-400/10 text-emerald-400';
      case 'Medium':
        return 'bg-purple-400/10 text-purple-400';
      case 'Hard':
        return 'bg-red-400/10 text-red-400';
      default:
        return theme === 'dark' ? 'text-zinc-400' : 'text-gray-400';
    }
  };

  const getTopicColor = (name: string) => {
    switch (name.toLowerCase()) {
      case 'array properties':
      case 'array sorting':
      case 'array duplicates':
        return 'text-blue-400';
      case 'number manipulation':
        return 'text-purple-400';
      case 'string manipulation':
        return 'text-emerald-400';
      case 'linked list':
        return 'text-yellow-400';
      case 'binary tree':
        return 'text-cyan-400';
      case 'dynamic programming':
        return 'text-red-400';
      default:
        return theme === 'dark' ? 'text-zinc-400' : 'text-gray-400';
    }
  };

  const EmptyState = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-xl p-12 text-center ${theme === 'dark'
          ? 'bg-zinc-900/50 border border-zinc-800/50'
          : 'bg-gray-50/50 border border-gray-200'
        }`}
    >
      <Code2 className="w-16 h-16 mx-auto mb-6 text-purple-400/50" />
      <h3 className="text-xl font-semibold mb-3">No Challenges Available</h3>
      <p className={`mb-6 ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`}>
        Looks like there aren&apos;t any DSA challenges at the moment.
        <br />Check back later or try refreshing the page.
      </p>
      <button
        onClick={fetchProblems}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-400/10 text-purple-400 hover:bg-purple-400/20 transition-colors"
      >
        <RefreshCw className="w-4 h-4" />
        Refresh
      </button>
    </motion.div>
  );

  const LoadingState = () => (
    <div className="flex items-center justify-center min-h-[300px]">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-400"></div>
    </div>
  );

  const handleToggle = (problemId: string) => {
    if (!user) {
      // Redirect to login if not authenticated
      router.push('/login');
      return;
    }
    
    if (!isInitialized) return;
    
    const wasCompleted = completedChallenges.includes(problemId);
    if (!wasCompleted) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }
    
    toggleChallenge(problemId);
  };

  return (
    <div className={`min-h-screen py-8 px-4 sm:py-16 sm:px-6 lg:px-8 pt-24 sm:pt-32 ${
      theme === 'dark' ? 'bg-black text-white' : 'bg-white text-gray-900'
    }`}>
      {showConfetti && <CompletionConfetti isCompleted={true} />}
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto"
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 sm:mb-12 gap-4">
          <div className="flex items-center">
            <Brain className="w-8 h-8 sm:w-10 sm:h-10 text-purple-400 mr-3 sm:mr-4 flex-shrink-0" />
            <h1 className="text-2xl sm:text-4xl font-bold">DSA Challenges</h1>
          </div>
          <div className="flex items-center gap-4">
            {/* Combined Filter Button */}
            <div className="relative">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  theme === 'dark'
                    ? 'bg-zinc-800/50 hover:bg-zinc-800 text-zinc-100'
                    : 'bg-gray-100/50 hover:bg-gray-200 text-gray-900'
                }`}
              >
                <Filter className="w-4 h-4" />
                Filters
                {selectedTopic !== 'All' || selectedDifficulty !== 'All' ? (
                  <span className="ml-1 px-1.5 py-0.5 rounded-full text-xs bg-purple-400 text-white">
                    {(selectedTopic !== 'All' ? 1 : 0) + (selectedDifficulty !== 'All' ? 1 : 0)}
                  </span>
                ) : null}
              </button>

              {showFilters && (
                <div className={`absolute right-0 mt-2 w-64 rounded-md shadow-lg z-10 ${
                  theme === 'dark' ? 'bg-zinc-800' : 'bg-white'
                } border ${theme === 'dark' ? 'border-zinc-700' : 'border-gray-200'}`}>
                  {/* Filter Tabs */}
                  <div className="flex border-b border-zinc-700">
                    <button
                      onClick={() => setActiveFilterTab('topic')}
                      className={`flex-1 px-4 py-2 text-sm font-medium ${
                        activeFilterTab === 'topic'
                          ? theme === 'dark'
                            ? 'bg-zinc-700 text-zinc-100'
                            : 'bg-gray-100 text-gray-900'
                          : theme === 'dark'
                            ? 'text-zinc-400 hover:text-zinc-100'
                            : 'text-gray-500 hover:text-gray-900'
                      }`}
                    >
                      Topic
                      {selectedTopic !== 'All' && (
                        <span className="ml-1.5 px-1.5 py-0.5 rounded-full text-xs bg-purple-400 text-white">1</span>
                      )}
                    </button>
                    <button
                      onClick={() => setActiveFilterTab('difficulty')}
                      className={`flex-1 px-4 py-2 text-sm font-medium ${
                        activeFilterTab === 'difficulty'
                          ? theme === 'dark'
                            ? 'bg-zinc-700 text-zinc-100'
                            : 'bg-gray-100 text-gray-900'
                          : theme === 'dark'
                            ? 'text-zinc-400 hover:text-zinc-100'
                            : 'text-gray-500 hover:text-gray-900'
                      }`}
                    >
                      Difficulty
                      {selectedDifficulty !== 'All' && (
                        <span className="ml-1.5 px-1.5 py-0.5 rounded-full text-xs bg-purple-400 text-white">1</span>
                      )}
                    </button>
                  </div>

                  {/* Filter Content */}
                  <div className="py-2">
                    {activeFilterTab === 'topic' ? (
                      <>
                        {topics.map((topic) => (
                          <button
                            key={topic}
                            onClick={() => {
                              setSelectedTopic(topic);
                              setShowFilters(false);
                            }}
                            className={`block w-full text-left px-4 py-2 text-sm ${
                              theme === 'dark'
                                ? 'hover:bg-zinc-700 text-zinc-100'
                                : 'hover:bg-gray-100 text-gray-900'
                            } ${selectedTopic === topic ? (theme === 'dark' ? 'bg-zinc-700' : 'bg-gray-100') : ''}`}
                          >
                            {topic}
                          </button>
                        ))}
                      </>
                    ) : (
                      <>
                        {difficulties.map((difficulty) => (
                          <button
                            key={difficulty}
                            onClick={() => {
                              setSelectedDifficulty(difficulty);
                              setShowFilters(false);
                            }}
                            className={`block w-full text-left px-4 py-2 text-sm ${
                              theme === 'dark'
                                ? 'hover:bg-zinc-700 text-zinc-100'
                                : 'hover:bg-gray-100 text-gray-900'
                            } ${selectedDifficulty === difficulty ? (theme === 'dark' ? 'bg-zinc-700' : 'bg-gray-100') : ''}`}
                          >
                            {difficulty}
                          </button>
                        ))}
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>

            <ProgressBar
              progress={progress}
              color="bg-gradient-to-r from-purple-500 to-purple-400"
              textColor="text-purple-400"
            />
          </div>
        </div>

        {loading ? (
          <LoadingState />
        ) : filteredProblems.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid gap-4">
            {filteredProblems.map((problem) => (
              <motion.div
                key={problem._id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`rounded-lg relative group ${theme === 'dark'
                    ? 'bg-zinc-900/30 border border-zinc-800/50 hover:bg-zinc-900/50'
                    : 'bg-gray-50/50 border border-gray-200 hover:bg-gray-100/50'
                  } transition-colors`}
              >
                <div className="grid grid-cols-[auto_1fr_auto] items-center gap-4 p-4">
                  {/* Status */}
                  <button
                    onClick={() => handleToggle(problem._id)}
                    className={`flex-shrink-0 p-1.5 rounded-md transition-colors ${
                      !isInitialized
                        ? 'opacity-50 cursor-not-allowed'
                        : theme === 'dark'
                          ? 'hover:bg-zinc-800'
                          : 'hover:bg-gray-100'
                    }`}
                    title={!user ? 'Sign in to track your progress' : undefined}
                  >
                    <CheckCircle2
                      className={`w-5 h-5 ${
                        isInitialized && user && completedChallenges.includes(problem._id)
                          ? 'text-emerald-400'
                          : theme === 'dark'
                            ? 'text-zinc-600'
                            : 'text-gray-400'
                      }`}
                    />
                  </button>

                  {/* Problem Details */}
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                      <span className={`text-sm ${theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'}`}>
                        #{problem.srNo}
                      </span>
                      <div className={`flex items-center gap-1.5 px-2 py-0.5 rounded-md text-sm font-medium ${
                        theme === 'dark' ? 'bg-zinc-800/50' : 'bg-gray-100/50'
                      }`}>
                        <span className={getTopicColor(problem.topic)}>Topic:</span>
                        <span className={`${theme === 'dark' ? 'text-zinc-100' : 'text-gray-900'}`}>
                          {problem.topic}
                        </span>
                      </div>
                      <span className={`text-sm px-2 py-0.5 rounded-full ${getDifficultyColor(problem.difficulty)}`}>
                        {problem.difficulty}
                      </span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                      <h3 className={`text-base font-medium truncate ${
                        theme === 'dark' ? 'text-zinc-100' : 'text-gray-900'
                      }`}>
                        {problem.title}
                      </h3>
                      {/* <span className={`text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-500'}`}>
                        ({problem.name})
                      </span> */}
                    </div>
                  </div>

                  {/* Link Button */}
                  <a
                    href={problem.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex-shrink-0 inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                      theme === 'dark' 
                        ? 'bg-zinc-800/50 hover:bg-zinc-800 text-zinc-100' 
                        : 'bg-gray-100/50 hover:bg-gray-200 text-gray-900'
                    }`}
                  >
                    Solve
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
} 