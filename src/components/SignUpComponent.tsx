"use client"

import { Loader2 } from "lucide-react"
import { Button, buttonVariants } from "./ui/button"
import { toast } from "sonner"
import { signUp } from "@/actions/account-actions"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { SignupCredentialsValidator, TSignupCredentials } from "@/lib/validators/auth-credentials"
import { useForm } from "react-hook-form"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import CustomLink from "./CustomLink"
import { useState } from "react"
import { Checkbox } from "./ui/checkbox"

const SignUpComponent = () => {
   const [isPassShown, setIsPassShown] = useState(false)
   const router = useRouter()
   
   const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<TSignupCredentials>({
      resolver: zodResolver(SignupCredentialsValidator)
   })
   
   const onSubmit = async ({ firstName, lastName, email, password }: TSignupCredentials) => {
      const customerData = {
         email, password, firstName, lastName
      }
      
      try {
         const res = await signUp(null, customerData)
         if(res?.message) {
            toast.error("Something went wrong! Please try again.")
         }else{
            router.push("/account")
            reset()
            toast.success("Account created! 🎉")
         }
         
      } catch (error) {
         toast.error("Something went wrong! Please try again.")
      }

   }
   
   return (
      <section className="min-h-[calc(100vh-64px)] flex justify-center items-center py-16">
         <div className="w-full sm:w-[350px]">
            <div className="flex flex-col items-center">
               <h2 className="text-center text-xl sm:text-2xl font-bold">Create an account</h2>
               <CustomLink 
                  href="/sign-in"
                  className={buttonVariants({
                     variant: "link",
                  })}>
                  Already have an account? Sign in
               </CustomLink>
            </div>
            
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 mt-8">
               <div className="flex flex-col gap-2">
                  <Label>First name</Label>
                  <Input type="text" placeholder="yourfirstname" {...register("firstName")}/>
                  {errors.email && <span className="text-red-500 text-xs -mt-1">{errors.firstName?.message}</span>}
               </div>
               <div className="flex flex-col gap-2">
                  <Label>Last name</Label>
                  <Input type="text" placeholder="yourlastname" {...register("lastName")}/>
                  {errors.email && <span className="text-red-500 text-xs -mt-1">{errors.lastName?.message}</span>}
               </div>
               <div className="flex flex-col gap-2">
                  <Label>Email</Label>
                  <Input type="email" placeholder="youremail@gmail.com" {...register("email")}/>
                  {errors.email && <span className="text-red-500 text-xs -mt-1">{errors.email.message}</span>}
               </div>
               <div className="flex flex-col gap-3">
                  <Label>Password</Label>
                  <Input type={isPassShown ? "text": "password"} placeholder="yourverystrongpassword" {...register("password")}/>
                  {errors.password && <span className="text-red-500 text-xs -mt-1">{errors.password.message}</span>}
               </div>
               
               <div className="flex items-center gap-2 mb-4">
                  <Checkbox onClick={() => {
                     setIsPassShown(!isPassShown)
                  }} checked={isPassShown} id="show-password"/>
                  <Label htmlFor="show-password" className="cursor-pointer text-sm">Show password</Label>
               </div>
               
               <Button disabled={isSubmitting} className="disabled:opacity-90 disabled:cursor-not-allowed" type="submit">
                  {isSubmitting && <Loader2 className="w-4 h-4 text-white mr-2 animate-spin" />}
                  Sign up
               </Button>
            </form>
         </div>
      </section>
   )
}

export default SignUpComponent