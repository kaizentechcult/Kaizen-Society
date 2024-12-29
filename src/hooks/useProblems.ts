'use client';

import { useState, useEffect } from 'react';

export interface Problem {
  _id: string;
  srNo: number;
  name: string;
  title: string;
  link: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: 'DSA' | 'WebDev';
}

const dsaProblems: Problem[] = [
  {
    _id: 'dsa10',
    srNo: 10,
    name: "Array Properties",
    title: "Palindromic Array",
    link: "https://www.geeksforgeeks.org/problems/palindromic-array-1587115620/1",
    difficulty: "Easy",
    category: "DSA"
  },
  {
    _id: 'dsa11',
    srNo: 11,
    name: "Number Manipulation",
    title: "Reverse integer",
    link: "https://leetcode.com/problems/reverse-integer/description/",
    difficulty: "Easy",
    category: "DSA"
  },
  {
    _id: 'dsa12',
    srNo: 12,
    name: "Array Duplicates",
    title: "Remove Duplicates from Sorted Array",
    link: "https://leetcode.com/problems/remove-duplicates-from-sorted-array/",
    difficulty: "Easy",
    category: "DSA"
  },
  {
    _id: 'dsa13',
    srNo: 13,
    name: "Array Sorting",
    title: "Check if the array is sorted and rotated",
    link: "https://leetcode.com/problems/check-if-array-is-sorted-and-rotated/description/",
    difficulty: "Medium",
    category: "DSA"
  }
];

const webDevProblems: Problem[] = [];

export function useProblems(category: 'DSA' | 'WebDev') {
  const [problems, setProblems] = useState<Problem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate API loading
    setLoading(true);
    setTimeout(() => {
      setProblems(category === 'DSA' ? dsaProblems : webDevProblems);
      setLoading(false);
    }, 500);
  }, [category]);

  return { problems, loading, error };
} 