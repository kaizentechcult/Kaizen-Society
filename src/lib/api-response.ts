import { NextResponse } from 'next/server';

export function successResponse(data: any, status = 200) {
  return NextResponse.json({
    success: true,
    data,
    timestamp: new Date().toISOString(),
  }, { status });
}

export function errorResponse(message: string, status = 500) {
  return NextResponse.json({
    success: false,
    error: message,
    timestamp: new Date().toISOString(),
  }, { status });
} 