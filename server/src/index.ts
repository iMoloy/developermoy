import 'dotenv/config';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import { rateLimit } from 'express-rate-limit';
import { toNodeHandler } from 'better-auth/node';
import { connectDB } from './config/db.js';
import { corsMiddleware } from './config/cors.js';
import { initAuth } from './lib/auth.js';
import { rootRouter } from './routes/index.js';
import { errorHandler } from './middleware/errorHandler.js';

// ── App Factory ────────────────────────────────────────────────
const app = express();
const PORT = Number(process.env['PORT'] ?? 5000);

// ── Security Middleware ────────────────────────────────────────
app.use(helmet());
app.use(corsMiddleware);

// ── Rate Limiting ──────────────────────────────────────────────
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: { success: false, error: 'Too many requests. Please try again later.' },
});
app.use(limiter);

// ── Body Parsing ───────────────────────────────────────────────
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

// ── Logging ────────────────────────────────────────────────────
if (process.env['NODE_ENV'] !== 'test') {
  app.use(morgan(process.env['NODE_ENV'] === 'production' ? 'combined' : 'dev'));
}

// ── Application Routes ─────────────────────────────────────────
// NOTE: Better Auth handler is mounted BEFORE the API router.
// It intercepts all /api/auth/* requests (sign-in, sign-up,
// session refresh, sign-out, OAuth callbacks, etc.).
// Our custom /api/v1/auth/verify sits under rootRouter.
app.use('/api', rootRouter);

// ── Error Handler (must be last) ──────────────────────────────
app.use(errorHandler);

// ── Bootstrap ─────────────────────────────────────────────────
async function bootstrap(): Promise<void> {
  // 1. Connect to MongoDB first — auth adapter needs a live connection
  await connectDB();

  // 2. Initialise Better Auth (wires the MongoDB adapter)
  const auth = initAuth();

  // 3. Mount Better Auth's built-in handler at /api/auth/*
  //    This handles: sign-in, sign-up, sign-out, session,
  //    email verification, password reset, OAuth callbacks.
  app.all('/api/auth/{*path}', toNodeHandler(auth));

  // 4. Start listening
  app.listen(PORT, () => {
    console.log(`✓ Server running on http://localhost:${PORT}`);
    console.log(`  ENV: ${process.env['NODE_ENV'] ?? 'development'}`);
    console.log(`  Auth: http://localhost:${PORT}/api/auth`);
  });
}

bootstrap().catch((err: unknown) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});

export default app;

