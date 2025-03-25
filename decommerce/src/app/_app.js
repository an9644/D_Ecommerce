"use client";

import "../app/globals.css";
import React from "react";
import { ModelProvider } from "react-simple-hook-modal";

const App = ({ Component, pageProps }) => {
  return (
    <ModelProvider>
      <Component {...pageProps} />
    </ModelProvider>
  );
};

export default App;
