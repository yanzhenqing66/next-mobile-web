import { useEffect, useContext } from "react"
import { useRouter } from "next/router"
import PropTypes from 'prop-types'
import {
  PayPalButtons,
  usePayPalScriptReducer
} from "@paypal/react-paypal-js"
import formatPrice from "@/utils/formatPrice"
import { paypalResSuccess, paypalResFiled } from "@/api/cart"
import { fbTrack, pinTrack, adEvent } from "@/utils/pixelTrack"
import { payContext } from "@/pages/cart/payment"

const style = {
  layout: "horizontal",
  // color: 'white',
  shape: 'pill',
  tagline: false,
  height: 44
}

// { color?: "blue" | "silver" | "white" | "black" | "gold"; height?: number; label?: "paypal" | "checkout" | "buynow" | "pay" | "installment" | "subscribe" | "donate"; layout?: "vertical" | "horizontal"; shape?: "rect" | "pill"; tagline?: boolean; }

const PayPalBtn = ({ currency }) => {
  const router = useRouter()
  const { order, sku, contId, skuNum, cate, pinSku } = useContext(payContext)

  const [{ options }, dispatch] = usePayPalScriptReducer()

  useEffect(() => {
    dispatch({
      type: "resetOptions",
      value: {
        ...options,
        currency,
      },
    });
  }, [currency, order])

  const createOrder = (data, actions) => {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: {
              currency_code: order.currency,
              value: formatPrice(order.total),
            },
            invoice_id: order.tradeNo,
            custom_id: order.tradeNo
          },
        ],
      })
      .then((orderId) => {
        return orderId
      })
  }

  return (
    <>
      <PayPalButtons
        style={style}
        disabled={false}
        forceReRender={[currency, style]}
        fundingSource={'paypal'}
        createOrder={createOrder}
        onApprove={function (data, actions) {
          return actions.order.capture().then(async res => {
            await paypalResSuccess({ orderId: res.id || '' })
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
            router.replace({
              pathname: '/cart/payment-result',
              query: { result: 'success' }
            })
          })
        }}
        onError={async (err) => {
          await paypalResFiled(order.tradeNo)
          router.replace({
            pathname: '/cart/payment-result',
            query: { result: 'failed' }
          })
        }}
      />
    </>
  )
}

PayPalBtn.propTypes = {
  currency: PropTypes.string,
  // amount: PropTypes.string
}

PayPalBtn.defaultProps = {
  currency: 'USD',
  // amount: '0.00'
}

export default PayPalBtn