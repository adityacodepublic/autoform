import type {
  FieldPath,
  FieldValues,
  UseFormRegister,
  UseControllerProps,
} from "react-hook-form";
import { useController, useFormContext } from "react-hook-form";

/**
 * This custom hook shares the same props and methods as register
 */
export function useRegister<TFieldValues extends FieldValues = FieldValues>(
  ...props: Parameters<UseFormRegister<TFieldValues>>
) {
  const { register } = useFormContext<TFieldValues>();
  return register(...props);
}

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

/**
 * Factory function that creates a hook for accessing form methods of a specific field.
 *
 * This enables deferred hook execution,
 * The returned hook will use `useController` (as controlled input)
 *
 * @param name - The name of the form field.
 *
 * @returns A hook function that takes same props as `useController`:
 *
 * @example
 * ```ts
 * const useField = createMethod('username');
 * const method = useField({ controlled: true, ...props });
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
