import { memo } from "react"
import css from 'styled-jsx/css'
import ItemList from "../itemList"
import paypal from '@/assets/images/order/paypal.svg'
import { getCardList } from "../../orders/request"

const pCss = css`
  p {
    display: flex;
    align-items: center;
  }

  img {
    margin-right: 5px;
  }
`

function PaymentInfo({ data }) {
  const cardList = getCardList()

  return (
    <ItemList title='Payment information'>
      <>
        {
          data.payType === 1 ?
            <p>
              <img src={paypal} alt="" /> Paid with PayPal
              <style jsx>{pCss}</style>
            </p>
            :
            <p>
              {
                cardList?.map(item => {
                  if(item.id === data.payType) {
                    return <img key={item.id} src={item.card_src} alt='' />
                  }
                })
              }
              ending in {data.cardNumber}
              <style jsx>{pCss}</style>
            </p>
        }

        {/* <p>{data.cardHolderName}</p>
        <p>{data.cardLinkSuite} {data.cardLinkStreet}</p>
        <p>{data.cardLinkCity}, {data.cardLinkState} {data.cardLinkZipCode}</p>
        <p>{data.cardLinkPhone}</p> */}
      </>
    </ItemList>
  )
}

export default memo(PaymentInfo)