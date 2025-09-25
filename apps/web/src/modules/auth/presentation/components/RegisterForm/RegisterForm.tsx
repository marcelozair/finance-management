import { useForm } from "react-hook-form";
import { FaUserAlt } from "react-icons/fa";
import { Button, Flex } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";

import { AuthDomain } from "../../../domain";
import type { ISignUpForm } from "../../interfaces/ISignUpForm";
import type { TypeSignUpViews } from "../../views/SignUp/SignUp";
import { signUpValidator } from "../../validator/SignUpValidator";
import { useExecuteUseCase } from "../../../../../core/hook/useExecuteUseCase";
import { TextField } from "../../../../../shared/components/TextField/TextField";
import { EmailField } from "../../../../../shared/components/EmailField/EmailField";
import { PasswordField } from "../../../../../shared/components/PasswordField/PasswordField";
import { PhoneNumberField } from "../../../../../shared/components/PhoneNumberField/PhoneNumberField";

interface RegisterForm {
  navigate: (view: TypeSignUpViews) => void;
}

export const RegisterForm = ({ navigate }: RegisterForm) => {
  const authDomain = new AuthDomain();

  const { register, formState, handleSubmit, setValue } = useForm<ISignUpForm>({
    mode: "onChange",
    resolver: yupResolver(signUpValidator),
  });

  const { execute, loading } = useExecuteUseCase<void, ISignUpForm>({
    callback: (params: ISignUpForm) => {
      return authDomain.signUp(params);
    },
  });

  const signUp = async (values: ISignUpForm) => {
    await execute({ ...values });
    navigate("user-verification");
  };

  return (
    <Flex
      justifyContent="center"
      direction="column"
      width="100%"
      maxWidth="450px"
      h="100%"
    >
      <h2 className="sign-in-form__title">Sign Up to SientePE</h2>
      <p className="sign-in-form__description">Register now</p>

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
          setValue={(value: string) => setValue("phone", value)}
          {...register("phone")}
        />

        <PasswordField
          label="Password"
          placeholder="Enter your password"
          error={formState.errors.password?.message}
          {...register("password")}
        />

        <Button
          w="100%"
          loading={loading}
          disabled={!formState.isValid}
          onClick={handleSubmit(signUp)}
        >
          Sign Up
        </Button>
      </Flex>
    </Flex>
  );
};
