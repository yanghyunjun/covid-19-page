import Document, { Html, Head, Main, NextScript } from "next/document";
import { UserData } from "../data";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }
  render() {
    return (
      <Html lang="ko">
        <Head>
          <meta charSet="utf-8" />
          <meta property="og:image" content={UserData.Img} />
          <meta property="og:title" content={UserData?.title} />
          <meta property="og:description" content={UserData?.descript} />
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
