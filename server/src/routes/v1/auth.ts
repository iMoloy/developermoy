import { Router } from 'express';
import { verifyAndSyncUser, getMe } from '../../controllers/auth.controller.js';
import { requireAuth } from '../../middleware/requireAuth.js';

export const authRouter = Router();

// ── POST /api/v1/auth/verify ───────────────────────────────────
// Validates the Better Auth session token and upserts the user
// into MongoDB. Call this immediately after sign-in on the client.
//
// Headers: Authorization: Bearer <session-token>
//    OR:   cookie: better-auth.session_token=<token>
//
// Response: { success: true, data: { user: {...} } }
authRouter.post('/verify', verifyAndSyncUser);

// ── GET /api/v1/auth/me ────────────────────────────────────────
// Returns the authenticated user's full profile from MongoDB.
// Protected — requires a valid session token.
authRouter.get('/me', requireAuth, getMe);
