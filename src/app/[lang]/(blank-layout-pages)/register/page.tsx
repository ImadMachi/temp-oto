// Next Imports
import type { Metadata } from 'next'

// Component Imports
import { Register } from '@/features/authentication'

// Server Action Imports
import { getServerMode } from '@core/utils/serverHelpers'

export const metadata: Metadata = {
  title: 'Register',
  description: 'Create an account'
}

const RegisterPage = async () => {
  // Vars
  const mode = getServerMode()

  return <Register mode={mode} />
}

export default RegisterPage
