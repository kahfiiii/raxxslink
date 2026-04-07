import mongoose from 'mongoose';

export async function connectDB() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error('MONGODB_URI is not defined in .env');

  const opts = {
    bufferCommands: false, // Jangan biarkan numpuk kalau gagal
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 5000, // Timeout dalam 5 detik
    socketTimeoutMS: 45000,
  };

  // Serverless optimization: Reuse existing connection
  if (mongoose.connection.readyState >= 1) return;

  try {
    await mongoose.connect(uri, opts);
    console.log('✅ MongoDB connected successfully');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message);
    console.log('Tips: Pastikan IP kamu sudah di-whitelist (0.0.0.0/0) di MongoDB Atlas dan password di .env benar.');
  }
}


