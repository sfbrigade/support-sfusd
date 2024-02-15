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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" }); 
  };

  return (
    <Provider store={store}>
      <Layout>
        <button className="fixed text-3xl z-10 bottom-10 right-10 h-14 w-14 bg-yellow-600 text-yellow-200 border-2 border-yellow-800 cursor-pointer rounded-xl" onClick={scrollToTop} >⇑</button>
        <div className={`${fredoka.variable} ${lato.variable}`}>
          <Component {...pageProps} />
        </div>
      </Layout>
    </Provider>
  );
}

export default MyApp;
