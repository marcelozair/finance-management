import { Box, Skeleton, SkeletonText, VStack } from "@chakra-ui/react";

export const WalletCardSkeleton = () => {
  return (
    <Box
      as="div"
      width="13rem"
      minWidth="208px"
      height="4rem"
      padding="0.5rem"
      borderRadius="md"
      backgroundColor={"gray.50"}
      border={"2px solid transparent"}
      borderColor={"transparent"}
      _dark={{
        backgroundColor: "gray.900",
        borderColor: "transparent",
      }}
      transition="all 0.3s ease"
      display="flex"
      gap="0.5rem"
      cursor="pointer"
      _hover={{
        transform: "translateY(-2px)",
      }}
      _active={{
        transform: "translateY(0)",
      }}
    >
      {/* Color bar */}
      <Skeleton width="2" height="100%" borderRadius="sm" flexShrink={0} />

      {/* Name + balance lines */}
      <VStack align="flex-start" justify="center" width="full" gap="1.5">
        <SkeletonText noOfLines={1} width="60%" />
        <SkeletonText noOfLines={1} width="40%" />
      </VStack>
    </Box>
  );
};
