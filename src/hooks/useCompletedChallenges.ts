'use client';

import { useCallback, useMemo } from 'react';
import { useLocalStorage } from './useLocalStorage';

export function useCompletedChallenges(type: 'web-dev' | 'dsa', totalChallenges: number) {
  const [localCompleted, setLocalCompleted, isInitialized] = useLocalStorage<string[]>(`${type}CompletedChallenges`, []);

  const progress = useMemo(() => {
    if (!isInitialized || totalChallenges === 0) return 0;
    return Math.round((localCompleted.length / totalChallenges) * 100);
  }, [localCompleted.length, totalChallenges, isInitialized]);

  const toggleChallenge = useCallback(async (challengeId: string) => {
    if (!isInitialized) return;

    const newCompleted = localCompleted.includes(challengeId)
      ? localCompleted.filter(id => id !== challengeId)
      : [...localCompleted, challengeId];

    setLocalCompleted(newCompleted);
  }, [isInitialized, localCompleted, setLocalCompleted]);

  return {
    completedChallenges: isInitialized ? localCompleted : [],
    toggleChallenge,
    isInitialized,
    progress
  };
} 