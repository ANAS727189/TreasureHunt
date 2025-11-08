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

    // Check if path already completed
    const existingWinner = await winnersCollection.findOne({
      email,
      'completedPaths.path': path
    });

    if (existingWinner) {
      return NextResponse.json(
        { 
          message: 'You have already completed this path!',
          alreadyCompleted: true,
          totalPoints: existingWinner.totalPoints || 0,
          completedPaths: existingWinner.completedPaths || []
        },
        { status: 200 }
      );
    }

    // Add the new path completion
    const result = await winnersCollection.findOneAndUpdate(
      { email },
      {
        $setOnInsert: {
          email,
          createdAt: new Date()
        },
        $set: {
          name: name.trim(),
          lastUpdated: new Date()
        },
        $push: {
          completedPaths: {
            path: path.trim(),
            points: pathPoints,
            completedAt: new Date()
          }
        },
        $inc: { totalPoints: pathPoints }
      },
      {
        upsert: true,
        returnDocument: 'after'
      }
    );

    if (!result) {
      return NextResponse.json(
        { error: 'Could not update or create winner entry.' },
        { status: 500 }
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