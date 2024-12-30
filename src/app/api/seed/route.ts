import { connectMongoDB } from '@/lib/mongoose';
import { NextResponse } from 'next/server';
import Problem from '@/models/Problem';

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
        console.error('Error seeding problems:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
} 