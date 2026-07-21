import type { Request, Response, NextFunction } from 'express';

// ── Generic API Response ───────────────────────────────────────
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

// ── Paginated Response ─────────────────────────────────────────
export interface PaginatedResponse<T = unknown> {
  success: boolean;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// ── Base Mongoose Document fields ──────────────────────────────
export interface BaseDocument {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
}

// ── Request Utilities ──────────────────────────────────────────
/** Authenticated request (populated by auth middleware) */
export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: 'admin' | 'user';
  };
}

/** Express async handler wrapper to avoid try/catch repetition */
export type AsyncHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void>;

/**
 * Wraps an async route handler to forward errors to Express error middleware.
 */
export function asyncHandler(fn: AsyncHandler) {
  return (req: Request, res: Response, next: NextFunction): void => {
    fn(req, res, next).catch(next);
  };
}

// ── Pagination Query ───────────────────────────────────────────
export interface PaginationQuery {
  page?: string;
  limit?: string;
  sort?: string;
  order?: 'asc' | 'desc';
}

export function parsePagination(query: PaginationQuery): {
  page: number;
  limit: number;
  skip: number;
  sort: string;
  order: 1 | -1;
} {
  const page = Math.max(1, parseInt(query.page ?? '1', 10));
  const limit = Math.min(100, Math.max(1, parseInt(query.limit ?? '20', 10)));
  return {
    page,
    limit,
    skip: (page - 1) * limit,
    sort: query.sort ?? 'createdAt',
    order: query.order === 'asc' ? 1 : -1,
  };
}
