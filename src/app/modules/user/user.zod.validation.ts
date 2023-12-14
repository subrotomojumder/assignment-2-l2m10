import { z } from "zod";

const fullNameZodSchema = z.object({
  firstName: z.string().trim(),
  lastName: z.string().trim(),
});

const addressZodSchema = z.object({
  street: z.string().trim(),
  city: z.string().trim(),
  country: z.string().trim(),
});

const orderZodSchema = z.object({
  body: z.object({
    productName: z.string().trim(),
    price: z.number(),
    quantity: z.number(),
  }),
});

const userCreateZodSchema = z.object({
  body: z.object({
    userId: z.number(),
    username: z.string(),
    password: z.string(),
    fullName: fullNameZodSchema,
    age: z.number().int(),
    email: z.string().email(),
    isActive: z.boolean(),
    hobbies: z.array(z.string()).optional(),
    address: addressZodSchema,
  }),
});

const userUpdateZodSchema = z.object({
  body: z.object({
    userId: z.number().optional(),
    username: z.string().optional(),
    password: z.string().optional(),
    fullName: fullNameZodSchema.optional(),
    age: z.number().int().optional(),
    email: z.string().email().optional(),
    isActive: z.boolean().optional(),
    hobbies: z.array(z.string()).optional(),
    address: addressZodSchema.optional(),
  }),
});
export const userValidation = {
  userCreateZodSchema,
  userUpdateZodSchema,
  orderZodSchema,
};
