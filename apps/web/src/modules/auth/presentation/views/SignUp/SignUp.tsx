import { Grid, GridItem } from "@chakra-ui/react";

import { VerifyCode } from "../../components/VerifyCode";
import { SignUpTOTP } from "../../components/SignUpTOTP";
import { RegisterForm } from "../../components/RegisterForm";
import { useAtomNavigator } from "@shared/presentation/hooks/useAtomNavigator";

import "./../../styles/signIn.css";

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
  | "user-finishing-sign-up"
  | "user-verification-totp";

export const SignUpView = () => {
  const { CurrentComponent } = useAtomNavigator<TypeSignUpViews, SignUpAtomCtx>(
    {
      defaultView: "user-sign-up",
      atomsView: {
        "user-sign-up": RegisterForm,
        "user-register-totp": SignUpTOTP,
        "user-verification-totp": VerifyCode,
        "user-finishing-sign-up": VerifyCode,
      },
    },
  );

  return (
    <main className="auth">
      <Grid
        gridTemplateColumns={{ lg: "repeat(6, 1fr)", base: "repeat(1, 1fr)" }}
      >
        <GridItem
          colSpan={{ lg: 4 }}
          className="sign-in__banner"
          display={{ base: "none", lg: "block" }}
        ></GridItem>
        <GridItem
          placeItems="center"
          width="100%"
          className="sign-in__form"
          colSpan={{ lg: 2, base: 1 }}
        >
          <CurrentComponent />
        </GridItem>
      </Grid>
    </main>
  );
};
