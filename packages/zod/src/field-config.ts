import { FieldConfig } from "@autoform/core";
import { ZOD_FIELD_CONFIG_SYMBOL } from "./utils";

export function fieldConfig<
  AdditionalRenderable = null,
  FieldTypes = string,
  FieldWrapper = any,
  CustomData = Record<string, any>,
>(
  config: FieldConfig<
    AdditionalRenderable,
    FieldTypes,
    FieldWrapper,
    CustomData
  >
) {
  const refinementFunction = () => {};

  refinementFunction[ZOD_FIELD_CONFIG_SYMBOL] = config;

  return refinementFunction;
}
