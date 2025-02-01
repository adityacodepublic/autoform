import { AutoForm } from "@autoform/shadcn/components/ui/autoform/AutoForm";
import { AutoFormFieldProps } from "@autoform/react";
import { zodSchemaProvider } from "./utils";
import "@autoform/shadcn/globals.css";

function Basics() {
  return (
    <AutoForm
      schema={zodSchemaProvider}
      onSubmit={(data) => {
        console.log(JSON.stringify(data, null, 2));
      }}
      onFormInit={(form) => {
        console.log("Form initialized", form);
      }}
      withSubmit
      formComponents={{
        custom: ({ field, label, inputProps }: AutoFormFieldProps) => {
          return (
            <div>
              <input
                type="text"
                className="bg-red-400 rounded-lg p-4"
                {...inputProps}
              />
            </div>
          );
        },
      }}
    />
  );
}

export default Basics;
