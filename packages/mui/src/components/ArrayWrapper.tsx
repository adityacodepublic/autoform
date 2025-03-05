import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import { ArrayWrapperProps } from "@autoform/react";

export const ArrayWrapper: React.FC<ArrayWrapperProps> = ({
  label,
  field,
  error,
  children,
  onAddItem,
}) => {
  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h6">
        {label}
        {field.required && (
          <span style={{ color: "red", opacity: 0.8 }}> * </span>
        )}
      </Typography>
      {children}
      <Button onClick={onAddItem} variant="outlined" sx={{ mt: 1 }}>
        <AddIcon />
      </Button>
    </Box>
  );
};
