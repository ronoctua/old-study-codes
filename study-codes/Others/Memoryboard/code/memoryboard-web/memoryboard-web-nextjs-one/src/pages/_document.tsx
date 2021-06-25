import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  render(): JSX.Element {
    return (
      <Html lang="en">
        <Head>
          <link rel="manifest" href="manifest.json" />
          <link rel="shortcut icon" href="favicon.png" />
          <meta name="theme-color" content="black" />
          <meta
            name="robots"
            content="noindex, nofollow, noarchive, nosnippet, noimageindex, notranslate"
          />
          <meta
            name="googlebot"
            content="noindex, nofollow, noarchive, nosnippet, noimageindex, notranslate"
          />
          <meta name="keywords" content="memoryboard,memory board" />
          <meta name="description" content="Memoryboard." />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
