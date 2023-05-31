import { Outlet } from "react-router-dom";
import { useCycle, motion, AnimatePresence } from "framer-motion";
import {
  Flex,
  Grid,
  GridItem,
  IconButton,
  useColorModeValue,
} from "@chakra-ui/react";
import { CiSquareChevLeft, CiSquareChevRight } from "react-icons/ci";
import { links } from "../components/layout/links";
import { INavItemLink } from "../types/layout";
import { NavItemLink } from "../components/layout/NavItemLink";
import { sidebarAnim } from "../components/animations/variants/sidebar";
import { SidebarOptions } from "../components/layout/SidebarOptions";

const MotionGrid = motion(Grid);

export const Layout = () => {
  const [sidebarState, toggleSidebar] = useCycle("collapse", "expand");
  const isClosed = sidebarState == "collapse";

  return (
    <>
      <AnimatePresence initial={false} mode="wait">
        <MotionGrid
          gridTemplateRows="40px 1fr"
          key="motionSidebar"
          animate={sidebarState}
          variants={sidebarAnim}
        >
          <GridItem
            rowSpan={2}
            colSpan={1}
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"space-between"}
            minHeight={"100vh"}
            shadow={"sm"}
            bg={useColorModeValue("accentWhite.200", "primaryDark.300")}
          >
            <Flex
              gap={"20px"}
              mt={"10px"}
              direction={"column"}
              justify={"flex-start"}
            >
              <Flex ml={"10px"}>
                <IconButton
                  icon={isClosed ? <CiSquareChevRight /> : <CiSquareChevLeft />}
                  onClick={() => toggleSidebar()}
                  aria-label={"Open sidebar menu"}
                  variant={"shadow"}
                  fontSize={"32px"}
                />
              </Flex>
              {links.map((link: INavItemLink) => (
                <NavItemLink key={link.name} link={link} isClosed={isClosed} />
              ))}
            </Flex>
            <SidebarOptions isClosed={isClosed} />
          </GridItem>
          {
            //TODO: place for main top tab / maybe
            /* <GridItem shadow="sm" height={"40px"}>
            <HStack height="full"></HStack>
          </GridItem> */
          }
          <GridItem p="4">
            <Outlet />
          </GridItem>
        </MotionGrid>
      </AnimatePresence>
    </>
  );
};
