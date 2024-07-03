import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html className="scroll-smooth">
        <Head>
          <title>Support SF Schools</title>
          <link
            href="https://fonts.googleapis.com/css2?family=Fredoka+One&display=swap"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap"
            rel="stylesheet"
          />
          <link rel="icon" type="image/png" href="/logo_icon.ico" />
          <meta
            property="og:title"
            content="Supprt SF Schools-Explore local volunteer and donating opportunities"
          />
          <meta property="og:image" content="/../../public/SocialPreview.png" />
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
