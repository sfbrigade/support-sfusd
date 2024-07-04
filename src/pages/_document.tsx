import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html className="scroll-smooth">
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Fredoka+One&display=swap"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap"
            rel="stylesheet"
          />
          <link rel="icon" type="image/png" href="https://ibb.co/NpscLSp" />
          <meta
            property="og:title"
            content="Working: Supprt SF Schools-Explore local volunteer and donating opportunities"
          />
          <meta
            property="og:image"
            content="https://supportsfschools.org/logo.png"
          />
          <meta property="og:type" content="website" />
          <meta
            property="og:description"
            content="A website to explore local schools and their available donation and volunteer opportunuities."
          />
          <script
            defer
            data-domain="supportsfschools.org"
            src="https://plausible.io/js/script.js"
          ></script>
        </Head>
        <body className="scroll-smooth">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
