'use client';

import { useState, useEffect } from 'react';

export interface Problem {
  _id: string;
  srNo: number;
  name: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: 'DSA' | 'WebDev';
  topic: string;
}

const dsaProblems: Problem[] = [
  {
    _id: 'dsa10',
    srNo: 10,
    name: "Array Properties",
    title: "Palindromic Array",
    difficulty: "Easy",
    category: "DSA",
    topic: "Arrays"
  },
  {
    _id: 'dsa11',
    srNo: 11,
    name: "Number Manipulation",
    title: "Reverse integer",
    difficulty: "Easy",
    category: "DSA",
    topic: "Numbers"
  },
  {
    _id: 'dsa12',
    srNo: 12,
    name: "Array Duplicates",
    title: "Remove Duplicates from Sorted Array",
    difficulty: "Easy",
    category: "DSA",
    topic: "Arrays"
  },
  {
    _id: 'dsa13',
    srNo: 13,
    name: "Array Sorting",
    title: "Check if the array is sorted and rotated",
    difficulty: "Medium",
    category: "DSA",
    topic: "Arrays"
  }
];

const webDevProblems: Problem[] = [
  {
    _id: 'web1',
    srNo: 1,
    name: "portfolio",
    title: "Build a Personal Portfolio",
    difficulty: "Easy",
    category: "WebDev",
    topic: "HTML"
  },
  {
    _id: 'web2',
    srNo: 2,
    name: "responsive-landing",
    title: "Create a Responsive Landing Page",
    difficulty: "Easy",
    category: "WebDev",
    topic: "CSS"
  },
  {
    _id: 'web3',
    srNo: 3,
    name: "todo-app",
    title: "Build a Todo List Application",
    difficulty: "Easy",
    category: "WebDev",
    topic: "JavaScript"
  },
  {
    _id: 'web4',
    srNo: 4,
    name: "weather-app",
    title: "Weather Dashboard with API Integration",
    difficulty: "Medium",
    category: "WebDev",
    topic: "JavaScript"
  },
  {
    _id: 'web5',
    srNo: 5,
    name: "blog-platform",
    title: "Create a Blog Platform",
    difficulty: "Medium",
    category: "WebDev",
    topic: "React"
  },
  {
    _id: 'web6',
    srNo: 6,
    name: "ecommerce",
    title: "E-commerce Product Page",
    difficulty: "Medium",
    category: "WebDev",
    topic: "React"
  },
  {
    _id: 'web7',
    srNo: 7,
    name: "chat-app",
    title: "Real-time Chat Application",
    difficulty: "Hard",
    category: "WebDev",
    topic: "Node.js"
  },
  {
    _id: 'web8',
    srNo: 8,
    name: "social-media",
    title: "Social Media Dashboard",
    difficulty: "Hard",
    category: "WebDev",
    topic: "React"
  },
  {
    _id: 'web9',
    srNo: 9,
    name: "auth-system",
    title: "Authentication System",
    difficulty: "Hard",
    category: "WebDev",
    topic: "Node.js"
  },
  {
    _id: 'web10',
    srNo: 10,
    name: "cms-dashboard",
    title: "Content Management System",
    difficulty: "Hard",
    category: "WebDev",
    topic: "React"
  }
];

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