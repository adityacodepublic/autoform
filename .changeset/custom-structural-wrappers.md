---
"@acp-autoform/core": major
"@acp-autoform/react": major
"@acp-autoform/zod": major
"@acp-autoform/yup": major
"@acp-autoform/joi": major
---

Add per-field structural wrapper overrides for object, array, and array item fields.

`fieldConfig` now supports `objectWrapper`, `arrayWrapper`, and `arrayElementWrapper` in addition to `fieldWrapper`. The React renderer prefers field-level wrappers over global `uiComponents`, allowing individual object and array fields to customize their generated layout without replacing the value editor.

The `FieldConfig` generic order now places `CustomData` before wrapper component generics so common custom metadata typing can use `fieldConfig<React.ReactNode, FieldTypes, CustomData>`.
