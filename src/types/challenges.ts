export type Difficulty = 'Easy' | 'Medium' | 'Hard';

export interface Problem {
  _id: string;
  srNo: number;
  name: string;
  title: string;
  difficulty: Difficulty;
  category: 'DSA' | 'WebDev';
  topic: string;
}

export interface ProjectSubmission {
  _id: string;
  problemId: string;
  deployedUrl: string;
  status: 'pending' | 'approved' | 'rejected';
} 