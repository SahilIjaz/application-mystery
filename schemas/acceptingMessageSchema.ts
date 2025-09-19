import { z } from "zod";

export const acceptingMessageSchema = z.object({
  isAceptingMessages: z.boolean(),
});
