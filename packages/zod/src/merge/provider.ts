import { ZodObjectOrWrapped } from "../v3";
import { isZodV4Schema, AnyZodObject } from "../utils";
import { ZodProvider as V3Provider } from "../v3/provider";
import { ZodProvider as V4Provider } from "../v4/provider";
import {
  SchemaProvider,
  ParsedSchema,
  SchemaValidation,
  Resolver,
} from "@autoform/core";
import { zodResolver } from "@hookform/resolvers/zod";

export class ZodProvider<T extends AnyZodObject>
  implements SchemaProvider<any>
{
  private Provider: SchemaProvider;
  private Resolver: Resolver;
  /**
   * Provider to use Zod schemas for AutoForm
   *
   * @param schema - Zod schema to use for validation
   */
  constructor(schema: T) {
    if (!schema) {
      throw new Error("ZodProvider: schema is required");
    }

    if (isZodV4Schema(schema)) {
      this.Provider = new V4Provider(schema);
      this.Resolver = zodResolver(schema);
    } else {
      this.Provider = new V3Provider<ZodObjectOrWrapped>(schema);
      this.Resolver = zodResolver(schema);
    }
  }

  parseSchema(): ParsedSchema {
    return this.Provider.parseSchema();
  }

  validateSchema(values: any): SchemaValidation {
    return this.Provider.validateSchema(values);
  }

  getDefaultValues(): Record<string, any> {
    return this.Provider.getDefaultValues();
  }

  get resolver() {
    return this.Resolver;
  }
}
