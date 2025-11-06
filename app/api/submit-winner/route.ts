import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { createWinner, addPathCompletion, validateWinner, Collections, PATH_POINTS, Winner } from '@/lib/schemas';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

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

    // Extract email from session
    const email = session.user.email;

    const client = await clientPromise;
    const db = client.db('treasure_hunt');
    const winnersCollection = db.collection<Winner>(Collections.WINNERS);

    // Check if user already exists (by email)
    const existingWinner = await winnersCollection.findOne({ email });

    let winner: Winner;

    if (existingWinner) {
      // User exists - check if they already completed this path
      const alreadyCompleted = existingWinner.completedPaths?.some(
        (p) => p.path === path
      );

      if (alreadyCompleted) {
        return NextResponse.json(
          { 
            message: 'You have already completed this path!',
            alreadyCompleted: true,
            totalPoints: existingWinner.totalPoints,
            completedPaths: existingWinner.completedPaths
          },
          { status: 200 }
        );
      }

      // Add new path to existing winner
      winner = addPathCompletion(existingWinner, path);
      
      // Update the document
      await winnersCollection.updateOne(
        { email },
        { 
          $set: { 
            completedPaths: winner.completedPaths,
            totalPoints: winner.totalPoints,
            lastUpdated: winner.lastUpdated
          }
        }
      );
    } else {
      // Create new winner with first path
      winner = createWinner(name, email, path);

      // Validate winner data
      const validation = validateWinner(winner);
      if (!validation.valid) {
        return NextResponse.json(
          { error: 'Validation failed', details: validation.errors },
          { status: 400 }
        );
      }

      // Insert new winner
      await winnersCollection.insertOne(winner);
    }

    // Get points for this path
    const pathPoints = PATH_POINTS[path] ?? 0;


    return NextResponse.json(
      { 
        message: 'Path completed! Points added to your total!', 
        email: email,
        pathPoints: pathPoints,
        totalPoints: winner.totalPoints,
        completedPaths: winner.completedPaths.length
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