import { memo } from "react"
import formatPrice from "@/utils/formatPrice"
import ItemList from "../itemList"

function DeliveryMethod ({data}) {
  return (
    <ItemList title='Delivery Method'>
      <>{data ? '$' + formatPrice(data) : 'Free Shipping'}</>
    </ItemList>
  )
}

export default memo(DeliveryMethod)