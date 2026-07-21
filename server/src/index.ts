import 'dotenv/config';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import { rateLimit } from 'express-rate-limit';
import { connectDB } from './config/db.js';
import { corsMiddleware } from './config/cors.js';
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

// ── Routes ─────────────────────────────────────────────────────
app.use('/api', rootRouter);

// ── Error Handler (must be last) ──────────────────────────────
app.use(errorHandler);

// ── Bootstrap ─────────────────────────────────────────────────
async function bootstrap(): Promise<void> {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`✓ Server running on http://localhost:${PORT}`);
    console.log(`  ENV: ${process.env['NODE_ENV'] ?? 'development'}`);
  });
}

bootstrap().catch((err: unknown) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});

export default app;
