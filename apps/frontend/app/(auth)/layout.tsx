import { Metadata } from 'next'
import { ReactNode } from 'react'

import styles from './layout.module.scss'

export const metadata: Metadata = {
  title: 'Login – Nexa Workspace',
}

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <main className="main">
      <div className={styles.wrapper}>{children}</div>
    </main>
  )
}
