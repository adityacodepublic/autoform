import { ReactNode } from "react";
import {
  ParsedField,
  ParsedSchema,
  Renderable,
  FieldConfig as BaseFieldConfig,
  SchemaProvider,
} from "@autoform/core";
import {
  FieldPath,
  FieldValues,
  UseControllerProps,
  UseFormReturn,
} from "react-hook-form";
import { createForm } from "./utils";

export interface AutoFormProps<T extends FieldValues = FieldValues> {
  schema: SchemaProvider<T>;
  form?: ReturnType<typeof createForm>;
  onSubmit?: (
    values: T,
    form: UseFormReturn<T, any, T>,
    e?: React.BaseSyntheticEvent
  ) => void | Promise<void>;
  defaultValues?: Partial<T>;
  values?: Partial<T>;
  children?: ReactNode;
  uiComponents: AutoFormUIComponents;
  formComponents: AutoFormFieldComponents;
  withSubmit?: boolean;
  formProps?: React.ComponentProps<"form"> | Record<string, any>;
}

export type ExtendableAutoFormProps<T extends FieldValues> = Omit<
  AutoFormProps<T>,
  "uiComponents" | "formComponents"
> & {
  uiComponents?: Partial<AutoFormUIComponents>;
  formComponents?: Partial<AutoFormFieldComponents>;
};

export interface AutoFormUIComponents {
  Form: React.ComponentType<React.ComponentProps<"form">>;
  FieldWrapper: React.ComponentType<FieldWrapperProps>;
  ErrorMessage: React.ComponentType<{ error: string }>;
  SubmitButton: React.ComponentType<{ children: ReactNode }>;
  ObjectWrapper: React.ComponentType<ObjectWrapperProps>;
  ArrayWrapper: React.ComponentType<ArrayWrapperProps>;
  ArrayElementWrapper: React.ComponentType<ArrayElementWrapperProps>;
}

export interface AutoFormFieldComponents {
  [key: string]: React.ComponentType<AutoFormFieldProps>;
}

export interface FieldWrapperProps {
  label: Renderable<ReactNode>;
  error?: Renderable<ReactNode>;
  children: ReactNode;
  id: string;
  field: ParsedField;
}

export interface ArrayWrapperProps {
  label: Renderable<ReactNode>;
  error?: Renderable<ReactNode>;
  children: ReactNode;
  inputProps: any;
  field: ParsedField;
  onAddItem: () => void;
}

export interface ArrayElementWrapperProps {
  children: ReactNode;
  onRemove: () => void;
  index: number;
}

export interface ObjectWrapperProps {
  label: Renderable<ReactNode>;
  children: ReactNode;
  field: ParsedField;
}

export interface AutoFormFieldProps {
  path: string[];
  id: string;
  error?: string;
  field: ParsedField;
  label: Renderable<ReactNode>;
  useField: FieldReturn;
  inputProps: any;
}

export interface AutoFormContextType {
  schema: ParsedSchema;
  uiComponents: AutoFormUIComponents;
  formComponents: AutoFormFieldComponents;
}

export type FieldConfig<
  FieldTypes = string,
  CustomData = Record<string, any>,
> = BaseFieldConfig<
  ReactNode,
  FieldTypes,
  React.ComponentType<FieldWrapperProps>,
  CustomData
>;

export type FieldReturn<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues,
> = (
  props?: Omit<
    UseControllerProps<TFieldValues, TName, TTransformedValues>,
    "name"
  >
) => {
  [key: string]: any;
  onChange: (...event: any[]) => void;
  onBlur: () => void;
  value: any;
  disabled?: boolean;
  name: TName;
  ref: (instance: any) => void;
};
