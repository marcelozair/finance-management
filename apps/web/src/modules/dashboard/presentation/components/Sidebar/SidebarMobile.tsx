import { useState } from "react";
import type { ReactNode } from "react";
import { CiLogout } from "react-icons/ci";
import { useNavigate } from "react-router";
import { Box, Flex, Text } from "@chakra-ui/react";

import {
  TbWallet,
  TbSettings,
  TbSmartHome,
  TbDiamondFilled,
} from "react-icons/tb";

import { useSession } from "@shared/presentation/store/session/useSession";
import { SessionCookieStore } from "@modules/auth/infrastructure/services/SessionCookieStore";

type NavItem = {
  id: string;
  label: string;
  icon: ReactNode;
  onClick?: () => void;
};

export const SidebarMobile = () => {
  const navigate = useNavigate();

  const sessionStoreService = new SessionCookieStore();
  const { clearUserSession } = useSession({ sessionStoreService });

  const [selectedMenu, setSelectedMenu] = useState<string>("dashboard");

  const logOut = () => {
    clearUserSession();
    navigate("/auth/sign-in");
  };

  const navItems: NavItem[] = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: <TbSmartHome size={22} />,
    },
    {
      id: "wallets",
      label: "Wallets",
      icon: <TbWallet size={22} />,
    },
    {
      id: "premium",
      label: "Premium",
      icon: <TbDiamondFilled size={22} />,
    },
    {
      id: "settings",
      label: "Settings",
      icon: <TbSettings size={22} />,
    },
    {
      id: "logout",
      label: "Log out",
      icon: <CiLogout size={22} />,
      onClick: logOut,
    },
  ];

  return (
    <Box
      display={{ base: "flex", md: "none" }}
      position="fixed"
      bottom={0}
      left={0}
      right={0}
      zIndex={100}
      backgroundColor="white"
      borderTopWidth="1px"
      borderTopColor="gray.100"
      paddingX={2}
      paddingY={2}
      boxShadow="0 -4px 20px rgba(0, 0, 0, 0.06)"
      _dark={{
        backgroundColor: "black",
        borderTopColor: "gray.800",
        boxShadow: "0 -4px 20px rgba(0, 0, 0, 0.3)",
      }}
    >
      <Flex width="100%" justifyContent="space-around" alignItems="center">
        {navItems.map((item) => {
          const isActive = selectedMenu === item.id;

          return (
            <Flex
              key={item.id}
              direction="column"
              alignItems="center"
              gap={1}
              cursor="pointer"
              paddingX={2}
              paddingY={1}
              color={isActive ? "#3da9fc" : "gray.400"}
              transition="all 0.2s ease-in-out"
              _dark={{
                color: isActive ? "#3da9fc" : "gray.500",
              }}
              onClick={() => {
                if (item.onClick) {
                  item.onClick();
                } else {
                  setSelectedMenu(item.id);
                }
              }}
            >
              {/* Icon pill */}
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                borderRadius="full"
                paddingX={3}
                paddingY={1}
                backgroundColor={isActive ? "#e2f2ff" : "transparent"}
                transition="all 0.25s ease-in-out"
                _dark={{
                  backgroundColor: isActive ? "#0d1f2d" : "transparent",
                }}
              >
                {item.icon}
              </Box>

              {/* Label */}
              <Text
                fontSize="2xs"
                fontWeight={isActive ? "semibold" : "normal"}
                letterSpacing="tight"
                transition="all 0.2s ease-in-out"
              >
                {item.label}
              </Text>
            </Flex>
          );
        })}
      </Flex>
    </Box>
  );
};
