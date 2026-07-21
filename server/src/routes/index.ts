import { Router } from 'express';
import { v1Router } from './v1/index.js';

export const rootRouter = Router();

// ── Health Check ───────────────────────────────────────────────
rootRouter.get('/health', (_req, res) => {
  res.json({
    success: true,
    data: {
      status: 'ok',
      timestamp: new Date().toISOString(),
      env: process.env['NODE_ENV'] ?? 'development',
    },
  });
});

// ── API v1 ─────────────────────────────────────────────────────
rootRouter.use('/v1', v1Router);

// ── 404 for unmatched API routes ───────────────────────────────
rootRouter.use((_req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found.',
  });
});
