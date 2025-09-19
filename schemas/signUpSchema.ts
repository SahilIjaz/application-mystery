import { z } from "zod";

export const userNameSchema = z
  .string()
  .min(3)
  .max(20)
  .regex(/^[a-zA-Z0-9_]+$/, {
    message: "Username can only contain letters, numbers, and underscores.",
  });

export const signupSchema = z.object({
  userName: userNameSchema,
  email: z.string().email({ message: "Enter a valid email address." }),
  password: z.string().min(6).max(100),
});

