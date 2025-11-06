import { ObjectId } from 'mongodb';

/**
 * Path Points Mapping
 * Points awarded for completing each path (backend only)
 */
export const PATH_POINTS: Record<string, number> = {
  'ye-to-kar-looge-tum': 45,
  'ye-nahi-kar-paaoge-tum': 50,
  'apply': 50,
  'angry-hr': 45,
  'stack': 45,
  'policy': 30,
  'swag-store': 45,
  'internship': 50,
  'grievance': 0, // dead-end
};


export interface PathCompletion {
  path: string;
  points: number;
  completedAt: Date;
}

export interface Winner {
  _id?: ObjectId;
  name: string;
  email: string;
  completedPaths: PathCompletion[];
  totalPoints: number;
  createdAt: Date;
  lastUpdated: Date;
}

/**
 * Validation function for Winner
 */
export function validateWinner(data: Partial<Winner>): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!data.name || typeof data.name !== 'string' || data.name.trim().length === 0) {
    errors.push('Name is required and must be a non-empty string');
  }

  if (data.name && data.name.trim().length > 100) {
    errors.push('Name must not exceed 100 characters');
  }

  if (!data.email || typeof data.email !== 'string' || !isValidEmail(data.email)) {
    errors.push('Valid email is required');
  }

  if (!data.completedPaths || !Array.isArray(data.completedPaths)) {
    errors.push('completedPaths must be an array');
  }

  if (typeof data.totalPoints !== 'number' || data.totalPoints < 0) {
    errors.push('totalPoints must be a non-negative number');
  }

  if (!data.createdAt || !(data.createdAt instanceof Date)) {
    errors.push('createdAt must be a valid Date object');
  }

  if (!data.lastUpdated || !(data.lastUpdated instanceof Date)) {
    errors.push('lastUpdated must be a valid Date object');
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

/**
 * Factory function to create a new Winner document (first path completion)
 */
export function createWinner(name: string, email: string, path: string): Winner {
  const points = PATH_POINTS[path] ?? 0;
  const now = new Date();
  
  return {
    name: name.trim(),
    email: email.trim().toLowerCase(),
    completedPaths: [
      {
        path: path.trim(),
        points,
        completedAt: now,
      }
    ],
    totalPoints: points,
    createdAt: now,
    lastUpdated: now,
  };
}

/**
 * Add a new path completion to existing winner
 */
export function addPathCompletion(winner: Winner, path: string): Winner {
  const points = PATH_POINTS[path] ?? 0;
  const now = new Date();
  
  // Check if path already completed
  const alreadyCompleted = winner.completedPaths.some(p => p.path === path);
  if (alreadyCompleted) {
    // Don't add duplicate, just return as is
    return winner;
  }
  
  return {
    ...winner,
    completedPaths: [
      ...winner.completedPaths,
      {
        path: path.trim(),
        points,
        completedAt: now,
      }
    ],
    totalPoints: winner.totalPoints + points,
    lastUpdated: now,
  };
}

/**
 * User Session Schema (if you want to track authenticated sessions)
 */
export interface UserSession {
  _id?: ObjectId;
  username: string;
  loginAt: Date;
  expiresAt: Date;
  ipAddress?: string;
  userAgent?: string;
}

/**
 * Application Schema (if you want to track applications)
 */
export interface Application {
  _id?: ObjectId;
  name: string;
  email: string;
  why_you: string;
  referral_code: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: Date;
  reviewedAt?: Date;
}

/**
 * Validation function for Application
 */
export function validateApplication(data: Partial<Application>): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!data.name || typeof data.name !== 'string' || data.name.trim().length === 0) {
    errors.push('Name is required and must be a non-empty string');
  }

  if (!data.email || typeof data.email !== 'string' || !isValidEmail(data.email)) {
    errors.push('Valid email is required');
  }

  if (!data.referral_code || typeof data.referral_code !== 'string') {
    errors.push('Referral code is required');
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

/**
 * Quiz Attempt Schema
 */
export interface QuizAttempt {
  _id?: ObjectId;
  name: string;
  quizType: 'ye-to-kar-looge-tum' | 'ye-nahi-kar-paaoge-tum';
  passed: boolean;
  answers?: Record<string, boolean | string>;
  attemptedAt: Date;
  ipAddress?: string;
}

/**
 * Factory function to create a QuizAttempt document
 */
export function createQuizAttempt(
  name: string,
  quizType: QuizAttempt['quizType'],
  passed: boolean,
  answers?: Record<string, boolean | string>
): QuizAttempt {
  return {
    name: name.trim(),
    quizType,
    passed,
    answers,
    attemptedAt: new Date(),
  };
}

/**
 * Helper function to validate email format
 */
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Database Collections enum for type safety
 */
export enum Collections {
  WINNERS = 'winners',
  APPLICATIONS = 'applications',
  USER_SESSIONS = 'user_sessions',
  QUIZ_ATTEMPTS = 'quiz_attempts',
}

/**
 * Type guard for Winner
 */
export function isWinner(obj: unknown): obj is Winner {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    typeof (obj as Winner).name === 'string' &&
    typeof (obj as Winner).email === 'string' &&
    Array.isArray((obj as Winner).completedPaths) &&
    typeof (obj as Winner).totalPoints === 'number' &&
    (obj as Winner).createdAt instanceof Date &&
    (obj as Winner).lastUpdated instanceof Date
  );
}
