import { HiOutlineHome, HiOutlineBriefcase } from "react-icons/hi";
import { AiOutlinePicture, AiOutlineComment } from "react-icons/ai";
import { BsPostcard } from "react-icons/bs";
import { INavItemLink } from "../../types";

export const links: Array<INavItemLink> = [
  {
    icon: HiOutlineHome,
    to: "/",
    name: "Dashboard",
  },
  {
    icon: AiOutlinePicture,
    to: "/gallery",
    name: "Gallery",
  },
  {
    icon: BsPostcard,
    to: "/blog",
    name: "Blog",
  },
  {
    icon: HiOutlineBriefcase,
    to: "/projects",
    name: "Projects",
  },
  {
    icon: AiOutlineComment,
    to: "/comments",
    name: "Comments",
  },
];
