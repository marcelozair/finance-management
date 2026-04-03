import { Outlet } from "react-router";
import { Grid, GridItem } from "@chakra-ui/react";

import { Sidebar } from "../components/Sidebar/Sidebar";

export const DashboardView = () => {
  return (
    <main>
      <Grid
        gridTemplateColumns={{ lg: "repeat(6, 1fr)", base: "repeat(1, 1fr)" }}
      >
        <GridItem colSpan={{ lg: 1 }}>
          <Sidebar />
        </GridItem>
        <GridItem
          colSpan={{ lg: 5 }}
          paddingX={{ base: 6, md: 20 }}
          paddingY={{ base: 6, md: 10 }}
        >
          <Outlet />
        </GridItem>
      </Grid>
    </main>
  );
};
