import {
  Box,
  HStack,
  VStack,
  Skeleton,
  SkeletonCircle,
} from "@chakra-ui/react";

export const TransactionCardSkeleton = () => {
  return (
    <Box p="14px 16px" w="100%" borderRadius="14px">
      <HStack justify="space-between">
        {/* Left section */}
        <HStack>
          <SkeletonCircle size="40px" borderRadius="8px" />

          <VStack align="start" gap={1}>
            <Skeleton height="14px" width="120px" borderRadius="4px" />
            <Skeleton height="12px" width="80px" borderRadius="4px" />
          </VStack>
        </HStack>

        {/* Right section */}
        <VStack align="end" gap={1}>
          <Skeleton height="14px" width="70px" borderRadius="4px" />
        </VStack>
      </HStack>
    </Box>
  );
};
