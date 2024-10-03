import { AppProps } from "next/app";
import { Provider } from "react-redux";
import store from "../store/store";
import "../styles/globals.css";
import Layout from "../layouts/RootLayout";
import { Fredoka, Lato } from "next/font/google";
import Head from "next/head";
import { MapProvider } from '../contexts/MapContext';

const fredoka = Fredoka({ subsets: ["latin"], variable: "--font-fredoka" });
const lato = Lato({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-lato",
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Head>
        <title>Support SF Schools</title>
      </Head>
      <MapProvider>
        <Layout>
          <div className={`${fredoka.variable} ${lato.variable} h-full`}>
            <Component {...pageProps} />
          </div>
        </Layout>
      </MapProvider>
    </Provider>
  );
}

export default MyApp;
