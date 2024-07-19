import { z } from "zod"

export const LoginCredentialsValidator = z.object({
   email: z.string().email({message: "Enter a valid email."}),
   password: z.string().min(8, {message: "Password must contain atleast 8 characters."})
})
export const SignupCredentialsValidator = z.object({
   firstName: z.string().min(1, { message: "This field is required." }),
   lastName: z.string().min(1, { message: "This field is required." }),
   email: z.string().email({message: "Enter a valid email."}),
   password: z.string().min(8, {message: "Password must contain atleast 8 characters."})
})

export type TLoginCredentials = z.infer<typeof LoginCredentialsValidator>
export type TSignupCredentials = z.infer<typeof SignupCredentialsValidator>