import { Heading } from "@chakra-ui/react";
import { FC, ReactNode } from "react";
import { IHeadingSize } from "../../../types";

interface Props {
  size: IHeadingSize;
  children?: ReactNode;
}

const fontSizeMapping: Record<IHeadingSize, string> = {
  h1: "24px",
  h2: "22px",
  h3: "20px",
  h4: "18px",
};

export const CustomHeading: FC<Props> = ({ size, children }) => {
  const getFontSize = (size: IHeadingSize): string => {
    return fontSizeMapping[size] || "32px";
  };

  const fontSize = getFontSize(size);

  return (
    <Heading as={size} fontSize={fontSize}>
      {children}
    </Heading>
  );
};
