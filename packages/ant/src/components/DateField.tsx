import React from "react";
import { DatePicker } from "antd";
import { AutoFormFieldProps } from "@autoform/react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

export const DateField: React.FC<AutoFormFieldProps> = ({ id, inputProps }) => {
  const { key, ...props } = inputProps;

  return (
    <DatePicker
      id={id}
      key={key}
      {...props}
      style={{ width: "100%" }}
      value={dayjs.utc(props.value)}
      onChange={(date, dateString) => {
        props.onChange(dateString);
      }}
      // use allowClear have bug
      allowClear={false}
    />
  );
};
