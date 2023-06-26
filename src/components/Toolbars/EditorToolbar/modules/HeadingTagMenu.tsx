import { FC } from "react";
import {
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Tooltip,
} from "@chakra-ui/react";
import {
  LuHeading,
  LuHeading1,
  LuHeading2,
  LuHeading3,
  LuHeading4,
} from "react-icons/lu";

interface Props {
  setTag: (tag: string) => void;
}

export const HeadingTagMenu: FC<Props> = (props) => {
  const { setTag } = props;
  return (
    <Menu isLazy variant={"toolbar"}>
      <Tooltip label={"Heading"}>
        <MenuButton
          as={IconButton}
          icon={<LuHeading />}
          aria-label={"Open menu with heading tags"}
          variant={"toolbarIB"}
        />
      </Tooltip>

      <MenuList>
        <MenuItem onClick={() => setTag("h2")}>
          <Icon as={LuHeading1} aria-label={"Wrap in h1 tag"} />
        </MenuItem>
        <MenuItem onClick={() => setTag("h2")}>
          <Icon as={LuHeading2} aria-label={"Wrap in h2 tag"} />
        </MenuItem>
        <MenuItem onClick={() => setTag("h3")}>
          <Icon as={LuHeading3} aria-label={"Wrap in h3 tag"} />
        </MenuItem>
        <MenuItem onClick={() => setTag("h4")}>
          <Icon as={LuHeading4} aria-label={"Wrap in h4 tag"} />
        </MenuItem>
      </MenuList>
    </Menu>
  );
};
