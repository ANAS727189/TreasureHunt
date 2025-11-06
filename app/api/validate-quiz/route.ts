import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { createQuizAttempt, Collections, PATH_POINTS, Winner } from '@/lib/schemas';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';


export async function POST(req: NextRequest) {
  try {
    // Get the session from better-auth
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    // Check if user is authenticated with Google
    if (!session?.user?.email) {
      return NextResponse.json(
        { passed: false, error: 'Unauthorized. Please log in with Google first.' },
        { status: 401 }
      );
    }

    const email = session.user.email;
    const { selected, name } = await req.json();

    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      return NextResponse.json({ passed: false, error: 'Name is required' }, { status: 400 });
    }

    const correctAnswers = [
      'q1-b', 'q1-c', 'q1-d', // Question 1: B, C, D are correct (should NOT be crossed)
      'q2-a', 'q2-d',         // Question 2: A, D are correct (should NOT be crossed)
      'q3-b', 'q3-c',         // Question 3: B, C are correct (should NOT be crossed)
      'q4-a', 'q4-b',         // Question 4: A, B are correct (should NOT be crossed)
      'q5-a', 'q5-b', 'q5-c', // Question 5: A, B, C are correct (should NOT be crossed)
      'q6-a', 'q6-b', 'q6-d', // Question 6: A, B, D are correct (should NOT be crossed)
      'q7-a', 'q7-b',         // Question 7: A, B are correct (should NOT be crossed)
      'q8-a',                 // Question 8: A is correct (should NOT be crossed)
    ];

    // Use Set for O(1) lookup instead of Array O(n)
    const correctAnswersSet = new Set(correctAnswers);

    const allOptions = [
      // Q1
      'q1-a', 'q1-b', 'q1-c', 'q1-d',
      // Q2
      'q2-a', 'q2-b', 'q2-c', 'q2-d',
      // Q3
      'q3-a', 'q3-b', 'q3-c', 'q3-d',
      // Q4
      'q4-a', 'q4-b', 'q4-c', 'q4-d',
      // Q5
      'q5-a', 'q5-b', 'q5-c', 'q5-d', 'q5-e', 'q5-f',
      // Q6
      'q6-a', 'q6-b', 'q6-c', 'q6-d',
      // Q7
      'q7-a', 'q7-b', 'q7-c', 'q7-d',
      // Q8
      'q8-a', 'q8-b', 'q8-c', 'q8-d',
    ];

    let passed = true;

    for (const option of allOptions) {
      const isCorrect = correctAnswersSet.has(option); // O(1) lookup
      const isCrossed = selected[option] === true;

      if (isCorrect && isCrossed) {
        passed = false;
        break;
      } else if (!isCorrect && !isCrossed) {
        passed = false;
        break;
      }
    }

    if (passed) {
      try {
        const client = await clientPromise;
        const db = client.db('treasure_hunt');
        const winnersCollection = db.collection<Winner>(Collections.WINNERS);
        const pathName = 'ye-to-kar-looge-tum';
        const pathPoints = PATH_POINTS[pathName] ?? 0;

        // Use atomic operation to prevent race conditions
        const result = await winnersCollection.findOneAndUpdate(
          { 
            email,
            'completedPaths.path': { $ne: pathName }
          },
          {
            $setOnInsert: {
              name: name.trim(),
              email: email.trim().toLowerCase(),
              createdAt: new Date(),
            },
            $addToSet: {
              completedPaths: {
                path: pathName,
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

        // Track successful quiz attempt (non-blocking)
        const quizAttempt = createQuizAttempt(name, pathName, true, selected);
        db.collection(Collections.QUIZ_ATTEMPTS).insertOne(quizAttempt)
          .catch(err => console.error('Error saving quiz attempt:', err));

        // Invalidate cache (non-blocking)
        if (result) {
          const { CacheManager } = await import('@/lib/cache');
          CacheManager.invalidateLeaderboard()
            .catch(err => console.error('Error invalidating cache:', err));
        }

      } catch (dbError) {
        console.error('Error saving winner to database:', dbError);
        // Still return passed as true, but log the error
      }
    } else {
      // Track failed attempts in background (non-blocking)
      clientPromise.then(async (client) => {
        const db = client.db('treasure_hunt');
        const quizAttempt = createQuizAttempt(name, 'ye-to-kar-looge-tum', false, selected);
        await db.collection(Collections.QUIZ_ATTEMPTS).insertOne(quizAttempt);
      }).catch(err => console.error('Error saving failed quiz attempt:', err));
    }

    return NextResponse.json({ passed });
  } catch (error) {
    console.error('Error validating quiz:', error);
    return NextResponse.json({ passed: false, error: 'Invalid request' }, { status: 400 });
  }
}
