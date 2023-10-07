import React from 'react'
import Image from 'next/image'

export default function Home() {
  return (
    <main className="main colorful">
      <div className="card">
        <Image
          style={{ alignSelf: 'center' }}
          alt="Nexa"
          width={100}
          height={100}
          src="/logo.png"
        />
        <span className="title">Nexa</span>
        <p>Your Private, Self-Sustained Digital Workspace</p>
        <br />
        <small>
          Powered by <b>Vercel</b>
        </small>
      </div>
    </main>
  )
}
