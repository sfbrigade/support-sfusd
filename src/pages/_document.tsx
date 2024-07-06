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
          {/*<!-- HTML Meta Tags -->*/}
          <title>
            Supprt SF Schools-Explore local volunteer and donating opportunities
          </title>
          <meta
            name="description"
            content="A website to explore local schools and their available donation and volunteer opportunuities."
          />

          {/*<!-- Facebook Meta Tags -->*/}
          <meta property="og:url" content="https://www.supportsfschools.org/" />
          <meta property="og:type" content="website" />
          <meta
            property="og:title"
            content="Supprt SF Schools-Explore local volunteer and donating opportunities"
          />
          <meta
            property="og:description"
            content="A website to explore local schools and their available donation and volunteer opportunuities."
          />
          <meta
            property="og:image"
            content="https://supportsfschools.org/SocialPreview.png"
          />

          {/*<!-- Twitter Meta Tags -->*/}
          <meta name="twitter:card" content="summary_large_image" />
          <meta property="twitter:domain" content="supportsfschools.org" />
          <meta
            property="twitter:url"
            content="https://www.supportsfschools.org/"
          />
          <meta
            name="twitter:title"
            content="Supprt SF Schools-Explore local volunteer and donating opportunities"
          />
          <meta
            name="twitter:description"
            content="A website to explore local schools and their available donation and volunteer opportunuities."
          />
          <meta
            name="twitter:image"
            content="https://supportsfschools.org/SocialPreview.png"
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
