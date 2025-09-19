import { z } from "zod";

export const signInSchema = z.object({
  email: z.string().email("enter a valid email address"),
  password: z
    .string()
    .min(6, "password must be at least 6 characters long")
    .max(20, "password must be at most 20 characters long"),
});
