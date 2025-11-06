import clientPromise from './mongodb';
import { Db, Collection } from 'mongodb';
import { Winner, Application, UserSession, QuizAttempt, Collections } from './schemas';

/**
 * Database helper class for type-safe MongoDB operations
 */
export class Database {
  private static dbName = 'treasure_hunt';

  /**
   * Get the database instance
   */
  static async getDb(): Promise<Db> {
    const client = await clientPromise;
    return client.db(this.dbName);
  }

  /**
   * Get Winners collection with type safety
   */
  static async getWinnersCollection(): Promise<Collection<Winner>> {
    const db = await this.getDb();
    return db.collection<Winner>(Collections.WINNERS);
  }

  /**
   * Get Applications collection with type safety
   */
  static async getApplicationsCollection(): Promise<Collection<Application>> {
    const db = await this.getDb();
    return db.collection<Application>(Collections.APPLICATIONS);
  }

  /**
   * Get User Sessions collection with type safety
   */
  static async getUserSessionsCollection(): Promise<Collection<UserSession>> {
    const db = await this.getDb();
    return db.collection<UserSession>(Collections.USER_SESSIONS);
  }

  /**
   * Get Quiz Attempts collection with type safety
   */
  static async getQuizAttemptsCollection(): Promise<Collection<QuizAttempt>> {
    const db = await this.getDb();
    return db.collection<QuizAttempt>(Collections.QUIZ_ATTEMPTS);
  }

  /**
   * Create database indexes for better performance
   */
  static async createIndexes(): Promise<void> {
    const db = await this.getDb();

    // Winners collection indexes
    await db.collection(Collections.WINNERS).createIndexes([
      { key: { name: 1 } },
      { key: { email: 1 }, unique: true }, // Email is unique per user
      { key: { 'completedPaths.path': 1 } }, // Index on paths completed
      { key: { totalPoints: -1 } }, // For leaderboard sorting
      { key: { createdAt: -1 } },
      { key: { lastUpdated: -1 } }
    ]);

    // Quiz Attempts collection indexes
    await db.collection(Collections.QUIZ_ATTEMPTS).createIndexes([
      { key: { name: 1 } },
      { key: { quizType: 1 } },
      { key: { passed: 1 } },
      { key: { attemptedAt: -1 } }
    ]);

    // Applications collection indexes (if you decide to use it)
    await db.collection(Collections.APPLICATIONS).createIndexes([
      { key: { email: 1 }, unique: true },
      { key: { status: 1 } },
      { key: { submittedAt: -1 } }
    ]);

    // User Sessions collection indexes (if you decide to use it)
    await db.collection(Collections.USER_SESSIONS).createIndexes([
      { key: { username: 1 } },
      { key: { expiresAt: 1 }, expireAfterSeconds: 0 } // TTL index
    ]);

    console.log('Database indexes created successfully');
  }

  /**
   * Get all winners
   */
  static async getAllWinners(): Promise<Winner[]> {
    const collection = await this.getWinnersCollection();
    return collection.find({}).sort({ createdAt: -1 }).toArray();
  }

  /**
   * Get winners by path (users who completed a specific path)
   */
  static async getWinnersByPath(path: string): Promise<Winner[]> {
    const collection = await this.getWinnersCollection();
    return collection.find({ 'completedPaths.path': path }).sort({ lastUpdated: -1 }).toArray();
  }

  /**
   * Get winner count by path
   */
  static async getWinnerCountByPath(path: string): Promise<number> {
    const collection = await this.getWinnersCollection();
    return collection.countDocuments({ 'completedPaths.path': path });
  }

  /**
   * Get all quiz attempts for a user
   */
  static async getQuizAttempts(name: string): Promise<QuizAttempt[]> {
    const collection = await this.getQuizAttemptsCollection();
    return collection.find({ name }).sort({ attemptedAt: -1 }).toArray();
  }

  /**
   * Get statistics about winners
   */
  static async getWinnerStats(): Promise<{ path: string; count: number }[]> {
    const collection = await this.getWinnersCollection();
    const results = await collection.aggregate([
      { $unwind: '$completedPaths' },
      {
        $group: {
          _id: '$completedPaths.path',
          count: { $sum: 1 }
        }
      },
      {
        $project: {
          path: '$_id',
          count: 1,
          _id: 0
        }
      },
      {
        $sort: { count: -1 }
      }
    ]).toArray();

    return results as { path: string; count: number }[];
  }

  /**
   * Check if a user has already completed a specific path (by email)
   */
  static async hasUserCompletedPath(email: string, path: string): Promise<boolean> {
    const collection = await this.getWinnersCollection();
    const winner = await collection.findOne({ 
      email,
      'completedPaths.path': path 
    });
    return winner !== null;
  }

  /**
   * Get leaderboard (top users by total points)
   */
  static async getLeaderboard(limit: number = 10): Promise<Winner[]> {
    const collection = await this.getWinnersCollection();
    return collection
      .find({})
      .sort({ totalPoints: -1, lastUpdated: 1 })
      .limit(limit)
      .toArray();
  }

  /**
   * Get user by email
   */
  static async getUserByEmail(email: string): Promise<Winner | null> {
    const collection = await this.getWinnersCollection();
    return collection.findOne({ email });
  }
}

/**
 * Initialize database (create indexes)
 * Call this once when your application starts
 */
export async function initializeDatabase(): Promise<void> {
  try {
    await Database.createIndexes();
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
}
