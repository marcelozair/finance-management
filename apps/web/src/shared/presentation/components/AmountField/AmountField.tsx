import type { ReactNode } from "react";
import { Field, NumberInput } from "@chakra-ui/react";
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
      {/* <InputGroup>
        <Input placeholder={placeholder} type="decimal" {...props} />
      </InputGroup> */}

      <NumberInput.Root
        width="100%"
        defaultValue="0"
        // formatOptions={{
        //   style: "currency",
        //   currency: "DOLLAR",
        //   currencyDisplay: "code",
        //   currencySign: "accounting",
        // }}
      >
        <NumberInput.Control />
        <NumberInput.Input placeholder={placeholder} {...props} />
      </NumberInput.Root>
      {error && <Field.ErrorText>{error}</Field.ErrorText>}
    </Field.Root>
  );
};
