import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import { ColorModeScript } from "@chakra-ui/react";
import theme from "./theme.ts";

import global_uz from "./translation/uz/global.json";
import global_ru from "./translation/ru/global.json";

import i18next from "i18next";
import { I18nextProvider } from "react-i18next";

i18next.init({
  debug: false,
  interpolation: { escapeValue: false },
  lng: localStorage.getItem("lang") ?? "uz", // Set default language
  defaultNS: "global", // Set default namespace
  resources: {
    uz: { global: global_uz },
    ru: { global: global_ru },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <I18nextProvider i18n={i18next}>
        <App />
      </I18nextProvider>
    </ChakraProvider>
  </StrictMode>
);
