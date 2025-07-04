import React from "react";
import AddIcon from "@mui/icons-material/Add";
import { Button, Box, Typography, FormHelperText } from "@mui/material";
import { ArrayWrapperProps } from "@autoform/react";

export const ArrayWrapper: React.FC<ArrayWrapperProps> = ({
  label,
  field,
  children,
  onAddItem,
  inputProps,
}) => {
  const { key, onChange, onBlur, ref, ...props } = inputProps;

  return (
    <Box sx={{ mt: 2, ml: 1 }}>
      <Typography
        variant="subtitle1"
        ref={ref}
        tabIndex={-1}
        aria-describedby={`${key}-error ${key}-description`}
        style={{ color: "rgba(0, 0, 0, 0.6)" }}
      >
        {label}
        {field.required && <span style={{ opacity: 0.8 }}> * </span>}
      </Typography>
      {field.fieldConfig?.description && (
        <FormHelperText variant="standard" id={key + "-description"}>
          {field.fieldConfig.description}
        </FormHelperText>
      )}
      {props.error && (
        <FormHelperText variant="standard" id={key + "-error"}>
          {props.error}
        </FormHelperText>
      )}
      {children}
      <Button
        {...props}
        sx={{ my: 1 }}
        variant="outlined"
        onClick={onAddItem}
        aria-label={`add ${label}`}
      >
        <AddIcon />
      </Button>
    </Box>
  );
};
