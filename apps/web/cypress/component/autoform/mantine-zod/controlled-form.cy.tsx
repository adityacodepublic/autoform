import React, { useState } from "react";
import { AutoForm } from "@autoform/mantine";
import { ZodProvider } from "@autoform/zod";
import { z } from "zod";
import { TestWrapper } from "./utils";
import { createForm } from "@autoform/react";

const ControlledForm = () => {
  const form = createForm();
  form.watch((data) => {
    setFormValues(data as typeof formValues);
  });
  const [formValues, setFormValues] = useState({
    name: "John Doe",
    email: "john@example.com",
  });

  const schema = z.object({
    name: z.string(),
    email: z.string().email(),
  });

  const schemaProvider = new ZodProvider(schema);

  return (
    <TestWrapper>
      <AutoForm
        schema={schemaProvider}
        onSubmit={cy.stub().as("onSubmit")}
        withSubmit
        values={formValues}
      />
    </TestWrapper>
  );
};

describe("AutoForm Controlled Form Tests (MANTINE-ZOD)", () => {
  it("renders with initial values", () => {
    cy.mount(<ControlledForm />);

    cy.get('input[name="name"]').should("have.value", "John Doe");
    cy.get('input[name="email"]').should("have.value", "john@example.com");
  });

  it("updates controlled values on input", () => {
    cy.mount(<ControlledForm />);

    cy.get('input[name="name"]').clear().type("Doe Jane");
    cy.get('input[name="name"]').should("have.value", "Doe Jane");

    cy.get('input[name="email"]').clear().type("doe@example.com");
    cy.get('input[name="email"]').should("have.value", "doe@example.com");
  });
});
