import React from "react";
import Checkbox from "@mui/material/Checkbox";
import { useController } from "react-hook-form";
import FormControlLabel from "@mui/material/FormControlLabel";
import { AutoFormFieldProps } from "@autoform/react";

export const BooleanField: React.FC<AutoFormFieldProps> = ({
  id,
  label,
  inputProps,
}) => {
  const { key, onChange, onBlur, ref, ...props } = inputProps;
  const { field: formField } = useController({ name: id, defaultValue: false });

  return (
    <FormControlLabel
      key={key}
      {...props}
      {...formField}
      checked={formField.value}
      control={<Checkbox />}
      label={label}
    />
  );
};
