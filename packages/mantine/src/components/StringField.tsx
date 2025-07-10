import React from "react";
import { TextInput } from "@mantine/core";
import { AutoFormFieldProps } from "@autoform/react";

export const StringField: React.FC<AutoFormFieldProps> = ({
  id,
  label,
  field,
  error,
  inputProps,
  fieldMethods,
}) => {
  const formField = fieldMethods();

  return (
    <TextInput
      id={id}
      key={id}
      label={label}
      error={error}
      {...formField}
      {...inputProps}
      value={formField.value ?? ""}
      withAsterisk={field.required}
      description={field.fieldConfig?.description}
    />
  );
};
