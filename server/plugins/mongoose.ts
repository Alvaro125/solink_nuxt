import mongoose from 'mongoose';

export default defineNitroPlugin(async () => {
    try {
      const uri = process.env.MONGODB_URI;
      if (!uri) {
        throw new Error('DATABASE_URL is not defined.');
      }
      await mongoose.connect(uri);
      console.log('Connected to MongoDB');
    } catch (error) {
      console.error('MongoDB connection error:', error);
    }
  });