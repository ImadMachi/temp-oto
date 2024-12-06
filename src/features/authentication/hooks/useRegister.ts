import type { RegisterData } from '@/types/authTypes'
import { useMutation } from '@tanstack/react-query'
import register from '../services/register'

export default function useRegister({
  setRegisterError
}: {
  setRegisterError: React.Dispatch<React.SetStateAction<string | null>>
}) {
  return useMutation<void, Error, RegisterData>({
    mutationFn: register,
    onError: (e: any) => {
      setRegisterError(e.response?.data?.email[0] || null)
    }
  })
}
