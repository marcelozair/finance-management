import { Button, Link, Center, Flex, PinInput, Text } from "@chakra-ui/react";
import type { TypeSignUpViews } from "../../views/SignUp/SignUp";
import { Heading } from "../../../../../shared/components/content/Heading";
import { SubHeading } from "../../../../../shared/components/content/SubHeading";

interface VerifyCodeProps {
  navigate: (view: TypeSignUpViews) => void;
}

export const VerifyCode = ({ navigate }: VerifyCodeProps) => {
  return (
    <Flex
      justifyContent="center"
      direction="column"
      width="100%"
      maxWidth="450px"
      h="100%"
    >
      <Heading mb={4}>Confirm your email</Heading>
      <SubHeading>We sent a code to your email address</SubHeading>

      <Text mb={8} textAlign="center" textStyle="sm" fontWeight="bold">
        marceloberorcal@gmail.com
      </Text>

      <Center>
        <PinInput.Root size="2xl" attached>
          <PinInput.HiddenInput />
          <PinInput.Control>
            <PinInput.Input index={0} />
            <PinInput.Input index={1} />
            <PinInput.Input index={2} />
            <PinInput.Input index={3} />
            <PinInput.Input index={4} />
            <PinInput.Input index={5} />
          </PinInput.Control>
        </PinInput.Root>
      </Center>

      <Text mt={8} textAlign="center" textStyle="sm" color="gray.400">
        Didn't receive the code?{" "}
        <Link variant="underline" color="primary">
          Resend it
        </Link>
      </Text>

      <Button
        w="100%"
        mt={4}
        onClick={() => navigate("user-preferences")}
        // loading={loading}
        // disabled={!formState.isValid}
        // onClick={handleSubmit(signUp)}
      >
        Continue
      </Button>
    </Flex>
  );
};
