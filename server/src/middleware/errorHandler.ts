import type { Request, Response, NextFunction } from 'express';

// ── AppError ───────────────────────────────────────────────────
export class AppError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;

  constructor(message: string, statusCode = 500, isOperational = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this);
  }
}

// ── Type guard ─────────────────────────────────────────────────
function isAppError(err: unknown): err is AppError {
  return err instanceof AppError;
}

// ── Global Error Handler ───────────────────────────────────────
export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  const isDev = process.env['NODE_ENV'] === 'development';

  if (isAppError(err)) {
    res.status(err.statusCode).json({
      success: false,
      error: err.message,
      ...(isDev && { stack: err.stack }),
    });
    return;
  }

  // Handle Mongoose validation errors
  if (
    typeof err === 'object' &&
    err !== null &&
    'name' in err &&
    (err as { name: string }).name === 'ValidationError'
  ) {
    res.status(422).json({
      success: false,
      error: 'Validation failed.',
      ...(isDev && { details: err }),
    });
    return;
  }

  // Fallback — unexpected error
  console.error('Unhandled error:', err);
  res.status(500).json({
    success: false,
    error: 'An unexpected error occurred.',
    ...(isDev && { details: err instanceof Error ? err.message : err }),
  });
}
