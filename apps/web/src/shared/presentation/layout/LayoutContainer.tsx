import { Outlet } from "react-router";
import { Grid, GridItem } from "@chakra-ui/react";

import { Sidebar } from "./sidebar/Sidebar";
import { SidebarMobile } from "./sidebar/SidebarMobile";

export const LayoutContainer = () => {
  return (
    <main>
      <Grid
        gridTemplateColumns={{ md: "repeat(6, 1fr)", base: "minmax(0, 1fr)" }}
      >
        {/* Desktop sidebar — hidden on mobile */}
        <GridItem colSpan={{ md: 1 }} display={{ base: "none", md: "block" }}>
          <Sidebar />
        </GridItem>

        {/* Main content — extra bottom padding on mobile for the fixed nav bar */}
        <GridItem
          colSpan={{ sm: 5 }}
          paddingX={{ base: 6, md: 20 }}
          paddingY={{ base: 6, md: 10 }}
          paddingBottom={{ base: 24, md: 10 }}
        >
          <Outlet />
        </GridItem>
      </Grid>

      {/* Mobile bottom navigation — visible only on mobile */}
      <SidebarMobile />
    </main>
  );
};
