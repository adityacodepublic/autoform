import { AutoFormFieldProps } from "@autoform/react";
import { Select } from "antd";
import React from "react";

export const SelectField: React.FC<AutoFormFieldProps> = ({
  id,
  field,
  inputProps,
}) => {
  const { key, ...props } = inputProps;

  const options =
    field.options?.map((option) => ({
      label: option[1],
      value: option[1],
    })) || [];
  return (
    <Select
      id={id}
      key={key}
      {...props}
      options={options}
      style={{ width: "100%" }}
    />
  );
};
