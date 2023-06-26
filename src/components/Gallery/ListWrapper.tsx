import { FC, ReactNode } from "react";
import { SimpleGrid } from "@chakra-ui/react";

interface Props {
  children: ReactNode;
}

export const ListWrapper: FC<Props> = (props) => {
  const { children } = props;
  return (
    <SimpleGrid
      spacing={4}
      templateColumns={"repeat(auto-fill, 260px)"}
      gap={"20px"}
    >
      {children}
    </SimpleGrid>
  );
};
