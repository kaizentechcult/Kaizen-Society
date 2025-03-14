'use client';

import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Login() {
  const { signInWithGoogle, user } = useAuth();
  const { theme } = useTheme();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) {
      router.push('/challenges');
    }
  }, [user, router]);

  const handleSignIn = async () => {
    setIsLoading(true);
    try {
      await signInWithGoogle();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`min-h-screen pt-32 ${
      theme === 'dark' ? 'bg-black text-white' : 'bg-white text-gray-900'
    }`}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`max-w-md mx-auto rounded-xl p-8 ${
            theme === 'dark'
              ? 'bg-zinc-900 border border-zinc-800'
              : 'bg-gray-50 border border-gray-200'
          }`}
        >
          <h1 className="text-3xl font-bold text-center mb-8">
            Welcome to{" "}
            <span className="bg-gradient-to-r from-purple-400 to-emerald-400 text-transparent bg-clip-text">
              Kaizen
            </span>
          </h1>
          
          <button
            onClick={handleSignIn}
            disabled={isLoading}
            className={`w-full rounded-lg px-4 py-3 flex items-center justify-center gap-3 transition-colors ${
              isLoading 
                ? 'opacity-50 cursor-not-allowed' 
                : theme === 'dark'
                  ? 'bg-white text-black hover:bg-gray-100'
                  : 'bg-black text-white hover:bg-gray-900'
            }`}
          >
            {isLoading ? (
              <div className={`animate-spin rounded-full h-5 w-5 border-b-2 ${
                theme === 'dark' ? 'border-black' : 'border-white'
              }`}></div>
            ) : (
              <>
                <svg className="w-6 h-6" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Continue with Google
              </>
            )}
          </button>
        </motion.div>
      </div>
    </div>
  );
} 