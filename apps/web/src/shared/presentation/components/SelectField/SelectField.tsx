import {
  Field,
  Select,
  type ListCollection,
  type SelectValueChangeDetails,
} from "@chakra-ui/react";
import { useState } from "react";

interface SelectFieldProps {
  label: string;
  error?: string;
  placeholder: string;
  onSelect?: (value: string) => void;
  required?: boolean;
  options: ListCollection<{
    label: string;
    value: string;
  }>;
}

export const SelectField = ({
  label,
  placeholder,
  options,
  error,
  onSelect,
  required = false,
}: SelectFieldProps) => {
  const [value, setValue] = useState("");

  const onChange = (
    event: SelectValueChangeDetails<{ value: string; label: string }>,
  ) => {
    const value = event.value;
    setValue(value[0]);
    if (onSelect) onSelect(value[0]);
  };

  return (
    <Field.Root required={required} invalid={!!error}>
      <Field.Label>
        {label} {required && <Field.RequiredIndicator />}
      </Field.Label>
      <Select.Root
        value={[value]}
        collection={options}
        onValueChange={onChange}
      >
        <Select.HiddenSelect />
        <Select.Control>
          <Select.Trigger>
            <Select.ValueText
              placeholder={placeholder}
              color={value === "" ? "gray.400" : "black"}
              _dark={{ color: value === "" ? "gray.200" : "white" }}
            />
          </Select.Trigger>
          <Select.IndicatorGroup>
            <Select.Indicator />
          </Select.IndicatorGroup>
        </Select.Control>
        <Select.Positioner>
          <Select.Content>
            {options.items.map((option) => (
              <Select.Item item={option} key={option.value}>
                {option.label}
                <Select.ItemIndicator />
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Select.Root>
    </Field.Root>
  );
};
