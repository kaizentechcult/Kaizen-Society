'use client';

import { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLocalStorage } from './useLocalStorage';

export function useCompletedChallenges(type: 'web-dev' | 'dsa') {
  const { user } = useAuth();
  const [localCompleted, setLocalCompleted, isInitialized] = useLocalStorage<string[]>(`${type}CompletedChallenges`, []);

  // Fetch completed challenges from MongoDB when user logs in
  useEffect(() => {
    const fetchFromMongoDB = async () => {
      if (user && isInitialized) {
        try {
          const response = await fetch(`/api/completed-challenges?userId=${user.uid}&type=${type}`);
          const data = await response.json();
          if (data.completedChallenges) {
            setLocalCompleted(data.completedChallenges);
          }
        } catch (error) {
          console.error('Error fetching completed challenges:', error);
        }
      }
    };

    fetchFromMongoDB();
  }, [user, type, isInitialized]);

  // Save to MongoDB when user is logged in and challenges are updated
  const toggleChallenge = async (challengeId: string) => {
    if (!isInitialized) return; // Don't allow toggling until initialized

    const newCompleted = localCompleted.includes(challengeId)
      ? localCompleted.filter(id => id !== challengeId)
      : [...localCompleted, challengeId];

    setLocalCompleted(newCompleted);

    if (user) {
      try {
        await fetch('/api/completed-challenges', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: user.uid,
            type,
            completedChallenges: newCompleted
          }),
        });
      } catch (error) {
        console.error('Error saving completed challenges:', error);
      }
    }
  };

  return {
    completedChallenges: isInitialized ? localCompleted : [],
    toggleChallenge,
    isInitialized
  };
} 