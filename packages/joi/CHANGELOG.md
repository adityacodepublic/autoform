# @acp-autoform/joi

## 3.0.0

### Major Changes

- 9b94fca: Add per-field structural wrapper overrides for object, array, and array item fields.

  `fieldConfig` now supports `objectWrapper`, `arrayWrapper`, and `arrayElementWrapper` in addition to `fieldWrapper`. The React renderer prefers field-level wrappers over global `uiComponents`, allowing individual object and array fields to customize their generated layout without replacing the value editor.

  The `FieldConfig` generic order now places `CustomData` before wrapper component generics so common custom metadata typing can use `fieldConfig<React.ReactNode, FieldTypes, CustomData>`.

## 2.0.1

### Patch Changes

- docs: updated documentation links and cleaned up README files

## 2.0.0

### Major Changes

- Rework dependency system

## 1.1.0

### Minor Changes

- Update

### Patch Changes

- Updated dependencies
  - @acp-autoform/core@2.2.0
