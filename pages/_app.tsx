import React from 'react'
import Router from 'next/router'
import App from 'next/app'
import nprogress from 'nprogress'
import debounce from 'lodash.debounce'

// Only show nprogress after 500ms (slow loading)
const start = debounce(nprogress.start, 500)
Router.events.on('routeChangeStart', start)
Router.events.on('routeChangeComplete', () => {
  start.cancel()
  nprogress.done()
  window.scrollTo(0, 0)
})
Router.events.on('routeChangeError', () => {
  start.cancel()
  nprogress.done()
})

import '@styles/global.css'
import { ThemeProvider } from 'next-themes'
import Script from 'next/script'

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props
    return (
      <ThemeProvider disableTransitionOnChange defaultTheme="dark">
        <Component {...pageProps} />
        <Script
          defer
          data-domain-id="ad5b2dc6392a0ea4077ba9922d11d191cdccbf78"
          src="https://fairdatacenter.de/cdn/fair.js"
          strategy="afterInteractive"
        ></Script>
      </ThemeProvider>
    )
  }
}

export default MyApp
