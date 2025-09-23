import { Grid, GridItem } from "@chakra-ui/react";
import { Outlet } from "react-router";
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
        <GridItem colSpan={{ lg: 5 }} paddingX={20} paddingY={10}>
          {/* <header>header</header> */}
          <Outlet />
        </GridItem>
      </Grid>
    </main>
  );
};
