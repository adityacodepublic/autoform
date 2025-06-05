import React from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { AutoFormFieldProps } from "@autoform/react";

export const SelectField: React.FC<AutoFormFieldProps> = ({
  id,
  field,
  label,
  value,
  inputProps,
}) => {
  const { key, ref, ...props } = inputProps;

  return (
    <Select
      key={key}
      fullWidth
      {...props}
      labelId={id}
      label={label}
      inputRef={ref}
      defaultValue={value || ""}
    >
      {(field.options || []).map(([key, label]) => (
        <MenuItem key={key} value={label}>
          {label}
        </MenuItem>
      ))}
    </Select>
  );
};
