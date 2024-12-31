import { connectMongoDB } from '@/lib/mongoose';
import ProjectSubmission from '@/models/ProjectSubmission';
import { successResponse, errorResponse } from '@/lib/api-response';

export async function POST(req: Request) {
  try {
    await connectMongoDB();
    const { email, problemId, deployedUrl } = await req.json();

    if (!email || !problemId || !deployedUrl) {
      return errorResponse('Missing required fields', 400);
    }

    // Create or update submission
    const submission = await ProjectSubmission.findOneAndUpdate(
      { email, problemId },
      { deployedUrl, status: 'pending' },
      { upsert: true, new: true }
    );

    return successResponse({ submission });
  } catch (error) {
    console.error('Error in project submission:', error);
    return errorResponse('Failed to submit project');
  }
}

export async function GET(req: Request) {
  try {
    await connectMongoDB();
    const { searchParams } = new URL(req.url);
    const email = searchParams.get('email');
    const problemId = searchParams.get('problemId');

    if (!email) {
      return errorResponse('Email is required', 400);
    }

    const query = problemId ? { email, problemId } : { email };
    const submissions = await ProjectSubmission.find(query).sort({ createdAt: -1 });

    return successResponse({ submissions });
  } catch (error) {
    console.error('Error fetching submissions:', error);
    return errorResponse('Failed to fetch submissions');
  }
} 