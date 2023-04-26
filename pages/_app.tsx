import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { Inter } from "next/font/google";
import "bootstrap-icons/font/bootstrap-icons.css";
import { createStore } from "@/store";
import { useLocalObservable } from "mobx-react";
import { createContext, useContext } from "react";
import ErrorBoundary from "@/equix/ErrorBoundary";

const inter = Inter({ subsets: ["latin"] });

const StoreContext = createContext<any>(null);

const App = ({ Component, pageProps }: AppProps) => {
  const store = useLocalObservable(createStore);

  return (
    <>
      <Head>
        <link rel="icon" href="favicon.svg" />
        <title>in-yan/data</title>
      </Head>
      <ErrorBoundary>
        <StoreContext.Provider value={store}>
          <Component {...pageProps} className={inter?.className} />
        </StoreContext.Provider>
      </ErrorBoundary>
    </>
  );
};

export const useStore = () => useContext(StoreContext);

export default App;
