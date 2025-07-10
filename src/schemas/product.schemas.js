import { z } from "zod";

const createProductSchema = z.object({
  name: z.string({
    required_error: "Name is required",
    invalid_type_error: "Name must be a string"
  }).min(1, "Name cannot be empty"),

  description: z.string({
    required_error: "Description is required",
    invalid_type_error: "Description must be a string"
  }).min(1, "Description cannot be empty"),

  category: z.string({
    required_error: "Category is required",
    invalid_type_error: "Category must be a string"
  }).min(1, "Category cannot be empty"),

  price: z.preprocess(
    (val) => {
      if (typeof val === "string") {
        return Number(val.replace(",", ".").trim());
      }
      return val;
    },
    z.number({
      required_error: "Price is required",
      invalid_type_error: "Price must be a valid number"
    }).nonnegative("Price cannot be negative")
  )
});

const updateProductSchema = createProductSchema.partial()

export { createProductSchema, updateProductSchema };
