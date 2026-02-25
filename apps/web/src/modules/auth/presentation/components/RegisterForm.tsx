import { useForm } from "react-hook-form";
import { FaUserAlt } from "react-icons/fa";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Flex, Link as LinkChakra, Text } from "@chakra-ui/react";

import { AuthDomain } from "../../domain";
import { AuthWrapper } from "./AuthWrapper";
import type { ISignUpForm } from "../interfaces/ISignUpForm";
import type { SignUpAtomsProps } from "../views/SignUp/SignUp";
import { signUpValidator } from "../validator/SignUpValidator";
import type { ISignUpResponse } from "../../data/interfaces/IAuthResponse";

import { Heading } from "@shared/presentation/components/content/Heading";
import { SubHeading } from "@shared/presentation/components/content/SubHeading";
import { TextField } from "@shared/presentation/components/TextField/TextField";
import { EmailField } from "@shared/presentation/components/EmailField/EmailField";
import { PasswordField } from "@shared/presentation/components/PasswordField/PasswordField";
import { PhoneNumberField } from "@shared/presentation/components/PhoneNumberField/PhoneNumberField";
import { useExecuteUseCase } from "@shared/presentation/hooks/useExecuteUseCase";
import { Link } from "react-router";

export const RegisterForm = (props: SignUpAtomsProps) => {
  const authDomain = new AuthDomain();

  const { register, formState, handleSubmit, setValue, trigger } =
    useForm<ISignUpForm>({
      mode: "onChange",
      resolver: yupResolver(signUpValidator),
    });

  const { execute, loading } = useExecuteUseCase<ISignUpResponse, ISignUpForm>({
    callback: (params: ISignUpForm) => {
      return authDomain.signUp(params);
    },
  });

  const signUp = async (values: ISignUpForm) => {
    const response = await execute({ ...values });
    props.updateCtx({ secret: response.secret, userId: response.user.id });
    props.navigate("user-register-totp");
  };

  return (
    <AuthWrapper>
      <Heading textAlign="left" mb={2}>
        Register
      </Heading>
      <SubHeading textAlign="left" mb={8}>
        Create your account to start managing your finances.
      </SubHeading>

      <Flex direction="column" gap={5}>
        <TextField
          label="Full Name"
          placeholder="Enter your full name"
          error={formState.errors.name?.message}
          startElement={<FaUserAlt />}
          {...register("name")}
        />

        <EmailField
          label="Email"
          placeholder="Enter your email"
          error={formState.errors.email?.message}
          {...register("email")}
        />

        <PhoneNumberField
          label="Phone number"
          placeholder="Enter your phone number"
          error={formState.errors.phone?.message}
          setValue={(value: string) => {
            setValue("phone", value);
            trigger("phone");
          }}
        />

        <PasswordField
          label="Password"
          placeholder="Enter your password"
          error={formState.errors.password?.message}
          {...register("password")}
        />
        <Text mt={4} textAlign="left" textStyle="sm" color="gray.400">
          By creating an account, you acknowledge and accept our{" "}
          <LinkChakra variant="underline" color="primary">
            Terms and Conditions
          </LinkChakra>{" "}
          and{" "}
          <LinkChakra variant="underline" color="primary">
            Privacy Policy.
          </LinkChakra>
        </Text>
        <Button
          w="100%"
          loading={loading}
          disabled={!formState.isValid}
          onClick={handleSubmit(signUp)}
        >
          SIGN UP
        </Button>
        <Text fontSize="sm" textAlign="center" color="gray.400">
          Have an account?{" "}
          <Link to="/auth/sign-in">
            <LinkChakra variant="underline" color="white">
              Sign in.
            </LinkChakra>
          </Link>
        </Text>
      </Flex>
    </AuthWrapper>
  );
};
