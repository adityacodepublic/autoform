import React from "react";
import Input from "@mui/material/Input";
import { AutoFormFieldProps } from "@autoform/react";

export const StringField: React.FC<AutoFormFieldProps> = ({
  error,
  id,
  inputProps,
}) => {
  const { key, ...props } = inputProps;

  return <Input id={id} error={!!error} fullWidth {...props} />;
};
