'use client';

import { Skeleton } from '@/app/components';
import { Avatar, Box, Container, DropdownMenu, Flex, Text } from '@radix-ui/themes';
import classnames from 'classnames';
import { signOut, useSession } from "next-auth/react";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NavBar = () => {

  return (
    <nav className='border-b mb-5 px-5 py-3 bg-slate-50'>
      <Container>
        <Flex justify="between">
          <Flex align="center" gap="3">
            <Link href="/" className='text-2xl font-semibold text-blue-600 mr-5'>Mantis</Link>
            <NavLinks />
          </Flex>
          <AuthStatus />
        </Flex>
      </Container>
    </nav>
  )
}

const NavLinks = () => {
  const currentPath = usePathname();

  const links = [
    { label: 'Dashboard', href: '/' },
    { label: 'Issues', href: '/issues/list' },
  ]

  return (
    <ul className='flex space-x-6'>
      {links.map(link =>
        <li key={link.href}>
          <Link 
          className={classnames({
            'nav-link': true,
            '!text-zinc-900': link.href === currentPath,
          })}
          href={link.href}>
            {link.label}
          </Link>
        </li>
      )}
    </ul>
  )
  
}

const AuthStatus = () => {
  const { status, data: session } = useSession()

  if (status === "loading") return <Skeleton width="3rem" />
  
  return (
    <Box>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <div className='cursor-pointer'>
            <Avatar 
            src={session!.user!.image!} 
            fallback={session!.user!.name![0]}
            size="2"
            radius='full'
            referrerPolicy='no-referrer'/>
          </div>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Label>
            <Text size="2">
              {session!.user!.email!}
            </Text>
          </DropdownMenu.Label>
          <DropdownMenu.Item>
            <button onClick={() => signOut()}>Log out</button>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </Box>
  )
}

export default NavBar