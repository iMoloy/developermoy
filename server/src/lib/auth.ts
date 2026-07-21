import { betterAuth, type BetterAuthOptions } from 'better-auth';
import { mongodbAdapter } from 'better-auth/adapters/mongodb';
import type { Auth } from 'better-auth';
import mongoose from 'mongoose';

// ── Auth singleton ─────────────────────────────────────────────
// Call initAuth() once after connectDB() resolves.
// Call getAuth() anywhere in the request lifecycle.

let _auth: Auth<BetterAuthOptions> | null = null;

/**
 * Initialises the Better Auth instance using the live Mongoose connection.
 * Must be called after `connectDB()` succeeds.
 */
export function initAuth(): Auth<BetterAuthOptions> {
  if (_auth) return _auth;

  // Derive the Db from the active Mongoose connection
  const db = mongoose.connection.getClient().db();

  _auth = betterAuth({
    database: mongodbAdapter(db),
    secret: process.env['BETTER_AUTH_SECRET']!,
    baseURL: process.env['BETTER_AUTH_URL'] ?? 'http://localhost:5000',
    trustedOrigins: (process.env['CLIENT_URL'] ?? 'http://localhost:3000')
      .split(',')
      .map((s) => s.trim()),

    // ── Auth strategies ──────────────────────────────────────
    emailAndPassword: {
      enabled: true,
      requireEmailVerification: false, // enable in production
    },

    // ── Social providers ─────────────────────────────────────
    // Uncomment and add credentials to .env to activate:
    //
    // socialProviders: {
    //   github: {
    //     clientId: process.env['GITHUB_CLIENT_ID']!,
    //     clientSecret: process.env['GITHUB_CLIENT_SECRET']!,
    //   },
    //   google: {
    //     clientId: process.env['GOOGLE_CLIENT_ID']!,
    //     clientSecret: process.env['GOOGLE_CLIENT_SECRET']!,
    //   },
    // },
  }) as unknown as Auth<BetterAuthOptions>;

  return _auth;
}

/**
 * Returns the initialised Better Auth instance.
 * Throws if called before `initAuth()`.
 */
export function getAuth(): Auth<BetterAuthOptions> {
  if (!_auth) {
    throw new Error(
      '[auth] getAuth() called before initAuth(). Ensure initAuth() is called after connectDB().'
    );
  }
  return _auth;
}
