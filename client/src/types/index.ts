// ── Global Client-side TypeScript Types ────────────────────────

/** Generic API response wrapper */
export interface ApiResponse<T = unknown> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

/** Paginated API response */
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

/** Base entity fields from MongoDB */
export interface BaseEntity {
  _id: string;
  createdAt: string;
  updatedAt: string;
}

/** User model */
export interface User extends BaseEntity {
  name: string;
  email: string;
  avatar?: string;
  role: 'admin' | 'user';
}

/** Project model */
export interface Project extends BaseEntity {
  ownerId: string;
  title: string;
  category: 'web' | 'mobile' | 'open-source' | 'design' | 'other';
  description: string;
  images: string[];
  status: 'draft' | 'published' | 'archived';
  tags?: string[];
  githubUrl?: string;
  liveUrl?: string;
}

/** Navigation link */
export interface NavLink {
  label: string;
  href: string;
  external?: boolean;
}

/** SEO metadata */
export interface PageMeta {
  title: string;
  description: string;
  ogImage?: string;
}
