import React, { FormEventHandler, useEffect } from "react";
import { useForm, FormProvider, DefaultValues } from "react-hook-form";
import {
  parseSchema,
  getDefaultValues,
  removeEmptyValues,
} from "@autoform/core";
import { AutoFormProps } from "./types";
import { AutoFormProvider } from "./context";
import { AutoFormField } from "./AutoFormField";

export function AutoForm<T extends Record<string, any>>({
  schema,
  onSubmit = () => {},
  defaultValues,
  values,
  children,
  uiComponents,
  formComponents,
  withSubmit = false,
  onFormInit = () => {},
  formProps = {},
}: AutoFormProps<T>) {
  const parsedSchema = parseSchema(schema);
  const methods = useForm<T>({
    defaultValues: {
      ...(getDefaultValues(schema) as Partial<T>),
      ...defaultValues,
    } as DefaultValues<T>,
    values: values as T,
  });

  useEffect(() => {
    if (onFormInit) {
      onFormInit(methods);
    }
  }, [onFormInit, methods]);

  const handleSubmit = async (dataRaw: T) => {
    const data = removeEmptyValues(dataRaw);
    const validationResult = schema.validateSchema(data as T);
    console.log("validationResult", { validationResult, dataRaw, data });
    if (validationResult.success) {
      await onSubmit(validationResult.data, methods);
    } else {
      methods.clearErrors();
      let isFocused: boolean = false;
      validationResult.errors?.forEach((error) => {
        const path = error.path.join(".");
        methods.setError(
          path as any,
          {
            type: "custom",
            message: error.message,
          },
          { shouldFocus: !isFocused }
        );

        isFocused = true;

        // For some custom errors, zod adds the final element twice for some reason
        const correctedPath = error.path?.slice?.(0, -1);
        if (correctedPath?.length > 0) {
          methods.setError(correctedPath.join(".") as any, {
            type: "custom",
            message: error.message,
          });
        }
      });
    }
  };

  return (
    <FormProvider {...methods}>
      <AutoFormProvider
        value={{
          schema: parsedSchema,
          uiComponents,
          formComponents,
        }}
      >
        <uiComponents.Form
          onSubmit={methods.handleSubmit(handleSubmit)}
          {...formProps}
        >
          {parsedSchema.fields.map((field) => (
            <AutoFormField key={field.key} field={field} path={[field.key]} />
          ))}
          {withSubmit && (
            <uiComponents.SubmitButton>Submit</uiComponents.SubmitButton>
          )}
          {children}
        </uiComponents.Form>
      </AutoFormProvider>
    </FormProvider>
  );
}
