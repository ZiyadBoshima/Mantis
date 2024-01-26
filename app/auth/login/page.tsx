'use client'

import { Heading, TextField, Button } from "@radix-ui/themes"
import FormWrapper from "../FormWrapper"
import { userLoginSchema } from "@/app/validationSchemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useState } from "react"
import { z } from "zod"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"

type UserFormData = z.infer<typeof userLoginSchema>

const Login = () => {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm<UserFormData>({
    resolver: zodResolver(userLoginSchema)
  })

  const [error, setError] = useState('')
  const [isSubmitting, setSubmitting] = useState(false)

  const onSubmit = handleSubmit(async (data) => {
    try {
      await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: true,
        callbackUrl: '/'
      })
    } catch(error) {
    }
  })

  return (
    <FormWrapper type='LOGIN'> 
      <form className="flex flex-col gap-4" onSubmit={onSubmit}>
        <section>
          <Heading size="3" mb="2">Email</Heading>
          <TextField.Input type="email" placeholder="Email" size="3" {...register('email')} />
        </section>
        <section> 
          <Heading size="3" mb="2">Password</Heading>
          <TextField.Input type="password" placeholder="Password" size="3" {...register('password')} />
        </section>
        <Button type="submit" size="3" className="w-full" mt="4">Login</Button>
      </form>
    </FormWrapper>
  )
}

export default Login