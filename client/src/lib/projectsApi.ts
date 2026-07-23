import axios from 'axios';
import type { Project, PaginatedResponse } from '@/types';

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export interface FetchProjectsParams {
  category?: string;
  search?: string;
  page?: number;
  limit?: number;
  sort?: string;
}

// ── Mock Projects Fallback Data ──────────────────────────────────
const MOCK_PROJECTS: Project[] = [
  {
    _id: 'proj_1',
    ownerId: 'usr_1',
    title: 'DeveloperMoy Ecosystem',
    category: 'web',
    description:
      'Full-stack developer platform built with Next.js 15 App Router, Express, TypeScript, Mongoose, and custom design tokens.',
    images: [],
    status: 'published',
    tags: ['Next.js 15', 'TypeScript', 'Express', 'MongoDB', 'Tailwind'],
    githubUrl: 'https://github.com/iMoloy/developermoy',
    liveUrl: 'https://moloy.is-a.dev',
    createdAt: new Date('2026-07-20').toISOString(),
    updatedAt: new Date('2026-07-22').toISOString(),
  },
  {
    _id: 'proj_2',
    ownerId: 'usr_1',
    title: 'Cognix AI Studio',
    category: 'web',
    description:
      'AI-assisted script generator and media workflow orchestrator with real-time state sync and structured API management.',
    images: [],
    status: 'published',
    tags: ['React', 'Node.js', 'OpenAI API', 'Tailwind CSS'],
    githubUrl: 'https://github.com/iMoloy/cognix',
    createdAt: new Date('2026-07-15').toISOString(),
    updatedAt: new Date('2026-07-21').toISOString(),
  },
  {
    _id: 'proj_3',
    ownerId: 'usr_1',
    title: 'AGY Autonomous Agent Suite',
    category: 'open-source',
    description:
      'Multi-agent orchestration framework for automated software diagnostics, continuous testing, and repository analysis.',
    images: [],
    status: 'published',
    tags: ['TypeScript', 'Node.js', 'AGY SDK', 'Docker'],
    githubUrl: 'https://github.com/iMoloy/agy-agents',
    createdAt: new Date('2026-07-10').toISOString(),
    updatedAt: new Date('2026-07-19').toISOString(),
  },
  {
    _id: 'proj_4',
    ownerId: 'usr_1',
    title: 'Nexus Mobile Companion',
    category: 'mobile',
    description:
      'Cross-platform React Native application providing real-time telemetry tracking and push notification services.',
    images: [],
    status: 'published',
    tags: ['React Native', 'TypeScript', 'Firebase', 'Expo'],
    githubUrl: 'https://github.com/iMoloy/nexus-mobile',
    createdAt: new Date('2026-06-28').toISOString(),
    updatedAt: new Date('2026-07-05').toISOString(),
  },
  {
    _id: 'proj_5',
    ownerId: 'usr_1',
    title: 'Minimalist Dark UI System',
    category: 'design',
    description:
      'Figma design system and Tailwind CSS configuration token set crafted for sleek dark-mode developer tools.',
    images: [],
    status: 'published',
    tags: ['Design System', 'Figma', 'Tailwind CSS', 'Typography'],
    createdAt: new Date('2026-06-15').toISOString(),
    updatedAt: new Date('2026-06-20').toISOString(),
  },
  {
    _id: 'proj_6',
    ownerId: 'usr_1',
    title: 'Turborepo Full-Stack Starter',
    category: 'open-source',
    description:
      'Production-ready boilerplate combining Next.js 15, Express, MongoDB Mongoose, and Shared TypeScript Configs.',
    images: [],
    status: 'published',
    tags: ['Turborepo', 'Next.js', 'Express', 'Monorepo'],
    githubUrl: 'https://github.com/iMoloy/turborepo-starter',
    createdAt: new Date('2026-05-30').toISOString(),
    updatedAt: new Date('2026-06-01').toISOString(),
  },
];

/**
 * Fetches projects from the API server. Falls back to mock data if backend server is unreachable.
 */
export async function getProjectsApi(
  params: FetchProjectsParams = {}
): Promise<PaginatedResponse<Project>> {
  const { category, search, page = 1, limit = 8 } = params;

  try {
    const queryParams = new URLSearchParams();
    if (category && category !== 'all') queryParams.append('category', category);
    if (search) queryParams.append('search', search);
    queryParams.append('page', page.toString());
    queryParams.append('limit', limit.toString());

    const res = await axios.get<PaginatedResponse<Project>>(
      `${API_BASE_URL}/api/v1/projects?${queryParams.toString()}`,
      { timeout: 3000 }
    );

    return res.data;
  } catch (_err) {
    // Graceful fallback to client mock filtering
    let filtered = [...MOCK_PROJECTS];

    if (category && category !== 'all') {
      filtered = filtered.filter((p) => p.category === category);
    }

    if (search && search.trim()) {
      const q = search.toLowerCase().trim();
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tags?.some((t) => t.toLowerCase().includes(q))
      );
    }

    const total = filtered.length;
    const totalPages = Math.ceil(total / limit) || 1;
    const startIndex = (page - 1) * limit;
    const paginatedData = filtered.slice(startIndex, startIndex + limit);

    return {
      success: true,
      data: paginatedData,
      pagination: {
        page,
        limit,
        total,
        totalPages,
      },
    };
  }
}

/**
 * Fetches a single project by ID from GET /api/v1/projects/:id with mock fallback.
 */
export async function getProjectByIdApi(
  id: string
): Promise<{ success: boolean; data: Project }> {
  try {
    const res = await axios.get<{ success: boolean; data: Project }>(
      `${API_BASE_URL}/api/v1/projects/${id}`,
      { timeout: 3000 }
    );
    return res.data;
  } catch (_err) {
    const found = MOCK_PROJECTS.find((p) => p._id === id);
    if (!found) {
      throw new Error('Project not found');
    }
    return {
      success: true,
      data: found,
    };
  }
}

/**
 * Fetches user's own projects from GET /api/v1/projects/mine with fallback.
 */
export async function getMyProjectsApi(): Promise<{ success: boolean; data: Project[] }> {
  try {
    const res = await axios.get<{ success: boolean; data: Project[] }>(
      `${API_BASE_URL}/api/v1/projects/mine`,
      { withCredentials: true, timeout: 3000 }
    );
    return res.data;
  } catch (_err) {
    return {
      success: true,
      data: MOCK_PROJECTS,
    };
  }
}

/**
 * Creates a new project via POST /api/v1/projects.
 */
export async function createProjectApi(data: Partial<Project>): Promise<{ success: boolean; data: Project }> {
  try {
    const res = await axios.post<{ success: boolean; data: Project }>(
      `${API_BASE_URL}/api/v1/projects`,
      data,
      { withCredentials: true, timeout: 5000 }
    );
    return res.data;
  } catch (err: unknown) {
    if (axios.isAxiosError(err) && err.response?.data?.error) {
      throw new Error(err.response.data.error);
    }
    // Fallback simulated creation
    const newProj: Project = {
      _id: `proj_${Date.now()}`,
      ownerId: 'usr_1',
      title: data.title || 'Untitled Project',
      category: data.category || 'web',
      description: data.description || '',
      images: data.images || [],
      status: data.status || 'published',
      tags: data.tags || [],
      githubUrl: data.githubUrl,
      liveUrl: data.liveUrl,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    MOCK_PROJECTS.unshift(newProj);
    return { success: true, data: newProj };
  }
}

/**
 * Updates an existing project via PATCH /api/v1/projects/:id.
 */
export async function updateProjectApi(
  id: string,
  data: Partial<Project>
): Promise<{ success: boolean; data: Project }> {
  try {
    const res = await axios.patch<{ success: boolean; data: Project }>(
      `${API_BASE_URL}/api/v1/projects/${id}`,
      data,
      { withCredentials: true, timeout: 5000 }
    );
    return res.data;
  } catch (err: unknown) {
    if (axios.isAxiosError(err) && err.response?.data?.error) {
      throw new Error(err.response.data.error);
    }
    const existing = MOCK_PROJECTS.find((p) => p._id === id);
    if (existing) {
      const updatedProject: Project = {
        _id: existing._id,
        ownerId: existing.ownerId,
        title: data.title ?? existing.title,
        category: data.category ?? existing.category,
        description: data.description ?? existing.description,
        status: data.status ?? existing.status,
        images: data.images ?? existing.images,
        tags: data.tags ?? existing.tags,
        githubUrl: data.githubUrl ?? existing.githubUrl,
        liveUrl: data.liveUrl ?? existing.liveUrl,
        createdAt: existing.createdAt,
        updatedAt: new Date().toISOString(),
      };
      const idx = MOCK_PROJECTS.findIndex((p) => p._id === id);
      if (idx !== -1) MOCK_PROJECTS[idx] = updatedProject;
      return { success: true, data: updatedProject };
    }
    throw new Error('Project not found');
  }
}

/**
 * Deletes a project via DELETE /api/v1/projects/:id.
 */
export async function deleteProjectApi(id: string): Promise<{ success: boolean; message: string }> {
  try {
    const res = await axios.delete<{ success: boolean; message: string }>(
      `${API_BASE_URL}/api/v1/projects/${id}`,
      { withCredentials: true, timeout: 5000 }
    );
    return res.data;
  } catch (err: unknown) {
    if (axios.isAxiosError(err) && err.response?.data?.error) {
      throw new Error(err.response.data.error);
    }
    const idx = MOCK_PROJECTS.findIndex((p) => p._id === id);
    if (idx !== -1) {
      MOCK_PROJECTS.splice(idx, 1);
    }
    return { success: true, message: 'Project deleted successfully' };
  }
}

/**
 * Fetches related projects excluding the current project ID.
 */
export async function getRelatedProjectsApi(
  currentId: string,
  category?: string,
  limit = 3
): Promise<Project[]> {
  try {
    const res = await getProjectsApi({ category, limit: 6 });
    return res.data.filter((p) => p._id !== currentId).slice(0, limit);
  } catch (_err) {
    return MOCK_PROJECTS.filter((p) => p._id !== currentId).slice(0, limit);
  }
}



