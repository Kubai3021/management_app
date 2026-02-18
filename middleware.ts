import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const token = request.cookies.get("auth_token");
    const isLoginPage = request.nextUrl.pathname === "/login";

    // Define public paths (static files, images, etc.)
    const isPublicPath =
        request.nextUrl.pathname.startsWith("/_next") ||
        request.nextUrl.pathname.startsWith("/static") ||
        request.nextUrl.pathname.includes("."); // primitive check for files (favicon.ico etc)

    if (isPublicPath) {
        return NextResponse.next();
    }

    // If user is not logged in and trying to access a protected page
    if (!token && !isLoginPage) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    // If user IS logged in and trying to access login page
    if (token && isLoginPage) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};
