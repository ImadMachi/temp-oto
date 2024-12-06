import axios from 'axios'
import type { RegisterData } from '@/types/authTypes'

export default async function register(data: RegisterData): Promise<void> {
  const response = await axios.post(`/auth/signup/`, data)
  return response.data
}
