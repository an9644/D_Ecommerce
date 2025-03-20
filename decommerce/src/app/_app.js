"use client"; 

import "../app/globals.css";
import { MoralisProvider } from "react-moralis";
import React from "react";
import {ModelProvider} from 'react-simple-hook-modal'

const App = ({ Component, pageProps }) => {
  return (
    // <MoralisProvider apiKey={process.env.NEXT_PUBLIC_MORALIS_API_KEY}>
    //   <Component {...pageProps} />
    // </MoralisProvider>
    <>
    <ModelProvider>
       <Component {...pageProps} />
    </ModelProvider>

    </>

  );
};

export default App;




