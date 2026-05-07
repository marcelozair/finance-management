import { Box, Skeleton, SkeletonText, VStack } from "@chakra-ui/react";

export const WalletCardSkeleton = () => {
  return (
    <Box
      width="13rem"
      minWidth="208px"
      height="4rem"
      padding="0.5rem"
      borderRadius="md"
      display="flex"
      gap="0.5rem"
      backgroundColor="gray.50"
      _dark={{ backgroundColor: "gray.900" }}
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
