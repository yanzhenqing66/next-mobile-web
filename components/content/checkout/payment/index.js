import { useCallback, useState } from 'react'
import { List } from 'antd-mobile'
import { useSelector } from 'react-redux'
import AddCardModal from './components/cardModal'
import SelCard from './components/selCard'
import { getPayCard } from '../request'
import formatPrice from '@/utils/formatPrice'
import rem from '@/utils/rem'
import PayPalBtn from '@/components/content/payment/paypalBtn'
import credit_card from '@/assets/images/checkout/credit_card.svg'
import paypal from '@/assets/images/checkout/paypal.svg'
import style from './payment.module.scss'

function Payment() {
  const orderInfo = useSelector(state => state.checkoutReducer)
  const { data } = getPayCard()
  const [addCardVis, setAddCardVis] = useState(false)
  const [selCardVis, setSelCardVis] = useState(false)
  const [cardId, setCardId] = useState('')

  const closeCard = useCallback(() => {
    setAddCardVis(false)
  }, [])

  const closeSelCard = useCallback(() => {
    setSelCardVis(false)
  }, [])

  const openAddModal = useCallback((cardId) => {
    setCardId(cardId)
    setAddCardVis(true)
  }, [])

  return (
    <>
      <h3 className={style.title}>Payment</h3>
      <List style={{ '--border-top': 'none' }}>
        <List.Item
          prefix={data && data[0] ? null : <img src={credit_card} />}
          onClick={data && data[0] ? () => setSelCardVis(true) : () => setAddCardVis(true)}
        >
          <p>
            {
              data && data[0]
                ?
                <span>
                  {'ending in' + ' ' + data[0].cardNumber.substr(data[0].cardNumber.length - 4)}<br />
                  {data[0].nameOnCard}<br />
                  {data[0].street}<br />
                  {data[0].city}, {data[0].state} {data[0].zipcode}<br />
                  {data[0].phone}<br />
                </span>
                : <span>Add Credit/Debit Card</span>
            }
            <style jsx>{`
              p {
                font-size: ${rem(12)};
                color: ${data && data[0] ? '#222' : '#ccc'};
                font-weight: 400;
                line-height: ${rem(18)};
              }
            `}</style>
          </p>
        </List.Item>
        <List.Item
          prefix={<img src={paypal} />}
          arrow
          className={style.paypal_payment}
        >
          <p className={style.paypal}>Pay with PayPal</p>
          <PayPalBtn amount={formatPrice(orderInfo?.price?.total)} />
          {/* {
            orderInfo?.price?.total
              ? <PayPalBtn amount={formatPrice(orderInfo?.price?.total)} />
              : null
          } */}
        </List.Item>
      </List>
      <SelCard selCardVis={selCardVis} close={closeSelCard} openAddModal={openAddModal} />
      <AddCardModal addCardVis={addCardVis} onClose={closeCard} cardId={cardId} />
    </>
  )
}

export default Payment