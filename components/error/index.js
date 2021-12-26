import Head from 'next/head'
import Lottie from 'react-lottie-player'
import { replaceColor } from 'lottie-colorify'
import { useTheme } from 'next-themes'

import Page from '@components/page'
import Link from '@components/link'
import lottie404 from '@components/icons/lottie/404.json'
import styles from './error.module.css'

const Error = ({ status }) => {
  const { theme } = useTheme()
  return (
    <Page title={status || 'Error'}>
      <Head>
        <title>404 — Afonso</title>
      </Head>

      {status === 404 ? (
        <>
          <Lottie
            loop
            animationData={
              theme === 'dark'
                ? replaceColor('#000000', '#ffffff', lottie404)
                : lottie404
            }
            play
            style={{
              width: 300,
              height: 300,
              margin: '0 auto',
              marginBottom: '-50px',
              marginTop: '-50px'
            }}
          />
          <h1>This page cannot be found.</h1>

          <blockquote cite="https://afonsojramos.me/">
            <p>The perfect personal website doesn't exis-</p>

            <footer>
              — You, before visiting this{' '}
              <Link external href="https://afonsojramos.me/">
                <cite>website</cite>
              </Link>
            </footer>
          </blockquote>
        </>
      ) : (
        <section className={styles.section}>
          <span>{status || '?'}</span>
          <p>An error occurred.</p>
        </section>
      )}
    </Page>
  )
}

export default Error
