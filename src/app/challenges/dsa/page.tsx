'use client';

import { useCompletedChallenges } from '@/hooks/useCompletedChallenges';
import { useChallenges } from '@/hooks/useChallenges';
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

  return (
    <ChallengeLayout
      title="DSA Challenges"
      progress={progress}
      loading={loading}
      problems={problems}
      submissions={submissions}
      submitting={submitting}
      showConfetti={showConfetti}
      onSubmit={handleSubmit}
      onRefresh={fetchProblems}
      isAuthenticated={isAuthenticated}
    />
  );
} 