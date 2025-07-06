import { AutoFormFieldProps } from "@autoform/react";
import { InputNumber } from "antd";
import React from "react";

export const NumberField: React.FC<AutoFormFieldProps> = ({
  id,
  inputProps,
}) => {
  const { key, ...props } = inputProps;

  return <InputNumber id={id} key={key} {...props} style={{ width: "100%" }} />;
};
