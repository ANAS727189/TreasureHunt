import { NextRequest, NextResponse } from 'next/server';
import { Database } from '@/lib/database';
import { CacheManager } from '@/lib/cache';

/**
 * GET /api/winners
 * 
 * Fetch all winners or filter by path
 * 
 * Query Parameters:
 * - path (optional): Filter winners by specific path
 * - stats (optional): Return statistics instead of full list
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const path = searchParams.get('path');
    const stats = searchParams.get('stats') === 'true';

    if (stats) {
      // Return statistics with caching
      const statistics = await CacheManager.getWinnerStats();
      return NextResponse.json(
        { statistics },
        { 
          status: 200,
          headers: {
            'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600'
          }
        }
      );
    }

    if (path) {
      // Filter by path (no caching for filtered results)
      const winners = await Database.getWinnersByPath(path);
      const count = await Database.getWinnerCountByPath(path);
      return NextResponse.json(
        { winners, count, path },
        { 
          status: 200,
          headers: {
            'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120'
          }
        }
      );
    }

    // Return all winners with caching
    const winners = await CacheManager.getAllWinners();
    return NextResponse.json(
      { winners, total: winners.length },
      { 
        status: 200,
        headers: {
          'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120'
        }
      }
    );

  } catch (error) {
    console.error('Error fetching winners:', error);
    return NextResponse.json(
      { error: 'Failed to fetch winners' },
      { status: 500 }
    );
  }
}
