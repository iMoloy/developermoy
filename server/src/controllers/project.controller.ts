import type { Request, Response, NextFunction } from 'express';
import { Project } from '../models/Project.js';
import { User } from '../models/User.js';
import { AppError } from '../middleware/errorHandler.js';
import {
  asyncHandler,
  parsePagination,
  type AuthenticatedRequest,
} from '../types/index.js';

// ── GET /api/v1/projects ───────────────────────────────────────
/**
 * Public listing of projects with optional category/status filters and pagination.
 */
export const getProjects = asyncHandler(
  async (req: Request, res: Response, _next: NextFunction): Promise<void> => {
    const { category, status, search } = req.query;

    const { page, limit, skip, sort, order } = parsePagination(req.query);

    // Build filter object
    const filter: Record<string, unknown> = {};

    if (category && typeof category === 'string') {
      filter['category'] = category;
    }

    if (status && typeof status === 'string') {
      filter['status'] = status;
    } else {
      // Default to published projects for public listing unless status explicitly provided
      filter['status'] = 'published';
    }

    if (search && typeof search === 'string' && search.trim()) {
      filter['title'] = { $regex: search.trim(), $options: 'i' };
    }

    const [projects, total] = await Promise.all([
      Project.find(filter)
        .sort({ [sort]: order })
        .skip(skip)
        .limit(limit)
        .populate('ownerId', 'name email avatarUrl'),
      Project.countDocuments(filter),
    ]);

    const totalPages = Math.ceil(total / limit) || 1;

    res.status(200).json({
      success: true,
      data: projects,
      pagination: {
        page,
        limit,
        total,
        totalPages,
      },
    });
  }
);

// ── GET /api/v1/projects/:id ───────────────────────────────────
/**
 * Public endpoint to fetch a single project by ID.
 */
export const getProjectById = asyncHandler(
  async (req: Request, res: Response, _next: NextFunction): Promise<void> => {
    const { id } = req.params;

    const project = await Project.findById(id).populate(
      'ownerId',
      'name email avatarUrl'
    );

    if (!project) {
      throw new AppError('Project not found', 404);
    }

    res.status(200).json({
      success: true,
      data: project,
    });
  }
);

// ── POST /api/v1/projects ──────────────────────────────────────
/**
 * Protected endpoint to create a new project.
 * Uses authenticated user's session to attach `ownerId`.
 */
export const createProject = asyncHandler(
  async (req: Request, res: Response, _next: NextFunction): Promise<void> => {
    const authUser = (req as AuthenticatedRequest).user;

    if (!authUser) {
      throw new AppError('Authentication required.', 401);
    }

    // Resolve owner MongoDB user ID from authId
    const userDoc = await User.findOne({ authId: authUser.id });
    if (!userDoc) {
      throw new AppError('User profile not found. Please sync your user account first.', 404);
    }

    const { title, category, description, images, status } = req.body;

    const project = await Project.create({
      ownerId: userDoc._id,
      title: title.trim(),
      category,
      description: description.trim(),
      images: images ?? [],
      status: status ?? 'published',
    });

    res.status(201).json({
      success: true,
      message: 'Project created successfully',
      data: project,
    });
  }
);

// ── PATCH /api/v1/projects/:id ─────────────────────────────────
/**
 * Protected endpoint to update an existing project.
 */
export const updateProject = asyncHandler(
  async (req: Request, res: Response, _next: NextFunction): Promise<void> => {
    const authUser = (req as AuthenticatedRequest).user;
    const { id } = req.params;

    if (!authUser) {
      throw new AppError('Authentication required.', 401);
    }

    const userDoc = await User.findOne({ authId: authUser.id });
    if (!userDoc) {
      throw new AppError('User profile not found.', 404);
    }

    const project = await Project.findById(id);

    if (!project) {
      throw new AppError('Project not found', 404);
    }

    // Verify ownership
    if (project.ownerId.toString() !== userDoc._id.toString() && authUser.role !== 'admin') {
      throw new AppError('Forbidden. You can only modify your own projects.', 403);
    }

    const { title, category, description, images, status } = req.body;

    if (title !== undefined) project.title = title.trim();
    if (category !== undefined) project.category = category;
    if (description !== undefined) project.description = description.trim();
    if (images !== undefined) project.images = images;
    if (status !== undefined) project.status = status;

    await project.save();

    res.status(200).json({
      success: true,
      message: 'Project updated successfully',
      data: project,
    });
  }
);

// ── DELETE /api/v1/projects/:id ────────────────────────────────
/**
 * Protected endpoint to delete a project.
 */
export const deleteProject = asyncHandler(
  async (req: Request, res: Response, _next: NextFunction): Promise<void> => {
    const authUser = (req as AuthenticatedRequest).user;
    const { id } = req.params;

    if (!authUser) {
      throw new AppError('Authentication required.', 401);
    }

    const userDoc = await User.findOne({ authId: authUser.id });
    if (!userDoc) {
      throw new AppError('User profile not found.', 404);
    }

    const project = await Project.findById(id);

    if (!project) {
      throw new AppError('Project not found', 404);
    }

    // Verify ownership
    if (project.ownerId.toString() !== userDoc._id.toString() && authUser.role !== 'admin') {
      throw new AppError('Forbidden. You can only delete your own projects.', 403);
    }

    await project.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Project deleted successfully',
    });
  }
);

// ── GET /api/v1/projects/mine ──────────────────────────────────
/**
 * Protected endpoint to fetch all projects belonging to the authenticated user.
 */
export const getMyProjects = asyncHandler(
  async (req: Request, res: Response, _next: NextFunction): Promise<void> => {
    const authUser = (req as AuthenticatedRequest).user;

    if (!authUser) {
      throw new AppError('Authentication required.', 401);
    }

    const userDoc = await User.findOne({ authId: authUser.id });
    if (!userDoc) {
      throw new AppError('User profile not found.', 404);
    }

    const projects = await Project.find({ ownerId: userDoc._id }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: projects,
    });
  }
);

