import type { Request, Response, NextFunction } from 'express';
import { Types } from 'mongoose';
import { AppError } from './errorHandler.js';
import { PROJECT_CATEGORIES, PROJECT_STATUSES } from '../models/Project.js';

/**
 * Validates that `req.params.id` is a valid MongoDB ObjectId.
 */
export function validateProjectId(
  req: Request,
  _res: Response,
  next: NextFunction
): void {
  const { id } = req.params;

  if (!id || typeof id !== 'string' || !Types.ObjectId.isValid(id)) {
    throw new AppError('Invalid project ID format.', 400);
  }

  next();
}

/**
 * Validates request body when creating a new Project.
 */
export function validateCreateProject(
  req: Request,
  _res: Response,
  next: NextFunction
): void {
  const { title, category, description, images, status } = req.body;

  const errors: string[] = [];

  // Title validation
  if (!title || typeof title !== 'string' || !title.trim()) {
    errors.push('Title is required');
  } else if (title.trim().length > 150) {
    errors.push('Title must not exceed 150 characters');
  }

  // Category validation
  if (!category) {
    errors.push('Category is required');
  } else if (!PROJECT_CATEGORIES.includes(category)) {
    errors.push(
      `Category must be one of: ${PROJECT_CATEGORIES.join(', ')}`
    );
  }

  // Description validation
  if (!description || typeof description !== 'string' || !description.trim()) {
    errors.push('Description is required');
  } else if (description.trim().length > 2000) {
    errors.push('Description must not exceed 2000 characters');
  }

  // Images validation (optional)
  if (images !== undefined) {
    if (!Array.isArray(images)) {
      errors.push('Images must be an array of string URLs');
    } else if (images.length > 10) {
      errors.push('A project can have at most 10 images');
    } else {
      const allStrings = images.every((img) => typeof img === 'string');
      if (!allStrings) {
        errors.push('All image URLs must be strings');
      }
    }
  }

  // Status validation (optional)
  if (status !== undefined && !PROJECT_STATUSES.includes(status)) {
    errors.push(`Status must be one of: ${PROJECT_STATUSES.join(', ')}`);
  }

  if (errors.length > 0) {
    throw new AppError(`Validation failed: ${errors.join('; ')}`, 400);
  }

  next();
}

/**
 * Validates request body when updating an existing Project.
 */
export function validateUpdateProject(
  req: Request,
  _res: Response,
  next: NextFunction
): void {
  const { title, category, description, images, status } = req.body;

  const errors: string[] = [];

  if (title !== undefined) {
    if (typeof title !== 'string' || !title.trim()) {
      errors.push('Title cannot be empty');
    } else if (title.trim().length > 150) {
      errors.push('Title must not exceed 150 characters');
    }
  }

  if (category !== undefined && !PROJECT_CATEGORIES.includes(category)) {
    errors.push(`Category must be one of: ${PROJECT_CATEGORIES.join(', ')}`);
  }

  if (description !== undefined) {
    if (typeof description !== 'string' || !description.trim()) {
      errors.push('Description cannot be empty');
    } else if (description.trim().length > 2000) {
      errors.push('Description must not exceed 2000 characters');
    }
  }

  if (images !== undefined) {
    if (!Array.isArray(images)) {
      errors.push('Images must be an array of string URLs');
    } else if (images.length > 10) {
      errors.push('A project can have at most 10 images');
    }
  }

  if (status !== undefined && !PROJECT_STATUSES.includes(status)) {
    errors.push(`Status must be one of: ${PROJECT_STATUSES.join(', ')}`);
  }

  if (errors.length > 0) {
    throw new AppError(`Validation failed: ${errors.join('; ')}`, 400);
  }

  next();
}
