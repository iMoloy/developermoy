import cors, { type CorsOptions } from 'cors';

// ── Allowed Origins ────────────────────────────────────────────
const allowedOrigins: string[] = (process.env['CLIENT_URL'] ?? 'http://localhost:3000')
  .split(',')
  .map((origin) => origin.trim());

const corsOptions: CorsOptions = {
  origin(requestOrigin, callback) {
    // Allow requests with no origin (server-to-server, curl, Postman)
    if (!requestOrigin) {
      callback(null, true);
      return;
    }

    if (allowedOrigins.includes(requestOrigin)) {
      callback(null, true);
    } else {
      callback(new Error(`CORS: Origin '${requestOrigin}' is not allowed.`));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  maxAge: 86400, // 24 hours — cache preflight
};

export const corsMiddleware = cors(corsOptions);
