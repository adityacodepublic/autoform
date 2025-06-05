import React from "react";
import { DateInput } from "@mantine/dates";
import { useController } from "react-hook-form";
import { AutoFormFieldProps } from "@autoform/react";

export const DateField: React.FC<AutoFormFieldProps> = ({
  id,
  field,
  error,
  label,
  inputProps,
}) => {
  const { key, onChange, onBlur, ref, ...props } = inputProps;
  const { field: formField } = useController({ name: id });

  return (
    <DateInput
      key={key}
      {...props}
      {...formField}
      label={label}
      error={error}
      withAsterisk={field.required}
      description={field.fieldConfig?.description}
      value={formField.value ? new Date(formField.value) : undefined}
      onChange={(value) =>
        formField.onChange(value?.toLocaleDateString("en-CA"))
      }
    />
  );
};
