import { Router } from 'express';
import { authRouter } from './auth.js';
import { projectsRouter } from './projects.js';

export const v1Router = Router();

// ── v1 Route registry ──────────────────────────────────────────
v1Router.use('/auth', authRouter);
v1Router.use('/projects', projectsRouter);

// ── v1 root ────────────────────────────────────────────────────
v1Router.get('/', (_req, res) => {
  res.json({
    success: true,
    data: {
      version: 'v1',
      message: 'DeveloperMoy API v1',
      endpoints: [
        'POST   /api/v1/auth/verify',
        'GET    /api/v1/auth/me',
        'GET    /api/v1/projects',
        'GET    /api/v1/projects/:id',
        'POST   /api/v1/projects (Protected)',
        'PATCH  /api/v1/projects/:id (Protected)',
        'DELETE /api/v1/projects/:id (Protected)',
      ],
    },
  });
});

