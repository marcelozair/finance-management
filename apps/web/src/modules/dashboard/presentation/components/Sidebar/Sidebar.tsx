import { TbWallet } from "react-icons/tb";
import { TbSettings } from "react-icons/tb";
import { TbSmartHome } from "react-icons/tb";
import { Box, Flex, Text } from "@chakra-ui/react";
import { TbDiamondFilled } from "react-icons/tb";

import "./Sidebar.css";

export const Sidebar = () => {
  return (
    <aside className="sidebar">
      <Flex direction="column" justifyContent="space-between" height="100%">
        <Flex direction="column">
          {/* <div className="sidebar__logo">
            <img src="/siete-pe-logo.svg" />
          </div> */}

          <div className="sidebar__menu-container-title">
            <p className="sidebar__menu-title">Menu</p>
          </div>

          <div className="sidebar__menu-option">
            <a href="#" className="sidebar__menu-link">
              <TbSmartHome size={20} />
              <Text>Dashboard</Text>
            </a>
          </div>

          <div className="sidebar__menu-option">
            <a href="#" className="sidebar__menu-link">
              <TbWallet size={20} />
              <Text>Wallets</Text>
            </a>
          </div>
        </Flex>
        <Box>
          <div className="sidebar__menu-option">
            <a href="#" className="sidebar__menu-link">
              <TbDiamondFilled size={20} color="primary-normal" />
              <Text>Premium</Text>
            </a>
          </div>
          <div className="sidebar__menu-option">
            <a href="#" className="sidebar__menu-link">
              <TbSettings size={20} />
              <Text>Settings</Text>
            </a>
          </div>
        </Box>
      </Flex>
    </aside>
  );
};
