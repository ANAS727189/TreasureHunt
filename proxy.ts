import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const authToken = request.cookies.get("auth_token")?.value;
  const currentPath = request.nextUrl.pathname;

  // Define all protected paths
  const protectedPaths = [
    "/candidate-dashboard-portal-cards",
    "/tu-nalla-hi-marega",
    "/dashboard",
  ];

  // Define winner paths that need extra validation
  const winnerPaths = [
    "/candidate-dashboard-portal-cards/internship/yay-i-got-the-job-in-MTV-haha",
    "/candidate-dashboard-portal-cards/apply/yay-i-got-the-job-in-MTV-haha",
    "/candidate-dashboard-portal-cards/policy/yay-i-got-the-job-in-MTV-haha",
    "/candidate-dashboard-portal-cards/angry-hr-complaint/yay-i-got-the-job-in-MTV-haha",
    "/candidate-dashboard-portal-cards/stack/yay-i-got-the-job-in-MTV-haha",
    "/candidate-dashboard-portal-cards/swag-store/yay-i-got-the-job-in-MTV-haha",
  ];

  // Check if current path is a protected path or starts with one
  const isProtectedRoute = protectedPaths.some((path) =>
    currentPath.startsWith(path)
  );
  const isWinnerRoute = winnerPaths.some((path) =>
    currentPath.startsWith(path)
  );

  // If no auth token and trying to access protected route, redirect to login
  if (isProtectedRoute && !authToken) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // If accessing winner route, validate progress from localStorage
  if (isWinnerRoute) {
    // For winner routes, we'll let the page component handle the validation
    // since middleware can't access localStorage
    // The page components should check for proper puzzle completion
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Protected routes
    "/candidate-dashboard-portal-cards/:path*",
    "/dashboard/:path*",
    "/tu-nalla-hi-marega/:path*",
    // Winner routes
    "/candidate-dashboard-portal-cards/internship/yay-i-got-the-job-in-MTV-haha/:path*",
    "/candidate-dashboard-portal-cards/apply/yay-i-got-the-job-in-MTV-haha/:path*",
    "/candidate-dashboard-portal-cards/policy/yay-i-got-the-job-in-MTV-haha/:path*",
    "/candidate-dashboard-portal-cards/angry-hr-complaint/yay-i-got-the-job-in-MTV-haha/:path*",
    "/candidate-dashboard-portal-cards/stack/yay-i-got-the-job-in-MTV-haha/:path*",
    "/candidate-dashboard-portal-cards/swag-store/yay-i-got-the-job-in-MTV-haha/:path*",
  ],
};
