import { IconButton, useColorMode, useColorModeValue } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { BsMoonStars, BsSun } from "react-icons/bs";

export const ToggleColorMode = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const isMode = colorMode === "light";
  return (
    <motion.div
      style={{ display: "inline-block" }}
      key={useColorModeValue("Light", "Dark")}
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 20, opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <IconButton
        aria-label={"Toggle theme color"}
        onClick={toggleColorMode}
        fontSize={"16px"}
        size={"sm"}
        icon={useColorModeValue(<BsMoonStars />, <BsSun />)}
        color={useColorModeValue("white", "black")}
        bg={useColorModeValue("accentWhite.400", "yellow.500")}
        _hover={{
          background: useColorModeValue("purple.400", "yellow.400"),
        }}
      >
        {isMode ? "Dark" : "Light"}
      </IconButton>
    </motion.div>
  );
};
