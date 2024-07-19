import { Customer } from "@medusajs/medusa"
import ProfileName from "./ProfileName"
import ProfileEmail from "./ProfileEmail"
import ProfilePhone from "./ProfilePhone"
import ProfilePassword from "./ProfilePassword"

const ProfileTab = ({ customer }: { customer: Omit<Customer, "password_hash"> } ) => {
   return (
      <>
         <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-zinc-700">{customer.first_name}'s Profile</h3>
         <p className="text-sm mt-4 text-muted-foreground max-w-xl">
            View and update your profile information, including 
            your name, email, and phone number. You can also 
            update your billing address, or change your password.
         </p>
         
         <div className="max-w-5xl mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            <ProfileName customer={customer}/>
            <ProfileEmail customer={customer}/>
            <ProfilePhone customer={customer}/>
            <ProfilePassword customer={customer}/>
         </div>
      </>
   )
}

export default ProfileTab
