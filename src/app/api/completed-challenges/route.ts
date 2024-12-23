import { NextResponse } from 'next/server';
import { connectMongoDB } from '@/lib/mongodb';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const type = searchParams.get('type');

    if (!userId || !type) {
        return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
    }

    try {
        const { db } = await connectMongoDB();
        const completedChallenges = await db
            .collection('completed-challenges')
            .findOne({ userId, type });

        return NextResponse.json({
            completedChallenges: completedChallenges?.challenges || []
        });
    } catch (error) {
        console.error('Database error:', error);
        return NextResponse.json({ error: 'Database error' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    const body = await request.json();
    const { userId, type, completedChallenges } = body;

    if (!userId || !type || !completedChallenges) {
        return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
    }

    try {
        const { db } = await connectMongoDB();
        await db.collection('completed-challenges').updateOne(
            { userId, type },
            {
                $set: {
                    challenges: completedChallenges,
                    updatedAt: new Date()
                }
            },
            { upsert: true }
        );

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Database error:', error);
        return NextResponse.json({ error: 'Database error' }, { status: 500 });
    }
} 