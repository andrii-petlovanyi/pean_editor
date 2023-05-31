import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";
import { GlobalStylesProps } from "../types/chakra";

import "@fontsource/noto-sans-tc/300.css";
import "@fontsource/noto-sans-tc/400.css";
import "@fontsource/noto-sans-tc/500.css";
import "@fontsource/noto-sans-tc/700.css";

const config = {
  initialColorMode: "dark",
  useSystemColorMode: true,
};

const colors = {
  mainBGDark: "#23232322",
  primaryDark: {
    300: "#323232",
    200: "#4b4b4b",
  },
  accentDark: {
    400: "#1a8784",
    300: "#57b7b4",
    200: "#beffff",
  },
  textColorDark: {
    200: "#ffffff",
    300: "#e0e0e0",
  },

  mainBGWhite: "#F5F3F766",
  accentWhite: {
    200: "#D6C6E1",
    300: "#9A73B5",
    400: "#8B5FBF",
  },
  textColorWhite: {
    200: "#fffff",
    300: "#878787",
    400: "#4A4A4A",
  },
};

const styles = {
  global: (props: GlobalStylesProps) => ({
    body: {
      background: mode("mainBGWhite", "mainBGDark")(props),
      color: mode("textColorWhite.200", "textColorDark.200")(props),
    },
  }),
};

const fonts = {
  heading: `'Noto Sans TC', sans-serif`,
  body: `'Noto Sans TC', sans-serif`,
};

const components = {};

const theme = extendTheme({
  colors,
  styles,
  components,
  config,
  fonts,
});
export default theme;
