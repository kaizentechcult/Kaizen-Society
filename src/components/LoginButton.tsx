'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';

export default function LoginButton() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const { theme } = useTheme();

  const handleClick = () => {
    if (user) {
      logout();
    } else {
      router.push('/login');
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
        theme === 'dark'
          ? (user
            ? 'bg-zinc-900 text-white hover:bg-zinc-800 border border-zinc-800'
            : 'bg-white text-black hover:bg-gray-100')
          : (user
            ? 'bg-gray-100 text-gray-900 hover:bg-gray-200 border border-gray-200'
            : 'bg-gray-900 text-white hover:bg-gray-800')
      }`}
    >
      {user ? 'Sign Out' : 'Sign In'}
    </button>
  );
} 