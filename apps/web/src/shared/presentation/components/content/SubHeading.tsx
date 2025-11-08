import type { ReactNode } from "react";
import { Text, type TextProps } from "@chakra-ui/react";

interface SubHeadingProps extends TextProps {
  children: ReactNode;
  textAlign?: "left" | "center" | "right";
}

export const SubHeading = ({
  children,
  textAlign = "center",
  ...props
}: SubHeadingProps) => {
  return (
    <Text textAlign={textAlign} textStyle="sm" color={"gray.400"} {...props}>
      {children}
    </Text>
  );
};
