import { Link, redirect } from "react-router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Flex, Grid, GridItem, Text } from "@chakra-ui/react";

import "./../../styles/signIn.css";
import { AuthDomain } from "../../../domain";
import type { ISignInForm } from "../../interfaces/ISignInForm";
import { signInValidator } from "../../validator/signInValidator";
import type { User } from "../../../../user/domain/entities/User";
import { EmailField } from "../../../../../shared/components/EmailField/EmailField";
import { PasswordField } from "../../../../../shared/components/PasswordField/PasswordField";
import { useExecuteUseCase } from "../../../../../core/hook/useExecuteUseCase";

export const SignInView = () => {
  const authDomain = new AuthDomain();

  const { register, formState, handleSubmit } = useForm<ISignInForm>({
    mode: "onChange",
    resolver: yupResolver(signInValidator),
  });

  const { execute, loading } = useExecuteUseCase<User, ISignInForm>({
    callback: (params: ISignInForm) => {
      return authDomain.signIn(params);
    },
  });

  const signIn = async (values: ISignInForm) => {
    await execute({ ...values });
    redirect("admin/wallets");
  };

  return (
    <main className="auth">
      <Grid
        gridTemplateColumns={{ lg: "repeat(6, 1fr)", base: "repeat(1, 1fr)" }}
      >
        <GridItem
          colSpan={{ lg: 4 }}
          display={{ base: "none", lg: "block" }}
          clasName="sign-in__banner"
        ></GridItem>
        <GridItem
          placeItems="center"
          colSpan={{ lg: 2, base: 1 }}
          className="sign-in__form"
        >
          <Flex
            justifyContent="center"
            direction="column"
            width="100%"
            maxWidth="450px"
            h="100%"
          >
            <h2 className="sign-in-form__title">Sign in to SientePE</h2>
            <p className="sign-in-form__description">Welcome back</p>

            <Flex direction="column" gap={5}>
              <EmailField
                label="Email"
                placeholder="Enter your email"
                error={formState.errors.email?.message}
                {...register("email")}
              />

              <PasswordField
                label="Password"
                placeholder="Enter your password"
                error={formState.errors.password?.message}
                {...register("password")}
              />

              <Link to="auth/sing-up" className="sign-in-form__forgot-password">
                Forgot password?
              </Link>

              <Button
                w="100%"
                loading={loading}
                disabled={!formState.isValid}
                onClick={handleSubmit(signIn)}
              >
                Sign in
              </Button>

              <Text fontSize={14} textAlign="center">
                Don't have an account? <Link to="/auth/sign-up">Sign up.</Link>
              </Text>
            </Flex>
          </Flex>
        </GridItem>
      </Grid>
    </main>
  );
};
