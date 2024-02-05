import { Flex, Heading, Box, Text } from "@radix-ui/themes"
import Link from "next/link"



interface Props {
  children: React.ReactNode,
  type: 'LOGIN' | 'SIGNUP'
}

const FormWrapper = ({
  children,
  type
}: 
  Props
) => {
  return (
    <div className='max-w-md my-0 mx-auto'>
      <div className='p-4 border bg-white rounded-lg'>
        <Flex direction="column" gap="4">
          <Flex direction="column" gap="2">
            <Text className='font-md text-gray-500'>Welcome!</Text>
            <Heading size="6">{formOptions[type]}</Heading>
          </Flex>
          {children}
        </Flex>
      </div>
      <Box mt="2" className='text-center'>
        {(type === 'LOGIN') ? <Text>Don&apos;t have an account? </Text> : <Text>Already have an account? </Text>}
        <Link 
          className='underline text-blue-700' 
          href={`/auth/${(type === 'LOGIN') ? 'signup' : 'login'}`}
        >
          {(type === 'LOGIN') ? 'Sign Up' : 'Login'}
        </Link>
      </Box>
    </div>
  )
}

export const formOptions: {
  [key: string]: string
} = {
  LOGIN: 'Login',
  SIGNUP: 'Sign Up',
}

export default FormWrapper