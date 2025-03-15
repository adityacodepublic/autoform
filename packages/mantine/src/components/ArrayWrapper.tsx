import React from "react";
import { Box, Text, Button } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { ArrayWrapperProps } from "@autoform/react";

export const ArrayWrapper: React.FC<ArrayWrapperProps> = ({
  label,
  field,
  children,
  onAddItem,
  inputProps,
}) => {
  return (
    <Box mt="md">
      <Text fw={500} size="md">
        {label}
        {field.required && (
          <span style={{ color: "red", opacity: 0.8 }}> * </span>
        )}
      </Text>
      {inputProps.error && (
        <Text size="xs" c="red.6" mb="-5px">
          {inputProps.error}
        </Text>
      )}
      {children}
      <Button
        {...inputProps}
        mt="sm"
        onClick={onAddItem}
        data-testid="add-item-button"
      >
        <IconPlus size={19} />
      </Button>
    </Box>
  );
};
