import React from "react";
import { Checkbox } from "@mantine/core";
import { AutoFormFieldProps } from "@autoform/react";

export const BooleanField: React.FC<AutoFormFieldProps> = ({
  label,
  field,
  error,
  inputProps,
}) => {
  const { key, ...props } = inputProps;
  return (
    <Checkbox
      {...props}
      label={
        <span style={{ lineHeight: "16px", cursor: "pointer" }}>
          {label}
          {field.required && (
            <span style={{ color: "red", opacity: 0.8 }}> * </span>
          )}
        </span>
      }
      key={key}
    />
  );
};
