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

import { AuthDomain } from "../../../application";
import type { ISignInForm } from "../../interfaces/ISignInForm";
import { signInValidator } from "../../validator/signInValidator";

import { useSession } from "@shared/presentation/store/session/useSession";
import { EmailField } from "@shared/presentation/components/EmailField/EmailField";
import { PasswordField } from "@shared/presentation/components/PasswordField/PasswordField";

import { useExecuteUseCase } from "@shared/presentation/hooks/useExecuteUseCase";
import type { SessionUserDTO } from "src/modules/auth/infrastructure/dtos/AuthDTO";

import { SessionCookieStore } from "src/modules/auth/infrastructure/services/SessionCookieStore";

import "./../../styles/signIn.css";

export const SignInView = () => {
  const authDomain = new AuthDomain();

  const navigate = useNavigate();
  const sessionStoreService = new SessionCookieStore();
  const { setUserSession } = useSession({ sessionStoreService });

  const { register, formState, handleSubmit } = useForm<ISignInForm>({
    mode: "onChange",
    resolver: yupResolver(signInValidator),
  });

  const { execute, loading } = useExecuteUseCase<SessionUserDTO, ISignInForm>({
    callback: (params: ISignInForm) => {
      return authDomain.signIn(params);
    },
  });

  const signIn = async (values: ISignInForm) => {
    const { session, user } = await execute({ ...values });
    setUserSession(session, user);
    navigate("/admin/select-profile");
  };

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
            <form onSubmit={handleSubmit(signIn)}>
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
                    <LinkChakra variant="underline" color="dark">
                      Reset here.
                    </LinkChakra>
                  </Link>
                </Text>

                <Button
                  w="100%"
                  type="submit"
                  loading={loading}
                  disabled={!formState.isValid}
                  onClick={handleSubmit(signIn)}
                >
                  Sign in
                </Button>

                <Text fontSize="sm" textAlign="center" color="gray.400">
                  Don't have an account?{" "}
                  <Link to="/auth/sign-up">
                    <LinkChakra variant="underline" color="primary">
                      Sign up.
                    </LinkChakra>
                  </Link>
                </Text>
              </Flex>
            </form>
          </Flex>
        </GridItem>
      </Grid>
    </main>
  );
};
