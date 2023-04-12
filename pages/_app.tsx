import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import ErrorBoundary from "../components/Equix/ErrorBoundary";
import { Inter } from "next/font/google";
import "bootstrap-icons/font/bootstrap-icons.css";

const inter = Inter({ subsets: ["latin"] });

const App = ({ Component, pageProps }: AppProps) => (
  <>
    <Head>
      <link rel="icon" href="favicon.svg" />
      <title>in-yan/data</title>
    </Head>
    <ErrorBoundary>
      <Component {...pageProps} className={inter.className} />
    </ErrorBoundary>
  </>
);

export default App;
