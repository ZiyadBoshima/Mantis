'use client'

import { Heading, TextField, Button, Callout, Flex } from "@radix-ui/themes"
import FormWrapper from "../FormWrapper"
import { userLoginSchema } from "@/app/validationSchemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useState } from "react"
import { z } from "zod"
import { signIn } from "next-auth/react"
import { useSearchParams } from "next/navigation"
import SuccessMessage from "@/app/components/SuccessMessage"
import { ErrorMessage, Spinner } from "@/app/components"

type UserFormData = z.infer<typeof userLoginSchema>

const Login = () => {
  const params = useSearchParams()

  const { register, handleSubmit, formState: { errors } } = useForm<UserFormData>({
    resolver: zodResolver(userLoginSchema)
  })

  const [error, setError] = useState('')
  const [isSubmitting, setSubmitting] = useState(false)

  const onSubmit = handleSubmit(async (data) => {
    try {
      setError('')
      setSubmitting(true)

      await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: true,
        callbackUrl: '/'
      })
    } catch(error) {
      setSubmitting(false)
      setError('An unexpected error occured. Please try again.')
    }
  })

  return (
    <>
      <FormWrapper type='LOGIN'> 
        <form className="flex flex-col gap-4" onSubmit={onSubmit}>
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
            {isSubmitting ? <Spinner /> : 'Login'}
          </Button>
        </form>
      </FormWrapper>
      {(params.get('signup') && !error) && (
        <Callout.Root color="green" className='max-w-md mx-auto my-2'>
          <Callout.Text>Sign up successful! Please login to continue.</Callout.Text>
        </Callout.Root>
      )}
      {error && (
        <Callout.Root color="red" className='max-w-md mx-auto my-2'>
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
    </>
  )
}

export default Login