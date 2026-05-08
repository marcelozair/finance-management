import type { ReactNode } from "react";
import { Field, NumberInput } from "@chakra-ui/react";
import type { UseFormRegisterReturn } from "react-hook-form";

import type { Currency } from "@core/domain/vo/Currency";
import { CurrencyConfig } from "@shared/const/currencyEnum";

interface AmountFieldProps extends Partial<UseFormRegisterReturn> {
  label: string;
  currency: Currency;
  error?: string;
  placeholder: string;
  startElement?: ReactNode;
}

export const AmountField = ({
  label,
  currency,
  placeholder,
  error,
  required,
  ...props
}: AmountFieldProps) => {
  const config = CurrencyConfig[currency.getValue()];

  return (
    <Field.Root required={required} invalid={!!error}>
      <Field.Label>
        {label} {required && <Field.RequiredIndicator />}
      </Field.Label>

      <NumberInput.Root
        width="100%"
        locale={config.locale} // Provide locale explicitly for Zag.js/Chakra NumberInput
        formatOptions={{
          style: "currency",
          currency: config.currency,
          currencyDisplay: "narrowSymbol",
        }}
      >
        <NumberInput.Control />
        <NumberInput.Input placeholder={placeholder} {...props} />
      </NumberInput.Root>
      {error && <Field.ErrorText>{error}</Field.ErrorText>}
    </Field.Root>
  );
};
