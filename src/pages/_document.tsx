import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en" className="scroll-smooth">
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Fredoka+One&display=swap"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap"
            rel="stylesheet"
          />
          <link
            rel="icon"
            href="https://www.supportsfschools.org/logo_icon.ico"
          />

          {/* Plausible Analytics */}
          <script
            defer
            data-domain="supportsfschools.org"
            src="https://plausible.io/js/script.pageview-props.tagged-events.outbound-links.js"
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
