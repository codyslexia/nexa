import Image from 'next/image'
import { Suspense } from 'react'

import styles from './page.module.scss'
import LoginButton from './button'

export default function LoginPage() {
  return (
    <div className={styles.card}>
      <Image className={styles.logo} alt="Nexa" width={100} height={100} src="/logo.png" />
      <h1 className={styles.title}>Nexa</h1>
      <p className={styles.description}>
        Your private, self sustained digital workspace.
        <br />
        <a
          className={styles.link}
          href="https://github.com/codyslexia/nexa"
          rel="noreferrer"
          target="_blank"
          style={{ fontSize: '0.75rem' }}
        >
          Learn more{' '}
        </a>
      </p>

      <div className={styles.wrapButton}>
        <Suspense fallback={<span>Loading...</span>}>
          <LoginButton />
        </Suspense>
      </div>
    </div>
  )
}
