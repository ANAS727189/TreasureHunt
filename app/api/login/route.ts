import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();
    const validUsername = 'haha_tujhko_kya_naukri_milegi';
    const validPassword = 'naukri_krun_chahiye_tere_ko_nalla_mar_na';

    if (username === validUsername && password === validPassword) {
      return NextResponse.json({ message: 'Login successful!' }, { status: 200 });
    } else {
      return NextResponse.json(
        { error: 'Invalid credentials. HR is watching.' },
        { status: 401 }
      );
    }
  } catch (e) {
    return NextResponse.json(
      { error: 'Something went wrong on the server.' },
      { status: 500 }
    );
  }
}