import { Flex } from "@chakra-ui/react";
import type { ReactNode } from "react";

interface AuthWrapperProps {
  children: ReactNode;
}

export const AuthWrapper = ({ children }: AuthWrapperProps) => {
  return (
    <Flex
      width="100%"
      height="100%"
      maxWidth="450px"
      direction="column"
      justifyContent="center"
    >
      {children}
    </Flex>
  );
};
