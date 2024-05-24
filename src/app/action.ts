"use server";
import { z } from "zod";

const numberRegex = new RegExp("[0-9]");

const loginSchema = z.object({
  name: z.string().min(5, "Username should be at least 5 characters long."),
  email: z
    .string()
    .email()
    .refine(
      (email) => email.endsWith("@zod.com"),
      "Only @zod.com emails are allowed."
    ),
  password: z
    .string()
    .min(10, "Password should be at least 10 characters long.")
    .regex(
      numberRegex,
      "Password should contain at least one number (0123456789)."
    ),
});

export async function login(prevState: any, formData: FormData) {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const data = {
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const result = loginSchema.safeParse(data);

  if (!result.success) {
    return {
      status: "error",
      error: result.error.flatten(),
    };
  }

  return {
    status: "success",
  };
}
