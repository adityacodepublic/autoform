import { ObjectWrapperProps } from "@autoform/react";
import { Typography } from "antd";
import React from "react";

export const ObjectWrapper: React.FC<ObjectWrapperProps> = ({
  label,
  children,
}) => {
  return (
    <div>
      <Typography.Title level={5} style={{ marginTop: '40px', marginBottom:'15px'}}>{label}</Typography.Title>
      {children}
    </div>
  );
};
