import formatPrice from '@/utils/formatPrice'
import css from 'styled-jsx/css'
import ItemList from "../itemList"

const p = css`
  p {
    display: flex;
    justify-content: space-between;
  }
`

function OrderSum ({data}) {
  return (
    <ItemList title='Order Summary'>
      <>
        <p><span>Subtotal</span> <span>${formatPrice(data.subTotal)}</span></p>
        <p><span>Shipping</span> <span>${formatPrice(data.shippingFee)}</span></p>
        {/* <p><span>Estimated tax</span> <span>$109.95</span></p> */}
        <p><span>Order total</span> <span>${formatPrice(data.payTotal)}</span></p>
        <style jsx>{p}</style>
      </>
    </ItemList>
  )
}

export default OrderSum