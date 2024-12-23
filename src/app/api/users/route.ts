"use server";

import { NextResponse } from 'next/server';
import { connectMongoDB } from '@/lib/mongodb';

export async function GET() {
    try {
        const { db } = await connectMongoDB();
        const users = await db.collection('users').find({}).toArray();
        
        if (!users) {
            return NextResponse.json([], { status: 200 });
        }

        return NextResponse.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        return NextResponse.json(
            { error: 'Failed to fetch users' },
            { status: 500 }
        );
    }
}
