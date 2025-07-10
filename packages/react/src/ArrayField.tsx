import React from "react";
import { useFieldArray } from "react-hook-form";
import { AutoFormField } from "./AutoFormField";
import { useAutoForm } from "./context";
import { getLabel, ParsedField } from "@autoform/core";
import { useRegister } from "./create-field";

export const ArrayField: React.FC<{
  id: string;
  path: string[];
  inputProps: any;
  field: ParsedField;
  error?: string | undefined;
}> = ({ id, path, inputProps, field, error }) => {
  const { uiComponents } = useAutoForm();
  const register = useRegister(path.join("."));
  const { fields, append, remove } = useFieldArray({
    name: path.join("."),
  });

  const props = {
    ref: register.ref,
    key: id,
    error: error,
    ...inputProps,
  };

  const subFieldType = field.schema?.[0]?.type;
  let defaultValue: any;
  if (subFieldType === "object") {
    defaultValue = {};
  } else if (subFieldType === "array") {
    defaultValue = [];
  } else {
    defaultValue = null;
  }

  return (
    <uiComponents.ArrayWrapper
      field={field}
      inputProps={props}
      label={getLabel(field)}
      onAddItem={() => append(defaultValue)}
    >
      {fields.map((item, index) => (
        <uiComponents.ArrayElementWrapper
          key={item.id}
          onRemove={() => remove(index)}
          index={index}
        >
          <AutoFormField
            field={field.schema![0]!}
            path={[...path, index.toString()]}
          />
        </uiComponents.ArrayElementWrapper>
      ))}
    </uiComponents.ArrayWrapper>
  );
};
