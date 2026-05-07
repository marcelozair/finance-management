import { Field, Input, InputGroup } from "@chakra-ui/react";
import { useState } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";
import { FaEye, FaEyeSlash, FaLock } from "react-icons/fa";

interface PasswordFieldProps extends UseFormRegisterReturn {
  label: string;
  error?: string;
  placeholder: string;
}

export const PasswordField = ({
  label,
  error,
  placeholder,
  ...props
}: PasswordFieldProps) => {
  const [hide, setHide] = useState(true);

  return (
    <Field.Root required invalid={!!error}>
      <Field.Label>
        {label} <Field.RequiredIndicator />
      </Field.Label>
      <InputGroup
        startElement={<FaLock />}
        endElement={
          hide ? (
            <FaEye onClick={() => setHide(false)} />
          ) : (
            <FaEyeSlash onClick={() => setHide(true)} />
          )
        }
      >
        <Input
          placeholder={placeholder}
          type={hide ? "password" : "text"}
          {...props}
        />
      </InputGroup>
      {error && <Field.ErrorText>{error}</Field.ErrorText>}
    </Field.Root>
  );
};
