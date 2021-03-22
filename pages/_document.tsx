// /pages/_document.js
import React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";
class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          {/* See: https://fonts.google.com */}
          <link rel="preconnect" href="https://fonts.gstatic.com" as="font" />
          <link
            href="https://fonts.googleapis.com/css2?family=Montserrat&family=Open+Sans&family=Pacifico&display=swap"
            rel="stylesheet"
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
export default MyDocument;
