import mongoose from 'mongoose';

const MONGODB_URI = process.env['MONGODB_URI'];
const MAX_RETRIES = 5;
const RETRY_DELAY_MS = 3000;

// ── Mongoose Connection ────────────────────────────────────────
export async function connectDB(retries = MAX_RETRIES): Promise<void> {
  if (!MONGODB_URI) {
    throw new Error('MONGODB_URI environment variable is not set.');
  }

  try {
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    console.log(`✓ MongoDB connected: ${mongoose.connection.host}`);
  } catch (err) {
    if (retries > 0) {
      console.warn(`  MongoDB connection failed. Retrying in ${RETRY_DELAY_MS}ms… (${retries} attempts left)`);
      await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY_MS));
      return connectDB(retries - 1);
    }
    throw new Error(`Could not connect to MongoDB after ${MAX_RETRIES} attempts.`);
  }
}

// ── Event Listeners ────────────────────────────────────────────
mongoose.connection.on('disconnected', () => {
  console.warn('⚠ MongoDB disconnected.');
});

mongoose.connection.on('error', (err: Error) => {
  console.error('MongoDB error:', err.message);
});
