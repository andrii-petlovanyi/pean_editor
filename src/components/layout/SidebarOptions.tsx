import { Flex, IconButton } from "@chakra-ui/react";
import { FiSettings } from "react-icons/fi";
import { ToggleColorMode } from "../../theme/toggleColorMode";
import { useLogOutUserMutation } from "../../redux";
import { constants } from "../../config/constant";
import { useLocalStorage } from "../../hooks";

interface Props {
  isClosed: boolean;
}

export const SidebarOptions = (props: Props): JSX.Element => {
  const { isClosed } = props;
  const [logOutUser, { isLoading }] = useLogOutUserMutation();
  const { setIsExpired } = useLocalStorage(constants.ACCESS_TOKEN);

  const logoutHandler = async () => {
    try {
      const res = await logOutUser();
      if ("data" in res) {
        setIsExpired(true);
      }
    } catch (error) {
      console.log(error);
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
