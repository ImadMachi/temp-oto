import { getToken } from 'next-auth/jwt'
import { type NextRequest, NextResponse } from 'next/server'

function isTokenExpired(expiration: number): boolean {
  return Date.now() >= expiration * 1000
}

export default async function middleware(req: NextRequest) {
  const token = await getToken({ req })
  const baseUrl = req.nextUrl.origin

  // Check if the user is authenticated
  if (
    !(req.url.includes('/login') || req.url.includes('/register')) &&
    (!token || isTokenExpired(token.data.validity.refresh_until))
  ) {
    // Redirect to the login page
    const response = NextResponse.redirect(`${baseUrl}/login`)
    // Clear the session cookies
    response.cookies.set('next-auth.session-token', '', { maxAge: 0 })
    response.cookies.set('next-auth.csrf-token', '', { maxAge: 0 })

    return response
  }

  if (token && (req.url.includes('/login') || req.url.includes('/register'))) {
    // Redirect to the home page
    return NextResponse.redirect(`${baseUrl}/`)
  }

  // If authenticated, continue with the request
  return NextResponse.next()
}

// Authenticate all routes except for /api, /_next/static, /_next/image, and .png files
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)']
}
