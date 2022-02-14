import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <script
            defer
            data-domain-id="ad5b2dc6392a0ea4077ba9922d11d191cdccbf78"
            src="https://fairdatacenter.de/cdn/fair.js"
          ></script>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
