import {
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Stack,
} from "@chakra-ui/react";

export const FolderSkeleton = (): JSX.Element => {
  return (
    <Stack
      width={"100%"}
      direction={"column"}
      position={"relative"}
      borderRadius={"md"}
      overflow={"hidden"}
    >
      <Skeleton
        height="174px"
        startColor="primaryDark.300"
        endColor="primaryDark.200"
      />
      <SkeletonCircle
        position={"absolute"}
        top={"20%"}
        left={"20px"}
        transform={"translateY(-20%)"}
        size={"14"}
        startColor="textColorDark.400.5"
        endColor="textColorDark.300"
      />
      <SkeletonText
        position={"absolute"}
        bottom={"0"}
        left={"0"}
        right={"0"}
        p={"10px 5px"}
        width={"100%"}
        noOfLines={2}
        spacing={"2"}
        skeletonHeight={"2"}
        startColor="textColorDark.400.5"
        endColor="textColorDark.300"
      />
    </Stack>
  );
};

export const listOfFolderSkeletons = Array.from({ length: 6 }).map(
  (_: any, index: number) => <FolderSkeleton key={index} />
);
