'use client';

import { motion } from 'framer-motion';
import { useChallenges } from '@/hooks/useChallenges';
import { useCompletedChallenges } from '@/hooks/useCompletedChallenges';
import ChallengeLayout from '@/components/challenges/ChallengeLayout';

export default function DSAChallenges() {
  const {
    problems,
    submissions,
    loading,
    submitting,
    showConfetti,
    handleSubmit,
    fetchProblems,
    isAuthenticated
  } = useChallenges({ category: 'DSA' });

  const { progress } = useCompletedChallenges('dsa', problems.length);

  const handleDSASubmit = async (problemId: string, url: string) => {
    return await handleSubmit(problemId, url);
  };

  return (
    <ChallengeLayout
      title="DSA Challenges"
      progress={progress}
      loading={loading}
      problems={problems}
      submissions={submissions}
      submitting={submitting}
      showConfetti={showConfetti}
      onSubmit={handleDSASubmit}
      onRefresh={fetchProblems}
      isAuthenticated={isAuthenticated}
    />
  );
} 