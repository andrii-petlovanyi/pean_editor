import { NavLink, matchPath, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Flex, Icon, Link, Text, useColorModeValue } from "@chakra-ui/react";
import { INavItemLink } from "../../types";

interface Props {
  isClosed: boolean;
  link: INavItemLink;
}

const AnimateFlex = motion(Flex);
const AnimateText = motion(Text);

export const NavItemLink = (props: Props): JSX.Element => {
  const { link, isClosed } = props;
  const location = useLocation().pathname;
  const nestedLocation = "/" + location.split("/")[1];
  const { to, icon, name } = link;

  const isActive = !!matchPath(location, to) || !!matchPath(nestedLocation, to);
  const activeBG = useColorModeValue("accentWhite.400", "accentDark.400");
  return (
    <>
      <Link
        as={NavLink}
        to={to}
        aria-label={`Link to ${name}`}
        display={"flex"}
        gap={"15px"}
        height={"24px"}
        width={"100%"}
        alignItems={"center"}
        color={isActive ? "white" : "inherit"}
        p={"20px"}
        _hover={{ textDecoration: "none" }}
        position={"relative"}
      >
        {isActive && (
          <AnimateFlex
            layoutId={"active_pill"}
            position={"absolute"}
            transition={{ type: "spring", duration: 0.5 }}
            top={"0"}
            left={"0"}
            right={"0"}
            bottom={"0"}
            bg={activeBG}
          />
        )}
        <Icon position={"relative"} zIndex={"10"} fontSize="20" as={icon} />
        {!isClosed && (
          <AnimateText position={"relative"} zIndex={"10"}>
            {name}
          </AnimateText>
        )}
      </Link>
    </>
  );
};
