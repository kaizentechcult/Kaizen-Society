import { useState, useCallback, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { Problem, ProjectSubmission } from '@/types/challenges';

interface UseChallengesProps {
  category: 'DSA' | 'WebDev';
}

export function useChallenges({ category }: UseChallengesProps) {
  const { user } = useAuth();
  const router = useRouter();
  const [problems, setProblems] = useState<Problem[]>([]);
  const [submissions, setSubmissions] = useState<Record<string, ProjectSubmission>>({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState<string | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);

  const fetchProblems = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/problems?category=${category}`);
      if (!response.ok) throw new Error('Failed to fetch problems');
      const result = await response.json();
      if (result.success && Array.isArray(result.data)) {
        setProblems(result.data);
      } else {
        console.error('Invalid response format:', result);
        setProblems([]);
      }
    } catch (error) {
      console.error('Error fetching problems:', error);
      setProblems([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchSubmissions = useCallback(async () => {
    if (!user?.email) return;
    try {
      const response = await fetch(`/api/project-submission?email=${user.email}`);
      if (!response.ok) throw new Error('Failed to fetch submissions');
      const result = await response.json();
      if (result.success && Array.isArray(result.data.submissions)) {
        const submissionsMap = result.data.submissions.reduce((acc: Record<string, ProjectSubmission>, sub: ProjectSubmission) => {
          acc[sub.problemId] = sub;
          return acc;
        }, {});
        setSubmissions(submissionsMap);
      }
    } catch (error) {
      console.error('Error fetching submissions:', error);
    }
  }, [user?.email]);

  const handleSubmit = async (problemId: string, deployedUrl: string) => {
    if (!user) {
      router.push('/login');
      return false;
    }

    try {
      setSubmitting(problemId);

      if (category === 'DSA') {
        // For DSA, just mark as completed
        const submission: ProjectSubmission = {
          _id: `${problemId}_${Date.now()}`,
          problemId,
          deployedUrl: '',
          status: 'approved'
        };
        setSubmissions(prev => ({
          ...prev,
          [problemId]: submission
        }));
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 3000);
        return true;
      }

      // For WebDev, submit project URL
      const response = await fetch('/api/project-submission', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: user.email,
          problemId,
          deployedUrl
        })
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        console.error('Submission failed:', result);
        return false;
      }

      await fetchSubmissions();
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
      return true;
    } catch (error) {
      console.error('Error submitting project:', error);
      return false;
    } finally {
      setSubmitting(null);
    }
  };

  useEffect(() => {
    fetchProblems();
  }, []);

  useEffect(() => {
    if (user?.email) {
      fetchSubmissions();
    }
  }, [user?.email, fetchSubmissions]);

  return {
    problems,
    submissions,
    loading,
    submitting,
    showConfetti,
    setShowConfetti,
    handleSubmit,
    fetchProblems,
    isAuthenticated: !!user
  };
} 