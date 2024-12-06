import type { User, UserObject } from 'next-auth'

declare module 'next-auth' {
  /**
   * The user information we expect to be able to extract
   * from our decoded backend tokens
   */
  export interface UserObject {
    id: number
    email: string
    full_name: string
    phone: string
    profile: string
    accountId: number
    groups: { id: number; name: string }[]
  }

  export interface LoginResponse extends UserObject {
    refresh: string
    access: string
    refresh_expire_timestamp: number
    access_expire_timestamp: number
    accounts: {
      account: { id: number }
      groups: { id: number; name: string }[]
    }[]
  }

  /**
   * The contents of our refresh call to the backend is a new access token
   */
  export interface RefreshResponse {
    access: string
    access_expire_timestamp: number
  }

  /**
   * The initial backend authentication response contains both an `access`
   * token and a `refresh` token. The refresh token is a long-lived token
   * that is used to obtain a new access token when the current access token
   * expires
   */
  export interface Tokens {
    access: string
    refresh: string
  }

  /**
   * Information extracted from our decoded backend tokens so that we
   * don't need to decode them again.
   * `valid_until` is the time the access token becomes invalid
   * `refresh_until` is the time the refresh token becomes invalid
   */
  export interface AuthValidity {
    valid_until: number
    refresh_until: number
  }

  /**
   * The returned data from the authorize method
   * This is data we extract from our own backend JWT tokens.
   */
  export interface User {
    tokens: Tokens
    user: UserObject
    validity: AuthValidity
  }

  /**
   * Returned by `useSession`, `getSession`, returned by the `session`
   * callback and also the shape received as a prop on the SessionProvider
   * React Context
   */
  export interface Session {
    user: UserObject
    validity: AuthValidity
    tokens: Tokens
    error: 'Refresh Token Expired' | 'Error Refreshing token' | null
  }
}

declare module 'next-auth/jwt' {
  /**
   * Returned by the `jwt` callback and `getToken`, when using JWT sessions
   */
  export interface JWT {
    data: User
    error: 'Refresh Token Expired' | 'Error Refreshing token' | null
  }
}
