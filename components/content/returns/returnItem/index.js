import { memo } from 'react'
import { RightOutline } from 'antd-mobile-icons'
import LazyLoad from '@/components/common/lazyLoad'
import { useRefundContext } from '../module'
import { preReturnInfoSwr } from '../request'
import formatPrice from '@/utils/formatPrice'
import style from './returnItem.module.scss'

const GoodsItem = ({ productName, payPrice, skuPicUrl, skuAttribute, returnNum }) => {
  return (
    <div className={style.rg_goods}>
      <LazyLoad src={skuPicUrl} className={style.rgg_pic} />
      <div className={style.rgg_info}>
        <p className={style.gi_tit}>{productName}</p>
        <p className={style.gi_attr}>{skuAttribute}</p>
        <p className={style.gi_price}>$ {formatPrice(payPrice)} <span>x{returnNum}</span></p>
      </div>
    </div>
  )
}

function ReturnItem() {
  const { setVisible, orderNo, orderInfoId } = useRefundContext()
  const params = {
    orderNo,
    orderInfoIds: [orderInfoId],
    entireRefund: 0
  }
  const { data } = preReturnInfoSwr(params)

  return (
    <div className={style.return_Item}>
      <div className={style.ri_head}>
        <p>Return items</p>
        <p onClick={() => setVisible(true)}>Add more items in this order <RightOutline /></p>
      </div>
      {
        data?.returnItems?.map((item, index) => (
          <GoodsItem
            key={index}
            productName={item.productName}
            payPrice={item.payPrice}
            skuPicUrl={item.skuPicUrl}
            skuAttribute={item.skuAttribute}
            returnNum={item.returnNum}
          />
        ))
      }
    </div>
  )
}

export default memo(ReturnItem)