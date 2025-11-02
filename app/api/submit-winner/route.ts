import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function POST(request: Request) {
  try {
    const { name } = await request.json();

    if (!name || name.trim().length === 0) {
      return NextResponse.json({ error: 'Name is required.' }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db('treasure_hunt');

    const result = await db.collection('winners').insertOne({
      name: name.trim(),
      createdAt: new Date(),
    });

    return NextResponse.json(
      { message: 'Name added to Hall of Fame!', id: result.insertedId },
      { status: 200 }
    );
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: 'Server error. Failed to submit name.' },
      { status: 500 }
    );
  }
}