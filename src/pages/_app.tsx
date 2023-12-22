import { AppProps } from "next/app";
import { Provider } from "react-redux";
import store from "../store/store";
import "../styles/globals.css";
import Layout from "../layouts/RootLayout";
import { Fredoka, Lato } from "next/font/google";

const fredoka = Fredoka({ subsets: ["latin"], variable: "--font-fredoka" });
const lato = Lato({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-lato",
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Layout>
        <div className={`${fredoka.variable} ${lato.variable} bg-[#F5F5F5]`}>
          <Component {...pageProps} />
        </div>
      </Layout>
    </Provider>
  );
}

export default MyApp;
