import { Grid, GridItem } from "@chakra-ui/react";
// import { ChartsContainer } from "../ChartsContainer/ChartsContainer";
import { WalletTransactions } from "../WalletTransactions/WalletTransactions";

export const WidgetsContainer = () => {
  return (
    <Grid
      mt={10}
      gap={10}
      gridTemplateColumns={{ lg: "repeat(8, 1fr)", base: "repeat(1, 1fr)" }}
    >
      <GridItem colSpan={{ lg: 6 }}>
        <WalletTransactions />
      </GridItem>
      <GridItem colSpan={{ lg: 2 }}>{/* <ChartsContainer /> */}</GridItem>
    </Grid>
  );
};
