import React from "react";
import { AutoForm } from "@autoform/shadcn/components/ui/autoform/AutoForm";
import { ZodProvider, fieldConfig } from "@autoform/zod";
import { z } from "zod";
import { TestWrapper } from "./utils";

describe("AutoForm Basic Tests", () => {
  const basicSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    age: z.coerce.number().min(18, "Must be at least 18 years old"),
    email: z.string().email("Invalid email address"),
    website: z.string().url("Invalid URL").optional(),
    color: z.enum(["red", "green", "blue"]),
    birthdate: z.coerce.date(),
    isStudent: z.boolean(),
  });

  const schemaProvider = new ZodProvider(basicSchema);

  it("renders all field types correctly", () => {
    cy.mount(
      <TestWrapper>
        <AutoForm
          schema={schemaProvider}
          onSubmit={cy.stub().as("onSubmit")}
          withSubmit
        />
      </TestWrapper>
    );

    cy.get('input[name="name"]').should("exist");
    cy.get('input[name="age"]').should("have.attr", "type", "number");
    cy.get('input[name="email"]').should("exist");
    cy.get('input[name="website"]').should("exist");
    cy.get('button[name="color"]').should("exist");
    cy.get('input[name="birthdate"]').should("exist");
    cy.get("button#isStudent").should("exist");
  });

  it("submits form with correct data types", () => {
    const onSubmit = cy.stub().as("onSubmit");
    cy.mount(
      <TestWrapper>
        <AutoForm schema={schemaProvider} onSubmit={onSubmit} withSubmit />
      </TestWrapper>
    );

    cy.get('input[name="name"]').type("John Doe");
    cy.get('input[name="age"]').type("25");
    cy.get('input[name="email"]').type("john@example.com");
    cy.get('input[name="website"]').type("https://example.com");
    cy.get('button[name="color"]').should("exist").click();
    cy.get('div[data-radix-collection-item][role="option"]').should('be.visible').contains('green').click();
    cy.get('input[name="birthdate"]').type("1990-01-01");
    cy.get("button#isStudent").click();

    cy.get('button[type="submit"]').click();

    cy.get("@onSubmit").should("have.been.calledOnce");
    cy.get("@onSubmit").should("have.been.calledWith", {
      name: "John Doe",
      age: 25,
      email: "john@example.com",
      website: "https://example.com",
      color:"green",
      birthdate: new Date("1990-01-01"),
      isStudent: true,
    });
  });

  it("renders fields with default values", () => {
    cy.mount(
      <AutoForm
        schema={schemaProvider}
        onSubmit={cy.stub().as("onSubmit")}
        defaultValues={{
          name: "John Doe",
          age: 25,
          email: "john@example.com",
          website: "https://example.com",
          color: "green",
          birthdate: "1990-01-01" as unknown as Date, 
          isStudent: true,
        }}
        withSubmit
      />
    );

    cy.get('button[type="submit"]').click();

    cy.get("@onSubmit").should("have.been.calledWith", {
      name: "John Doe",
      age: 25,
      email: "john@example.com",
      website: "https://example.com",
      color: "green",
      birthdate: new Date("1990-01-01"),
      isStudent: true,
    });
  });
});


