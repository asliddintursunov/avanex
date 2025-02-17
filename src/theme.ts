// theme.ts

// 1. import `extendTheme` function
import { extendTheme, type ThemeConfig } from "@chakra-ui/react";

// 2. Add your color mode config
const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

// 2. Define custom colors for light and dark modes
const styles = {
  global: (props: any) => ({
    body: {
      bg: props.colorMode === "dark" ? "gray.800" : "gray.200",
      color: props.colorMode === "dark" ? "white" : "black",
    },
  }),
};

// 3. extend the theme
const theme = extendTheme({ config, styles });

export default theme;
