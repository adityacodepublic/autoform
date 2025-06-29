import { SchemaProvider } from "./schema-provider";
import { ParsedField, ParsedSchema } from "./types";

export function parseSchema(schemaProvider: SchemaProvider): ParsedSchema {
  const schema = schemaProvider.parseSchema();
  return {
    ...schema,
    fields: sortFieldsByOrder(schema.fields),
  };
}

export function validateSchema(schemaProvider: SchemaProvider, values: any) {
  return schemaProvider.validateSchema(values);
}

export function getDefaultValues(
  schemaProvider: SchemaProvider
): Record<string, any> {
  return schemaProvider.getDefaultValues();
}

// Recursively remove empty values from an object (null, undefined, "", [], {})
export function removeEmptyValues<T extends Record<string, any>>(
  values: T
): Partial<T> {
  const result: Partial<T> = {};
  for (const key in values) {
    const value = values[key];
    if ([null, undefined, "", [], {}].includes(value)) {
      continue;
    }

    if (Array.isArray(value)) {
      const newArray = value.map((item: any) => {
        if (typeof item === "object") {
          return removeEmptyValues(item);
        }
        return item;
      });
      result[key] = newArray.filter((item: any) => item !== null);
    } else if (typeof value === "object") {
      result[key] = removeEmptyValues(value) as any;
    } else {
      result[key] = value;
    }
  }

  return result;
}

/**
 * Recursively replaces empty values from an object (null, undefined, "", [], {}).
 * - Retains objects such as (Date, RegExp, functions, etc.) used in resolver.
 */
const isPlainObject = (value: any): boolean =>
  typeof value === "object" &&
  Object.prototype.toString.call(value) === "[object Object]";

const isEmpty = (value: any): boolean => [null, undefined, ""].includes(value); // includes method cannot check {}, []

export function replaceEmptyValue<T extends Record<string, any>>(values: T): T {
  const result = { ...values };
  for (const key in values) {
    const value = values[key];

    if (isEmpty(value)) {
      (result[key] as any) = undefined;
      continue;
    }

    if (Array.isArray(value)) {
      const cleaned = Object.values(replaceEmptyValue({ ...value }));
      result[key] = cleaned as any;
    } else if (isPlainObject(value)) {
      const cleaned = replaceEmptyValue(value);
      result[key] = cleaned as any;
    } else {
      result[key] = value;
    }
  }

  return result;
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
 * Sort the fields by order.
 * If no order is set, the field will be sorted based on the order in the schema.
 */
export function sortFieldsByOrder(
  fields: ParsedField[] | undefined
): ParsedField[] {
  if (!fields) return [];
  const sortedFields = fields
    .map((field): ParsedField => {
      if (field.schema) {
        return {
          ...field,
          schema: sortFieldsByOrder(field.schema),
        };
      }
      return field;
    })
    .sort((a, b) => {
      const fieldA: number = a.fieldConfig?.order ?? 0;
      const fieldB = b.fieldConfig?.order ?? 0;
      return fieldA - fieldB;
    });

  return sortedFields;
}
