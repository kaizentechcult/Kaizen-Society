'use client';

import { useCallback, useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';

export function useCompletedChallenges(type: 'web-dev' | 'dsa', totalChallenges: number) {
  const { user } = useAuth();
  const [completedChallenges, setCompletedChallenges] = useState<string[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Fetch initial completed challenges
  useEffect(() => {
    const fetchCompletedChallenges = async () => {
      if (!user) {
        setCompletedChallenges([]);
        setIsInitialized(true);
        return;
      }

      try {
        const token = await user.getIdToken();
        const response = await fetch(`/api/user/progress?type=${type}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (!response.ok) throw new Error('Failed to fetch progress');
        const data = await response.json();
        setCompletedChallenges(data.completedChallenges);
      } catch (error) {
        console.error('Error fetching completed challenges:', error);
        setCompletedChallenges([]);
      } finally {
        setIsInitialized(true);
      }
    };

    fetchCompletedChallenges();
  }, [user, type]);

  const progress = totalChallenges === 0 ? 0 : Math.round((completedChallenges.length / totalChallenges) * 100);

  const toggleChallenge = useCallback(async (challengeId: string) => {
    if (!user || !isInitialized) return;

    const isCompleted = completedChallenges.includes(challengeId);
    const newCompleted = isCompleted
      ? completedChallenges.filter(id => id !== challengeId)
      : [...completedChallenges, challengeId];

    // Optimistically update UI
    setCompletedChallenges(newCompleted);

    try {
      const token = await user.getIdToken();
      const response = await fetch('/api/user/progress', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          type,
          challengeId,
          completed: !isCompleted
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update progress');
      }

      const data = await response.json();
      // Update with server data in case of any discrepancy
      setCompletedChallenges(data.completedChallenges);
    } catch (error) {
      console.error('Error updating progress:', error);
      // Revert optimistic update on error
      setCompletedChallenges(completedChallenges);
    }
  }, [user, isInitialized, completedChallenges, type]);

  return {
    completedChallenges,
    toggleChallenge,
    isInitialized,
    progress
  };
} 