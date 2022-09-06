import type { AppProps } from "next/app";
import Head from "next/head";
import "../public/style/init.css";

export default function MyApp({ Component, pageProps, ...args }: AppProps) {
  return (
    <>
      <Head>
        <title>feat/可伸缩侧边栏</title>
      </Head>
      <section id="container">
        <Component {...pageProps} />
      </section>
    </>
  );
}
