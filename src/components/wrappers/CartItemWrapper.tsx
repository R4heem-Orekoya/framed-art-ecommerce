import { LineItem, Region } from "@medusajs/medusa"
import CartItem from "../CartItem"
import CartSkeleton from "../CartSkeleton"


interface CartItemWrapperProps{
   items?: Omit<LineItem, "beforeInsert">[]
   region?: Region
}

const CartItemWrapper = ({ region, items }: CartItemWrapperProps) => {
   return (
      <>
         {items && region ? 
            items.map((item, i) => (
               <CartItem region={region} item={item} i={i} itemsLength={items.length}/>
            )) :
            <CartSkeleton />
         }
      </>
   )
}

export default CartItemWrapper
