import clientPromise from './mongodb';
import { Db, Collection } from 'mongodb';
import { Winner, Application, UserSession, QuizAttempt, Collections } from './schemas';

export class Database {
  private static dbName = 'treasure_hunt';

  static async getDb(): Promise<Db> {
    const client = await clientPromise;
    return client.db(this.dbName);
  }

  static async getWinnersCollection(): Promise<Collection<Winner>> {
    const db = await this.getDb();
    return db.collection<Winner>(Collections.WINNERS);
  }

  static async getApplicationsCollection(): Promise<Collection<Application>> {
    const db = await this.getDb();
    return db.collection<Application>(Collections.APPLICATIONS);
  }

  static async getUserSessionsCollection(): Promise<Collection<UserSession>> {
    const db = await this.getDb();
    return db.collection<UserSession>(Collections.USER_SESSIONS);
  }

  static async getQuizAttemptsCollection(): Promise<Collection<QuizAttempt>> {
    const db = await this.getDb();
    return db.collection<QuizAttempt>(Collections.QUIZ_ATTEMPTS);
  }

  // orms and odms khud karte h ye sab
  static async createIndexes(): Promise<void> {
    const db = await this.getDb();

    await db.collection(Collections.WINNERS).createIndexes([
      { key: { name: 1 } },
      { key: { email: 1 }, unique: true },
      { key: { 'completedPaths.path': 1 } },
      { key: { totalPoints: -1 } },
      { key: { createdAt: -1 } },
      { key: { lastUpdated: -1 } },
      { key: { email: 1, 'completedPaths.path': 1 } }
    ]);

    await db.collection(Collections.QUIZ_ATTEMPTS).createIndexes([
      { key: { name: 1 } },
      { key: { quizType: 1 } },
      { key: { passed: 1 } },
      { key: { attemptedAt: -1 } }
    ]);

    await db.collection(Collections.APPLICATIONS).createIndexes([
      { key: { email: 1 }, unique: true },
      { key: { status: 1 } },
      { key: { submittedAt: -1 } }
    ]);

    await db.collection(Collections.USER_SESSIONS).createIndexes([
      { key: { username: 1 } },
      { key: { expiresAt: 1 }, expireAfterSeconds: 0 }
    ]);

    console.log('Database indexes created successfully');
  }

  static async getAllWinners(): Promise<Winner[]> {
    const collection = await this.getWinnersCollection();
    return collection.find({}).sort({ createdAt: -1 }).toArray();
  }

  static async getWinnersByPath(path: string): Promise<Winner[]> {
    const collection = await this.getWinnersCollection();
    return collection.find({ 'completedPaths.path': path }).sort({ lastUpdated: -1 }).toArray();
  }

  static async getWinnerCountByPath(path: string): Promise<number> {
    const collection = await this.getWinnersCollection();
    return collection.countDocuments({ 'completedPaths.path': path });
  }

  static async getQuizAttempts(name: string): Promise<QuizAttempt[]> {
    const collection = await this.getQuizAttemptsCollection();
    return collection.find({ name }).sort({ attemptedAt: -1 }).toArray();
  }

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

  static async hasUserCompletedPath(email: string, path: string): Promise<boolean> {
    const collection = await this.getWinnersCollection();
    const winner = await collection.findOne({ 
      email,
      'completedPaths.path': path 
    });
    return winner !== null;
  }

  static async getLeaderboard(limit: number = 10): Promise<Winner[]> {
    const collection = await this.getWinnersCollection();
    return collection
      .find({})
      .sort({ totalPoints: -1, lastUpdated: 1 })
      .limit(limit)
      .toArray();
  }

  static async getUserByEmail(email: string): Promise<Winner | null> {
    const collection = await this.getWinnersCollection();
    return collection.findOne({ email });
  }
}

export async function initializeDatabase(): Promise<void> {
  try {
    await Database.createIndexes();
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
}
