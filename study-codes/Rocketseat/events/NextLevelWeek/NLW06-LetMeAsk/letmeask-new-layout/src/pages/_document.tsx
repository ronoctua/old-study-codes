import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  render(): JSX.Element {
    return (
      <Html lang="en">
        <Head>
          <link rel="shortcut icon" href="favicon.ico" />
          <link rel="manifest" href="manifest.json" />
          <meta name="theme-color" content="#fff" />
          <meta name="robots" content="index, follow" />
          <meta name="googlebot" content="index, follow" />
          <meta name="keywords" content="letmeask,let me ask" />
          <meta
            name="description"
            content="Let your audience ask you questions in real time."
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
