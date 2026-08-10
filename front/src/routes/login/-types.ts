import * as z from "zod"

export const formSchema = z.object({
  email: z.email("Invalid email address.").max(32, "Input is too long."),
  password: z
    .string()
    .min(2, "Enter a valid password.")
    .max(50, "Input is too long."),
})
export type FormSchema = z.infer<typeof formSchema>
