import { Grid, GridItem } from "@chakra-ui/react";

import { RegisterForm } from "../../components/RegisterForm/RegisterForm";
import { useAtomNavigator } from "../../../../../core/hook/useAtomNavigator";

import "./../../styles/signIn.css";
import { VerifyCode } from "../../components/VerifyCode/VerifyCode";

export type TypeSignUpViews =
  | "register-user"
  | "user-preferences"
  | "user-verification";

export const SignUpView = () => {
  const { CurrentComponent, navigate } = useAtomNavigator<TypeSignUpViews>({
    defaultView: "user-verification",
    atomsView: {
      "register-user": () => <RegisterForm navigate={navigate} />,
      "user-verification": () => <VerifyCode navigate={navigate} />,
      "user-preferences": () => <p>Preferences</p>,
    },
  });

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
