import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  // Get the authorization header
  const authToken = request.headers.get('x-auth-token');
    // Parse the request body
  const body = await request.json();
  const { name, email, why_you, referral_code } = body;



  // First check: Referral code
    if (!referral_code || referral_code !== 'RAJ-WORKS-HERE-123') {
    return NextResponse.json(
      { error: "Application rejected. 'referral_code' is missing. We only hire through referrals." },
      { status: 400 }
    );
  }
  
    // Second check: Auth token
  if (!authToken || authToken !== 'this-company-is-a-joke-lol') {
    return NextResponse.json(
      { error: "Invalid API token. Did you forget your 'X-Auth-Token' header?" },
      { status: 401 }
    );
  }

  // If both checks pass, redirect to success page
  return NextResponse.json(
    { 
      message: "Congratulations! You've proven yourself worthy!",
      redirect: '/yay-i-got-the-job-in-MTV-haha'
    },
    { status: 200 }
  );
}