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
import useRegister from '../hooks/useRegister'

const registerSchema = Yup.object().shape({
  full_name: Yup.string().required('Full name is required'),
  phone: Yup.string().required('Phone number is required'),
  email: Yup.string().required('Email is required').email('Email must be a valid email address'),
  password: Yup.string().required('Password is required'),
  agree_to_terms: Yup.boolean().oneOf([true], 'You must agree to the terms and conditions')
})

type SchemaType = Yup.InferType<typeof registerSchema>

export default function RegisterForm() {
  // States
  const [isPasswordShown, setIsPasswordShown] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [registerError, setRegisterError] = useState<string | null>(null)

  // Hooks
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<SchemaType>({
    resolver: yupResolver(registerSchema),
    defaultValues: {
      full_name: '',
      phone: '',
      email: '',
      password: '',
      agree_to_terms: false
    }
  })
  const router = useRouter()
  const { lang: locale } = useParams()
  const { mutateAsync } = useRegister({ setRegisterError })

  // Methods
  const handleClickShowPassword = () => setIsPasswordShown(show => !show)

  const onSubmit = async (data: SchemaType) => {
    setRegisterError(null)
    setIsSubmitting(true)
    try {
      await mutateAsync(data)
      const result = await signIn('credentials', {
        redirect: false,
        email: data.email,
        password: data.password
      })
      if (result?.error) {
        setRegisterError('Invalid email or password. Please try again.')
        setIsSubmitting(false)
      } else if (result?.ok) {
        router.push('/')
      }
    } catch (error) {
      toast.error(registerError || 'An unexpected error occurred. Please try again.')
      setIsSubmitting(false)
    }
  }

  return (
    <form autoComplete='off' onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-5'>
      <Controller
        name='full_name'
        control={control}
        render={({ field }) => (
          <CustomTextField
            {...field}
            autoFocus
            fullWidth
            label='Full Name'
            placeholder='Enter your full name'
            error={!!errors.full_name}
            helperText={errors.full_name?.message}
          />
        )}
      />
      <Controller
        name='phone'
        control={control}
        render={({ field }) => (
          <CustomTextField
            {...field}
            autoFocus
            fullWidth
            label='Phone'
            placeholder='Enter your phone'
            error={!!errors.phone}
            helperText={errors.phone?.message}
          />
        )}
      />
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
          name='agree_to_terms'
          control={control}
          render={({ field: { value, onChange } }) => (
            <>
              <FormControlLabel
                control={<Checkbox checked={value} onChange={e => onChange(e.target.checked)} />}
                label={
                  <>
                    <span>I agree to </span>
                    <Link className='text-primary' href='/' onClick={e => e.preventDefault()}>
                      privacy policy & terms
                    </Link>
                  </>
                }
              />
              {!!errors.agree_to_terms && (
                <Typography component='p' color='error'>
                  {errors.agree_to_terms.message}
                </Typography>
              )}
            </>
          )}
        />
      </div>
      {registerError && (
        <Typography color='error' variant='body2' sx={{ textAlign: 'center', mt: 2 }}>
          {registerError}
        </Typography>
      )}
      <Button fullWidth variant='contained' type='submit' endIcon={isSubmitting && <i className='tabler-loader' />}>
        Register
      </Button>

      <div className='flex justify-center items-center flex-wrap gap-2'>
        <Typography>Already have an account?</Typography>
        <Typography component={Link} href={getLocalizedUrl('/login', locale as Locale)} color='primary'>
          Login instead
        </Typography>
      </div>
    </form>
  )
}
