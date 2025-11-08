import { useState } from "react";
import { useNavigate } from "react-router";
import { Button, Link, PinInput, Text } from "@chakra-ui/react";

import { AuthDomain } from "../../domain";
import { AuthWrapper } from "./AuthWrapper";
import type { SignUpAtomsProps } from "../views/SignUp/SignUp";
import type { IVerifyCode } from "../../domain/interfaces/IVerifyCode";
import type { ISessionUser } from "../../data/interfaces/IAuthResponse";
import { Heading } from "@shared/presentation/components/content/Heading";
import { useSession } from "@shared/presentation/store/session/useSession";
import { SubHeading } from "@shared/presentation/components/content/SubHeading";
import { useExecuteUseCase } from "@shared/presentation/hooks/useExecuteUseCase";

export const VerifyCode = (props: SignUpAtomsProps) => {
  const authDomain = new AuthDomain();
  const [code, setCode] = useState("");
  const navigate = useNavigate();
  const { setUserSession } = useSession();

  const { execute, loading } = useExecuteUseCase<ISessionUser, IVerifyCode>({
    callback: (params: IVerifyCode) => {
      return authDomain.verifyCode(params);
    },
  });

  const onSubmit = async () => {
    const { session, user } = await execute({
      token: code,
      userId: props.context.userId || 1,
    });

    setUserSession(session, user);
    navigate("/admin/wallet");
  };

  return (
    <AuthWrapper>
      <Heading textAlign="left" mb={4}>
        Confirm Code
      </Heading>
      <SubHeading mb={8} textAlign="left" width="80%">
        Please insert into your verification code from your authenticator app.
      </SubHeading>
      <PinInput.Root
        attached
        size="2xl"
        onValueChange={(e) => setCode(e.value.join(""))}
      >
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

      <Text mt={8} textStyle="sm" color="gray.400">
        Didn't get the code?{" "}
        <Link
          variant="underline"
          color="primary"
          onClick={() => props.navigate("user-register-totp")}
        >
          Scan again
        </Link>
      </Text>

      <Button
        w="100%"
        mt={4}
        loading={loading}
        onClick={onSubmit}
        disabled={code.length !== 6}
      >
        Continue
      </Button>
    </AuthWrapper>
  );
};
