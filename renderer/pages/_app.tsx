import "@/public/style/init.scss";
import type { AppProps } from "next/app";
import Head from "next/head";

export default function MyApp({ Component, pageProps, ...args }: AppProps) {
  return (
    <>
      <Head>
        <title>feat/可伸缩侧边栏</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}
