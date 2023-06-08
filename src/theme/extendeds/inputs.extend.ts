import { defineStyle, defineStyleConfig } from "@chakra-ui/react";

const search = defineStyle({
  field: {
    display: "flex",
    alignItems: "center",
    width: "100px",
    height: "30px",

    borderRadius: "md",
    borderTopLeftRadius: "0",
    borderBottomLeftRadius: "0",
    borderLeft: "2px solid",
    borderColor: "accentDark.400",
    color: "white",
    backgroundColor: "inherit",

    fontWeight: "400",
    fontSize: "15px",

    _focus: {
      borderColor: "primaryDark.200",
    },

    _disabled: {
      opacity: 1,
    },
    _placeholder: {
      fontSize: "10px",
      color: "gray.400",
      backgroundColor: "inherit",
    },
  },
});

export const inputTheme = defineStyleConfig({
  variants: {
    search,
  },
});
