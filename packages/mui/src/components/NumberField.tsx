import React from "react";
import Input from "@mui/material/Input";
import { AutoFormFieldProps } from "@autoform/react";

export const NumberField: React.FC<AutoFormFieldProps> = ({
  id,
  error,
  inputProps,
}) => {
  const { key, ...props } = inputProps;

  return <Input id={id} type="number" error={!!error} fullWidth {...props} />;
};
