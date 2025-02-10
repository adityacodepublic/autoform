import React from "react";
import { fieldConfig, ZodProvider } from "@autoform/zod";
import { AutoForm } from "@autoform/mui";
import HookTest from "components/Hook-test";
import { z } from "zod";

describe("React-Hook-Form useForm properties Tests", () => {
  const fieldSchema = z.object({
    name: z
      .string({ message: "required" })
      .min(2, "Name must be at least 2 characters"),
    age: z.coerce.number().min(18, "Must be at least 18 years old"),
    color: z.enum(["red", "green", "blue"]),
    birthdate: z.coerce.date(),
    isStudent: z.boolean(),
    test: z
      .string()
      .optional()
      .superRefine(
        fieldConfig({
          fieldType: "custom",
        })
      ),
  });
  const schemaProvider = new ZodProvider(fieldSchema);

  const TestForm = () => {
    return (
      <AutoForm
        schema={schemaProvider}
        onSubmit={cy.stub().as("onSubmit")}
        formComponents={{
          custom: HookTest,
        }}
        defaultValues={{
          name: undefined,
          age: undefined,
          color: undefined,
          birthdate: undefined,
          isStudent: false,
        }}
        withSubmit
      />
    );
  };

  it("checks useForm properties", () => {
    cy.mount(<TestForm />);

    // formState before changes.
    cy.get('button[name="dirtyFields"]')
      .click()
      .should("have.attr", "data-item", "false");
    cy.get('button[name="touchedFields"]')
      .click()
      .should("have.attr", "data-item", "false");
    cy.get('button[name="isValid"]')
      .click()
      .should("have.attr", "data-item", "false");
    cy.get('button[name="isSubmitSuccessful"]')
      .click()
      .should("have.attr", "data-item", "false");

    // type values
    cy.get('input[name="name"]').type("John Doe");
    cy.get('input[name="age"]').type("25");
    cy.get('input[name="isStudent"]').check();
    cy.get('input[name="birthdate"]').type("1990-01-01").click();
    cy.get(
      '.MuiSelect-select[aria-labelledby="mui-component-select-color"]'
    ).click();
    cy.get('.MuiMenuItem-root[data-value="green"]').click();

    // check formState
    cy.get('button[name="dirtyFields"]')
      .click()
      .should("have.attr", "data-item", "true");
    cy.get('button[name="touchedFields"]')
      .click()
      .should("have.attr", "data-item", "true");
    cy.get('button[name="isValid"]')
      .click()
      .should("have.attr", "data-item", "true");

    cy.get('button[type="submit"]').click();
    cy.get('button[name="isSubmitSuccessful"]')
      .click()
      .should("have.attr", "data-item", "true");

    // check watch
    cy.get('button[name="watch"]')
      .click()
      .should("have.attr", "data-item", "true");

    // check reset  // named as clear due to an error
    cy.get('button[name="clear"]')
      .click()
      .should("have.attr", "data-item", "true");

    // check trigger - wont work as Select & BooleanField are controlled


    // check setValue
    cy.get('button[name="setValue"]')
      .click()
      .should("have.attr", "data-item", "true");

    // check trigger - filled values
    cy.get('button[name="trigger"]')
      .click()
      .should("have.attr", "data-item", "false");
  });
});
