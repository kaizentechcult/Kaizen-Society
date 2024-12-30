'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';

export function useCompletedChallenges(type: 'web-dev' | 'dsa', totalChallenges: number) {
  const [completedChallenges, setCompletedChallenges] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  // Calculate progress
  const progress = totalChallenges === 0 ? 0 : Math.round((completedChallenges.length / totalChallenges) * 100);

  // Fetch completed challenges
  useEffect(() => {
    async function fetchProgress() {
      try {
        const url = `/api/user/progress?type=${type}${user?.email ? `&email=${user.email}` : ''}`;
        const res = await fetch(url);
        const data = await res.json();

        if (!res.ok) throw new Error(data.error || 'Failed to fetch progress');
        setCompletedChallenges(data.completedChallenges);
      } catch (error) {
        console.error('Error fetching progress:', error);
        setCompletedChallenges([]);
      } finally {
        setIsLoading(false);
      }
    }

    fetchProgress();
  }, [type, user?.email]);

  // Toggle challenge completion
  const toggleChallenge = async (challengeId: string) => {
    if (!user?.email) {
      alert('Please log in to track your progress');
      return;
    }

    try {
      const completed = !completedChallenges.includes(challengeId);
      
      // Optimistically update UI
      setCompletedChallenges(prev => 
        completed 
          ? [...prev, challengeId]
          : prev.filter(id => id !== challengeId)
      );

      const res = await fetch('/api/user/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: user.email,
          type,
          challengeId,
          completed,
        }),
      });

      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || 'Failed to update progress');
      }

      // Update with server data
      setCompletedChallenges(data.completedChallenges);
      
    } catch (error) {
      console.error('Error updating progress:', error);
      
      // Revert optimistic update on error
      const completed = !completedChallenges.includes(challengeId);
      setCompletedChallenges(prev => 
        !completed 
          ? [...prev, challengeId]
          : prev.filter(id => id !== challengeId)
      );
    }
  };

  return {
    completedChallenges,
    toggleChallenge,
    isLoading,
    progress,
  };
} 