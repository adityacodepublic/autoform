import React from "react";
import { ArrayWrapperProps } from "@autoform/react";
import { Button, Heading, Stack, Text } from "@chakra-ui/react";
import { FiPlus } from "react-icons/fi";

export const ArrayWrapper: React.FC<ArrayWrapperProps> = ({
  label,
  field,
  children,
  onAddItem,
  inputProps,
}) => {
  return (
    <Stack w={"full"} marginBottom={6}>
      <Heading size={"md"} fontWeight={"medium"}>
        {label}
        {field.required && (
          <span style={{ color: "red", opacity: 0.8 }}> * </span>
        )}
      </Heading>
      {inputProps.error && (
        <Text textStyle={"xs"} fontWeight={"medium"} color={"red.500"}>
          {inputProps.error}
        </Text>
      )}
      {children}
      <div>
        <Button
          {...inputProps}
          name="add-array-item"
          onClick={onAddItem}
          variant={"surface"}
          type="button"
          rounded="md"
          px={10}
        >
          <FiPlus />
        </Button>
      </div>
    </Stack>
  );
};
