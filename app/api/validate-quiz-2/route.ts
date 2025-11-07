import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { createQuizAttempt, Collections, PATH_POINTS, Winner } from '@/lib/schemas';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

export async function POST(req: NextRequest) { 
    try{
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

        const email = session.user.email.trim().toLowerCase();
        const { code, name } = await req.json();
        const answer = "9933sojaosaarehojaaofree";

        if (!name || typeof name !== 'string' || name.trim().length === 0) {
            return NextResponse.json({ passed: false, error: 'Name is required' }, { status: 400 });
        }

        if (!code || typeof code !== 'string') {
            return NextResponse.json({ passed: false, error: 'Code is required' }, { status: 400 });
        }

        const passed = code === answer;

        if (passed) {
            try {
                const client = await clientPromise;
                const db = client.db('treasure_hunt');
                const winnersCollection = db.collection<Winner>(Collections.WINNERS);
                const pathName = 'ye-nahi-kar-paaoge-tum';
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
                            email: email,
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
                const quizAttempt = createQuizAttempt(name, pathName, true, { code });
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
                const quizAttempt = createQuizAttempt(name, 'ye-nahi-kar-paaoge-tum', false, { code });
                await db.collection(Collections.QUIZ_ATTEMPTS).insertOne(quizAttempt);
            }).catch(err => console.error('Error saving failed quiz attempt:', err));
        }

        return NextResponse.json({ passed });
    } catch(error) {
        console.error('Error validating quiz:', error);
        return NextResponse.json({ passed: false, error: 'Invalid request' }, { status: 400 });
    }
}