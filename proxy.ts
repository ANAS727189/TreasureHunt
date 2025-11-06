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
    // "/candidate-dashboard-portal-cards/internship/mtNa+d12y+vE5Ia5c0NrYx7ZN69",
    // "/candidate-dashboard-portal-cards/apply/4wkcnaVUR4M8huJ83QVK+vlq2JFzCb7JC3zM6eX7",
    // "/candidate-dashboard-portal-cards/policy/2Z5r85cbn6cosODsW+W1QyLvQOuubGx051aWlQs0KK4",
    "/candidate-dashboard-portal-cards/angry-hr-complaint/9YtPlItjptkvxnQvQsTI2rFjypoWCJLIU2mM5JL72z0",
    "/candidate-dashboard-portal-cards/stack/sperPc08OGbzTRXULDJ2DhMY5QJoFrh61YkUnN3f7w",
    "/candidate-dashboard-portal-cards/swag-store/mjJMkyU2qVHGsDGnQCI",
    // "/candidate-dashboard-portal-cards/ye-to-kar-looge-tum/duRmg1oRmGn7Wtzwlmo4sMBKY8Qh2wSgm+MkbkPD/7M",
    // "/candidate-dashboard-portal-cards/ye-nahi-kar-paaoge-tum/iA1IH13bDvbqqo8qgZ9CB1wPyPTX+y2DqZrsVfaQQng",
  ];

  // Check if current path is a protected path or starts with one
  const isProtectedRoute = protectedPaths.some((path) =>
    currentPath.startsWith(path)
  );
  const isWinnerRoute = winnerPaths.some((path) =>
    currentPath.startsWith(path)
  );

  // Winner routes also require authentication (they're under protected paths)
  if (isWinnerRoute && !authToken) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Other protected routes require authentication
  if (isProtectedRoute && !authToken) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // If accessing winner route with auth, let the page component handle puzzle validation
  if (isWinnerRoute && authToken) {
    // The page components should check for proper puzzle completion from localStorage
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
    // "/candidate-dashboard-portal-cards/internship/mtNa+d12y+vE5Ia5c0NrYx7ZN69/:path*",
    // "/candidate-dashboard-portal-cards/apply/4wkcnaVUR4M8huJ83QVK+vlq2JFzCb7JC3zM6eX7/:path*",
    // "/candidate-dashboard-portal-cards/policy/2Z5r85cbn6cosODsW+W1QyLvQOuubGx051aWlQs0KK4/:path*",
    "/candidate-dashboard-portal-cards/angry-hr-complaint/9YtPlItjptkvxnQvQsTI2rFjypoWCJLIU2mM5JL72z0/:path*",
    "/candidate-dashboard-portal-cards/stack/sperPc08OGbzTRXULDJ2DhMY5QJoFrh61YkUnN3f7w/:path*",
    "/candidate-dashboard-portal-cards/swag-store/mjJMkyU2qVHGsDGnQCI/:path*",
    // "/candidate-dashboard-portal-cards/ye-to-kar-looge-tum/duRmg1oRmGn7Wtzwlmo4sMBKY8Qh2wSgm+MkbkPD/7M/:path*",
    // "/candidate-dashboard-portal-cards/ye-nahi-kar-paaoge-tum/iA1IH13bDvbqqo8qgZ9CB1wPyPTX+y2DqZrsVfaQQng/:path*",
  ],
};
