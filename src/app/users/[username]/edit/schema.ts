import { z } from "zod";

export const userSchema = z.object({
  id: z.number(),
  username: z.string(),
  email: z.string(),
  bio: z.string(),
  password: z.string().optional(),
});
