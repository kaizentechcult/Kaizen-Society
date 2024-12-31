import { connectMongoDB } from '@/lib/mongoose';
import Problem from '@/models/Problem';
import { successResponse, errorResponse } from '@/lib/api-response';

export async function GET(req: Request) {
    try {
        await connectMongoDB();
        const { searchParams } = new URL(req.url);
        const category = searchParams.get('category');

        const query = category ? { category } : {};
        const problems = await Problem.find(query).sort({ srNo: 1 });
        return successResponse(problems);
    } catch (error) {
        console.error('Error fetching problems:', error);
        return errorResponse('Internal Server Error', 500);
    }
}

export async function POST(req: Request) {
    try {
        await connectMongoDB();
        const body = await req.json();
        const result = await Problem.create(body);
        return successResponse(result, 201);
    } catch (error) {
        console.error('Error creating problem:', error);
        return errorResponse('Internal Server Error', 500);
    }
}
