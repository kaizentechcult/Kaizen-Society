'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { useState } from 'react';

interface SubmissionPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (url: string) => Promise<boolean>;
  submitting: boolean;
}

export default function SubmissionPopup({ isOpen, onClose, onSubmit, submitting }: SubmissionPopupProps) {
  const { theme } = useTheme();
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim()) {
      setError('');
      try {
        const success = await onSubmit(url.trim());
        if (success) {
          setUrl('');
        } else {
          setError('Failed to submit project. Please try again.');
        }
      } catch (error) {
        setError('Failed to submit project. Please try again.');
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Popup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative w-full max-w-md mx-4"
          >
            <div className={`rounded-xl shadow-lg ${
              theme === 'dark' 
                ? 'bg-zinc-900 border border-zinc-800' 
                : 'bg-white border border-gray-200'
            }`}>
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-zinc-800">
                <h3 className={`text-lg font-semibold ${
                  theme === 'dark' ? 'text-zinc-100' : 'text-gray-900'
                }`}>
                  Submit Project
                </h3>
                <button
                  onClick={onClose}
                  className={`p-1 rounded-lg hover:bg-zinc-800 transition-colors ${
                    theme === 'dark' ? 'text-zinc-400' : 'text-gray-500'
                  }`}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Content */}
              <form onSubmit={handleSubmit} className="p-4">
                <div className="mb-4">
                  <label
                    htmlFor="url"
                    className={`block mb-2 text-sm font-medium ${
                      theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'
                    }`}
                  >
                    Deployed Project URL
                  </label>
                  <input
                    type="url"
                    id="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://your-project.vercel.app"
                    required
                    className={`w-full px-3 py-2 rounded-lg border ${
                      theme === 'dark'
                        ? 'bg-zinc-800/50 border-zinc-700 text-zinc-100 placeholder:text-zinc-500'
                        : 'bg-white border-gray-300 text-gray-900 placeholder:text-gray-400'
                    } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  />
                  {error && (
                    <p className="mt-2 text-sm text-red-500">
                      {error}
                    </p>
                  )}
                </div>

                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={onClose}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      theme === 'dark'
                        ? 'bg-zinc-800 hover:bg-zinc-700 text-zinc-300'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    }`}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting || !url.trim()}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      submitting || !url.trim()
                        ? 'bg-blue-500/50 text-blue-200 cursor-not-allowed'
                        : 'bg-blue-500 hover:bg-blue-600 text-white'
                    }`}
                  >
                    {submitting ? 'Submitting...' : 'Submit'}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
} 