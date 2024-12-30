import { getApps, initializeApp, cert, type App } from 'firebase-admin/app';

export function getFirebaseAdmin(): App {
  if (getApps().length > 0) {
    return getApps()[0];
  }

  // For development environment, use a mock configuration if credentials are not available
  if (process.env.NODE_ENV === 'development') {
    const mockConfig = {
      projectId: process.env.FIREBASE_PROJECT_ID || 'demo-project',
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL || 'demo@example.com',
      privateKey: process.env.FIREBASE_PRIVATE_KEY || '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDHOy1Sj/kHIa0U\n-----END PRIVATE KEY-----\n'
    };

    return initializeApp({
      credential: cert(mockConfig),
    });
  }

  // For production, require proper credentials
  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY;

  if (!projectId || !clientEmail || !privateKey) {
    throw new Error('Firebase admin credentials are not properly configured in environment variables');
  }

  return initializeApp({
    credential: cert({
      projectId,
      clientEmail,
      privateKey: privateKey.replace(/\\n/g, '\n'),
    }),
  });
} 