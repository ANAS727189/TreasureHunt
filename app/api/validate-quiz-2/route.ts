import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { createWinner, addPathCompletion, createQuizAttempt, Collections, PATH_POINTS, Winner } from '@/lib/schemas';
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

        const email = session.user.email;
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

                // Check if user already exists (by email)
                const existingWinner = await winnersCollection.findOne({ email });

                let winner: Winner;
                const pathPoints = PATH_POINTS[pathName] ?? 0;

                if (existingWinner) {
                    // Check if they already completed this path
                    const alreadyCompleted = existingWinner.completedPaths?.some(
                        (p) => p.path === pathName
                    );

                    if (!alreadyCompleted) {
                        // Add new path to existing winner
                        winner = addPathCompletion(existingWinner, pathName);
                        
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
                        winner = existingWinner;
                    }
                } else {
                    // Create new winner with first path
                    winner = createWinner(name, email, pathName);
                    await winnersCollection.insertOne(winner);
                }

                // Track the quiz attempt
                const quizAttempt = createQuizAttempt(name, pathName, true, { code });
                await db.collection(Collections.QUIZ_ATTEMPTS).insertOne(quizAttempt);

            } catch (dbError) {
                console.error('Error saving winner to database:', dbError);
                // Still return passed as true, but log the error
            }
        } else {
            // Track failed attempts
            try {
                const client = await clientPromise;
                const db = client.db('treasure_hunt');
                const quizAttempt = createQuizAttempt(name, 'ye-nahi-kar-paaoge-tum', false, { code });
                await db.collection(Collections.QUIZ_ATTEMPTS).insertOne(quizAttempt);
            } catch (dbError) {
                console.error('Error saving quiz attempt to database:', dbError);
            }
        }

        return NextResponse.json({ passed });
    } catch(error) {
        console.error('Error validating quiz:', error);
        return NextResponse.json({ passed: false, error: 'Invalid request' }, { status: 400 });
    }
}