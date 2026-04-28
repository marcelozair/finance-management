import { LuCalendar } from "react-icons/lu";
import { DatePicker, Field, Portal } from "@chakra-ui/react";

export interface DateFieldProps {
  onChange: (value: string) => void;
  error: string | undefined;
}

export const DateField = ({ onChange, error }: DateFieldProps) => {
  return (
    <Field.Root invalid={!!error}>
      <DatePicker.Root
        size="sm"
        width="100%"
        onValueChange={(details) => {
          const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

          const val = Array.isArray(details.value)
            ? details.value[0]
            : details.value;

          onChange(val.toDate(timeZone).toISOString());
        }}
      >
        <DatePicker.Label>Date &amp; Time</DatePicker.Label>
        <DatePicker.Control>
          <DatePicker.Input />
          <DatePicker.IndicatorGroup>
            <DatePicker.Trigger>
              <LuCalendar />
            </DatePicker.Trigger>
          </DatePicker.IndicatorGroup>
        </DatePicker.Control>
        <Portal>
          <DatePicker.Positioner>
            <DatePicker.Content>
              <DatePicker.View view="day">
                <DatePicker.Header />
                <DatePicker.DayTable />
              </DatePicker.View>
              <DatePicker.View view="month">
                <DatePicker.Header />
                <DatePicker.MonthTable />
              </DatePicker.View>
              <DatePicker.View view="year">
                <DatePicker.Header />
                <DatePicker.YearTable />
              </DatePicker.View>
            </DatePicker.Content>
          </DatePicker.Positioner>
        </Portal>
      </DatePicker.Root>
      {error && <Field.ErrorText>{error}</Field.ErrorText>}
    </Field.Root>
  );
};
