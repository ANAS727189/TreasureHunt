import { NextRequest, NextResponse } from 'next/server';
import { Database } from '@/lib/database';

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
      // Return statistics
      const statistics = await Database.getWinnerStats();
      return NextResponse.json({ statistics }, { status: 200 });
    }

    if (path) {
      // Filter by path
      const winners = await Database.getWinnersByPath(path);
      const count = await Database.getWinnerCountByPath(path);
      return NextResponse.json({ winners, count, path }, { status: 200 });
    }

    // Return all winners
    const winners = await Database.getAllWinners();
    return NextResponse.json({ winners, total: winners.length }, { status: 200 });

  } catch (error) {
    console.error('Error fetching winners:', error);
    return NextResponse.json(
      { error: 'Failed to fetch winners' },
      { status: 500 }
    );
  }
}
