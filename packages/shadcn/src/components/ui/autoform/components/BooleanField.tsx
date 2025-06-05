import React from "react";
import { AutoFormFieldProps } from "@autoform/react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useController } from "react-hook-form";

export const BooleanField: React.FC<AutoFormFieldProps> = ({
  id,
  error,
  field,
  label,
  inputProps,
}) => {
  const { key, onChange, onBlur, ...props } = inputProps;
  const { field: formField } = useController({ name: id });

  return (
    <>
      <div className="flex items-center space-x-2">
        <Checkbox
          id={id}
          {...props}
          {...formField}
          checked={formField.value}
          onCheckedChange={formField.onChange}
        />
        <Label htmlFor={id}>
          {label}
          {field.required && <span className="text-destructive"> *</span>}
        </Label>
      </div>
      {error && <p className="text-sm text-destructive">{error}</p>}
    </>
  );
};
