import { ReactNode } from "react";
import { Flex } from "@chakra-ui/react";

interface Props {
  children: ReactNode;
}

export const Wrapper = (props: Props): JSX.Element => {
  return (
    <Flex direction={"column"} gap={"15px"}>
      {props.children}
    </Flex>
  );
};
