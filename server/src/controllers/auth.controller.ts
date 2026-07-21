import type { Request, Response, NextFunction } from 'express';
import { fromNodeHeaders } from 'better-auth/node';
import { getAuth } from '../lib/auth.js';
import { User } from '../models/User.js';
import { AppError } from '../middleware/errorHandler.js';
import { asyncHandler } from '../types/index.js';

// ── POST /api/v1/auth/verify ───────────────────────────────────
/**
 * Verifies the current Better Auth session (from Authorization header
 * or session cookie) and upserts the authenticated user into MongoDB.
 *
 * Flow:
 *   1. Client signs in via Better Auth (email/password or OAuth).
 *   2. Client calls this endpoint with the session token.
 *   3. Server verifies the session and syncs user data to our User collection.
 *   4. Returns the synced user profile.
 *
 * This is the bridge between Better Auth's internal user store
 * and our application's User model.
 */
export const verifyAndSyncUser = asyncHandler(
  async (req: Request, res: Response, _next: NextFunction): Promise<void> => {
    const auth = getAuth();

    // ── 1. Verify session ──────────────────────────────────
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });

    if (!session?.user) {
      throw new AppError('Invalid or expired session token.', 401);
    }

    const { id: authId, email, name, image: avatarUrl } = session.user;

    if (!email) {
      throw new AppError('Session user is missing an email address.', 422);
    }

    // ── 2. Upsert user into our User collection ────────────
    // $setOnInsert: only written once when the document is first created.
    // $set:         keeps mutable fields (name, avatarUrl) in sync.
    const user = await User.findOneAndUpdate(
      { authId },
      {
        $setOnInsert: {
          authId,
          email: email.toLowerCase().trim(),
          name: name ?? 'Anonymous',
        },
        $set: {
          ...(name && { name }),
          ...(avatarUrl && { avatarUrl }),
        },
      },
      {
        upsert: true,
        new: true,
        runValidators: true,
        setDefaultsOnInsert: true,
      }
    );

    if (!user) {
      throw new AppError('Failed to sync user. Please try again.', 500);
    }

    // ── 3. Return sanitised user profile ──────────────────
    res.status(200).json({
      success: true,
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          avatarUrl: user.avatarUrl ?? null,
          preferences: user.preferences,
          savedItems: user.savedItems,
          createdAt: user.createdAt,
        },
      },
    });
  }
);

// ── GET /api/v1/auth/me ────────────────────────────────────────
/**
 * Returns the currently authenticated user's profile from MongoDB.
 * Assumes `requireAuth` middleware has already populated `req.user`.
 */
export const getMe = asyncHandler(
  async (req: Request, res: Response, _next: NextFunction): Promise<void> => {
    // req.user is populated by requireAuth middleware
    const authUser = (req as import('../types/index.js').AuthenticatedRequest).user;

    if (!authUser) {
      throw new AppError('Not authenticated.', 401);
    }

    const user = await User.findOne({ authId: authUser.id }).select(
      'name email avatarUrl preferences savedItems createdAt'
    );

    if (!user) {
      throw new AppError('User not found. Please call /auth/verify first.', 404);
    }

    res.status(200).json({
      success: true,
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          avatarUrl: user.avatarUrl ?? null,
          preferences: user.preferences,
          savedItems: user.savedItems,
          createdAt: user.createdAt,
        },
      },
    });
  }
);
