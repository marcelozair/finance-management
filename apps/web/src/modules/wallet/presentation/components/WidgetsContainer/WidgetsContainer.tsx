import { Grid, GridItem } from "@chakra-ui/react";
import { ChartsContainer } from "../ChartsContainer/ChartsContainer";
import { TransactionsView } from "../../../../transaction/presentation/view/TransactionsView";

export const WidgetsContainer = () => {
  return (
    <Grid
      mt={10}
      gap={10}
      gridTemplateColumns={{ lg: "repeat(8, 1fr)", base: "repeat(1, 1fr)" }}
    >
      <GridItem colSpan={{ lg: 5 }}>
        <TransactionsView />
      </GridItem>
      <GridItem colSpan={{ lg: 3 }}>
        <ChartsContainer />
      </GridItem>
    </Grid>
  );
};
