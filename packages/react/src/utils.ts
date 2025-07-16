import { FieldConfig, SchemaProvider, getDefaultValues } from "@autoform/core";
import { fieldConfig as zodBaseFieldConfig } from "@autoform/zod";
import { fieldConfig as yupBaseFieldConfig } from "@autoform/yup";
import { fieldConfig as joiBaseFieldConfig } from "@autoform/joi";
import React, { ReactNode } from "react";
import { FieldReturn, FieldWrapperProps } from "./types";
import {
  createFormControl,
  FieldPath,
  FieldValues,
  useController,
  useFormContext,
  UseFormRegister,
} from "react-hook-form";

/**
 * Creates the entire form object.
 * Internally uses `createFormControl` from react-hook-form to create the formControl instance.
 * manages shouldFocusError properly.
 *
 * @template T - The type of field values.
 * @param props - An object containing: `useForm` props, excluding the `resolver` (optional).
 *
 * @returns An object returning value of `createFormControl<T>` {@link ReturnType<typeof createFormControl<T>>}.
 */
export function createForm<T extends FieldValues = FieldValues>(
  props?: Omit<Parameters<typeof createFormControl<T>>, "resolver">[0]
): ReturnType<typeof createFormControl<T>> & {
  shouldFocusError?: boolean;
} {
  const form = createFormControl<T>({
    ...props,
    shouldFocusError: false, // custom focus implemented in AutoForm
  });

  return {
    ...form,
    shouldFocusError: props?.shouldFocusError ?? true,
  };
}

/**
 * Factory function that creates a hook for accessing form methods of a specific field.
 *
 * This enables deferred hook execution,
 * The returned hook will use `useController` (controlled input)
 *
 * @param name - The name of the form field.
 *
 * @returns A hook function that takes same props as `useController`:
 *
 * @example
 * ```ts
 * const useField = createField('username');
 * const method = useField({ ...props });
 * ```
 */
export function createField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues,
>(name: TName): FieldReturn<TFieldValues, TName, TTransformedValues> {
  return (props) => {
    const mergedProps = { ...props, name };
    return useController<TFieldValues, TName, TTransformedValues>(mergedProps)
      .field;
  };
}

/**
 * This custom hook shares the same props and methods as register
 * @returns Return value of `register`
 */
export function useRegister<TFieldValues extends FieldValues = FieldValues>(
  ...props: Parameters<UseFormRegister<TFieldValues>>
) {
  const { register } = useFormContext<TFieldValues>();
  return register(...props);
}

/**
 * Retrieves the error of a field using given error object and field path.
 *
 * @param obj - errors object form react-hook-form.
 * @param path - field path.
 */
export function getPathInObject(obj: any, path: string[]): any {
  let current = obj;
  for (const key of path) {
    current = current[key];

    if (current === undefined) {
      return undefined;
    }
  }
  return current.message ? current : (current.root ?? current);
}

/**
 * Recursively focuses the first and deepest input element with an error, if found.
 */
export function focusError(errors: Record<string, any>): boolean {
  if (!errors || typeof errors !== "object") return false;

  if (typeof errors?.ref?.focus === "function") {
    errors.ref.focus();
    return true;
  }

  for (const val of Object.values(errors)) {
    if (typeof val === "object") {
      if (focusError(val)) return true;
    }
  }

  return false;
}

/**
 * Wraps the form submit handler to stop event propagation before executing it.
 *
 * @param callback - The form submit handler to run after stopping propagation.
 * @returns A new handler that stops propagation and then calls the callback.
 */
export const preventPropagation =
  (callback: (e: React.FormEvent<HTMLFormElement>) => void | Promise<void>) =>
  async (e: React.FormEvent<HTMLFormElement>) => {
    e.stopPropagation();
    await callback(e);
  };

/**
 * Use the buildZodFieldConfig to extend it with your customizations to ensure full TypeScript support.
 */
export function buildZodFieldConfig<
  FieldTypes = string,
  CustomData = Record<string, any>,
>(): (
  config: FieldConfig<
    ReactNode,
    FieldTypes,
    React.ComponentType<FieldWrapperProps>,
    CustomData
  >
) => ReturnType<typeof zodBaseFieldConfig> {
  return (config) =>
    zodBaseFieldConfig<
      ReactNode,
      FieldTypes,
      React.ComponentType<FieldWrapperProps>,
      CustomData
    >(config);
}

/**
 * Use the buildYupFieldConfig to extend it with your customizations to ensure full TypeScript support.
 */
export function buildYupFieldConfig<
  FieldTypes = string,
  CustomData = Record<string, any>,
>(): (
  config: FieldConfig<
    ReactNode,
    FieldTypes,
    React.ComponentType<FieldWrapperProps>,
    CustomData
  >
) => ReturnType<typeof yupBaseFieldConfig> {
  return (config) =>
    yupBaseFieldConfig<
      ReactNode,
      FieldTypes,
      React.ComponentType<FieldWrapperProps>,
      CustomData
    >(config);
}

/**
 * Use the buildJoiFieldConfig to extend it with your customizations to ensure full TypeScript support.
 */
export function buildJoiFieldConfig<
  FieldTypes = string,
  CustomData = Record<string, any>,
>(): (
  config: FieldConfig<
    ReactNode,
    FieldTypes,
    React.ComponentType<FieldWrapperProps>,
    CustomData
  >
) => ReturnType<typeof joiBaseFieldConfig> {
  return (config) =>
    joiBaseFieldConfig<
      ReactNode,
      FieldTypes,
      React.ComponentType<FieldWrapperProps>,
      CustomData
    >(config);
}
