import { Image } from "@chakra-ui/react";
import { createElement } from "react";

interface Props {
  width?: number;
  height?: number;
  alt: string;
  src: string;
  priority?: string;
}

export const ImageViewer = (props: Props) => {
  const { alt, src, width, height, priority, ...rest } = props;

  const imageElement = createElement(Image, {
    alt,
    src,
    width,
    height,
    priority,
    ...rest,
  });

  const wrapperElement = createElement(
    "div",
    {
      style: {
        width: "100%",
        borderRadius: "5px",
        overflow: "hidden",
      },
    },
    imageElement
  );

  return wrapperElement;
};
