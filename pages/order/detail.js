import { useRouter } from 'next/router'
import { NavBar } from 'antd-mobile'
import { getOrderDetail } from '@/components/content/orderDetail/request'
import useGetParams from '@/hooks/useGetParams'

import Head from '@/components/common/head'
import LoadPage from '@/components/common/loadPage'
import ErrorPage from '@/components/common/errorPage'
import OrderInfo from '@/components/content/orderDetail/orderInfo'
import ItemDetail from '@/components/content/orderDetail/itemDetail'
import ShipAddress from '@/components/content/orderDetail/shipAddress'
import DeliveryMethod from '@/components/content/orderDetail/deliveryMethod'
import PaymentInfo from '@/components/content/orderDetail/paymentInfo'
import OrderSum from '@/components/content/orderDetail/orderSum'
import css from 'styled-jsx/css'

const navbarSty = css`
  .navbar { 
    position: sticky;
    top: 0;
    background: #fff;
  }
`

function OrderDetail() {
  const router = useRouter()
  const { orderNo } = useGetParams(router.asPath)

  const { data, error, loading } = getOrderDetail(orderNo)

  const renderList = () => {
    if (loading) {
      return <LoadPage fixed />
    } else if (error) {
      return <ErrorPage />
    } else {
      return <>
        <OrderInfo data={data} />
        <ItemDetail data={data} orderNo={orderNo} />
        <ShipAddress data={data} />
        <DeliveryMethod data={data.shippingFee} />
        <PaymentInfo data={data} />
        <OrderSum data={data} />
      </>
    }
  }


  return (
    <>
      <Head title='Poppy Shopping | Order Details' />
      <div className='navbar'>
        <NavBar onBack={() => router.back()} style={{ '--border-bottom': '1px #f6f6f6 solid' }}>
          Order Details
        </NavBar>
        <style jsx>{navbarSty}</style>
      </div>
      {renderList()}
    </>
  )
}

export default OrderDetail