import { Metadata } from 'next'

import '../styles/global.css'
import { inter } from '../styles/fonts'
import { Providers } from './providers'

const image = 'https://nexa.codyslexia.com/thumbnail.png'
const title = 'Nexa – Your Private, Self-Sustained Digital Workspace'
const description =
  'Nexa is a full-stack Next.js app with multi-tenancy and custom domain support. Built with Next.js App Router, Vercel Postgres and the Vercel Domains API.'

export const metadata: Metadata = {
  title,
  description,
  icons: ['https://nexa.codyslexia.com/favicon.ico'],
  openGraph: {
    title,
    description,
    images: [image],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: [image],
    creator: '@codyslexia',
  },
  metadataBase: new URL('https://nexa.codyslexia.com'),
}

interface Props {
  children: React.ReactNode
}

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
