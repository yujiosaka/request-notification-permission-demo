import { useState } from 'react';
import Head from 'next/head';
import styles from '@/styles/Home.module.css'

export default function Home() {
  const [seconds, setSeconds] = useState(0);

  function requestPermission(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setTimeout(() => {
      Notification.requestPermission()
    }, seconds * 1000)
  }

  return (
    <>
      <Head>
        <title>Request notification permission demo</title>
        <meta name="description" content="Request notification permission demo" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <form onSubmit={ requestPermission }>
          <h1>Request notification permission demo</h1>
          <br/>
          Request push notification after
          &nbsp;
          <input
            type="number"
            value={ seconds }
            onChange={ event => setSeconds(parseInt(event.target.value)) }
          />
          &nbsp;
          seconds
          &nbsp;
          <button type="submit">
          Request
          </button>
        </form>
      </main>
    </>
  )
}
