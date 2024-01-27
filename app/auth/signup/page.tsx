'use client'

import { Heading, TextField, Button, Callout, Flex } from '@radix-ui/themes'
import FormWrapper from '../FormWrapper'
import { signUp } from '@/app/actions/user/signUp'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { userSignupSchema } from '@/app/validationSchemas'
import { z } from 'zod'
import { ErrorMessage, Spinner } from '@/app/components'
import { useRouter } from 'next/navigation'

type UserFormData = z.infer<typeof userSignupSchema>

const SignupPage = () => {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm<UserFormData>({
    resolver: zodResolver(userSignupSchema)
  })

  const [error, setError] = useState('')
  const [isSubmitting, setSubmitting] = useState(false)

  const onSubmit = handleSubmit(async (data) => {
    try {
      setSubmitting(true)
      setError('')
      
      await signUp(data)
      router.push('/auth/login?signup=true')
    } catch(error) {
      setSubmitting(false)
      setError('An unexpected error occured. Please try again.')
    }
  })

  return (
    <>
      <FormWrapper type='SIGNUP'> 
        <form className="flex flex-col gap-4" onSubmit={onSubmit}>
          <section>
            <Flex align='baseline' justify='between'>
              <Heading size="3" mb="2">Name</Heading>
              {errors.name?.message && (<ErrorMessage>{errors.name?.message}</ErrorMessage>)}
            </Flex>
            <TextField.Input type="name" placeholder="Name" size="3" {...register('name')} />
          </section>
          <section>
            <Flex align='baseline' justify='between'>
              <Heading size="3" mb="2">Email</Heading>
              {errors.email?.message && (<ErrorMessage>{errors.email?.message}</ErrorMessage>)}
            </Flex>
            <TextField.Input type="email" placeholder="Email" size="3" {...register('email')} />
          </section>
          <section> 
            <Flex align='baseline' justify='between'>
              <Heading size="3" mb="2">Password</Heading>
              {errors.password?.message && (<ErrorMessage>{errors.password?.message}</ErrorMessage>)}
            </Flex>
            <TextField.Input type="password" placeholder="Password" size="3" {...register('password')} />
          </section>
          <Button disabled={isSubmitting} type="submit" size="3" className="w-full" mt="4">
            {isSubmitting ? <Spinner /> : 'Sign Up'}
          </Button>
        </form>
      </FormWrapper>
      {error && (
        <Callout.Root color="red" className='max-w-md mx-auto my-2'>
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
    </>
  )
}

export default SignupPage