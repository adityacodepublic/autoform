import { ArrayWrapperProps } from "@autoform/react";
import { Button, Typography } from "antd";
import React from "react";
import { PlusOutlined } from "@ant-design/icons";

export const ArrayWrapper: React.FC<ArrayWrapperProps> = ({
  label,
  field,
  children,
  onAddItem,
  inputProps,
}) => {
  return (
    <section style={{ marginBottom: "20px" }}>
      <Typography.Title level={5}>
        {field.required && <span style={{ color: "red" }}> * </span>} {label}
      </Typography.Title>
      {inputProps.error && (
        <div style={{ marginBottom: "5px", marginTop: "-10px" }}>
          <Typography.Text type="danger">{inputProps.error}</Typography.Text>
        </div>
      )}
      {children}
      <Button type="primary" onClick={onAddItem} {...inputProps}>
        <PlusOutlined />
      </Button>
    </section>
  );
};
