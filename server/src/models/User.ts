import { Schema, model, type Document, type Types } from 'mongoose';

// ── Preferences sub-document ───────────────────────────────────
export interface IUserPreferences {
  theme: 'light' | 'dark' | 'system';
  emailNotifications: boolean;
}

// ── User document interface ────────────────────────────────────
export interface IUser extends Document {
  _id: Types.ObjectId;
  name: string;
  email: string;
  /** Unique ID from the auth provider (Better Auth user.id) */
  authId: string;
  avatarUrl?: string;
  preferences: IUserPreferences;
  /** ObjectId references to saved Project documents */
  savedItems: Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

// ── Schema ─────────────────────────────────────────────────────
const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      maxlength: [100, 'Name must be at most 100 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Invalid email format'],
    },
    authId: {
      type: String,
      required: [true, 'authId is required'],
      unique: true,
      index: true,
    },
    avatarUrl: {
      type: String,
      default: undefined,
    },
    preferences: {
      theme: {
        type: String,
        enum: ['light', 'dark', 'system'],
        default: 'system',
      },
      emailNotifications: {
        type: Boolean,
        default: true,
      },
    },
    savedItems: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Project',
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// ── Indexes ────────────────────────────────────────────────────
UserSchema.index({ email: 1 });
UserSchema.index({ authId: 1 });

export const User = model<IUser>('User', UserSchema);
