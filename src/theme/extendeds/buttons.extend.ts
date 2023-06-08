import { defineStyle, defineStyleConfig } from "@chakra-ui/react";

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

export const buttonTheme = defineStyleConfig({
  variants: {
    comeBackIB,
  },
});
