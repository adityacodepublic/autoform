import React from "react";
import { getLabel, ParsedField } from "@autoform/core";
import { useFieldArray, useFormContext } from "react-hook-form";
import { AutoFormField } from "./AutoFormField";
import { useAutoForm } from "./context";

export const ArrayField: React.FC<{
  field: ParsedField;
  path: string[];
  inputProps: any;
}> = ({ field, path, inputProps }) => {
  const { uiComponents } = useAutoForm();
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: path.join("."),
  });
  
  const { key, onChange, onBlur, ...props} = inputProps;
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
