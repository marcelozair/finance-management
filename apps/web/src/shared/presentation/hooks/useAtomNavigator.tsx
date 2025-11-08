import { useState, type JSX } from "react";

import { RenderComponentWithAnimation } from "@shared/presentation/components/RenderComponentWithAnimation/RenderComponentWithAnimation";

export interface UseAtomNavigatorProps<T extends string, P extends object> {
  atomsView: Record<
    T,
    (props: {
      context: P;
      navigate: (view: T) => void;
      updateCtx: (values: Partial<P>) => void;
    }) => JSX.Element
  >;
  defaultView: T;
  defaultContext?: Partial<P>;
}

export const useAtomNavigator = <T extends string, P extends object>({
  atomsView,
  defaultView,
  defaultContext = {},
}: UseAtomNavigatorProps<T, P>) => {
  const [currentAtom, setCurrentAtom] = useState<T>(defaultView);
  const [context, setContext] = useState<Partial<P>>(defaultContext);

  const navigate = (view: T) => setCurrentAtom(view);

  const Component: (props: {
    context: P;
    navigate: (view: T) => void;
    updateCtx: (values: Partial<P>) => void;
  }) => JSX.Element = atomsView[currentAtom];

  return {
    CurrentComponent: () => (
      <RenderComponentWithAnimation>
        <Component
          navigate={navigate}
          context={context as P}
          updateCtx={(values: Partial<P>) =>
            setContext((previus: Partial<P>) => {
              if (!previus) return values;
              return { ...previus, ...values };
            })
          }
        />
      </RenderComponentWithAnimation>
    ),
  };
};
