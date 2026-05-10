import { useState } from "react";
import { TbWallet } from "react-icons/tb";
import { CiLogout } from "react-icons/ci";
import { useNavigate } from "react-router";
import { TbSettings } from "react-icons/tb";
import { TbSmartHome } from "react-icons/tb";
import { TbDiamondFilled } from "react-icons/tb";
import { Box, Flex, Text } from "@chakra-ui/react";

import { useSession } from "@shared/presentation/store/session/useSession";
import { SessionCookieStore } from "@modules/auth/infrastructure/services/SessionCookieStore";

export const Sidebar = () => {
  const navigate = useNavigate();

  const sessionStoreService = new SessionCookieStore();
  const { clearUserSession } = useSession({ sessionStoreService });

  const [selectedMenu, setSelectedMenu] = useState<string>("dashboard");

  const logOut = () => {
    clearUserSession();
    navigate("/auth/sign-in");
  };

  return (
    <Box
      width="100%"
      transform="translateX(-100%)"
      top={0}
      left={0}
      position="fixed"
      className="wallet-sidebar"
      bg="red.500"
      md={{ width: "100%", transform: "translateX(0)", position: "sticky" }}
      paddingX={2}
      paddingY={5}
      height="100vh"
      backgroundColor="white"
      transition="all 0.3s ease-in-out"
      _dark={{
        backgroundColor: "black",
      }}
    >
      <Flex direction="column" justifyContent="space-between" height="100%">
        <Flex direction="column">
          {/* <div className="sidebar__logo">
              <img src="/siete-pe-logo.svg" />
            </div> */}

          <Box marginBottom={3} paddingX={4}>
            <Text
              fontSize="xs"
              fontWeight="bold"
              opacity={0.7}
              color="gray.800"
              _dark={{
                color: "gray.200",
              }}
            >
              MENU
            </Text>
          </Box>

          <Box
            marginBottom={1}
            paddingX={4}
            paddingY={2}
            borderRadius="lg"
            cursor="pointer"
            transition="all 0.3s ease-in-out"
            backgroundColor={
              selectedMenu === "dashboard" ? "#e2f2ff" : "transparent"
            }
            color={selectedMenu === "dashboard" ? "#3da9fc" : "gray.800"}
            onClick={() => {
              setSelectedMenu("dashboard");
              navigate("dashboard");
            }}
            _hover={{
              backgroundColor: "#e2f2ff",
              color: "#3da9fc",
            }}
            _dark={{
              backgroundColor:
                selectedMenu === "dashboard" ? "#161616" : "transparent",
              color: selectedMenu === "dashboard" ? "#1071bb" : "gray.200",
              _hover: {
                backgroundColor: "#161616",
                color: "#1071bb",
              },
            }}
          >
            <Flex
              alignItems="center"
              gap={2}
              color="inherit"
              transition="all 0.3s ease-in-out"
            >
              <TbSmartHome size={16} />
              <Text fontSize="sm">Dashboard</Text>
            </Flex>
          </Box>

          <Box
            marginBottom={1}
            paddingX={4}
            paddingY={2}
            borderRadius="lg"
            cursor="pointer"
            transition="all 0.3s ease-in-out"
            backgroundColor={
              selectedMenu === "wallets" ? "#e2f2ff" : "transparent"
            }
            color={selectedMenu === "wallets" ? "#3da9fc" : "gray.800"}
            onClick={() => {
              setSelectedMenu("wallets");
              navigate("wallet");
            }}
            _hover={{
              backgroundColor: "#e2f2ff",
              color: "#3da9fc",
            }}
            _dark={{
              backgroundColor:
                selectedMenu === "wallets" ? "#161616" : "transparent",
              color: selectedMenu === "wallets" ? "#1071bb" : "gray.200",
              _hover: {
                backgroundColor: "#161616",
                color: "#1071bb",
              },
            }}
          >
            <Flex
              alignItems="center"
              gap={2}
              color="inherit"
              transition="all 0.3s ease-in-out"
            >
              <TbWallet size={16} />
              <Text fontSize="sm">Wallets</Text>
            </Flex>
          </Box>
        </Flex>

        <Box>
          <Box
            marginBottom={1}
            paddingX={4}
            paddingY={2}
            borderRadius="lg"
            cursor="pointer"
            transition="all 0.3s ease-in-out"
            backgroundColor={
              selectedMenu === "premium" ? "#e2f2ff" : "transparent"
            }
            color={selectedMenu === "premium" ? "#3da9fc" : "gray.800"}
            onClick={() => setSelectedMenu("premium")}
            _hover={{
              backgroundColor: "#e2f2ff",
              color: "#3da9fc",
            }}
            _dark={{
              backgroundColor:
                selectedMenu === "premium" ? "#161616" : "transparent",
              color: selectedMenu === "premium" ? "#1071bb" : "gray.200",
              _hover: {
                backgroundColor: "#161616",
                color: "#1071bb",
              },
            }}
          >
            <Flex
              alignItems="center"
              gap={2}
              color="inherit"
              transition="all 0.3s ease-in-out"
            >
              <TbDiamondFilled
                size={16}
                color={selectedMenu === "premium" ? "#3da9fc" : "#3da9fc"}
              />
              <Text fontSize="sm">Premium</Text>
            </Flex>
          </Box>

          <Box
            marginBottom={1}
            paddingX={4}
            paddingY={2}
            borderRadius="lg"
            cursor="pointer"
            transition="all 0.3s ease-in-out"
            backgroundColor={
              selectedMenu === "settings" ? "#e2f2ff" : "transparent"
            }
            color={selectedMenu === "settings" ? "#3da9fc" : "gray.800"}
            onClick={() => setSelectedMenu("settings")}
            _hover={{
              backgroundColor: "#e2f2ff",
              color: "#3da9fc",
            }}
            _dark={{
              backgroundColor:
                selectedMenu === "settings" ? "#161616" : "transparent",
              color: selectedMenu === "settings" ? "#1071bb" : "gray.200",
              _hover: {
                backgroundColor: "#161616",
                color: "#1071bb",
              },
            }}
          >
            <Flex
              alignItems="center"
              gap={2}
              color="inherit"
              transition="all 0.3s ease-in-out"
            >
              <TbSettings size={16} />
              <Text fontSize="sm">Settings</Text>
            </Flex>
          </Box>
          <Box
            marginBottom={1}
            paddingX={4}
            paddingY={2}
            borderRadius="lg"
            cursor="pointer"
            transition="all 0.3s ease-in-out"
            backgroundColor={
              selectedMenu === "settings" ? "#e2f2ff" : "transparent"
            }
            color={selectedMenu === "settings" ? "#3da9fc" : "gray.800"}
            onClick={logOut}
            _hover={{
              backgroundColor: "#e2f2ff",
              color: "#3da9fc",
            }}
            _dark={{
              backgroundColor:
                selectedMenu === "settings" ? "#161616" : "transparent",
              color: selectedMenu === "settings" ? "#1071bb" : "gray.200",
              _hover: {
                backgroundColor: "#161616",
                color: "#1071bb",
              },
            }}
          >
            <Flex
              alignItems="center"
              gap={2}
              color="inherit"
              transition="all 0.3s ease-in-out"
            >
              <CiLogout size={16} />
              <Text fontSize="sm">Log out</Text>
            </Flex>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};
