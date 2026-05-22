import z from "zod"

export const SignUpSchema = z.object({
  name: z
    .string()
    .nonempty("Full name is required")
    .min(3, "Full name must be at least 3 characters")
    .max(30, "Full name must be at most 30 characters"),
  email: z
    .string()
    .nonempty("Email is required")
    .email("Enter a valid email address"),
  password: z
    .string()
    .nonempty("Password is required")
    .min(6, "Password must be at least 6 characters")
    .max(30, "Password must be at most 30 characters"),
});

export const LoginSchema= z.object({
    email: z
    .string()
    .nonempty("Email is required")
    .email("Enter a valid email address"),
  password: z
    .string()
    .nonempty("Password is required")
    .min(6, "Password must be at least 6 characters")
    .max(30, "Password must be at most 30 characters"),
});