import Head from 'next/head'

import Page from '@components/page'
import Link from '@components/link'
import styles from './error.module.css'

const Error = ({ status }) => {
  return (
    <Page title={status || 'Error'}>
      <Head>
        <title>404 — Afonso</title>
      </Head>

      {status === 404 ? (
        <>
          <h1>This page cannot be found.</h1>

          <p>
            <blockquote cite="https://afonsojramos.me/">
              <p>The perfect personal website doesn't exis-</p>

              <footer>
                — You, before visiting this{' '}
                <Link external href="https://afonsojramos.me/">
                  <cite>website</cite>
                </Link>
              </footer>
            </blockquote>
          </p>
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
