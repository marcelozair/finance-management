import { Field, Input, InputGroup } from "@chakra-ui/react";
import type { ReactNode } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";

interface AmountFieldProps extends Partial<UseFormRegisterReturn> {
  label: string;
  error?: string;
  placeholder: string;
  startElement?: ReactNode;
}

export const AmountField = ({
  label,
  placeholder,
  error,
  required,
  ...props
}: AmountFieldProps) => {
  return (
    <Field.Root required={required} invalid={!!error}>
      <Field.Label>
        {label} {required && <Field.RequiredIndicator />}
      </Field.Label>
      <InputGroup>
        <Input placeholder={placeholder} type="number" {...props} />
      </InputGroup>
      {error && <Field.ErrorText>{error}</Field.ErrorText>}
    </Field.Root>
  );
};
