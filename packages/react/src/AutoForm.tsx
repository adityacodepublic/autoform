import { FormEventHandler, useCallback, useEffect } from "react";
import {
  useForm,
  FormProvider,
  Resolver,
  DefaultValues,
  ResolverResult,
  ResolverOptions,
  SubmitErrorHandler,
} from "react-hook-form";
import {
  parseSchema,
  getDefaultValues,
  focusError,
  replaceEmptyValue,
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

  const resolver: Resolver<T> = useCallback(
    async (
      values: T,
      ctx: any,
      options: ResolverOptions<T>
    ): Promise<ResolverResult<T>> => {
      const cleanedValues = replaceEmptyValue(values);

      //const validation = schema.validateSchema(cleanedValues as T);
      console.log("resolver input", { values, cleanedValues });
      console.log(
        "resolver result",
        await schema.resolver(cleanedValues, ctx, options)
      );

      return schema.resolver(cleanedValues, ctx, options);
    },
    [schema]
  );

  const methods = useForm<T>({
    defaultValues: {
      ...(getDefaultValues(schema) as Partial<T>),
      ...defaultValues,
    } as DefaultValues<T>,
    values: values as T,
    shouldFocusError: false,
    reValidateMode: "onSubmit",
    resolver,
  });

  useEffect(() => {
    if (onFormInit) {
      onFormInit(methods);
    }
  }, [onFormInit, methods]);

  const onError: SubmitErrorHandler<T> = (errors) => {
    console.log("errors -->", errors);
    console.log("errors2", focusError(errors));
  };

  const handleSubmit = async (data: T) => {
    await onSubmit(data, methods);
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
          onSubmit={methods.handleSubmit(handleSubmit, onError)}
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
