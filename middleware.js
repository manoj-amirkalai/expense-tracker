import { NextResponse } from "next/server";

export function middleware(request) {
  // Example: Redirect unauthenticated users to the login page

  const isAuthenticated = false;
  const { pathname } = request.nextUrl;

  if (!isAuthenticated && pathname !== "/") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Allow the request to proceed
  return NextResponse.next();
}
