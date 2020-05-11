import { AppProps, AppInitialProps } from "next/app";
import GlobalStyle from "../styles/GlobalStyle";
import Header from "../components/Header";

const MyApp = ({ Component, pageProps }: AppProps & AppInitialProps) => {
  return (
    <>
      <GlobalStyle />
      <Header />
      <Component {...pageProps} />
    </>
  );
};

export default MyApp;
