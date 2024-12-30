import mongoose from 'mongoose';

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your Mongo URI to .env.local');
}

export const connectMongoDB = async () => {
  try {
    const { connection } = await mongoose.connect(process.env.MONGODB_URI);
    if (connection.readyState === 1) {
      console.log('MongoDB connected');
      return;
    }
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
}; 