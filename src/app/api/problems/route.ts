import { connectMongoDB } from '@/lib/mongoose';
import { NextResponse } from 'next/server';
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
        console.error('Error fetching problems:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        await connectMongoDB();
        const body = await req.json();
        const result = await Problem.create(body);
        return NextResponse.json(result, { status: 201 });
    } catch (error) {
        console.error('Error creating problem:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
