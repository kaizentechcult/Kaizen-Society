import { NextResponse } from 'next/server';
import { connectMongoDB } from '@/lib/mongoose';
import Problem from '@/models/Problem';

const dsaProblems = [
  {
    srNo: 10,
    name: "Array Properties",
    title: "Palindromic Array",
    link: "https://www.geeksforgeeks.org/problems/palindromic-array-1587115620/1",
    difficulty: "Easy",
    category: "DSA"
  },
  {
    srNo: 11,
    name: "Number Manipulation",
    title: "Reverse integer",
    link: "https://leetcode.com/problems/reverse-integer/description/",
    difficulty: "Easy",
    category: "DSA"
  },
  {
    srNo: 12,
    name: "Array Duplicates",
    title: "Remove Duplicates from Sorted Array",
    link: "https://leetcode.com/problems/remove-duplicates-from-sorted-array/",
    difficulty: "Easy",
    category: "DSA"
  },
  {
    srNo: 13,
    name: "Array Sorting",
    title: "Check if the array is sorted and rotated",
    link: "https://leetcode.com/problems/check-if-array-is-sorted-and-rotated/description/",
    difficulty: "Medium",
    category: "DSA"
  }
];

export async function GET() {
  try {
    await connectMongoDB();

    // Clear existing DSA problems
    await Problem.deleteMany({ category: 'DSA' });

    // Insert new problems
    const result = await Problem.create(dsaProblems);

    return NextResponse.json({ 
      message: 'Database seeded successfully',
      problems: result 
    }, { status: 201 });
  } catch (error) {
    console.error('Error seeding database:', error);
    return NextResponse.json({ 
      error: 'Failed to seed database',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
} 