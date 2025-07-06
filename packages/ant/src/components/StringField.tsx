import { AutoFormFieldProps } from "@autoform/react";
import { Input } from "antd";
import React from "react";

export const StringField: React.FC<AutoFormFieldProps> = ({
  id,
  inputProps,
}) => {
  const { key, ...props } = inputProps;

  return <Input id={id} key={key} {...props} style={{ width: "100%" }} />;
};
