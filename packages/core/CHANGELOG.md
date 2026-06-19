# @acp-autoform/core

## 4.0.0

### Major Changes

- 9b94fca: Add per-field structural wrapper overrides for object, array, and array item fields.

  `fieldConfig` now supports `objectWrapper`, `arrayWrapper`, and `arrayElementWrapper` in addition to `fieldWrapper`. The React renderer prefers field-level wrappers over global `uiComponents`, allowing individual object and array fields to customize their generated layout without replacing the value editor.

  The `FieldConfig` generic order now places `CustomData` before wrapper component generics so common custom metadata typing can use `fieldConfig<React.ReactNode, FieldTypes, CustomData>`.

## 3.1.1

### Patch Changes

- docs: updated documentation links and cleaned up README files

## 3.1.0

### Minor Changes

- Apply recent updates and registry migrations since namespace transition.

## 3.0.0

### Major Changes

- Rework dependency system

## 2.2.0

### Minor Changes

- Update

## 2.1.0

### Minor Changes

- Improve types

## 2.0.0

### Major Changes

- v2

## 1.2.0

### Minor Changes

- Improve DX

## 1.1.3

### Patch Changes

- Add yup support

## 1.1.2

### Patch Changes

- Clean build package

## 1.1.1

### Patch Changes

- Fix build

## 1.1.0

### Minor Changes

- Initial release
