import {
  defineStyle,
  defineStyleConfig,
  useColorModeValue,
} from "@chakra-ui/react";

const toolbar = defineStyle(({ colorMode }) => ({
  list: {
    minW: "0",
    width: "40px",
    p: "0",
  },
  item: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    p: "5px",
    fontSize: "21px",
    bg: useColorModeValue("accentWhite.300", "primaryDark.300"),
    color: useColorModeValue("textColorWhite.200", "textColorDark.200"),
    _hover: {
      bg: useColorModeValue("accentWhite.200", "primaryDark.200"),
    },
  },
}));

export const menuTheme = defineStyleConfig({
  variants: {
    toolbar,
  },
});
