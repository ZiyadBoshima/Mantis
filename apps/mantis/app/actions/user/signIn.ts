import { signIn as authSignIn } from "next-auth/react"

export const signIn = async({
  email,
  password,
}: {
  email: string,
  password: string
}) => {
  return await authSignIn('credentials', {
    email,
    password,
    redirect: false,
  })
  .then(res => {
    if (res?.status == 200) {
      return res.status
    } else if (res?.status == 401) {
      throw new Error('Email or password is incorrect.')
    } else {
      throw new Error(res?.error || 'An unexpected error occured. Please try again.')
    }
  })
}