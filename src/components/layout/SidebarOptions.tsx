import { Flex, IconButton, useToast } from "@chakra-ui/react";
import { FiSettings } from "react-icons/fi";
import { ToggleColorMode } from "../../theme/toggleColorMode";
import { constants } from "../../config/constant";
import { useLocalStorage } from "../../hooks";
import { useLogOutUserMutation } from "../../redux/api/user.api";
import { messages } from "../../config/messages";

interface Props {
  isClosed: boolean;
}

export const SidebarOptions = (props: Props): JSX.Element => {
  const { isClosed } = props;
  const [logOutUser, { isLoading }] = useLogOutUserMutation();
  const { setIsExpired } = useLocalStorage(constants.ACCESS_TOKEN);
  const toast = useToast({ variant: "custom" });

  const logoutHandler = async () => {
    try {
      const res = await logOutUser();
      if ("data" in res) {
        setIsExpired(true);
        toast({ description: "You are log out successfully!" });
      }
    } catch (error) {
      toast({ description: messages.errors.defaultError });
    }
  };

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
        isLoading={isLoading}
        onClick={logoutHandler}
      />
      <ToggleColorMode />
    </Flex>
  );
};
