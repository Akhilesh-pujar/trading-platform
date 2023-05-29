import type { AppProps } from "next/app";
import Head from "next/head";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { createGlobalStyle } from "styled-components";
import { motion } from "framer-motion";
import { Page } from "../../types/page";
import { Toaster } from "react-hot-toast";

const inter = Inter({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
  subsets: ["latin"],
});

const GlobalStyle = createGlobalStyle`
  :root{
    --light-color: 255, 255, 255;
    --dark-color: 66, 66, 66;
    --primary-color: 136, 140, 27;
    --secondary-color: 253, 192, 102;
    --success-color: 3, 179, 10;
    --danger-color: 255, 0, 0;
    scroll-behavior: smooth;
  }
  ::-webkit-scrollbar {
    width: 0;
  }
  html {
    color-scheme: light;
  }
  html, body {
    overflow-x: hidden;
  }
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: var(--font-inter, sans-serif);
    outline: none;
  }
  body {
    color-scheme: light;
    position: relative;
    background-color: rgb(var(--light-color));
    color: rgb(var(--dark-color));
  }
  .container {
    margin-inline: auto;
    width: min(90%, 70rem);
  }
  a {
    text-decoration: none;
    color: inherit;
    transition: 0.15s;
  }
  input{
    background-color: transparent;
  }
  button {
    color: inherit;
    cursor: pointer;
    border: none;
    background-color: transparent;
    user-select: none;
  }
  & span.loader {
    width: 1rem;
    height: 1rem;
    border: 2px solid #FFF;
    border-bottom-color: rgb(var(--dark-color));
    border-radius: 50%;
    display: inline-block;
    animation: rotation 1s linear infinite;
    }

    @keyframes rotation {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
    } 
`;

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
};

export default function App({
  Component,
  pageProps,
}: AppProps & {
  Component: Page;
}) {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>
          FlashCliq - Online stock trading at lowest prices from India&apos;s
          biggest stock broker
        </title>
        <link rel="icon" href="/icon/favicon.ico" />
        <meta
          name="description"
          content="FlashCliq - India's biggest stock broker offering the lowest, cheapest brokerage rates for futures and options, commodity trading, equity and mutual funds"
        />
        <meta
          name="keywords"
          content="discount broker, discount brokerage, lowest brokerage commissions, lowest brokerage fees, indian discount brokerage, indian discount broker, cheap brokerage, discount brokerage bangalore, fixed brokerage bangalore, cheap trading, cheap commodity trading, trading terminal, futures trading, stock broker, fixed stock brokerage, cheapest brokerage, cheapest brokerage in india, online trading, online brokerage, cheap demat account, bangalore broker, commodities trading"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          property="og:image"
          content="https://flashcliq.com/static/images/landing.png"
        />
        <meta
          property="og:description"
          content="FlashCliq - India's biggest stock broker offering the lowest, cheapest brokerage rates for futures and options, commodity trading, equity and mutual funds"
        />
        <meta
          property="og:image:alt"
          content="FlashCliq - Online stock trading at lowest prices from India's biggest stock broker"
        />
        <meta
          property="og:title"
          content="FlashCliq - Online stock trading at lowest prices from India's biggest stock broker"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://flashcliq.com/" />
        <meta name="referrer" content="origin" />
        <link rel="image_src" href="/static/images/landing.png" />
      </Head>
      <GlobalStyle />
      <motion.div
        className={inter.variable}
        variants={container}
        initial="hidden"
        animate="show"
      >
        <Toaster />
        {!Component.getLayout && <Header />}
        <Component {...pageProps} />
        {!Component.getLayout && <Footer />}
      </motion.div>
    </>
  );
}
