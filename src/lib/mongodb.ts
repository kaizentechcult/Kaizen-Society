import { MongoClient } from 'mongodb';

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your Mongo URI to .env.local');
}


const uri = process.env.MONGODB_URI;
// const dbName = process.env.MONGODB_DB;

let cachedClient: MongoClient | null = null;
let cachedDb: any = null;

export async function connectMongoDB() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  const client = await MongoClient.connect(uri);
  const db = client.db(uri);

  cachedClient = client;
  cachedDb = db;

  return { client, db };
}
