import type { AppProps } from "next/app";

import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "@fontsource/inter/800.css";
import "@fontsource/inter/900.css";
import { ChakraProvider, CSSReset, extendTheme } from "@chakra-ui/react";

function App({ Component, pageProps }: AppProps) {
  const theme = extendTheme({
    fonts: {
      heading: "Inter, sans-serif",
      body: "Inter, sans-serif",
    },
  });

  return (
    <ChakraProvider theme={theme}>
      <CSSReset />
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default App;
