import React from "react";
import ReactDOM from "react-dom/client";
// https://chakra-ui.com/guides/getting-started/vite-guide
import { ChakraProvider } from "@chakra-ui/react";
import { App } from "./App";

const rootElement = document.getElementById("root") as HTMLElement;
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <ChakraProvider>
      <App />
    </ChakraProvider>
  </React.StrictMode>,
);
