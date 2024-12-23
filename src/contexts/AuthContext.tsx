'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '@/lib/firebase';
import { User, GoogleAuthProvider, signInWithPopup, browserPopupRedirectResolver } from 'firebase/auth';
import { useRouter } from 'next/navigation';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signInWithGoogle: async () => { },
  logout: async () => { },
});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signInWithGoogle = async () => {
    if (isSigningIn) return;

    setIsSigningIn(true);
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({
      prompt: 'select_account'
    });

    try {
      const result = await signInWithPopup(auth, provider, browserPopupRedirectResolver);
      if (result.user) {
        console.log('Successfully signed in:', result.user.email);
        router.push('/challenges'); // Redirect after successful sign-in
      }
    } catch (error: any) {
      if (error.code !== 'auth/cancelled-popup-request') {
        console.error('Error signing in with Google:', error);
        // Show error to user
        alert('Failed to sign in with Google. Please try again.');
      }
    } finally {
      setIsSigningIn(false);
    }
  };

  const logout = async () => {
    try {
      await auth.signOut();
      router.push('/'); // Redirect to home after logout
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signInWithGoogle, logout }}>
      {children}
    </AuthContext.Provider>
  );
} 