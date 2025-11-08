import { Redis } from '@upstash/redis';
import { Database } from './database';
import type { Winner } from './schemas';

// Initialize Redis client if environment variables are set
const redis = process.env.REDIS_URL && process.env.REDIS_TOKEN
  ? new Redis({
      url: process.env.REDIS_URL,
      token: process.env.REDIS_TOKEN,
    })
  : null;

export class CacheManager {
  static async getLeaderboard(limit: number = 10): Promise<Winner[]> {
    const cacheKey = `leaderboard:top${limit}`;

    if (redis) {
      try {
        const cached = await redis.get(cacheKey);
        if (cached) {
          return JSON.parse(cached as string);
        }
      } catch (error) {
        console.error('Redis get error:', error);
        // Fall through to DB query
      }
    }

    // Cache miss or Redis not configured - fetch from DB
    const leaders = await Database.getLeaderboard(limit);
    
    // Cache for 60 seconds if Redis is configured
    if (redis) {
      try {
        await redis.setex(cacheKey, 60, JSON.stringify(leaders));
      } catch (error) {
        console.error('Redis set error:', error);
      }
    }
    
    return leaders;
  }

  static async getWinnerStats(): Promise<{ path: string; count: number }[]> {
    const cacheKey = 'winner:stats';
    
    if (redis) {
      try {
        const cached = await redis.get(cacheKey);
        if (cached) {
          return JSON.parse(cached as string);
        }
      } catch (error) {
        console.error('Redis get error:', error);
      }
    }

    const stats = await Database.getWinnerStats();
    
    if (redis) {
      try {
        await redis.setex(cacheKey, 300, JSON.stringify(stats));
      } catch (error) {
        console.error('Redis set error:', error);
      }
    }
    
    return stats;
  }

  static async getAllWinners(): Promise<Winner[]> {
    const cacheKey = 'winners:all';
    
    if (redis) {
      try {
        const cached = await redis.get(cacheKey);
        if (cached) {
          return JSON.parse(cached as string);
        }
      } catch (error) {
        console.error('Redis get error:', error);
      }
    }

    const winners = await Database.getAllWinners();
    
    if (redis) {
      try {
        await redis.setex(cacheKey, 60, JSON.stringify(winners));
      } catch (error) {
        console.error('Redis set error:', error);
      }
    }
    
    return winners;
  }

  static async invalidateLeaderboard(): Promise<void> {
    if (!redis) return;

    try {
      const keys = await redis.keys('leaderboard:*');
      if (keys.length > 0) {
        await redis.del(...keys);
      }
      
      await redis.del('winner:stats', 'winners:all');
    } catch (error) {
      console.error('Redis invalidation error:', error);
    }
  }

  static async clearAllCache(): Promise<void> {
    if (!redis) return;

    try {
      const keys = await redis.keys('*');
      if (keys.length > 0) {
        await redis.del(...keys);
      }
      console.log('All cache cleared');
    } catch (error) {
      console.error('Redis clear error:', error);
    }
  }
}
