import './global.css'

export const metadata = {
  title: 'Docs – Nexa Workspace',
}

interface Props {
  children: React.ReactNode
}

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
