import { connectMongoDB } from '@/lib/mongoose';
import ProjectSubmission from '@/models/ProjectSubmission';
import { successResponse, errorResponse } from '@/lib/api-response';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    await connectMongoDB();
    const { email, problemId, deployedUrl } = await req.json();

    if (!email || !problemId || !deployedUrl) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create or update submission
    const submission = await ProjectSubmission.findOneAndUpdate(
      { email, problemId },
      { deployedUrl, status: 'pending' },
      { upsert: true, new: true }
    );

    return NextResponse.json(
      { success: true, data: { submission } },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error in project submission:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to submit project' },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    await connectMongoDB();
    const { searchParams } = new URL(req.url);
    const email = searchParams.get('email');
    const problemId = searchParams.get('problemId');

    if (!email) {
      return NextResponse.json(
        { success: false, message: 'Email is required' },
        { status: 400 }
      );
    }

    const query = problemId ? { email, problemId } : { email };
    const submissions = await ProjectSubmission.find(query).sort({ createdAt: -1 });

    return NextResponse.json(
      { success: true, data: { submissions } },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching submissions:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch submissions' },
      { status: 500 }
    );
  }
} 