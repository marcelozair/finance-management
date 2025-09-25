import { useState } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";

import {
  Field,
  Input,
  Select,
  InputGroup,
  type SelectValueChangeDetails,
  Portal,
  Flex,
  Box,
} from "@chakra-ui/react";

import { countryCodes } from "./countryCodes";

interface PhoneNumberFieldProps extends Partial<UseFormRegisterReturn> {
  label: string;
  error?: string;
  placeholder: string;
  setValue?: (phone: string) => void;
}

export const PhoneNumberField = ({
  label,
  placeholder,
  error,
  setValue,
  ...props
}: PhoneNumberFieldProps) => {
  const [number, setNumber] = useState("");
  const [countryCode, setCountryCode] = useState("+51");

  const onCountryChange = (
    event: SelectValueChangeDetails<{ value: string; label: string }>
  ) => {
    const value = event.value;
    setCountryCode(value[0]);

    if (props.onChange) {
      if (setValue) {
        setValue(`${value}${number}`);
      }
    }
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setNumber(value);

    if (setValue) {
      setValue(`${countryCode}${value}`);
    }
  };

  return (
    <Field.Root required invalid={!!error}>
      <Field.Label>
        {label} <Field.RequiredIndicator />
      </Field.Label>
      <InputGroup>
        <Flex gap="0.5rem" w="100%">
          <Box w="7rem">
            <Select.Root
              value={[countryCode]}
              collection={countryCodes}
              onValueChange={onCountryChange}
            >
              <Select.HiddenSelect />
              <Select.Control>
                <Select.Trigger>
                  <Select.ValueText placeholder="Select framework" />
                </Select.Trigger>
                <Select.IndicatorGroup>
                  <Select.Indicator />
                </Select.IndicatorGroup>
              </Select.Control>
              <Portal>
                <Select.Positioner>
                  <Select.Content>
                    {countryCodes.items.map((countryCode) => (
                      <Select.Item item={countryCode} key={countryCode.value}>
                        {countryCode.label}
                        <Select.ItemIndicator />
                      </Select.Item>
                    ))}
                  </Select.Content>
                </Select.Positioner>
              </Portal>
            </Select.Root>
          </Box>
          <Box w="100%">
            <Input
              placeholder={placeholder}
              {...props}
              onChange={onChange}
              value={number}
            />
          </Box>
        </Flex>
      </InputGroup>
      {error && <Field.ErrorText>{error}</Field.ErrorText>}
    </Field.Root>
  );
};
