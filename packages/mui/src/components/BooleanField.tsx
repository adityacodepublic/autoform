import React from "react";
import { useController } from "react-hook-form";
import { AutoFormFieldProps } from "@autoform/react";
import { Checkbox, FormControlLabel, FormHelperText } from "@mui/material";

export const BooleanField: React.FC<AutoFormFieldProps> = ({
  id,
  label,
  field,
  error,
  inputProps,
}) => {
  const { key, ref, onChange, onBlur, ...props } = inputProps;
  const { field: formField } = useController({ name: id, defaultValue: false });

  return (
    <>
      <FormControlLabel
        key={key}
        {...props}
        {...formField}
        label={
          <span style={{ color: error && "#d32f2f", opacity: 0.8 }}>
            {label} {field.required && " *"}
          </span>
        }
        checked={formField.value}
        control={<Checkbox />}
      />
      {error && <FormHelperText>{error}</FormHelperText>}
    </>
  );
};
