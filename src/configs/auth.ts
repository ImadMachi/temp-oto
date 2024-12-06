import CredentialsProvider from 'next-auth/providers/credentials'
import {
  type AuthOptions,
  type User,
  type UserObject,
  type AuthValidity,
  type LoginResponse,
  getServerSession,
  type RefreshResponse,
  type Tokens
} from 'next-auth'
import type { JWT } from 'next-auth/jwt'
import { API_URL } from '@/constants/base_url'

export function isTokenExpired(expiresAt: number): boolean {
  return Date.now() >= expiresAt * 1000
}

async function refreshAccessToken(nextAuthJWTCookie: JWT): Promise<JWT> {
  try {
    // Get a new access token from backend using the refresh token
    const res = await fetch(`${API_URL}/auth/token/refresh/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refresh: nextAuthJWTCookie.data.tokens.refresh })
    })

    const accessToken: RefreshResponse = await res.json()

    if (!res.ok) throw accessToken

    nextAuthJWTCookie.data.validity.valid_until = accessToken.access_expire_timestamp
    nextAuthJWTCookie.data.tokens.access = accessToken.access

    return nextAuthJWTCookie
  } catch (error) {
    return {
      ...nextAuthJWTCookie,
      error: 'Error Refreshing token'
    }
  }
}

export const authOptions: AuthOptions = {
  session: { strategy: 'jwt' },
  providers: [
    CredentialsProvider({
      name: 'Login',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        try {
          const res = await fetch(`${API_URL}/auth/token/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials)
          })
          const data: LoginResponse = await res.json()

          if (!res.ok) throw null

          const tokens: Tokens = {
            access: data.access,
            refresh: data.refresh
          }

          const user: UserObject = {
            id: data.id,
            email: data.email,
            full_name: data.full_name,
            phone: data.phone,
            profile: data.profile,
            accountId: data.accounts[0].account.id,
            groups: data.accounts[0].groups
          }

          const validity: AuthValidity = {
            valid_until: data.access_expire_timestamp,
            refresh_until: data.refresh_expire_timestamp
          }

          return {
            id: `${user.id}`,
            tokens: tokens,
            user: user,
            validity: validity
          } as User
        } catch (error) {
          return null
        }
      }
    })
  ],
  callbacks: {
    async redirect({ url, baseUrl }) {
      return url.startsWith(baseUrl) ? Promise.resolve(url) : Promise.resolve(baseUrl)
    },
    async jwt({ token, user, account, trigger, session }) {
      // Initial signin contains a 'User' object from authorize method
      if (user && account) {
        console.debug('Initial signin')
        return { ...token, data: user, error: null }
      }

      // Check if update is triggered with forceRefresh flag
      if (trigger === 'update' && session?.forceRefresh) {
        console.debug('Forced token refresh')
        return await refreshAccessToken(token)
      }

      // The current access token is still valid
      if (!isTokenExpired(token.data.validity.valid_until)) {
        console.debug('Access token is still valid')
        return { ...token, error: null }
      }

      // The refresh token is still valid
      if (!isTokenExpired(token.data.validity.refresh_until)) {
        console.debug('Access token is being refreshed')
        return await refreshAccessToken(token)
      }

      // The current access token and refresh token have both expired
      // This should not really happen unless you get really unlucky with
      // the timing of the token expiration because the middleware should
      // have caught this case before the callback is called
      console.debug('Both tokens have expired')
      return { ...token, error: 'Refresh Token Expired' } as JWT
    },
    async session({ session, token }) {
      session.user = token.data.user
      session.validity = token.data.validity
      session.error = token.error
      session.tokens = token.data.tokens
      return session
    }
  },
  pages: {
    signIn: '/login'
  }
}

export const getSession = () => getServerSession(authOptions)
