import { z } from "zod";


export const AddressFieldsValidator = z.object({
   firstName: z.string().trim().min(1, {
      message: "First name is required"
   }),
   lastName: z.string().trim().min(1, {
      message: "Last name is required"
   }),
   // company: z.string().trim().min(1, {
   //    message: "This field is required"
   // }),
   address: z.string().trim().min(1, {
      message: "This field is required"
   }),
   // apartment: z.string().trim().min(1, {
   //    message: "This field is required"
   // }),
   postalCode: z.string().trim().min(1, {
      message: "This field is required"
   }),
   city: z.string().trim().min(1, {
      message: "This field is required"
   }),
   state: z.string().trim().min(1, {
      message: "This field is required"
   }),
   country: z.string().trim().min(1, {
      message: "This field is required"
   }),
   phone: z.string().trim().min(1, {
      message: "This field is required"
   }),
})

export type TAddressFieldsValidator = z.infer<typeof AddressFieldsValidator>