import Document, { Html, Head, Main, NextScript } from "next/document";
import { UserData } from "../data";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }
  render() {
    return (
      <Html>
        <Head>
          <meta
            name="description"
            content="hyunjun의 covid19-info입니다. 천천히 둘러 보세요."
          />
          <meta charSet="utf-8" />
          <meta property="og:image" content={UserData.Img} />
          <meta property="og:title" content={UserData?.title} />
          <meta property="og:description" content={UserData?.descript} />

          <link
            rel="icon"
            type="image/png"
            sizes="192x192"
            href="/static/image/ogImage.png"
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
