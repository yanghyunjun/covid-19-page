import { AppProps, AppInitialProps } from "next/app";
import GlobalStyle from "../styles/GlobalStyle";
import Header from "../components/Header";
import Main from "../components/Main";

const MyApp = ({ Component, pageProps }: AppProps & AppInitialProps) => {
  return (
    <>
      <GlobalStyle />
      <Header />
      <Main />
    </>
  );
};

export default MyApp;
