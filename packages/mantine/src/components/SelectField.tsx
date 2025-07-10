import React from "react";
import { Select } from "@mantine/core";
import { AutoFormFieldProps } from "@autoform/react";

export const SelectField: React.FC<AutoFormFieldProps> = ({
  id,
  label,
  field,
  error,
  inputProps,
  fieldMethods,
}) => {
  const formField = fieldMethods();

  return (
    <Select
      key={id}
      {...inputProps}
      {...formField}
      label={label}
      error={error}
      withAsterisk={field.required}
      description={field.fieldConfig?.description}
      data={(field.options || []).map(([key, label]) => ({
        value: label,
        label,
      }))}
    />
  );
};
