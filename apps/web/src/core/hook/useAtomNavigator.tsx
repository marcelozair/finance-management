import { useState, type JSX } from "react";
import { RenderComponentWithAnimation } from "../../shared/components/RenderComponentWithAnimation/RenderComponentWithAnimation";

export interface UseAtomNavigatorProps<T extends string> {
  atomsView: Record<T, () => JSX.Element>;
  defaultView: T;
}

export const useAtomNavigator = <T extends string>({
  atomsView,
  defaultView,
}: UseAtomNavigatorProps<T>) => {
  const [currentAtom, setCurrentAtom] = useState<T>(defaultView);

  const Component: () => JSX.Element = atomsView[currentAtom];

  return {
    CurrentComponent: () => (
      <RenderComponentWithAnimation>
        <Component />
      </RenderComponentWithAnimation>
    ),
    navigate: (view: T) => setCurrentAtom(view),
  };
};
