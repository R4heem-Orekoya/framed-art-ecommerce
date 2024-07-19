import { PriceType } from "@/types/global"

const PriceText = ({ price }: { price: PriceType }) => {
   return (
      <>
         {price.price_type === "sale" && (
            <span className="line-through">
               {price.original_price}
            </span>
         )}
         
         <span>
            {price.calculated_price}
         </span>
      </>
   )
}

export default PriceText
