import { Grid, GridItem } from "@chakra-ui/react";
import { TransactionsView } from "src/modules/transaction/presentation/view/TransactionsView";

export const WidgetsContainer = () => {
  return (
    <Grid
      mt={10}
      gap={10}
      gridTemplateColumns={{ lg: "repeat(8, 1fr)", base: "repeat(1, 1fr)" }}
    >
      <GridItem colSpan={{ lg: 6 }}>
        <TransactionsView />
      </GridItem>
      <GridItem colSpan={{ lg: 2 }}>{/* <ChartsContainer /> */}</GridItem>
    </Grid>
  );
};
