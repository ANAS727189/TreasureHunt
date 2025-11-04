import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function POST(req: NextRequest) { 
    try{
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

                await db.collection('winners').insertOne({
                    name: name.trim(),
                    createdAt: new Date(),
                    quiz: 'ye-nahi-kar-paaoge-tum'
                });
            } catch (dbError) {
                console.error('Error saving winner to database:', dbError);
                // Still return passed as true, but log the error
            }
        }

        return NextResponse.json({ passed });
    } catch(error) {
        console.error('Error validating quiz:', error);
        return NextResponse.json({ passed: false, error: 'Invalid request' }, { status: 400 });
    }
}