import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { QueryProvider } from '@/shared/lib/query-client'
import { Header } from '@/shared/ui/app/header'
import { Footer } from '@/shared/ui/app/footer'
import { Toaster } from '@/shared/ui/shadcn/ui/toaster'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'VIDE Coding Marketplace',
  description: 'A marketplace for used computer hardware',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryProvider>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <Toaster />
        </QueryProvider>
      </body>
    </html>
  )
}
