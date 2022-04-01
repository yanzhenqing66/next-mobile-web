import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Button, NavBar, Toast, Dialog } from 'antd-mobile'
import { useSelector, useDispatch } from 'react-redux'
import { get_checkInfo_async, del_check_info, clear_info } from '@/store/checkout/action'
import formatPrice from '@/utils/formatPrice'
import Head from '@/components/common/head'
import Address from '@/components/content/checkout/address'
// import Payment from '@/components/content/checkout/payment'
import ShopDetail from '@/components/content/checkout/shopDetail'
import EventBus from '@/utils/eventBus'
import { fbTrack, adEvent } from '@/utils/pixelTrack'
import storageUtil from '@/utils/storageUtil'
import style from '@/styles/comp_style/checkout.module.scss'

function Checkout() {
  const router = useRouter()
  const dispatch = useDispatch()
  const orderInfo = useSelector(state => state.checkoutReducer)
  const [sku, setSku] = useState([])
  const [cate, setCate] = useState(0)
  const [product, setProduct] = useState([])
  const [payLoad, setPayLoad] = useState(false)

  useEffect(() => {
    const handleRouteChange = (url) => {
      if (url !== '/cart/payment') {
        dispatch(del_check_info())
        dispatch(clear_info())
      }
      storageUtil.removeStore('checkOpt')
    }

    router.events.on('routeChangeStart', handleRouteChange)

    return () => {
      router.events.off('routeChangeStart', handleRouteChange)
    }
  }, [])

  const back = () => {
    Dialog.confirm({
      content: 'Are you sure you wish to exit checkout?',
      confirmText: <span className='col7a fw500'>Yes</span>,
      cancelText: <span className='col7a fw600'>No</span>,
      onConfirm: async () => {
        router.back()
      }
    })
  }

  useEffect(() => {
    if (!Object.keys(orderInfo).length) {
      dispatch(get_checkInfo_async())
    }
  }, [])

  useEffect(() => {
    getProductIds()
  }, [orderInfo])

  const getProductIds = () => {
    if (!Object.keys(orderInfo).length) return
    const ids = orderInfo?.shops?.map(item => {
      return item?.skus?.map(item => {
        return { id: item?.productId, quantity: item?.skuNum, categoryId: item?.categoryId }
      })
    })
    const res = [].concat(...ids)
    const skus = res.map(item => ({ id: item?.id, quantity: item?.quantity }))
    const cates = res.map(item => item?.categoryId)
    setProduct(ids)
    setSku(skus)
    setCate(cates)
  }

  const handlePay = async () => {
    setPayLoad(true)
    if (!orderInfo?.userAddress?.id) {
      Toast.show({
        content: 'Please select shipping address',
        position: 'bottom'
      })
      EventBus.emit('openAddress')
      setPayLoad(false)
      return
    }
    adEvent('wvmrfl', {
      product: product,
      total_price: formatPrice(orderInfo.price.total),
      currency: 'USD',
      active_tab: cate
    })
    fbTrack('AddPaymentInfo', {
      content_type: 'product',
      currency: 'USD',
      value: formatPrice(orderInfo.price.total),
      contents: sku,
    })
    router.push('/cart/payment')
    setPayLoad(false)
  }

  return (
    <>
      <Head title='Poppy Shopping | Checkout' />
      <NavBar
        className={style.navbar}
        onBack={back}
      >
        Checkout
      </NavBar>
      {
        orderInfo?.shops ?
          <>
            <main className={style.main}>
              <Address />
              {/* <Payment /> */}
              <ShopDetail />
            </main>
            <footer className={style.footer}>
              <p>
                US {orderInfo?.shops[0]?.currencyMark ?? '$'}{orderInfo?.price?.total ? formatPrice(orderInfo?.price?.total) : '0.00'}
              </p>
              <Button
                shape='rounded'
                color='primary'
                className={style.btn}
                onClick={handlePay}
                loading={payLoad}
              >Continue to payment</Button>
            </footer>
          </>
          : null
      }
    </>
  )
}

export default Checkout