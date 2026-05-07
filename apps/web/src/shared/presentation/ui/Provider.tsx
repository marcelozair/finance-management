import {
  ChakraProvider,
  createSystem,
  defaultConfig,
  defineConfig,
} from "@chakra-ui/react";
import { ThemeProvider, type ThemeProviderProps } from "next-themes";

export function Provider(props: ThemeProviderProps) {
  const systemConfig = defineConfig({});

  const designSystem = createSystem(defaultConfig, systemConfig);

  return (
    <ChakraProvider value={designSystem}>
      <ThemeProvider
        {...props}
        attribute="class"
        disableTransitionOnChange
        forcedTheme={props.forcedTheme}
      />
    </ChakraProvider>
  );
}
