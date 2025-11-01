import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    // Get the username and password from the request body
    const { username, password } = await request.json();

    // The correct credentials from your HTML comment
    const validUsername = 'referral_hire';
    const validPassword = 'source_code_is_my_friend';

    if (username === validUsername && password === validPassword) {
      // In a real app, you'd set a JWT or session cookie here.
      // For this game, a simple success message is enough.
      return NextResponse.json({ message: 'Login successful!' }, { status: 200 });
    } else {
      // Give a generic error
      return NextResponse.json(
        { error: 'Invalid credentials. HR is watching.' },
        { status: 401 }
      );
    }
  } catch (e) {
    // Catch any other server errors
    return NextResponse.json(
      { error: 'Something went wrong on the server.' },
      { status: 500 }
    );
  }
}