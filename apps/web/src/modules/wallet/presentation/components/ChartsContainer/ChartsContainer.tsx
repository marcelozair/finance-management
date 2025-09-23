import { Flex } from "@chakra-ui/react";
import { DonutChart } from "./DonutChart/DonutChart";
import { FlowChart } from "./FlowChart/FlowChart";

export const ChartsContainer = () => {
  return (
    <Flex direction="column" gap={4}>
      <FlowChart />
      <DonutChart />
    </Flex>
  );
};
