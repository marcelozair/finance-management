import {
  Button,
  Clipboard,
  Flex,
  IconButton,
  Input,
  InputGroup,
  QrCode,
} from "@chakra-ui/react";

import { AuthWrapper } from "./AuthWrapper";
import type { SignUpAtomsProps } from "../views/SignUp/SignUp";

import { Heading } from "@shared/presentation/components/content/Heading";
import { SubHeading } from "@shared/presentation/components/content/SubHeading";

export const SignUpTOTP = (props: SignUpAtomsProps) => {
  return (
    <AuthWrapper>
      <Heading textAlign={{ base: "center", sm: "left" }} mb={4}>
        2FA Authentication
      </Heading>
      <SubHeading
        textAlign={{ base: "center", sm: "left" }}
        mb={8}
        width={{ base: "100%", sm: "80%" }}
      >
        Please use authenticator app to scan and generate your verification code
      </SubHeading>

      <Flex justifyContent={{ base: "center", sm: "flex-start" }}>
        <QrCode.Root value={props.context?.secret || "Unknow"} size="xl">
          <QrCode.Frame>
            <QrCode.Pattern />
          </QrCode.Frame>
        </QrCode.Root>
      </Flex>

      <SubHeading
        textAlign={{ base: "center", sm: "left" }}
        mb={4}
        mt={8}
        width={{ base: "100%", sm: "80%" }}
      >
        If you can't scan the QR, copy this text instead
      </SubHeading>

      <Clipboard.Root value={props.context?.secret || "Unknow"}>
        <InputGroup
          endElement={
            <Clipboard.Trigger asChild>
              <IconButton variant="surface" size="xs" me="-2">
                <Clipboard.Indicator />
              </IconButton>
            </Clipboard.Trigger>
          }
        >
          <Clipboard.Input asChild>
            <Input />
          </Clipboard.Input>
        </InputGroup>
      </Clipboard.Root>

      <SubHeading color="white" mt={8} w="80%">
        Don't share the generated code with someone else
      </SubHeading>

      <Button
        w="100%"
        mt={5}
        onClick={() => props.navigate("user-verification-totp")}
        // loading={loading}
        // disabled={!formState.isValid}
        // onClick={handleSubmit(signUp)}
      >
        Continue
      </Button>
    </AuthWrapper>
  );
};
