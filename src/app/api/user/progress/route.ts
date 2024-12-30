import { NextResponse } from 'next/server';
import { connectMongoDB } from '@/lib/mongoose';
import UserProgress from '@/models/UserProgress';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get('email');
    const type = searchParams.get('type') as 'dsa' | 'web-dev';
    
    if (!type) {
      return NextResponse.json({ error: 'Type is required' }, { status: 400 });
    }

    // If no email is provided (user not logged in), return empty progress
    if (!email) {
      return NextResponse.json({ completedChallenges: [] });
    }

    await connectMongoDB();
    
    const progress = await UserProgress.findOne({ email, type }).select('completedChallenges -_id').lean();
    return NextResponse.json({ 
      completedChallenges: progress?.completedChallenges || [] 
    });

  } catch (error) {
    console.error('Error fetching progress:', error);
    return NextResponse.json({ error: 'Failed to fetch progress' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { email, type, challengeId, completed } = await req.json();
    
    if (!email || !type || !challengeId) {
      return NextResponse.json({ 
        error: 'Email, type, and challengeId are required' 
      }, { status: 400 });
    }

    await connectMongoDB();

    const update = completed
      ? { $addToSet: { completedChallenges: challengeId } }
      : { $pull: { completedChallenges: challengeId } };

    const progress = await UserProgress.findOneAndUpdate(
      { email, type },
      update,
      { 
        new: true,
        upsert: true,
        select: 'completedChallenges -_id'
      }
    ).lean();

    return NextResponse.json({ 
      completedChallenges: progress?.completedChallenges || [] 
    });

  } catch (error: any) {
    console.error('Error updating progress:', error);
    
    // Handle specific MongoDB errors
    if (error.code === 11000) {
      return NextResponse.json({ 
        error: 'Progress already exists for this user and type' 
      }, { status: 409 });
    }

    return NextResponse.json({ 
      error: 'Failed to update progress' 
    }, { status: 500 });
  }
} 