import { memo } from "react"
import ItemList from "../itemList"

function ShipAddress ({data}) {
  return (
    <ItemList title='Shipping Address'>
      <>
        <p>{data.receiverFirstName} {data.receiverLastName}</p>
        <p>{data.receiverSuite} {data.receiverStreet}</p>
        <p>{data.receiverCity}, {data.receiverState} {data.receiverZipCode}</p>
        <p>{data.receiverPhone}</p>
      </>
    </ItemList>
  )
}

export default memo(ShipAddress)