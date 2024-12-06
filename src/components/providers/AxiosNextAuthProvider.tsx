'use client'
import { toast } from 'react-toastify'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import { useEffect } from 'react'
import { API_URL } from '@/constants/base_url'

export default function AxiosNextAuthProvider() {
  // Config
  axios.defaults.baseURL = API_URL

  // Hooks
  const { data: session, update } = useSession()

  // Methods
  const updateSession = async () => {
    try {
      return await update({ forceRefresh: true })
    } catch (error) {
      toast.error('Error updating session. Please try again.')
    }
  }

  // Effects
  useEffect(() => {
    const interval = setInterval(updateSession, 8 * 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const visibilityHandler = () => {
      if (document.visibilityState === 'visible') {
        updateSession()
      }
    }
    window.addEventListener('visibilitychange', visibilityHandler, false)
    return () => window.removeEventListener('visibilitychange', visibilityHandler, false)
  }, [])

  useEffect(() => {
    if (session?.error) {
      toast.error(session.error, {
        toastId: 'session-error'
      })
    }
  }, [session?.error])

  useEffect(() => {
    // Request Interceptor
    const requestInterceptor = axios.interceptors.request.use(
      config => {
        if (session?.tokens?.access) {
          config.headers.Authorization = `Bearer ${session.tokens.access}`
        }
        return config
      },
      error => Promise.reject(error)
    )

    // Response Interceptor
    const responseInterceptor = axios.interceptors.response.use(
      response => response,
      async error => {
        const originalRequest = error.config

        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true

          try {
            const newSession = await updateSession()

            if (newSession?.tokens?.access) {
              originalRequest.headers.Authorization = `Bearer ${newSession.tokens.access}`
            }

            return axios(originalRequest)
          } catch (updateError) {
            toast.error('Session update failed. Please log in again.')

            // You might want to redirect to login or sign out the user
            return Promise.reject(error)
          }
        }

        return Promise.reject(error)
      }
    )

    // Cleanup interceptors
    return () => {
      axios.interceptors.request.eject(requestInterceptor)
      axios.interceptors.response.eject(responseInterceptor)
    }
  }, [session?.tokens?.access, updateSession])

  return <></>
}
