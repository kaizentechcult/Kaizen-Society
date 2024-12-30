import { NextResponse } from 'next/server';
import { connectMongoDB } from '@/lib/mongoose';
import { getAuth, type Auth } from 'firebase-admin/auth';
import { getFirebaseAdmin } from '@/lib/firebase-admin';
import UserProgress from '@/models/UserProgress';

// Initialize Firebase Admin if not already initialized
let adminAuth: Auth | undefined;
try {
  const app = getFirebaseAdmin();
  adminAuth = getAuth(app);
} catch (error) {
  console.error('Failed to initialize Firebase Admin:', error);
}

async function verifyAuth(req: Request) {
  // Skip auth in development if no Firebase credentials
  if (process.env.NODE_ENV === 'development' && !process.env.FIREBASE_PROJECT_ID) {
    return { uid: 'demo-user' };
  }

  if (!adminAuth) {
    throw new Error('Firebase Admin not initialized');
  }

  const authHeader = req.headers.get('authorization');
  if (!authHeader?.startsWith('Bearer ')) {
    throw new Error('Unauthorized');
  }

  const token = authHeader.split('Bearer ')[1];
  return await adminAuth.verifyIdToken(token);
}

export async function GET(req: Request) {
  try {
    const decodedToken = await verifyAuth(req);
    const userId = decodedToken.uid;

    const { searchParams } = new URL(req.url);
    const type = searchParams.get('type') as 'dsa' | 'web-dev';
    
    if (!type) {
      return NextResponse.json({ error: 'Type is required' }, { status: 400 });
    }

    await connectMongoDB();
    const userProgress = await UserProgress.findOne({ userId, type });

    return NextResponse.json({
      completedChallenges: userProgress?.completedChallenges || []
    });
  } catch (error: unknown) {
    console.error('Error fetching user progress:', error);
    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const decodedToken = await verifyAuth(req);
    const userId = decodedToken.uid;

    const { type, challengeId, completed } = await req.json();
    
    if (!type || !challengeId) {
      return NextResponse.json({ error: 'Type and challengeId are required' }, { status: 400 });
    }

    await connectMongoDB();
    
    let userProgress;
    if (completed) {
      // Add challenge to completed list
      userProgress = await UserProgress.findOneAndUpdate(
        { userId, type },
        { 
          $addToSet: { completedChallenges: challengeId }
        },
        { upsert: true, new: true }
      );
    } else {
      // Remove challenge from completed list
      userProgress = await UserProgress.findOneAndUpdate(
        { userId, type },
        { 
          $pull: { completedChallenges: challengeId }
        },
        { upsert: true, new: true }
      );
    }

    return NextResponse.json({
      completedChallenges: userProgress.completedChallenges
    });
  } catch (error: unknown) {
    console.error('Error updating user progress:', error);
    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
} 