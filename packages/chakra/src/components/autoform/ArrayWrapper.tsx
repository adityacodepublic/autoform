import React from "react";
import { FiPlus } from "react-icons/fi";
import { ArrayWrapperProps } from "@autoform/react";
import { Button, Heading, Stack, FieldHelperText } from "@chakra-ui/react";

export const ArrayWrapper: React.FC<ArrayWrapperProps> = ({
  label,
  field,
  children,
  onAddItem,
  inputProps,
}) => {
  const { key, onChange, onBlur, ref, ...props } = inputProps;

  return (
    <Stack w={"full"} marginBottom={6} gapY={1}>
      <Heading
        size={"md"}
        fontWeight={"medium"}
        ref={ref}
        tabIndex={-1}
        aria-describedby={`${key}-error ${key}-description `}
      >
        {label}
        {field.required && (
          <span style={{ color: "#ef4444", opacity: 0.8 }}> * </span>
        )}
      </Heading>
      {field.fieldConfig?.description && (
        <FieldHelperText id={key + "-description"} mt={"-0.5"} mb={"1"}>
          {field.fieldConfig.description}
        </FieldHelperText>
      )}
      {props.error && (
        <span
          id={key + "-error"}
          style={{
            color: "#ef4444",
            fontSize: "12px",
            marginTop: "-8px",
            marginBottom: "4px",
          }}
        >
          {props.error}
        </span>
      )}
      <div>
        {children}
        <Button
          px={10}
          rounded="md"
          variant={"surface"}
          {...props}
          type="button"
          onClick={onAddItem}
          aria-label={`add ${label}`}
        >
          <FiPlus />
        </Button>
      </div>
    </Stack>
  );
};
