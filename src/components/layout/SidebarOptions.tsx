import { Flex, IconButton } from "@chakra-ui/react";
import { ToggleColorMode } from "../../theme/toggleColorMode";
import { FiSettings } from "react-icons/fi";

interface Props {
  isClosed: boolean;
}

export const SidebarOptions = ({ isClosed }: Props): JSX.Element => {
  return (
    <Flex
      ml={"14px"}
      mb={"15px"}
      gap={"15px"}
      direction={isClosed ? "column" : "row"}
    >
      <IconButton
        order={isClosed ? 0 : 1}
        icon={<FiSettings />}
        aria-label={"Open settings page"}
        variant={"shadow"}
        size={"sm"}
        width={"32px"}
        fontSize={"18px"}
      />
      <ToggleColorMode />
    </Flex>
  );
};
