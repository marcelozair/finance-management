import { type ReactNode, forwardRef } from "react";
import {
  Heading as ChakraHeading,
  type HeadingProps as ChakraHeadingProps,
} from "@chakra-ui/react";

// Extend Chakra's HeadingProps
interface CustomHeadingProps extends ChakraHeadingProps {
  children: ReactNode;
  textAlign?: "left" | "center" | "right" | object;
}

export const Heading = forwardRef<HTMLHeadingElement, CustomHeadingProps>(
  ({ children, textAlign = "center", ...props }, ref) => {
    return (
      <ChakraHeading ref={ref} size="2xl" textAlign={textAlign} {...props}>
        {children}
      </ChakraHeading>
    );
  },
);
