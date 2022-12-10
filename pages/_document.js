import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head>
        <meta property="og:title" content="Write me an email" key="title"/>
        <meta property="og:description" content="Product by Paarug Sethi" key="description"/>
        <meta
          property="og:image"
          content="https://live.staticflickr.com/65535/52554439045_eac0a8cc98_b.jpg"
        />
        <meta name="twitter:card" content="summary_large_image"></meta>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
