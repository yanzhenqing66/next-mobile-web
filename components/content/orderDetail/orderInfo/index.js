import { memo } from "react"
import { getOrderStatus } from "../request"
import ItemList from "../itemList"
import { formatOrderDate } from "@/utils/formatDate"


function OrderInfo ({data}) {
  const orderStatus = getOrderStatus()

  const getStatus = () => {
    return orderStatus?.filter(item => item.id === data.orderStatus)[0].value || ''
  }
  
  return (
    <ItemList title='Order information'>
      <>
        <p>Order No. {data.orderNo}</p>
        <p>Order date: {formatOrderDate(data.addTime)}</p>
        <p>Order status: {getStatus()}</p>
      </>
    </ItemList>
  )
}

export default memo(OrderInfo)