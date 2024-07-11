import { AppProps } from "next/app";
import { Provider } from "react-redux";
import store from "../store/store";
import "../styles/globals.css";
import Layout from "../layouts/RootLayout";
import { Fredoka, Lato } from "next/font/google";
import Head from "next/head";

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
        <title>
          Support SF Schools-Explore local volunteer and donating opportunities
        </title>
      </Head>
      <Layout>
        <div className={`${fredoka.variable} ${lato.variable} h-full`}>
          <Component {...pageProps} />
        </div>
      </Layout>
    </Provider>
  );
}

export default MyApp;
