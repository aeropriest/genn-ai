// import './globals.css'
// import type { Metadata } from 'next'
// import { Inter } from 'next/font/google'

// const inter = Inter({ subsets: ['latin'] })

// export const metadata: Metadata = {
//   title: 'Generate perfect pitch for your profile with AI',
//   description: 'Application created by Ashok jaiswal',
// }

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode
// }) {
//   return (
//     <html lang="en">
//       <body className={inter.className}><div className="h-screen w-screen flex flex-col bg-pink-00">{children}</div>
//       </body>
//     </html>
//   )
// }


import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import { ToasterProvider } from '@/components/toaster-provider'
import { ModalProvider } from '@/components/modal-provider'

import './globals.css'

const font = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'gennai',
  description: 'AI Platform',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={font.className}>
        <ToasterProvider />
        <ModalProvider />
        <div className="h-screen w-screen flex flex-col bg-pink-00">{children}</div>
      </body>
    </html>
  )
}
