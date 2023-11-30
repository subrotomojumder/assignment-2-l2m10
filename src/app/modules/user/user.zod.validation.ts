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
  productName: z.string().trim(),
  price: z.number(),
  quantity: z.number(),
});

const userZodSchema =  z.object({body : z.object({user: z.object({
  userId: z.number(),
  username: z.string(),
  password: z.string(),
  fullName: fullNameZodSchema,
  age: z.number().int(),
  email: z.string().email(),
  isActive: z.boolean(),
  hobbies: z.array(z.string()).optional(),
  address: addressZodSchema,
  orders: z.array(orderZodSchema).optional(),
})})})


export default userZodSchema;