import { NextRequest, NextResponse } from 'next/server';
import { initializeDatabase } from '@/lib/database';

// Vercel cron job to ensure indexes exist
export async function GET(request: NextRequest) {
  try {
    // Verify authorization (use cron secret or bypass in development)
    const authHeader = request.headers.get('authorization');
    const cronSecret = process.env.CRON_SECRET;
    
    if (process.env.NODE_ENV === 'production' && cronSecret) {
      if (authHeader !== `Bearer ${cronSecret}`) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
    }

    await initializeDatabase();
    
    return NextResponse.json({ 
      message: 'Database indexes created successfully',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error creating indexes:', error);
    return NextResponse.json(
      { 
        error: 'Failed to create indexes',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
