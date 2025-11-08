import { useForm } from "react-hook-form";
import { FaUserAlt } from "react-icons/fa";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Flex, Link, Text } from "@chakra-ui/react";

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

  // useEffect(() => {
  //   const { name } = getValues();
  //   setValue(
  //     "name",
  //     name
  //       .split(" ")
  //       .map(
  //         (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  //       )
  //       .join(" ")
  //   );
  // }, [watch("name"), getValues, setValue]);

  return (
    <AuthWrapper>
      <Heading textAlign="left" mb={2}>
        Register
      </Heading>
      <SubHeading textAlign="left" mb={8}>
        Hi there! It's a please to see you here
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
          <Link variant="underline" color="primary">
            Terms and Conditions
          </Link>{" "}
          and{" "}
          <Link variant="underline" color="primary">
            Privacy Policy.
          </Link>
        </Text>
        <Button
          w="100%"
          loading={loading}
          disabled={!formState.isValid}
          onClick={handleSubmit(signUp)}
        >
          SIGN UP
        </Button>
      </Flex>
    </AuthWrapper>
  );
};
