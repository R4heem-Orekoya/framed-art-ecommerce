"use client"

import { Button, buttonVariants } from "./ui/button"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { LoginCredentialsValidator, TLoginCredentials } from "@/lib/validators/auth-credentials"
import { useForm } from "react-hook-form"
import { logCustomerIn } from "@/actions/account-actions"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"
import CustomLink from "./CustomLink"

const LoginComponent = () => {
   const router = useRouter()
   
   const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<TLoginCredentials>({
      resolver: zodResolver(LoginCredentialsValidator)
   })
   
   const onSubmit = async ({ email, password }: TLoginCredentials) => {
      try {
         const res = await logCustomerIn(null, { email, password })
         if(res?.message) {
            toast.error(res.message)
            return
         }else{
            router.push("/account")
            reset()
            toast.success("Signed in successfully")  
         }
      } catch (error: any) {
         toast.error("Something went wrong! Please try again.")
      }
   }
   
   return (
      <section className="h-[calc(100vh-64px)] flex justify-center items-center py-16">
         <div className="w-full sm:w-[350px]">
            <div className="flex flex-col items-center">
               <h2 className="text-center text-xl sm:text-2xl font-bold">Log In</h2>
               <CustomLink 
                  href="/sign-up"
                  className={buttonVariants({
                     variant: "link",
                  })}>
                  Don&apos;t have an account yet? Sign up
               </CustomLink>
            </div>
            
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 mt-8">
               <div className="flex flex-col gap-2">
                  <Label>Email</Label>
                  <Input type="email" placeholder="youremail@gmail.com" {...register("email")}/>
                  {errors.email && <span className="text-red-500 text-xs -mt-1">{errors.email.message}</span>}
               </div>
               <div className="flex flex-col gap-3">
                  <Label>Password</Label>
                  <Input type="password" placeholder="yourverystrongpassword" {...register("password")}/>
                  {errors.password && <span className="text-red-500 text-xs -mt-1">{errors.password.message}</span>}
               </div>
                
               <Button disabled={isSubmitting} className="disabled:opacity-90 disabled:cursor-not-allowed" type="submit">
                  {isSubmitting && <Loader2 className="w-4 h-4 text-white mr-2 animate-spin" />}
                  Sign in
               </Button>
            </form>
         </div>
      </section>
   )
}

export default LoginComponent
