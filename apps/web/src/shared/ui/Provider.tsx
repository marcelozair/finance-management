import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { ColorModeProvider, type ColorModeProviderProps } from "./ColorModel";
import { DEFAULT_THEME } from "../../core/const/appConfig";

export function Provider(props: ColorModeProviderProps) {
  return (
    <ChakraProvider value={defaultSystem}>
      <ColorModeProvider {...props} defaultTheme={DEFAULT_THEME} />
    </ChakraProvider>
  );
}
