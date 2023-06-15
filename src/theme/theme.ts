import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";
import { GlobalStylesProps } from "../types/chakra.interface";
import { inputTheme } from "./extendeds/inputs.extend";
import { menuTheme } from "./extendeds/menu.extend";
import { buttonTheme } from "./extendeds/buttons.extend";

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
    200: "#4b4b4b",
    300: "#323232",
    300.5: "#32323288",
  },
  accentDark: {
    400: "#1a8784",
    300: "#57b7b4",
    200: "#beffff",
  },
  textColorDark: {
    200: "#ffffff",
    300: "#e0e0e0",
    400: "#a2a2a2",
    400.5: "#a2a2a288",
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

const components = {
  Menu: menuTheme,
  Link: {
    baseStyle: {
      _hover: {
        textDecoration: "none",
      },
    },
  },
  Tooltip: {
    baseStyle: (props: GlobalStylesProps) => ({
      color: mode("", "textColorDark.300")(props),
      bg: mode("", "primaryDark.200")(props),
      borderRadius: "2px",
    }),
  },
  Alert: {
    variants: {
      custom: (props: GlobalStylesProps) => ({
        container: {
          color: "white",
          bg: mode("purple.500", "teal.500")(props),
        },
      }),
    },
  },
  Button: buttonTheme,
  Input: inputTheme,
};

const theme = extendTheme({
  colors,
  styles,
  components,
  config,
  fonts,
});
export default theme;
