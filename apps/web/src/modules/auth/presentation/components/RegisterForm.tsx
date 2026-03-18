import { Link } from "react-router";
import { useForm } from "react-hook-form";
import { FaUserAlt } from "react-icons/fa";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  createListCollection,
  Flex,
  Link as LinkChakra,
  Text,
} from "@chakra-ui/react";

import { AuthWrapper } from "./AuthWrapper";
import { AuthDomain } from "../../application";
import type { ISignUpForm } from "../interfaces/ISignUpForm";
import type { SignUpAtomsProps } from "../views/SignUp/SignUp";
import { signUpValidator } from "../validator/SignUpValidator";
import { Heading } from "@shared/presentation/components/content/Heading";
import type { SignUpResponseDTO } from "../../infrastructure/dtos/AuthDTO";
import { SubHeading } from "@shared/presentation/components/content/SubHeading";
import { TextField } from "@shared/presentation/components/TextField/TextField";
import { useExecuteUseCase } from "@shared/presentation/hooks/useExecuteUseCase";
import { EmailField } from "@shared/presentation/components/EmailField/EmailField";
import { PasswordField } from "@shared/presentation/components/PasswordField/PasswordField";
import { PhoneNumberField } from "@shared/presentation/components/PhoneNumberField/PhoneNumberField";
import { SelectField } from "@shared/presentation/components/SelectField/SelectField";

const currencyCatalog = createListCollection({
  items: [
    { label: "Peruvian Sol (PEN)", value: "PEN" },
    { label: "US Dollar (USD)", value: "USD" },
    { label: "Euro (EUR)", value: "EUR" },
    { label: "British Pound (GBP)", value: "GBP" },
    { label: "Mexican Peso (MXN)", value: "MXN" },
    { label: "Japanese Yen (JPY)", value: "JPY" },
  ],
});

export const RegisterForm = (props: SignUpAtomsProps) => {
  const authDomain = new AuthDomain();

  const { register, formState, handleSubmit, setValue, trigger } =
    useForm<ISignUpForm>({
      mode: "onChange",
      resolver: yupResolver(signUpValidator),
    });

  const { execute, loading } = useExecuteUseCase<
    SignUpResponseDTO,
    ISignUpForm
  >({
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

      <form onSubmit={handleSubmit(signUp)}>
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

          <SelectField
            options={currencyCatalog}
            label="Currency"
            placeholder="Please select a default currency"
            onSelect={(value: string) => {
              setValue("currency", value);
            }}
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
            type="submit"
            loading={loading}
            disabled={!formState.isValid}
            onClick={handleSubmit(signUp)}
          >
            SIGN UP
          </Button>
          <Text fontSize="sm" textAlign="center" color="gray.400">
            Have an account?{" "}
            <Link to="/auth/sign-in">
              <Text style={{ textDecoration: "underline" }} color="primary">
                Sign in.
              </Text>
            </Link>
          </Text>
        </Flex>
      </form>
    </AuthWrapper>
  );
};
