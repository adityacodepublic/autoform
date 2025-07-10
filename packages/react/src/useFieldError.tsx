import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { getPathInObject } from "./utils";

export const useFieldError = (path: string[]) => {
  const { subscribe } = useFormContext();
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    const callback = subscribe({
      formState: {
        errors: true,
      },
      callback: ({ errors }) => {
        const newError = getPathInObject(errors, path)?.message as
          | string
          | undefined;
        setError((prev) => (prev !== newError ? newError : prev));
      },
    });

    return () => callback();
  }, [subscribe]);

  return error;
};
