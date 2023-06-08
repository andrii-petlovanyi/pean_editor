import { Box, Flex, Heading, Stack, useColorModeValue } from "@chakra-ui/react";
import { motion } from "framer-motion";

import { LoginForm } from "../components";

export const Login = (): JSX.Element => {
  return (
    <motion.div
      key={"login"}
      initial={{ opacity: 0, y: "-20vh" }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: "20vh" }}
      transition={{ duration: 0.2, type: "spring" }}
    >
      <Flex
        minH={"100vh"}
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("gray.50", "mainBGDark")}
      >
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
          <Stack align={"center"}>
            <Heading
              fontSize={"32px"}
              fontWeight={"700"}
              bgGradient={"linear(to-b, teal.500, teal.300, teal.700)"}
              backgroundClip={"text"}
              style={{ whiteSpace: "normal" }}
            >
              Enjoy universe after sign in
            </Heading>
          </Stack>
          <Box p={8}>
            <LoginForm />
          </Box>
        </Stack>
      </Flex>
    </motion.div>
  );
};
