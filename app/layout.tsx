import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import { Toaster } from "sonner"
import { ThemeProvider } from '@/components/providers/theme-provider'
import { TooltipProvider } from '@/components/ui/tooltip'
import { ProModal } from '@/components/pro-modal'
import { CrispProvider } from '@/components/crisp-provider'
import { Suspense } from 'react'
import { Loader2 } from 'lucide-react'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Numinous',
  description: 'This app helps to chat with leaders who have more knowledge than you or you can be the leader here in many fields.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Suspense fallback={<Loader2 className='h-5 w-5 animate-spin' />}>
      <ClerkProvider>
        <html lang="en" suppressHydrationWarning>
          <body className={inter.className}>
            <CrispProvider />
            <Toaster />
            <ThemeProvider
              attribute='class'
              defaultTheme='light'
              storageKey='numinous'
            >
              <TooltipProvider>
                <ProModal />
                {children}
              </TooltipProvider>
            </ThemeProvider>
          </body>
        </html>
      </ClerkProvider>
    </Suspense>
  )
}
