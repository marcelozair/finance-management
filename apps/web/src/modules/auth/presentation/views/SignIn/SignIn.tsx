import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  Flex,
  Grid,
  GridItem,
  Text,
  Link as LinkChakra,
} from "@chakra-ui/react";

import { AuthDomain } from "../../../domain";
import type { ISignInForm } from "../../interfaces/ISignInForm";
import { signInValidator } from "../../validator/signInValidator";
import type { ISessionUser } from "../../../data/interfaces/IAuthResponse";

import { useSession } from "@shared/presentation/store/session/useSession";
import { EmailField } from "@shared/presentation/components/EmailField/EmailField";
import { PasswordField } from "@shared/presentation/components/PasswordField/PasswordField";

import "./../../styles/signIn.css";
import { useExecuteUseCase } from "@shared/presentation/hooks/useExecuteUseCase";

export const SignInView = () => {
  const authDomain = new AuthDomain();
  const navigate = useNavigate();
  const { setUserSession } = useSession();

  const { register, formState, handleSubmit } = useForm<ISignInForm>({
    mode: "onChange",
    resolver: yupResolver(signInValidator),
  });

  const { execute, loading } = useExecuteUseCase<ISessionUser, ISignInForm>({
    callback: (params: ISignInForm) => {
      return authDomain.signIn(params);
    },
  });

  const signIn = async (values: ISignInForm) => {
    const { session, user } = await execute({ ...values });
    setUserSession(session, user);
    navigate("/admin/wallet");
  };

  return (
    <main className="auth">
      <Grid
        gridTemplateColumns={{ lg: "repeat(6, 1fr)", base: "repeat(1, 1fr)" }}
      >
        <GridItem
          colSpan={{ lg: 4 }}
          display={{ base: "none", lg: "block" }}
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
            <h2 className="sign-in-form__title">SIGN IN.</h2>
            <p className="sign-in-form__description">Welcome Back</p>

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
              <Text fontSize="sm" color="gray.400">
                Forgot password?{" "}
                <Link to="auth/sing-up">
                  <LinkChakra variant="underline" color="white">
                    Reset here.
                  </LinkChakra>
                </Link>
              </Text>

              <Button
                w="100%"
                loading={loading}
                disabled={!formState.isValid}
                onClick={handleSubmit(signIn)}
              >
                Sign in
              </Button>

              <Text fontSize="sm" textAlign="center" color="gray.400">
                Don't have an account?{" "}
                <Link to="/auth/sign-up">
                  <LinkChakra variant="underline" color="white">
                    Sign up.
                  </LinkChakra>
                </Link>
              </Text>
            </Flex>
          </Flex>
        </GridItem>
      </Grid>
    </main>
  );
};
