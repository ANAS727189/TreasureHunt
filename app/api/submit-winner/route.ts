import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { Collections, PATH_POINTS, Winner } from '@/lib/schemas';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { CacheManager } from '@/lib/cache';

export async function POST(request: Request) {
  try {
    // Get the session from better-auth
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    // Check if user is authenticated with Google
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Unauthorized. Please log in with Google first.' },
        { status: 401 }
      );
    }

    const { name, path } = await request.json();

    // Validate that the path exists in PATH_POINTS (only allow valid paths)
    if (!path || !(path in PATH_POINTS)) {
      return NextResponse.json(
        { error: 'Invalid path. This path is not recognized.' },
        { status: 400 }
      );
    }

    // Extract email from session
    const email = session.user.email.trim().toLowerCase();
    const pathPoints = PATH_POINTS[path] ?? 0;

    const client = await clientPromise;
    const db = client.db('treasure_hunt');
    const winnersCollection = db.collection<Winner>(Collections.WINNERS);

    // Use atomic operation with $addToSet to prevent race conditions
    const result = await winnersCollection.findOneAndUpdate(
      { 
        email,
        'completedPaths.path': { $ne: path }  // Only update if path NOT completed
      },
      {
        $setOnInsert: {
          name: name.trim(),
          email: email,
          createdAt: new Date(),
        },
        $addToSet: {
          completedPaths: {
            path: path.trim(),
            points: pathPoints,
            completedAt: new Date(),
          }
        },
        $inc: { totalPoints: pathPoints },
        $set: { lastUpdated: new Date() }
      },
      {
        upsert: true,
        returnDocument: 'after'
      }
    );

    if (!result) {
      // Path already completed - fetch current data
      const existingWinner = await winnersCollection.findOne({ email });
      return NextResponse.json(
        { 
          message: 'You have already completed this path!',
          alreadyCompleted: true,
          totalPoints: existingWinner?.totalPoints || 0,
          completedPaths: existingWinner?.completedPaths || []
        },
        { status: 200 }
      );
    }

    // Invalidate cache after successful path completion
    await CacheManager.invalidateLeaderboard();

    return NextResponse.json(
      { 
        message: 'Path completed! Points added to your total!', 
        email: email,
        pathPoints: pathPoints,
        totalPoints: result.totalPoints,
        completedPaths: result.completedPaths.length
      },
      { status: 200 }
    );
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: 'Server error. Failed to submit completion.' },
      { status: 500 }
    );
  }
}