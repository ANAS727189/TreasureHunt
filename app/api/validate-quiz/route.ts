import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function POST(req: NextRequest) {
  try {
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
      'q7-a', 'q7-b', 'q7-d', // Question 7: A, B, D are correct (should NOT be crossed)
      'q8-a',                  // Question 8: A is correct (should NOT be crossed)
    ];

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
      const isCorrect = correctAnswers.includes(option);
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

        await db.collection('winners').insertOne({
          name: name.trim(),
          path: 'ye-to-kar-looge-tum',
          createdAt: new Date(),
        });
      } catch (dbError) {
        console.error('Error saving winner to database:', dbError);
        // Still return passed as true, but log the error
      }
    }

    return NextResponse.json({ passed });
  } catch (error) {
    console.error('Error validating quiz:', error);
    return NextResponse.json({ passed: false, error: 'Invalid request' }, { status: 400 });
  }
}
