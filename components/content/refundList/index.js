import { useCallback } from 'react'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import { Button } from 'antd-mobile'
import IconFont from '@/components/common/IconFont'
import LazyLoad from '@/components/common/lazyLoad'
import { getRefundListApi } from '@/api/returns'
import LoadPage from '@/components/common/loadPage'
import ErrorPage from '@/components/common/errorPage'
import formatPrice from '@/utils/formatPrice'
import { formatOrderDate } from '@/utils/formatDate'
import style from './refund_list.module.scss'

const Item = ({ storeBrand, productName, payPrice, skuAttribute, applyTime, skuPicUrl, refundNo, goDetail }) => {
  return (
    <div className={style.box}>
      <section className={style.shop}>
        <IconFont type='icon-shop' />
        <h4>{storeBrand}</h4>
      </section>
      <section className={style.product}>
        <LazyLoad src={skuPicUrl} className={style.product_pic} />
        <div className={style.product_detail}>
          <p className={style.product_detail_title}>{productName}</p>
          <p className={style.product_detail_attr}>{skuAttribute}</p>
          <p>Refund: <b>$ {formatPrice(payPrice)}</b></p>
        </div>
      </section>
      <section className={style.request}>
        <p className={style.request_time}>Request on {formatOrderDate(applyTime)}</p>
        <Button size='mini' shape='rounded' fill='outline' onClick={() => goDetail(refundNo)}>View details</Button>
      </section>
    </div>
  )
}

const fetchRefundList = () => {
  return getRefundListApi().then(res => res?.data?.contents)
}

function RefundList() {
  const router = useRouter()
  const { data, error } = useSWR('refund/list', fetchRefundList)

  const goDetail = useCallback((refundNo) => {
    router.push({
      pathname: 'refund-detail',
      query: {refundNo}
    })
  }, [])

  if (!data && !error) {
    return <LoadPage fixed />
  } else if (error) {
    return <ErrorPage />
  } else {
    return (
      <div className={style.container}>
        {
          data?.map(item => (
            <Item
              key={item.id}
              storeBrand={item.storeBrand}
              skuPicUrl={item.skuPicUrl}
              productName={item.productName}
              payPrice={item.payPrice}
              skuAttribute={item.skuAttribute}
              applyTime={item.applyTime}
              refundNo={item.refundNo}
              goDetail={goDetail}
            />
          ))
        }
      </div>
    )
  }
}

export default RefundList
