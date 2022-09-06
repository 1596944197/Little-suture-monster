import type { AppProps } from "next/app";

export default function MyApp({ Component, pageProps, ...args }: AppProps) {
  return <Component {...pageProps} />;
}
