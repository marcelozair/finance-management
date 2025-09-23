import { Field, Input, InputGroup } from "@chakra-ui/react";
import type { ReactNode } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";

interface TextFieldProps extends Partial<UseFormRegisterReturn> {
  label: string;
  error?: string;
  placeholder: string;
  startElement?: ReactNode;
}

export const TextField = ({
  label,
  placeholder,
  error,
  required,
  startElement,
  ...props
}: TextFieldProps) => {
  return (
    <Field.Root required={required} invalid={!!error}>
      <Field.Label>
        {label} {required && <Field.RequiredIndicator />}
      </Field.Label>
      <InputGroup startElement={startElement}>
        <Input placeholder={placeholder} type="text" {...props} />
      </InputGroup>
      {error && <Field.ErrorText>{error}</Field.ErrorText>}
    </Field.Root>
  );
};
