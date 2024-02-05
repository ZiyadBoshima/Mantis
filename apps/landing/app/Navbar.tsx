import Link from 'next/link'
import { Container, Flex } from '@radix-ui/themes'

const Navbar = () => {
  return (
    <nav>
      <Container mt="5" className='px-4 md:px-0'>
          <Flex justify="between" align="baseline">
            <h1 className='text-4xl md:text-5xl font-bold text-blue-600'>Mantis</h1>
            <Link className='text-md md:text-lg' href="mailto:ziyadsalemi7@outlook.com">Contact</Link>
          </Flex>
      </Container>
    </nav>
  )
}

export default Navbar