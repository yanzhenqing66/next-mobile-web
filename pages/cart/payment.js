import { useEffect, useState, createContext } from "react"
import { useRouter } from "next/router"
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import { NavBar } from "antd-mobile"
import css from 'styled-jsx/css'
import Head from "@/components/common/head"
import Paypal from "@/components/content/payment/paypal"
import Stripe from "@/components/content/payment/stripe"
import { useSelector, useDispatch } from "react-redux"
import { get_checkInfo_async, del_check_info, clear_info } from "@/store/checkout/action"
import rem from "@/utils/rem"
import { createOrder } from "@/components/content/checkout/request"
import { stripePay } from "@/api/cart"
import { envFlag } from '@/utils/env'
import formatPrice from "@/utils/formatPrice"

let publishKey = envFlag ? 'pk_live_51JJv8fFyt2JRLIR7ZPWXnC26o4fZPlzYOrzMtOT3TezkvujjS5bSK03KsojViiZPsaM9FqQEfVklHruPAw4KZHzf00HlV327Tj' : 'pk_test_51JJv8fFyt2JRLIR7vo8NiOabVOcNiHL2fglSoT1OWTos6sbbEmv47E9PmouIVYlJSa9vj0rO4NIzwZ2hBcJIVOYF00QTtxZXJo'

const stripePromise = loadStripe(publishKey)

export const payContext = createContext(null)

function Payment() {
  const router = useRouter()
  const dispatch = useDispatch()
  const orderInfo = useSelector(state => state.checkoutReducer)
  const { addressId } = useSelector(state => state.editCheckReducer)
  const [order, setOrder] = useState(null)
  const [clientSecret, setClientSecret] = useState('')
  const [sku, setSku] = useState([])
  const [contId, setContId] = useState([])
  const [skuNum, setSkuNum] = useState(1)
  const [cate, setCate] = useState(0)
  const [pinSku, setPinSku] = useState([])

  useEffect(() => {
    const handleRouteChange = (url, { shallow }) => {
      if (url !== '/cart/checkout') {
        dispatch(del_check_info())
        dispatch(clear_info())
      }
    }

    router.events.on('routeChangeStart', handleRouteChange)

    return () => {
      router.events.off('routeChangeStart', handleRouteChange)
    }
  }, [])

  useEffect(() => {
    getPreSubmit()
  }, [])

  useEffect(() => {
    getProductIds()
  }, [orderInfo])

  const getPreSubmit = async () => {
    if (!Object.keys(orderInfo).length) {
      await dispatch(get_checkInfo_async(addressId))
      createInfo()
    } else {
      createInfo()
    }
  }

  const getProductIds = () => {
    if (!Object.keys(orderInfo).length) return
    const ids = orderInfo?.shops?.map(item => {
      return item?.skus?.map(item => {
        return { id: item?.productId, quantity: item?.skuNum, categoryId: item?.categoryId, price: formatPrice(item.skuPrice) }
      })
    })
    const res = [].concat(...ids)
    const skus = res.map(item => ({ id: item?.id, quantity: item?.quantity }))
    const pinSkus = res.map(item => ({product_id: item?.id, product_quantity: item?.quantity, product_price: item?.price}))
    const contid = res.map(item => item?.id)
    const cates = res.map(item => item?.categoryId)
    const total = res.map(item => item.quantity)
    setPinSku(pinSkus)
    setContId(contid)
    setSku(skus)
    setCate(cates)
    setSkuNum(total)
  }

  const createInfo = async () => {
    const order = await createOrder(orderInfo)
    const { data } = await stripePay({ tradeNo: order.tradeNo })
    setOrder(order)
    setClientSecret(data)
  }

  return (
    <>
      <Head title='Poppy Shopping | Payment' />
      <div className='header'>
        <NavBar
          onBack={() => router.back()}
          style={{ '--border-bottom': '1px solid #f6f6f6' }}
        >Payment</NavBar>
      </div>
      <payContext.Provider value={{ order, sku, contId, skuNum, cate, clientSecret, pinSku }}>
        <Paypal />
        <div className="or">
          <p>OR</p>
        </div>
        <Elements stripe={stripePromise}>
          <Stripe />
        </Elements>
      </payContext.Provider>
      <style jsx>{orCss}</style>
    </>
  )
}

export default Payment

const orCss = css`
  .header {
    position: sticky;
    top: 0;
    background-color: #fff;
    z-index: 9;
  }

  .or {
    width: ${rem(333)};
    height: 1px;
    background: #ccc;
    margin: ${rem(25)} auto;
    position: relative;
  }

  .or p {
    position: absolute;
    top: ${rem(-5)};
    left: 50%;
    transform: translateX(-50%);
    padding: 0 ${rem(10)};
    background-color: #fff;
    color: #ccc;
  }
`