import { Field, Input, InputGroup } from "@chakra-ui/react";
import type { UseFormRegisterReturn } from "react-hook-form";

import { MdAlternateEmail } from "react-icons/md";

interface EmailFieldProps extends Partial<UseFormRegisterReturn> {
  label: string;
  error?: string;
  placeholder: string;
}

export const EmailField = ({
  label,
  placeholder,
  error,
  ...props
}: EmailFieldProps) => {
  return (
    <Field.Root required invalid={!!error}>
      <Field.Label>
        {label} <Field.RequiredIndicator />
      </Field.Label>
      <InputGroup startElement={<MdAlternateEmail />}>
        <Input placeholder={placeholder} type="email" {...props} />
      </InputGroup>
      {error && <Field.ErrorText>{error}</Field.ErrorText>}
    </Field.Root>
  );
};
