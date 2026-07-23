import { Router } from 'express';
import {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
  getMyProjects,
} from '../../controllers/project.controller.js';
import { requireAuth } from '../../middleware/requireAuth.js';
import {
  validateProjectId,
  validateCreateProject,
  validateUpdateProject,
} from '../../middleware/validateProject.js';

export const projectsRouter = Router();

// ── GET /api/v1/projects — Public listing ──────────────────────
projectsRouter.get('/', getProjects);

// ── GET /api/v1/projects/mine — Protected user projects ─────────
projectsRouter.get('/mine', requireAuth, getMyProjects);

// ── GET /api/v1/projects/:id — Public detail view ─────────────
projectsRouter.get('/:id', validateProjectId, getProjectById);

// ── POST /api/v1/projects — Protected creation ────────────────
projectsRouter.post('/', requireAuth, validateCreateProject, createProject);

// ── PATCH /api/v1/projects/:id — Protected update ──────────────
projectsRouter.patch('/:id', requireAuth, validateProjectId, validateUpdateProject, updateProject);

// ── DELETE /api/v1/projects/:id — Protected deletion ──────────
projectsRouter.delete('/:id', requireAuth, validateProjectId, deleteProject);
