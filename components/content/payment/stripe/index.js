import { useState, useContext } from "react"
import { useRouter } from "next/router"
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
} from "@stripe/react-stripe-js"
import { Button, Toast } from "antd-mobile"
import { useSelector } from "react-redux"
import LazyLoad from '@/components/common/lazyLoad'
import { getCardList } from '../../orders/request'
import { stripeRes } from "@/api/cart"
import formatPrice from "@/utils/formatPrice"
import { fbTrack, pinTrack, adEvent } from "@/utils/pixelTrack"
import { payContext } from "@/pages/cart/payment"
import style from './stripe.module.scss'


const options = {
  style: {
    base: {
      fontSize: '16px',
      color: "#424770",
      letterSpacing: "0.025em",
      fontFamily: "Source Code Pro, monospace",
      "::placeholder": {
        color: "#aab7c4"
      }
    },
    invalid: {
      color: "#9e2146"
    }
  },
  iconStyle: 'solid',
  showIcon: true
}

function Stripe() {
  const router = useRouter()
  const cardList = getCardList()
  const orderInfo = useSelector(state => state.checkoutReducer)
  const { order, sku, contId, skuNum, cate, clientSecret, pinSku } = useContext(payContext)

  const stripe = useStripe()
  const elements = useElements()

  const [loading, setLoading] = useState(false)

  const handleSubmit = async event => {
    event.preventDefault()
    setLoading(true)

    if (!stripe || !elements || !clientSecret) {
      setLoading(false)
      Toast.show({
        content: 'The network environment is poor. Please try again',
        position: 'bottom'
      })
      return
    }

    const result = await stripe.confirmCardPayment(
      clientSecret, {
      payment_method: {
        card: elements.getElement(CardNumberElement)
      }
    })
    if (result.error) {
      setLoading(false)

      if (result.error.type === 'validation_error') return
      Toast.show({
        content: 'Payment failed, please try again',
        position: 'bottom'
      })
      payRes(0, result.error?.payment_intent?.id || '')
    } else {
      if (result.paymentIntent.status === 'succeeded') {
        adEvent('f42838', {
          currency: "USD",
          total_price: formatPrice(order.total),
          goods_sku: sku,
          active_tab: cate,
          product_ids: contId
        })
        fbTrack('Purchase', {
          content_type: 'product',
          contents: pinSku,
          currency: "USD",
          value: formatPrice(order.total),
        })
        pinTrack('checkout', {
          value: formatPrice(order.total),
          order_quantity: skuNum,
          currency: 'USD',
          line_items: pinSku,
          lead_type: cate,
          product_id: contId,
        })
        payRes(1, result?.paymentIntent?.id || '')
        setLoading(false)
      }
    }
  }

  const payRes = async (type, id) => {
    router.replace({
      pathname: '/cart/payment-result',
      query: { result: type ? 'success' : 'failed' }
    })
    const params = {
      tradeNo: order.tradeNo,
      paymentIntentId: id,
      status: type
    }
    await stripeRes(params)
  }

  return (
    <div className={style.wrap}>
      <div className={style.top}>
        <h4>Credit card</h4>
        <p>All transactions are secure and encrypted.</p>
        {
          cardList?.map(item => (
            <div className={style.card} key={item.id}>
              <LazyLoad src={item.card_src} />
            </div>
          ))
        }
      </div>

      <form onSubmit={handleSubmit}>
        <label>
          Card number
          <CardNumberElement options={options} />
        </label>
        <label>
          Expiration date
          <CardExpiryElement options={options} />
        </label>
        <label>
          CVC
          <CardCvcElement options={options} />
        </label>
        <div className={style.bottom}>
          <p>US ${formatPrice(orderInfo?.price?.total)}</p>
          <Button
            type="submit"
            disabled={!stripe}
            color='primary'
            shape="rounded"
            className={style.pay_now}
            loading={loading}
          >
            Pay now
          </Button>
        </div>
      </form>
    </div>
  )
}

export default Stripe
