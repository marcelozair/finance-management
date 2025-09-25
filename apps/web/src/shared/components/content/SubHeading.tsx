import { Text } from "@chakra-ui/react";
import type { ReactNode } from "react";

interface SubHeadingProps {
  children: ReactNode;
  textAlign?: "left" | "center" | "right";
}

export const SubHeading = ({
  children,
  textAlign = "center",
}: SubHeadingProps) => {
  return (
    <Text textAlign={textAlign} textStyle="sm" color={"gray.400"}>
      {children}
    </Text>
  );
};
