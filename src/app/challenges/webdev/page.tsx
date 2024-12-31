'use client';

import { useCompletedChallenges } from '@/hooks/useCompletedChallenges';
import { useChallenges } from '@/hooks/useChallenges';
import ChallengeLayout from '@/components/challenges/ChallengeLayout';

export default function WebDevChallenges() {
  const {
    problems,
    submissions,
    loading,
    submitting,
    showConfetti,
    handleSubmit,
    fetchProblems,
    isAuthenticated
  } = useChallenges({ category: 'WebDev' });

  const { progress } = useCompletedChallenges('web-dev', problems.length);

  return (
    <ChallengeLayout
      title="Web Development Challenges"
      // progress={progress}
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