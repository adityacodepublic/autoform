import React from "react";
import { Field } from "../ui/field";
import { FieldWrapperProps } from "@autoform/react";

const DISABLED_LABELS = ["boolean", "object", "array"];

export const FieldWrapper: React.FC<FieldWrapperProps> = ({
  id,
  label,
  error,
  field,
  children,
}) => {
  const isDisabled = DISABLED_LABELS.includes(field.type);

  return (
    <Field
      label={
        !isDisabled && (
          <label htmlFor={id}>
            {label}
            {field.required && (
              <span style={{ color: "red", opacity: 0.8 }}> *</span>
            )}
          </label>
        )
      }
      helperText={field.fieldConfig?.description}
      errorText={!isDisabled ? error : undefined}
      marginY={!isDisabled ? 6 : undefined}
    >
      {children}
    </Field>
  );
};
