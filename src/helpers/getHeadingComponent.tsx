import { FC, ReactNode } from "react";
import { Heading } from "@chakra-ui/react";

type HeadingComponentProps = {
  children: ReactNode;
};

type HeadingComponentFunction = FC<HeadingComponentProps>;

export const getHeadingComponent = (
  level: number
): HeadingComponentFunction => {
  switch (level) {
    case 1:
      return ({ children, ...props }: HeadingComponentProps) => (
        <Heading as="h1" fontSize="26px" {...props}>
          {children}
        </Heading>
      );
    case 2:
      return ({ children, ...props }: HeadingComponentProps) => (
        <Heading as="h2" fontSize="22px" {...props}>
          {children}
        </Heading>
      );
    case 3:
      return ({ children, ...props }: HeadingComponentProps) => (
        <Heading as="h3" fontSize="20px" {...props}>
          {children}
        </Heading>
      );
    case 4:
      return ({ children, ...props }: HeadingComponentProps) => (
        <Heading as="h4" fontSize="18px" {...props}>
          {children}
        </Heading>
      );
    default:
      return ({ children }: HeadingComponentProps) => (
        <Heading as={"h2"} fontSize={"22px"}>
          {children}
        </Heading>
      );
  }
};
