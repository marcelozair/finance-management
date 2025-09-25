import type { ReactNode } from "react";
import { Flex, Presence } from "@chakra-ui/react";

interface RenderAnimationAtomViewProps {
  children: ReactNode;
}

export const RenderComponentWithAnimation = ({
  children,
}: RenderAnimationAtomViewProps) => {
  return (
    <Presence
      width="100%"
      height="100%"
      present={true}
      animationStyle={{ _open: "scale-fade-in", _closed: "scale-fade-out" }}
      animationDuration="moderate"
    >
      <Flex
        justifyContent="center"
        direction="column"
        alignItems="center"
        width="100%"
        h="100%"
      >
        {children}
      </Flex>
    </Presence>
    // <>
    //   {children}
    // </>
  );
};
