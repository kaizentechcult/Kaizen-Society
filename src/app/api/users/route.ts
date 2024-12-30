"use server";

import { connectMongoDB } from '@/lib/mongoose';
import { NextResponse } from 'next/server';
import User from '@/models/User';

export async function GET() {
    try {
        await connectMongoDB();
        const users = await User.find({});
        return NextResponse.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
