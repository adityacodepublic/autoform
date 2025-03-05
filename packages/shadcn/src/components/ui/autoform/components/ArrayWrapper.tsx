import React from "react";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { ArrayWrapperProps } from "@autoform/react";

export const ArrayWrapper: React.FC<ArrayWrapperProps> = ({
  label,
  field,
  children,
  onAddItem,
}) => {
  return (
    <div className="space-y-2">
      <h3 className="text-md font-medium">
        {label} {field.required && <span className="text-destructive"> * </span>}
      </h3>
      {children}
      <Button onClick={onAddItem} variant="outline" size="sm" type="button">
        <PlusIcon className="h-4 w-4" />
      </Button>
    </div>
  );
};
