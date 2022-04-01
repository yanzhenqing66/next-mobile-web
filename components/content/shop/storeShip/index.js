import { memo } from "react"
import formatPrice from "@/utils/formatPrice"

// -全店免邮
// Free Shipping On All Orders
// -全场满xx免邮
// Free Shipping Over $xx
// -全场统一邮费
// Flat Rate $xx On All Orders

const StoreShip = ({ isFreeShipping, freeShipping }) => {
  if (isFreeShipping === 1) {
    return <>Free Shipping On All Orders</>
  } else if (!isFreeShipping && freeShipping) {
    return <>Free Shipping over ${formatPrice(freeShipping)}</>
  } else {
    return <>Flat Rate ${formatPrice(freeShipping)} On All Orders</>
  }
}

export default memo(StoreShip)