import React from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { AutoFormFieldProps } from "@autoform/react";

export const SelectField: React.FC<AutoFormFieldProps> = ({
  field,
  value,
  inputProps,
  error,
}) => {
  const { key, ...props } = inputProps;

  return (
    <Select error={!!error} fullWidth {...props} defaultValue={value}>
      {(field.options || []).map(([key, label]) => (
        <MenuItem key={key} value={label}>
          {label}
        </MenuItem>
      ))}
    </Select>
  );
};
