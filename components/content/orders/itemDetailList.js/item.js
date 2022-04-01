import { useCallback } from 'react'
import { useRouter } from 'next/router'
import { Button, Toast } from 'antd-mobile'
import { addCartApi } from '@/api/cart'
import LazyLoad from '@/components/common/lazyLoad'
import formatPrice from '@/utils/formatPrice'
import style from './itemDetailList.module.scss'

function Item({ item }) {
  const router = useRouter()

  const addCart = useCallback(async (e, skuId, skuAttribute) => {
    e.stopPropagation()
    try {
      const params = {
        addCartSkus: [
          {
            skuId,
            skuAttribute,
            skuNum: 1
          }
        ],
        origin: 2
      }
      await addCartApi(params)
      Toast.show({
        content: 'Successfully added to shopping cart',
        position: 'bottom'
      })
    } catch (error) {
      Toast.show({
        content: 'Purchase failed! One or more of your items is now out of stock or removed.',
        position: 'bottom'
      })
    }
  }, [])

  const goReturn = useCallback((e, item) => {
    e.stopPropagation()
    if (item.isApplyRefund && item.refundNo) {
      router.push({
        pathname: 'refund-detail',
        query: {
          refundNo: item.refundNo
        }
      })
    } else {
      router.push({
        pathname: 'returns',
        query: {
          orderNo: item.orderNo,
          orderInfoId: item.id
        }
      })
    }
  }, [])

  const goDetail = useCallback(() => {
    router.push({
      pathname: `/productDetail/${item.productId}`,
      query: {
        action: `/productDetail/${item.productId}`,
        source_url: router.pathname
      }
    })
  }, [])

  return (
    <div
      className={style.container}
      key={item.id}
      onClick={goDetail}
    >
      <LazyLoad src={item.skuPicUrl} className={style.left} />
      <div className={style.right}>
        <div className={style.title}>
          <h4>{item.productName}</h4>
          <p className={style.attr}>{item.skuAttribute}</p>
        </div>
        <div className={style.operation}>
          <p className={style.price}>$ {formatPrice(item.price)} <span className={style.skuNum}>x{item.skuNum}</span></p>
          <div>
            <Button
              shape='rounded'
              className={style.btn}
              size='mini'
              onClick={(e) => addCart(e, item.skuId, item.skuAttribute)}
            >Buy again</Button>
            {
              item.isShowReturn
                ? <Button
                  shape='rounded'
                  className={style.btn}
                  size='mini'
                  onClick={(e) => goReturn(e, item)}
                >Return</Button>
                : null
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Item