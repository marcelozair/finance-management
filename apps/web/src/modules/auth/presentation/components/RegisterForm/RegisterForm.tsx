import { useForm } from "react-hook-form";
import { FaUserAlt } from "react-icons/fa";
import { Button, Flex } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";

import { AuthDomain } from "../../../domain";
import type { ISignUpForm } from "../../interfaces/ISignUpForm";
import { signUpValidator } from "../../validator/SignUpValidator";
import type { User } from "../../../../user/domain/entities/User";
import { useExecuteUseCase } from "../../../../../core/hook/useExecuteUseCase";
import { TextField } from "../../../../../shared/components/TextField/TextField";
import { EmailField } from "../../../../../shared/components/EmailField/EmailField";
import { PasswordField } from "../../../../../shared/components/PasswordField/PasswordField";

interface RegisterForm {
  next: () => void;
}

export const RegisterForm = ({ next }: RegisterForm) => {
  const authDomain = new AuthDomain();

  const { register, formState, handleSubmit } = useForm<ISignUpForm>({
    mode: "onChange",
    resolver: yupResolver(signUpValidator),
  });

  const { execute, loading } = useExecuteUseCase<User, ISignUpForm>({
    callback: (params: ISignUpForm) => {
      return authDomain.signUp(params);
    },
  });

  const signUp = async (values: ISignUpForm) => {
    await execute({ ...values });
    next();
    // redirect("admin/wallets");
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
          required={true}
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
