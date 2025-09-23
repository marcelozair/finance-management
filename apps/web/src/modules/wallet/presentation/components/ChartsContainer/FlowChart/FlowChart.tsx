import { Box, Flex, Heading, IconButton } from "@chakra-ui/react";
import { Chart, useChart } from "@chakra-ui/charts";
import { Area, AreaChart, CartesianGrid, Tooltip, XAxis } from "recharts";
import { FaExpand } from "react-icons/fa";

export const FlowChart = () => {
  const chart = useChart({
    data: [
      { sales: 186, month: "January" },
      { sales: 190, month: "March" },
      { sales: 195, month: "May" },
      { sales: 175, month: "August" },
      { sales: 180, month: "October" },
      { sales: 185, month: "November" },
      { sales: 300, month: "December" },
    ],
    series: [{ name: "sales", color: "teal.solid" }],
  });

  return (
    <Box borderWidth="1px" p={3} borderColor="border.disabled" rounded="lg">
      <Flex h="20px" alignItems="center" justifyContent="space-between" mb={2}>
        <Heading size="sm">Balance history</Heading>
        <IconButton aria-label="Expand view" variant="ghost" size="xs">
          <FaExpand />
        </IconButton>
      </Flex>
      <hr />
      <Heading size="lg" mt={2}>
        PEN {chart.getTotal("sales").toLocaleString()}.00
      </Heading>
      <Chart.Root maxH="sm" chart={chart}>
        <AreaChart data={chart.data}>
          <CartesianGrid
            stroke={chart.color("border.muted")}
            vertical={false}
          />
          <XAxis
            dataKey={chart.key("month")}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <Tooltip
            cursor={false}
            animationDuration={100}
            content={<Chart.Tooltip />}
          />
          {chart.series.map((item) => (
            <Area
              key={item.name}
              isAnimationActive={false}
              dataKey={chart.key(item.name)}
              fill={chart.color(item.color)}
              fillOpacity={0.2}
              stroke={chart.color(item.color)}
              stackId="a"
            />
          ))}
        </AreaChart>
      </Chart.Root>
    </Box>
  );
};
