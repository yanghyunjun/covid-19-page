import { AppProps, AppInitialProps } from "next/app";
import GlobalStyle from "../styles/GlobalStyle";

const MyApp = ({ Component, pageProps }: AppProps & AppInitialProps) => {
  return (
    <>
      <GlobalStyle />
      <Component {...pageProps} />
    </>
  );
};

export default MyApp;
