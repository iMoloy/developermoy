import type { Request, Response, NextFunction } from 'express';
import { fromNodeHeaders } from 'better-auth/node';
import { getAuth } from '../lib/auth.js';
import { AppError } from './errorHandler.js';
import type { AuthenticatedRequest } from '../types/index.js';

/**
 * Express middleware that verifies the Better Auth session token
 * from the `Authorization: Bearer <token>` header or session cookie.
 *
 * On success:  populates `req.user` and calls `next()`.
 * On failure:  passes a 401 AppError to the error handler.
 */
export async function requireAuth(
  req: Request,
  _res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const auth = getAuth();

    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });

    if (!session?.user) {
      throw new AppError('Authentication required. Please sign in.', 401);
    }

    // Attach the verified user to the request object
    (req as AuthenticatedRequest).user = {
      id: session.user.id,
      email: session.user.email,
      role: 'user',
    };

    next();
  } catch (err) {
    // Preserve AppErrors; wrap anything else as 401
    if (err instanceof AppError) {
      next(err);
    } else {
      next(new AppError('Authentication required. Please sign in.', 401));
    }
  }
}
