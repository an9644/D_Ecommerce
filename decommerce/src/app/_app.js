import "../app/globals.css";
import { MoralisProvider } from "react-moralis";
import React from "react";

const _app = ({ Component, pageProps }) => {
  return (
    <MoralisProvider apiKey={process.env.NEXT_PUBLIC_MORALIS_API_KEY}>
      <Component {...pageProps} />
    </MoralisProvider>
  );
};

export default _app;
