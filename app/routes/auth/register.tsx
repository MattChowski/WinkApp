import { Fieldset } from '@headlessui/react'
import { KeyRound, Mail } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import { z } from 'zod'
import { useRegisterUserMutation } from '~/apiHooks/useRegisterUserMutation'
import { PrimaryButton } from '~/components/base/Buttons'
import { InputComponent } from '~/components/base/InputComponent'
import { LinkTo } from '~/components/base/Links'

const schema = z.object({
  email: z.email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
})

export default function Register() {
  const navigate = useNavigate()
  const [error, setError] = useState({ email: false, password: false })
  const { isPending, mutate } = useRegisterUserMutation()

  const handleRegister = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    mutate(
      { email, password },
      {
        onSuccess: () => {
          navigate('/login')
        },
        onError: () => {
          setError({ email: true, password: true })
        },
      },
    )
  }

  const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value

    const result = schema.shape.email.safeParse(value)
    if (!result.success) {
      setError({ email: true, password: error.password })
      return
    } else {
      setError({ email: false, password: error.password })
    }
  }

  const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value

    const result = schema.shape.password.safeParse(value)
    if (!result.success) {
      setError({ email: error.email, password: true })
      return
    } else {
      setError({ email: error.email, password: false })
    }
  }

  return (
    <div className="h-full">
      <div className="mb-10">
        <h1 className="mb-2 text-center font-extrabold text-4xl text-tertiary">
          Create a <span className="text-primary">Wink</span> account
        </h1>
        <p className="text-center text-tertiary/60">Enter your details to get started</p>
      </div>
      <form method="post" className="flex flex-col gap-4" autoComplete="off" onSubmit={handleRegister}>
        <Fieldset className="flex flex-col gap-4">
          <InputComponent
            icon={Mail}
            label="E-mail address"
            type="text"
            name="email"
            placeholder="your-company@email.com"
            className="rounded-md bg-white/20 p-1"
            error={error.email}
            errorMessage={error.email ? 'Invalid email address' : ''}
            onChange={handleChangeEmail}
            autoComplete="off"
          />
          <InputComponent
            icon={KeyRound}
            label="Password"
            type="password"
            name="password"
            placeholder="Create a password"
            className="rounded-md bg-white/20 p-1"
            error={error.password}
            errorMessage={error.password ? 'Invalid password' : ''}
            onChange={handleChangePassword}
            autoComplete="new-password"
          />
        </Fieldset>
        <PrimaryButton
          type="submit"
          label="Create account"
          isLoading={isPending}
          className="shadow-primary/30 shadow-xl"
        />
      </form>
      <p className="mt-8 text-center text-tertiary">
        Already have an account? <LinkTo to="/login">Sign in instead</LinkTo>.
      </p>
    </div>
  )
}
