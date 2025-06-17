import {
  fieldConfig,
  FieldWrapperProps,
  buildZodFieldConfig,
} from "@autoform/react";
import { ZodProvider } from "@autoform/zod";
import { YupProvider, fieldConfig as yupFieldConfig } from "@autoform/yup";
import * as z from "zod";
import { object, string, number, date, InferType, array, mixed } from "yup";

const customFieldConfig = buildZodFieldConfig<
  string,
  {
    isImportant?: boolean;
  }
>();

enum Sports {
  Football = "Football/Soccer",
  Basketball = "Basketball",
  Baseball = "Baseball",
  Hockey = "Hockey (Ice)",
  None = "I don't like sports",
}

const zodFormSchema = z.object({
  // hobbies: z
  //   .string()
  //   .optional()
  //   .superRefine(
  //     customFieldConfig({
  //       description: "This uses a custom field component",
  //       order: 1,
  //       fieldType: "custom",
  //       customData: {
  //         // You can define custom data here
  //         isImportant: true,
  //       },
  //     })
  //   ),
  username: z
    .string({
      required_error: "Username is required.",
    })
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .superRefine(
      fieldConfig({
        description: "You cannot change this later.",
      })
    ),
  password: z
    .string({
      required_error: "Password is required.",
    })
    .describe("Your secure password")
    .min(8, {
      message: "Password must be at least 8 characters.",
    })
    .superRefine(
      fieldConfig({
        description: (
          <>
            Always use a <b>secure password</b>!
          </>
        ),
        inputProps: {
          type: "password",
        },
      })
    ),
  favouriteNumber: z.coerce
    .number({
      invalid_type_error: "Favourite number must be a number.",
    })
    .min(1, {
      message: "Favourite number must be at least 1.",
    })
    .max(10, {
      message: "Favourite number must be at most 10.",
    })
    .default(1)
    .optional(),
  acceptTerms: z
    .boolean()
    .describe("Accept terms and conditions.")
    .refine((value) => value, {
      message: "You must accept the terms and conditions.",
    }),
  sendMeMails: z
    .boolean()
    .optional()
    .superRefine(
      fieldConfig({
        fieldWrapper: (props: FieldWrapperProps) => {
          return (
            <>
              {props.children}
              <p className="text-muted-foreground text-sm">
                Don't worry, we only send important emails!
              </p>
            </>
          );
        },
      })
    ),
  birthday: z.coerce.date({ message: "aaa" }).optional(),
  color: z.enum(["red", "green", "blue"]).optional(),
  // Another enum example
  marshmallows: z
    .enum(["not many", "a few", "a lot", "too many"])
    .describe("How many marshmallows fit in your mouth?"),
  // Native enum example
  sports: z.nativeEnum(Sports).describe("What is your favourite sport?"),
  guests: z.array(
    z.object({
      name: z.string(),
      age: z.coerce.number().optional(),
      location: z.object({
        city: z.string(),
        country: z.string().optional(),
        test: z.object({
          name: z.string(),
          age: z.coerce.number(),
          test: z.object({
            name: z.string(),
            age: z.coerce.number(),
            test: z.object({
              name: z.string(),
              age: z.coerce.number(),
              test: z.object({
                name: z.string(),
                age: z.coerce.number(),
              }),
            }),
          }),
        }),
      }),
    })
  ),
  // location: z.object({
  //   city: z.string(),
  //   country: z.string().optional(),
  //   test: z.object({
  //     name: z.string(),
  //     age: z.coerce.number(),
  //     test: z.object({
  //       name: z.string(),
  //       age: z.coerce.number(),
  //       test: z.object({
  //         name: z.string(),
  //         age: z.coerce.number(),
  //         test: z.object({
  //           name: z.string(),
  //           age: z.coerce.number(),
  //         }),
  //       }),
  //     }),
  //   }),
  // }),
  // obj
});

// testing
// req       --in> req
// req       --in> optional
// optional  --in> req
// optional  --in> optional
const objectTest = z.object({
  req_optional: z.object({
    age: z.string().min(2).optional(),
  }), // req out optional inside

  req_req: z.object({
    age: z.string().min(2),
  }), // req out req inside

  optional_req: z
    .object({
      age: z.string().min(2),
    })
    .optional(), // optional out req inside

  optional_optional: z
    .object({
      age: z.string().min(2).optional(),
    })
    .optional(), // optional out optional inside
});

// to make array required > use .nonempty() , else empty array passes validation.
// to make array optional > use .optional() , to remove * required mark from field.
const arrayTest = z.object({
  req_optional: z.array(z.coerce.date().optional()).nonempty(), // req out optional inside

  req_req: z.array(z.string().min(2)).nonempty(), // req out req inside

  optional_req: z.array(z.string().min(2)).optional(), // optional out req inside

  optional_optional: z.array(z.string().min(2).optional()).optional(), // optional out optional inside
});

const objTest = z.object({
  req_opt: z.object({
    names: z.string().min(2).optional(),
    age: z.coerce.number().optional(),
  }),
  opt_req: z
    .object({
      names: z.string(),
      age: z.coerce.number(),
    })
    .optional(),
});

// make array req .nonempty() and optional
const arrobj = z.object({
  array: z
    .array(
      z.object({
        id: z.string().optional(),
        age: z.coerce.number(),
        athleteSchema: z.tuple([
          z.string(), // name
          z.number(), // jersey number
          z.object({
            pointsScored: z.number(),
          }), // statistics
        ]),
        attributes: z.array(
          z.object({
            type: z.string(),
            config: z.object({
              enabled: z.boolean(),
              notes: z.string().optional(),
            }),
          })
        ),
      })
    )
    .nonempty(),
  object: z.object({
    items: z.array(
      z.object({
        name: z.string(),
        details: z.array(
          z.object({
            description: z.string().optional(),
            metadata: z.object({
              key: z.string(),
              value: z.string().optional(),
            }),
          })
        ),
      })
    ),
  }),
  all: z.object({
    req_opt: z.object({
      names: z.string().min(2).optional(),
      age: z.coerce.number().optional(),
    }),
    opt_req: z
      .object({
        names: z.string(),
        age: z.coerce.number(),
      })
      .optional(),
  }),
});

export const zodSchemaProvider = new ZodProvider(objTest);

const yupFormSchema = object({
  name: string().required().label("Your Name").default("John Doe"),
  age: number()
    .required("We need your age to verify you are able to receive discounts.")
    .positive()
    .integer(),
  password: string().transform(
    yupFieldConfig({
      inputProps: {
        type: "password",
      },
    })
  ),
  email: string()
    .email()
    .transform((val) => val),
  website: string().url().nullable(),
  // createdOn: date().default(() => new Date()),
  guests: array()
    .of(
      object({
        name: string().required(),
      })
    )
    .min(1, "At least one guest is required"),
  abc: date().optional(),
  sport: mixed().oneOf(Object.values(Sports)),
  hobbies: array().of(string()),
});

export const yupSchemaProvider = new YupProvider(yupFormSchema);
