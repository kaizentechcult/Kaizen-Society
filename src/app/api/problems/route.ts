import { NextResponse } from 'next/server';
import { connectMongoDB } from '@/lib/mongoose';
import Problem from '@/models/Problem';

export async function GET(req: Request) {
  try {
    await connectMongoDB();
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');

    const query = category ? { category } : {};
    const problems = await Problem.find(query).sort({ srNo: 1 });

    return NextResponse.json(problems);
  } catch (error) {
    console.error('Error in GET /api/problems:', error);
    return NextResponse.json({ 
      error: 'Failed to fetch problems',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectMongoDB();
    const { problems } = await req.json();

    // Clear existing problems of the same category if any
    if (problems.length > 0) {
      await Problem.deleteMany({ category: problems[0].category });
    }

    // Insert new problems
    const result = await Problem.create(problems);

    return NextResponse.json({ 
      message: 'Problems uploaded successfully',
      problems: result 
    }, { status: 201 });
  } catch (error) {
    console.error('Error in POST /api/problems:', error);
    return NextResponse.json({ 
      error: 'Failed to upload problems',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
