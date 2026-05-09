import { Grid, GridItem } from "@chakra-ui/react";

import { VerifyCode } from "../../components/VerifyCode";
import { SignUpTOTP } from "../../components/SignUpTOTP";
import { RegisterForm } from "../../components/RegisterForm";
import { useAtomNavigator } from "@shared/presentation/hooks/useAtomNavigator";

export interface SignUpAtomCtx {
  secret: string;
  userId: number;
}

export interface SignUpAtomsProps {
  context: SignUpAtomCtx;
  navigate: (view: TypeSignUpViews) => void;
  updateCtx: (values: Partial<SignUpAtomCtx>) => void;
}

export type TypeSignUpViews =
  | "user-sign-up"
  | "user-register-totp"
  | "user-verification-totp";

export const SignUpView = () => {
  const { CurrentComponent } = useAtomNavigator<TypeSignUpViews, SignUpAtomCtx>(
    {
      defaultView: "user-sign-up",
      atomsView: {
        "user-sign-up": RegisterForm,
        "user-register-totp": SignUpTOTP,
        "user-verification-totp": VerifyCode,
      },
    },
  );

  return (
    <main>
      <Grid
        gridTemplateColumns={{
          md: "repeat(6, 1fr)",
          base: "1fr",
        }}
        minH="100vh"
      >
        <GridItem bg="black" colSpan={{ xl: 4, md: 3, base: 0 }}></GridItem>
        <GridItem
          placeItems="center"
          width="100%"
          paddingY={5}
          className="sign-in__form"
          colSpan={{ xl: 2, md: 3, base: 1 }}
          minH={0}
          overflowY="auto"
        >
          <CurrentComponent />
        </GridItem>
      </Grid>
    </main>
  );
};
