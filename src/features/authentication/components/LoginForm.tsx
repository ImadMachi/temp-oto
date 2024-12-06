import { useState } from 'react'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import Checkbox from '@mui/material/Checkbox'
import Button from '@mui/material/Button'
import FormControlLabel from '@mui/material/FormControlLabel'
import { useForm, Controller } from 'react-hook-form'
import CustomTextField from '@core/components/mui/TextField'
import { signIn } from 'next-auth/react'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Typography } from '@mui/material'
import Link from '@/components/Link'
import { useParams, useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import { getLocalizedUrl } from '@/utils/i18n'
import type { Locale } from '@/configs/i18n'

const loginSchema = Yup.object().shape({
  email: Yup.string().required('Email is required').email('Email must be a valid email address'),
  password: Yup.string().required('Password is required'),
  rememberMe: Yup.boolean()
})

type SchemaType = Yup.InferType<typeof loginSchema>

export default function LoginForm() {
  // States
  const [isPasswordShown, setIsPasswordShown] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [loginError, setLoginError] = useState<string | null>(null)

  // Hooks
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<SchemaType>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false
    }
  })
  const router = useRouter()
  const { lang: locale } = useParams()

  // Methods
  const handleClickShowPassword = () => setIsPasswordShown(show => !show)

  const onSubmit = async (data: SchemaType) => {
    setLoginError(null)
    setIsSubmitting(true)
    try {
      const result = await signIn('credentials', {
        redirect: false,
        email: data.email,
        password: data.password
      })
      if (result?.error) {
        setLoginError('Invalid email or password. Please try again.')
      } else if (result?.ok) {
        location.reload()
        // router.refresh()
        // router.push('/')
      }
    } catch (error) {
      toast.error('An unexpected error occurred. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form autoComplete='off' onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-5'>
      <Controller
        name='email'
        control={control}
        render={({ field }) => (
          <CustomTextField
            {...field}
            autoFocus
            fullWidth
            label='Email'
            placeholder='Enter your email'
            error={!!errors.email}
            helperText={errors.email?.message}
          />
        )}
      />
      <Controller
        name='password'
        control={control}
        render={({ field }) => (
          <CustomTextField
            {...field}
            fullWidth
            label='Password'
            placeholder='············'
            type={isPasswordShown ? 'text' : 'password'}
            error={!!errors.password}
            helperText={errors.password?.message}
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton edge='end' onClick={handleClickShowPassword} onMouseDown={e => e.preventDefault()}>
                    <i className={isPasswordShown ? 'tabler-eye-off' : 'tabler-eye'} />
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
        )}
      />

      <div className='flex justify-between items-center gap-x-3 gap-y-1 flex-wrap'>
        <Controller
          name='rememberMe'
          control={control}
          render={({ field: { value, onChange } }) => (
            <FormControlLabel
              control={<Checkbox checked={value} onChange={e => onChange(e.target.checked)} />}
              label='Remember me'
            />
          )}
        />
        <Typography className='text-end' color='primary' component={Link}>
          Forgot password?
        </Typography>
      </div>
      {loginError && (
        <Typography color='error' variant='body2' sx={{ textAlign: 'center', mt: 2 }}>
          {loginError}
        </Typography>
      )}
      <Button fullWidth variant='contained' type='submit' endIcon={isSubmitting && <i className='tabler-loader' />}>
        Login
      </Button>

      <div className='flex justify-center items-center flex-wrap gap-2'>
        <Typography>New on our platform?</Typography>
        <Typography component={Link} href={getLocalizedUrl('/register', locale as Locale)} color='primary'>
          Create an account
        </Typography>
      </div>
    </form>
  )
}
