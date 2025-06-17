import React from "react";
import { IconPlus } from "@tabler/icons-react";
import { Box, Text, Button } from "@mantine/core";
import { ArrayWrapperProps } from "@autoform/react";

export const ArrayWrapper: React.FC<ArrayWrapperProps> = ({
  label,
  field,
  children,
  onAddItem,
  inputProps,
}) => {
  const { key, onChange, onBlur, ref, ...props } = inputProps;

  return (
    <Box mt="md">
      <Text
        fw={500}
        size="md"
        ref={ref}
        tabIndex={-1}
        role="heading"
        aria-describedby={`${key}-error ${key}-description`}
      >
        {label}
        {field.required && (
          <span style={{ color: "red", opacity: 0.8 }}> * </span>
        )}
      </Text>
      {field.fieldConfig?.description && (
        <Text size="xs" c="dimmed" id={key + "-description"}>
          {field.fieldConfig?.description}
        </Text>
      )}
      {props.error && (
        <Text size="xs" c="red.6" id={key + "-error"}>
          {props.error}
        </Text>
      )}
      {children}
      <Button
        {...props}
        mt="5px"
        onClick={onAddItem}
        aria-label={`add ${label}`}
      >
        <IconPlus size={19} />
      </Button>
    </Box>
  );
};
