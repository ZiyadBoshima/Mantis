import '@radix-ui/themes/styles.css'
import './theme-config.css'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Container, Theme } from '@radix-ui/themes'
import NavBar from './NavBar'
import AuthProvider from './auth/Provider'
import QueryClientProvider from './QueryClientProvider'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter', 
})

export const metadata: Metadata = {
  title: 'Mantis - issue tracker',
  description: 'The issue tracker for your software projects',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en"  className={inter.variable}>
      <body>
        <QueryClientProvider>
          <AuthProvider>
            <Theme appearance="light" accentColor="indigo" grayColor="mauve">
              <NavBar />
              <main className='p-5 mb-5'>
                <Container>
                  {children}
                </Container>
              </main>
            </Theme>
          </AuthProvider>
        </QueryClientProvider>
      </body>
    </html>
  )
}
