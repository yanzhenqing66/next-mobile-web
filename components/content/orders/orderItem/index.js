import { Fragment, useCallback } from 'react'
import { useRouter } from 'next/router'
import { Toast } from "antd-mobile"
import { addCartApi } from "@/api/cart"
import { formatOrderDate } from "@/utils/formatDate"
import formatPrice from "@/utils/formatPrice"
import IconFont from "@/components/common/IconFont"
import LazyLoad from "@/components/common/lazyLoad"
import style from './order_item.module.scss'

const refundType = (returnType, refundCloseDate, orderKey) => {
  if (returnType === 1 && refundCloseDate && orderKey*1 === 4) {
    return <p>Return window will close on {formatOrderDate(refundCloseDate)}</p>
  } else if (returnType === 1 && !refundCloseDate && orderKey*1 === 4) {
    return <p>Return window closed</p>
  } else {
    return null
  }
}

function OrderItem({ item, orderKey }) {
  const router = useRouter()

  const buyAgain = useCallback(async (info) => {
    try {
      const list = info?.map(item => {
        return { skuId: item.skuId, skuAttribute: item?.skuAttribute || '', skuNum: item?.skuNum }
      })
      const params = { addCartSkus: list, origin: 2 }
      await addCartApi(params)
      Toast.show({
        content: 'Successfully added to shopping cart',
        position: 'bottom'
      })
    } catch (error) {
      Toast.show({
        content: error?.message || 'Failed to join shopping cart',
        position: 'bottom'
      })
    }
  }, [])

  return (
    <div className={style.container}>
      <section className={style.top}>
        <IconFont type="icon-shop" className={style.shop} />
        <h4>{item.shopBrand}</h4>
      </section>
      <div className={style.center}>
        {
          item?.orderInfos?.length > 1 ?
            item?.orderInfos?.slice(0, 4)?.map(item2 => (
              <LazyLoad key={item2.id} className={style.center_pic} src={item2.skuPicUrl} />
            ))
            :
            item?.orderInfos?.map(item2 => (
              <Fragment key={item2.id}>
                <LazyLoad src={item2.skuPicUrl} className={style.center_pic} />
                <p className={style.goods_name}>
                  {item2.productName}
                </p>
              </Fragment>
            ))
        }
      </div>
      <section className={style.bottom}>
        <div className={style.info}>
          <p className={style.price}><span>{item.orderItemNum} items </span> <span>Total: {item.currencyMark}{formatPrice(item.total)} </span></p>
          <p className={style.time}>{formatOrderDate(item.addTime)} </p>
        </div>
        <div>
          {
            item.orderStatus === 3 || item.orderStatus === 4 ?
              <div
                className={style.track}
                onClick={
                  () => router.push({
                    pathname: '/order/track',
                    query: { orderNo: item.orderNo }
                  })
                }
              >Track</div> : null
          }
          {
            item.orderStatus === 1 ?
              <div
                className={style.buy_again}
                onClick={() => buyAgain(item.orderInfos)}
              >Buy again</div>
              : null
          }
          <div
            className={style.view}
            onClick={
              () => router.push({
                pathname: '/order/detail',
                query: { orderNo: item.orderNo }
              })
            }
          >View order details</div>
        </div>
      </section>
      <div className={style.refund}>
        {refundType(item.returnType, item.refundCloseDate, orderKey)}
      </div>
    </div>
  )
}

export default OrderItem
