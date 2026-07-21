import { Router } from 'express';

export const v1Router = Router();

// ── v1 API Routes ──────────────────────────────────────────────
// Mount feature routers here as the app grows:
//
//   import { authRouter }    from './auth.js';
//   import { usersRouter }   from './users.js';
//   import { projectRouter } from './projects.js';
//
//   v1Router.use('/auth',     authRouter);
//   v1Router.use('/users',    usersRouter);
//   v1Router.use('/projects', projectRouter);

v1Router.get('/', (_req, res) => {
  res.json({
    success: true,
    data: {
      version: 'v1',
      message: 'DeveloperMoy API v1',
    },
  });
});
