import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
    const token = await getToken({ req, secret: process.env.AUTH_SECRET });

    console.log(token);

    // If the user is not authenticated, redirect to the home page
    if (!token) {
        return NextResponse.redirect(new URL('/', req.url));
    }

    return NextResponse.next();
}

// Apply middleware only to specific routes
export const config = {
    matcher: ['/AddEvent'],  // Protect the /AddEvent route
};
