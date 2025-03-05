import React from "react";
import { Box, Text, Button } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { ArrayWrapperProps } from "@autoform/react";

export const ArrayWrapper: React.FC<ArrayWrapperProps> = ({
  label,
  error,
  field,
  children,
  onAddItem,
}) => {
  return (
    <Box mt="md">
      <Text fw={500} size="md">
        {label}
        {field.required && (
          <span style={{ color: "red", opacity: 0.8 }}> * </span>
        )}
      </Text>
      {error && (
        <Text size="xs" c="red.6" mb="-5px">
          {error}
        </Text>
      )}
      {children}
      <Button onClick={onAddItem} mt="sm" data-testid="add-item-button">
        <IconPlus size={19} />
      </Button>
    </Box>
  );
};
