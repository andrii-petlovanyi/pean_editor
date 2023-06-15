import {
  defineStyle,
  defineStyleConfig,
  useColorModeValue,
} from "@chakra-ui/react";

const comeBackIB = defineStyle({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "40px",
  height: "35px",

  color: "white",
  borderRadius: "md",
  borderTopRightRadius: "0",
  borderBottomRightRadius: "0",

  fontSize: "18px",
});

const toolbarIB = defineStyle(({ colorMode }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  minW: "32px",
  width: "32px",
  height: "32px",

  color: useColorModeValue("textColorWhite.200", "textColorDark.200"),
  borderRadius: "5px",
  px: "0",
  fontSize: "18px",

  _hover: {
    bg: useColorModeValue("", "primaryDark.200"),
  },
}));

export const buttonTheme = defineStyleConfig({
  variants: {
    comeBackIB,
    toolbarIB,
  },
});
