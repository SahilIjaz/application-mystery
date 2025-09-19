import { z } from "zod";

export const messageSchema = z.object({
  message: z
    .string()
    .min(1, "Message cannot be empty")
    .max(1000, "Message is too long"),
});
 