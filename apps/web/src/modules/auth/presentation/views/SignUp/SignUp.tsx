import { useState } from "react";
import { Grid, GridItem } from "@chakra-ui/react";

import { EnumStatusSignUp } from "../../interfaces/ISignUpForm";
import { RegisterForm } from "../../components/RegisterForm/RegisterForm";

import "./../../styles/signIn.css";

export const SignUpView = () => {
  const [step, setStep] = useState<EnumStatusSignUp>(EnumStatusSignUp.REGISTER);

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
          className="sign-in__form"
          colSpan={{ lg: 2, base: 1 }}
        >
          {step === EnumStatusSignUp.REGISTER && (
            <RegisterForm next={() => setStep(EnumStatusSignUp.VERIFICATION)} />
          )}
        </GridItem>
      </Grid>
    </main>
  );
};
