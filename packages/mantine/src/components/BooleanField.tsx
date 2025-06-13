import React from "react";
import { Checkbox } from "@mantine/core";
import { AutoFormFieldProps } from "@autoform/react";
import { useController } from "react-hook-form";

export const BooleanField: React.FC<AutoFormFieldProps> = ({
  id,
  label,
  field,
  inputProps,
}) => {
  const { key, onChange, onBlur, ref, ...props } = inputProps;
  const { field: formField } = useController({ name: id });

  return (
    <Checkbox
      key={key}
      {...props}
      {...formField}
      checked={formField.value}
      description={field.fieldConfig?.description}
      label={
        <span style={{ lineHeight: "16px", cursor: "pointer" }}>
          {label}
          {field.required && (
            <span style={{ color: "red", opacity: 0.8 }}> * </span>
          )}
        </span>
      }
    />
  );
};
