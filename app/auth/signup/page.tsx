'use client'

import { Heading, TextField, Button, Avatar } from '@radix-ui/themes'
import FormWrapper from '../FormWrapper'
import { signUp } from '@/app/actions/user/signUp'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { userSignupSchema } from '@/app/validationSchemas'
import { z } from 'zod'

type UserFormData = z.infer<typeof userSignupSchema>

const SignupPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<UserFormData>({
    resolver: zodResolver(userSignupSchema)
  })

  const [error, setError] = useState('')
  const [isSubmitting, setSubmitting] = useState(false)

  const onSubmit = handleSubmit(async (data) => {
    try {
      setSubmitting(true)
      await signUp(data)
    } catch(error) {
      setSubmitting(false)
      setError('An unexpected error occured.')
    }
  })

  return (
    <FormWrapper type='SIGNUP'> 
      <form className="flex flex-col gap-4" onSubmit={onSubmit}>
        <section>
          <Heading size="3" mb="2">Name</Heading>
          <TextField.Input type="name" placeholder="Name" size="3" {...register('name')} />
        </section>
        <section>
          <Heading size="3" mb="2">Email</Heading>
          <TextField.Input type="email" placeholder="Email" size="3" {...register('email')} />
        </section>
        <section> 
          <Heading size="3" mb="2">Password</Heading>
          <TextField.Input type="password" placeholder="Password" size="3" {...register('password')} />
        </section>
        <Button type="submit" size="3" className="w-full" mt="4">Sign Up</Button>
      </form>
    </FormWrapper>
  )
}

export default SignupPage