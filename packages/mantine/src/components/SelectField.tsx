import React from "react";
import { Select } from "@mantine/core";
import { useController } from "react-hook-form";
import { AutoFormFieldProps } from "@autoform/react";

export const SelectField: React.FC<AutoFormFieldProps> = ({
  field,
  error,
  inputProps,
  label,
  id,
  value,
}) => {
  const { key, onChange, onBlur, ref, ...props } = inputProps;
  const { field: formField } = useController({ name: id });

  return (
    <Select
      key={key}
      {...props}
      {...formField}
      label={label}
      error={error}
      description={field.fieldConfig?.description}
      data={(field.options || []).map(([key, label]) => ({
        value: label,
        label,
      }))}
    />
  );
};
