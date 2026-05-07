import { Chart, useChart } from "@chakra-ui/charts";
import { Box, Flex, Heading } from "@chakra-ui/react";
import { Cell, Pie, PieChart, Tooltip } from "recharts";

export const DonutChart = () => {
  const chart = useChart({
    data: [
      { name: "Transportation", value: 100, color: "blue.solid" },
      { name: "Fast Food", value: 250, color: "green.solid" },
      { name: "Groseries", value: 407, color: "red.solid" },
    ],
  });

  return (
    <Box borderWidth="1px" p={3} borderColor="border.disabled" rounded="lg">
      <Flex h="20px" alignItems="center" justifyContent="space-between" mb={2}>
        <Heading size="sm">Expenses by categories</Heading>
        {/* <IconButton aria-label="Expand view" variant="ghost" size="xs">
          <FaExpand />
        </IconButton> */}
      </Flex>
      <hr />
      <Heading size="lg" mt={2} color="red">
        - PEN {chart.getTotal("value").toLocaleString()}.00
      </Heading>

      <Chart.Root boxSize="100%" chart={chart}>
        <PieChart>
          <Tooltip
            cursor={false}
            animationDuration={100}
            content={<Chart.Tooltip hideLabel />}
          />
          <Pie
            dataKey={chart.key("value")}
            data={chart.data}
            innerRadius={80}
            outerRadius={100}
            paddingAngle={8}
            cornerRadius={4}
            nameKey="name"
          >
            {chart.data.map((item) => (
              <Cell key={item.name} fill={chart.color(item.color)} />
            ))}
          </Pie>
        </PieChart>
      </Chart.Root>
    </Box>
  );
};
