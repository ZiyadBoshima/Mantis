import React from 'react'
import NavBar from './NavBar'
import { Container } from '@radix-ui/themes'
import { getServerSession } from 'next-auth'
export default function DashboardLayout ({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <NavBar />
      <main className='p-5 mb-5'>
        <Container>
          {children}
        </Container>
      </main>
    </>
  )
}