import { FC, memo } from "react";
import { Flex, FormControl, FormLabel, Switch } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { ChangeSwitchAction } from "../../../../types";

interface Props {
  isSwitched: boolean;
  changeSwitchAction: (isChecked: boolean) => ChangeSwitchAction;
}

export const PublishSwitch: FC<Props> = memo(
  ({ isSwitched, changeSwitchAction }) => {
    const dispatch = useDispatch();

    const handleChangeSwitch = (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(changeSwitchAction(e.target.checked));
    };

    return (
      <FormControl as={Flex} align={"center"}>
        <FormLabel htmlFor="isChecked" my={"auto"}>
          Publish:
        </FormLabel>
        <Switch
          id="isChecked"
          isChecked={isSwitched}
          onChange={handleChangeSwitch}
          my={"auto"}
          colorScheme="teal"
        />
      </FormControl>
    );
  }
);
