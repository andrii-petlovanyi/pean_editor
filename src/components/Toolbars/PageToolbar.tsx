import { ReactNode } from "react";
import { Flex, IconButton, useColorModeValue } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { TiArrowBack } from "react-icons/ti";

interface Props {
  children?: ReactNode;
  isDisabled?: boolean;
}

export const PageToolbar = (props: Props): JSX.Element => {
  const { children, isDisabled } = props;
  const navigate = useNavigate();

  const handleClickBack = () => {
    navigate(-1);
  };

  return (
    <Flex
      height={"35px"}
      width={"100%"}
      justify={"space-between"}
      borderRadius={"md"}
      bg={useColorModeValue("accentWhite.200", "primaryDark.300")}
    >
      <IconButton
        onClick={handleClickBack}
        isDisabled={isDisabled}
        variant={"comeBackIB"}
        icon={<TiArrowBack />}
        aria-label={"Button for come back"}
        bg={useColorModeValue("accentWhite.400", "accentDark.400")}
        _hover={{
          bg: useColorModeValue("accentWhite.300", "teal.700"),
        }}
      />
      <Flex justify={"end"} align={"center"} gap={"10px"}>
        {children}
      </Flex>
    </Flex>
  );
};
