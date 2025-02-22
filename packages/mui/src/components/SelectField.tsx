import React from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useController } from "react-hook-form";
import { AutoFormFieldProps } from "@autoform/react";

export const SelectField: React.FC<AutoFormFieldProps> = ({
  id,
  field,
  value,
  inputProps,
  error,
}) => {
  const { key, onChange, onBlur, ref, ...props } = inputProps;
  const { field: formField } = useController({ name: id, defaultValue:'' });

  return (
    <Select error={!!error} fullWidth {...props} {...formField}>
      {(field.options || []).map(([key, label]) => (
        <MenuItem key={key} value={label}>
          {label}
        </MenuItem>
      ))}
    </Select>
  );
};
