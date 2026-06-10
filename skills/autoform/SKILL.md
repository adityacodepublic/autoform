---
name: autoform
description: How to use the @acp-autoform/* packages to automatically generate React forms from Zod, Yup, or Joi schemas with any UI library (shadcn/ui, MUI, Mantine, Ant Design, Chakra UI). Use this skill whenever the user wants to create a form from a schema, build forms with custom field components, set up fieldConfig for label/description/inputProps/fieldType, create multi-step forms, nest AutoForm instances, customize AutoForm UI components or field wrappers. Trigger this skill even when the user just mentions "autoform", "auto form", "auto-form", "acp-autoform", "schema-driven form", or "generate form from schema".
---

# @acp-autoform — Schema-Driven Form Generation

AutoForm automatically renders React forms from your existing Zod, Yup, or Joi schema. You pick the UI library, you pick the schema library, and AutoForm wires them together — no manual field binding.

## Architecture (read this first)

AutoForm is a **four-layer** system. Understanding the layers prevents import errors:

```
@acp-autoform/core          ← types & utilities (you rarely import from here)
    ↓
@acp-autoform/zod|yup|joi   ← schema provider (parse + validate + fieldConfig)
    ↓
@acp-autoform/react          ← base <AutoForm> component + React types
    ↓
@acp-autoform/mui|mantine|ant|chakra  ← UI-library wrapper (pre-wired components)
        OR
shadcn registry (copy-paste components via CLI)
```

**Key rule**: Import `AutoForm` from the **UI package** (e.g. `@acp-autoform/mui`) or from `components/ui/autoform` in case of `shadcn`, import `fieldConfig` and `SchemaProvider` from the **schema package** (e.g. `@acp-autoform/zod`). Import types like `AutoFormFieldProps` from `@acp-autoform/react`.

---

## Quick Start (minimal working form)

### 1. Install dependencies

Every project needs these peer dependencies first:

```bash
npm install react-hook-form @hookform/resolvers
```

Then install one **UI package** and one **schema package**. See the installation section below for your specific combination.

## Installation by UI Library

Read `references/installation.md` for the full installation matrix. The summary:

### shadcn/ui (registry-based, no npm package)

(Make sure you have shadcn and and tailwind initialised in your project, see `references\shadcn-tailwind-installation` for shadcn installation from scratch.)

```bash
npx shadcn@latest add https://raw.githubusercontent.com/adityacodepublic/autoform/refs/heads/acp-package/packages/shadcn/registry/autoform.json
npm install react-hook-form @hookform/resolvers
```

Then install a schema provider:

```bash
npm install @acp-autoform/zod   # or @acp-autoform/yup or @acp-autoform/joi
```

Import from local components:

```tsx
import { AutoForm } from "@/components/ui/autoform";
```

### npm-based UI packages (MUI, Mantine, Ant, Chakra)

```bash
# MUI
npm install @acp-autoform/mui @mui/material@^6 @emotion/react@^11 @emotion/styled@^11

# Mantine
npm install @acp-autoform/mantine @mantine/core@^7 @mantine/dates@^7

# Ant Design
npm install @acp-autoform/ant antd@^5

# Chakra UI
npm install @acp-autoform/chakra @chakra-ui/react@^3.8 @emotion/react@^11.14
```

---

### 2. Create schema + render form

```tsx
"use client"; // required in Next.js App Router
import * as z from "zod";
import { ZodProvider } from "@acp-autoform/zod";
import { AutoForm } from "@acp-autoform/mui"; // or your UI package

const schema = z.object({
  name: z.string(),
  age: z.coerce.number(), // use coerce for numbers
  birthday: z.date(), // use coerce for dates
  email: z.string().email(),
});
const schemaProvider = new ZodProvider(schema);

export default function MyForm() {
  return (
    <AutoForm
      schema={schemaProvider}
      onSubmit={(data) => console.log(data)}
      withSubmit
    />
  );
}
```

> **Next.js / RSC**: AutoForm must be in a `"use client"` component due to schema serialization.

## AutoForm Props Reference

| Prop             | Type                          | Description                                                               |
| ---------------- | ----------------------------- | ------------------------------------------------------------------------- |
| `schema`         | `SchemaProvider`              | **Required.** A provider instance (ZodProvider, YupProvider, JoiProvider) |
| `onSubmit`       | `(data, form, event) => void` | Called with validated data on successful submission                       |
| `withSubmit`     | `boolean`                     | Adds a default submit button                                              |
| `defaultValues`  | `object`                      | Initial form values (user can clear them)                                 |
| `values`         | `object`                      | Controlled values — form reacts to external state changes                 |
| `formControl`    | `FormControl`                 | External form control from `createFormControl()`                          |
| `onFormInit`     | `(form) => void`              | **Deprecated.** Use `formControl` instead                                 |
| `formComponents` | `Record<string, Component>`   | Map field types to custom input components                                |
| `uiComponents`   | `object`                      | Override structural UI pieces (FieldWrapper, Form, etc.)                  |
| `formProps`      | `object`                      | Extra props for the `<form>` element                                      |
| `children`       | `ReactNode`                   | Rendered below the form fields                                            |

---

## Schema Providers — How to Define Your Schema

Each schema library has its own provider class and its own `fieldConfig` attachment method. Read `references/schema-providers.md` for full details. Summary:

| Library                 | Provider                  | fieldConfig attachment             | Requires              |
| ----------------------- | ------------------------- | ---------------------------------- | --------------------- |
| **Zod v4**,**Zod Mini** | `new ZodProvider(schema)` | `.check(fieldConfig({...}))`       | `zod ^3.25.0 \|\| ^4` |
| **Zod v3**              | `new ZodProvider(schema)` | `.superRefine(fieldConfig({...}))` | `zod ^3.25.0`         |
| **Yup**                 | `new YupProvider(schema)` | `.transform(fieldConfig({...}))`   | `yup`                 |
| **Joi**                 | `new JoiProvider(schema)` | `.meta(fieldConfig({...}))`        | `joi`                 |

### Critical schema rules

- **Numbers**: Always use `z.coerce.number()` (Zod), not `z.number()` — HTML inputs return strings.
- **Dates**: Always use `z.date()` (Zod).
- **Enums/Select**: Use `z.enum([...])` or `z.nativeEnum(...)` for Zod, `mixed().oneOf(...)` for Yup, `Joi.any().valid(...)` for Joi.
- **Arrays**: Supported as fields (array cannot be a root schema).
- **Optional**: Use `.optional()` for (Zod). Skip `.required()` for (Yup/Joi).
- **Default**: `.default(value)` is a validation fallback. For pre-filled values the user can clear, use the `defaultValues` prop instead.

---

## fieldConfig — Customizing Fields

`fieldConfig` is how you customize labels, descriptions, input props, and field types **inside the schema**. Import it from your schema package.

```tsx
import { fieldConfig } from "@acp-autoform/zod";
import { FieldTypes } from "@acp-autoform/mui"; // or your UI package

const schema = z.object({
  username: z
    .string({
      error: "Username is required.",
    })
    // You can use zod's built-in validation as normal
    .min(2, {
      message: "Username must be at least 2 characters.",
    }),
  password: z
    .string({
      error: "Password is required.",
    })
    // Use the "describe" method to set the label
    // If no label is set, the field name will be used
    // and un-camel-cased
    .describe("Your secure password")
    .check(
      fieldConfig({
        description: "Use a strong password.",
        inputProps: { type: "password", placeholder: "••••••••" },
      }),
    ),
  bio: z.string().check(
    fieldConfig<React.ReactNode, FieldTypes>({
      fieldType: "textarea", // route to a different custom created form component
    }),
  ),
  priority: z.string().check(
    fieldConfig({
      order: -1, // negative = show first
    }),
  ),
  color: z.enum(["red", "green", "blue"]),
  // You can use sub-objects that will be rendered with their own title
  guestDetails: z.object({
    name: z.string(),
    age: z.coerce.number(),
  }),
});
```

### Available fieldConfig options

| Option         | Type        | Purpose                                        |
| -------------- | ----------- | ---------------------------------------------- |
| `label`        | `string`    | Override the auto-generated label              |
| `description`  | `ReactNode` | Helper text below the field                    |
| `inputProps`   | `object`    | Props spread onto the input element            |
| `fieldType`    | `string`    | Route to a custom `formComponents` entry       |
| `order`        | `number`    | Display order (lower = earlier, default 0)     |
| `fieldWrapper` | `Component` | Per-field wrapper override                     |
| `customData`   | `object`    | Arbitrary data accessible in custom components |

---

## Custom Field Components

Register custom inputs via `formComponents` and route fields to them with `fieldConfig({ fieldType: "..." })`.

```tsx
// 1. Create the component — use useController hook from react-hook-form for RHF binding
import { useController } from "react-hook-form";
import { AutoFormFieldProps } from "@acp-autoform/react";

function SliderField({ id, inputProps }: AutoFormFieldProps) {
  const { field } = useController({ name: id });
  return (
    <input id={id} type="range" min={0} max={100} {...inputProps} {...field} />
  );
}

// 2. Register it on AutoForm
<AutoForm schema={schemaProvider} formComponents={{ slider: SliderField }} />;

// 3. Route a schema field to it
const schema = z.object({
  volume: z.coerce.number().check(
    fieldConfig<React.ReactNode, FieldTypes | "slider">({
      fieldType: "slider",
    }),
  ),
});
```

**Important**: Form components should NOT render labels or errors — `FieldWrapper` handles those. Only render the actual input control.

---

## Overriding UI Components

The full set of overridable UI components:

- `Form` — the `<form>` element
- `FieldWrapper` — wraps each field with label + error
- `ErrorMessage` — renders validation errors
- `SubmitButton` — the submit button
- `ObjectWrapper` — wraps sub-object field groups
- `ArrayWrapper` — wraps array fields with add-item button
- `ArrayElementWrapper` — wraps each array item with remove button

Override structural components globally via `uiComponents`,
FieldWrapper can be overridden per field via `fieldConfig({ fieldWrapper: ... })`.

```tsx
<AutoForm
  uiComponents={{
    FieldWrapper: CustomFieldWrapper,
    ErrorMessage: ({ error }) => <span className="text-red-500">{error}</span>,
    SubmitButton: ({ children }) => <button className="btn">{children}</button>,
  }}
/>
```

---

## Form Control — Accessing Form State

Read `references/form-control.md` for detailed patterns. Summary:

### Inside AutoForm (children)

```tsx
import { useFormContext } from "react-hook-form";

function CustomSubmitButton() {
  const {
    watch,
    setValue,
    reset,
    formState: { isValid },
  } = useFormContext();
  return (
    <button type="submit" disabled={!isValid}>
      Submit
    </button>
  );
}

<AutoForm schema={sp}>
  <CustomSubmitButton />
</AutoForm>;
```

### Outside AutoForm (external control)

```tsx
import { createFormControl } from "react-hook-form"; // requires RHF >= 7.55.0

const { formControl, handleSubmit, reset } = React.useMemo(
  () => createFormControl(), []
);

<AutoForm formControl={formControl} schema={sp} />
<button onClick={handleSubmit((data) => console.log(data))}>Submit</button>
<button onClick={() => reset()}>Reset</button>
```

---

## shadcn/ui Integration — Detailed Guide

Read `references/shadcn.md` for the complete shadcn-specific guide including:

- Registry CLI installation
- Available example blocks (with installation via `npx shadcn@latest add <url>`)
- How the shadcn AutoForm wraps `@acp-autoform/react`
- Customizing the shadcn field components

### Quick shadcn registry commands

```bash
# Install base AutoForm component
npx shadcn@latest add https://raw.githubusercontent.com/adityacodepublic/autoform/refs/heads/acp-package/packages/shadcn/registry/autoform.json

# Install example blocks
npx shadcn@latest add https://raw.githubusercontent.com/adityacodepublic/autoform/refs/heads/acp-package/packages/shadcn/registry/realtime-validation-demo.json
npx shadcn@latest add https://raw.githubusercontent.com/adityacodepublic/autoform/refs/heads/acp-package/packages/shadcn/registry/dialog-submit-demo.json
npx shadcn@latest add https://raw.githubusercontent.com/adityacodepublic/autoform/refs/heads/acp-package/packages/shadcn/registry/custom-fields-demo.json
npx shadcn@latest add https://raw.githubusercontent.com/adityacodepublic/autoform/refs/heads/acp-package/packages/shadcn/registry/ecommerce-checkout-demo.json
npx shadcn@latest add https://raw.githubusercontent.com/adityacodepublic/autoform/refs/heads/acp-package/packages/shadcn/registry/multistep-form-demo.json
npx shadcn@latest add https://raw.githubusercontent.com/adityacodepublic/autoform/refs/heads/acp-package/packages/shadcn/registry/nested-autoform-demo.json
npx shadcn@latest add https://raw.githubusercontent.com/adityacodepublic/autoform/refs/heads/acp-package/packages/shadcn/registry/interactive-schema-demo.json
```

---

## Common Patterns

### Multi-step form

Use a separate schema per step, validate with `trigger()`, collect values with `getValues()`.

### Nested AutoForm

Create a custom field component that renders a second `<AutoForm>`. On inner submit, pass the value back via `onChange`.

### Real-time validation

Pass `createFormControl({ mode: "all" })` and check `isValid` from `useFormContext`.

### External submit/reset (e.g. Dialog buttons)

Either use `useFormContext` inside AutoForm children, or `createFormControl` outside.

### Dependent/conditional fields

Use `useWatch` + `useFormContext` inside custom field components or wrappers. Use `superRefine` for cross-field validation.

---

## Common Mistakes to Avoid

1. **Importing `AutoForm` from `@acp-autoform/react`** directly - use the UI-specific package instead or from `components/ui/autoform` in case of shadcn.
2. **Missing peer deps** — always install `react-hook-form` and `@hookform/resolvers`.
3. **Not wrapping with `"use client"`** in Next.js App Router.
4. **Rendering label/error in custom form components** — `FieldWrapper` already handles this.
5. **Using `.superRefine(fieldConfig(...))` with Zod v4** — use `.check(fieldConfig(...))` instead.
6. **Arrays as root schema** — arrays must be fields inside an object schema.
7. **Forgetting Zod version ≥ 3.25.0** for `@acp-autoform/zod`.

---

## Reference Files

For deeper details, read these reference files in the `references/` directory:

- `references/installation.md` — Full installation matrix for every UI + schema combination
- `references/schema-providers.md` — Complete Zod, Yup, and Joi schema configuration (labels, enums, arrays, sub-objects, fieldConfig)
- `references/shadcn.md` — shadcn/ui registry integration, CLI commands, component anatomy, and all available example blocks
- `references/form-control.md` — All patterns for accessing form data (onSubmit, useFormContext, createFormControl)
- `references/custom-integration.md` — Building a custom UI integration from scratch
- `references/customization.md` — fieldConfig, custom fields, UI component overrides, form element customization
