import { Schema, model, type Document, type Types } from 'mongoose';

// ── Enums ──────────────────────────────────────────────────────
export const PROJECT_CATEGORIES = [
  'web',
  'mobile',
  'open-source',
  'design',
  'other',
] as const;

export const PROJECT_STATUSES = ['draft', 'published', 'archived'] as const;

export type ProjectCategory = (typeof PROJECT_CATEGORIES)[number];
export type ProjectStatus = (typeof PROJECT_STATUSES)[number];

// ── Project document interface ─────────────────────────────────
export interface IProject extends Document {
  _id: Types.ObjectId;
  /** Reference to the owning User */
  ownerId: Types.ObjectId;
  title: string;
  category: ProjectCategory;
  description: string;
  /** Array of public image URLs (CDN / S3 / Cloudinary) */
  images: string[];
  status: ProjectStatus;
  createdAt: Date;
  updatedAt: Date;
}

// ── Schema ─────────────────────────────────────────────────────
const ProjectSchema = new Schema<IProject>(
  {
    ownerId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'ownerId is required'],
      index: true,
    },
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      maxlength: [150, 'Title must be at most 150 characters'],
    },
    category: {
      type: String,
      enum: {
        values: PROJECT_CATEGORIES,
        message: `Category must be one of: ${PROJECT_CATEGORIES.join(', ')}`,
      },
      required: [true, 'Category is required'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      maxlength: [2000, 'Description must be at most 2000 characters'],
    },
    images: {
      type: [String],
      default: [],
      validate: {
        validator(v: string[]) {
          return v.length <= 10;
        },
        message: 'A project can have at most 10 images',
      },
    },
    status: {
      type: String,
      enum: {
        values: PROJECT_STATUSES,
        message: `Status must be one of: ${PROJECT_STATUSES.join(', ')}`,
      },
      default: 'draft',
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// ── Indexes ────────────────────────────────────────────────────
// Efficiently list all projects for a given owner sorted by recency
ProjectSchema.index({ ownerId: 1, createdAt: -1 });
// Support filtering by status + category on public listing
ProjectSchema.index({ status: 1, category: 1 });

export const Project = model<IProject>('Project', ProjectSchema);
