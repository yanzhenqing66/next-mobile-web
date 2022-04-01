import { memo } from 'react'
import { useRouter } from 'next/router'
import { RightOutline } from 'antd-mobile-icons'
import ItemList from "../itemList"
import LazyLoad from '@/components/common/lazyLoad'
import style from './itemDetail.module.scss'

function ItemDetail({ data, orderNo }) {
  const router = useRouter()
  return (
    <ItemList title='Item details'>
      <div
        className={style.warp}
        onClick={() => router.push({
          pathname: '/order/item-detail',
          query: { orderNo }
        })}
      >
        <div className={style.top}>
          {
            data?.orderInfos?.map(item => (
              <LazyLoad src={item.skuPicUrl} key={item.id} className={style.sku_pic} />
            ))
          }
        </div>
        <div className={style.bottom}>
          <p>{data.orderItemNum} items in this order</p>
          <RightOutline fontSize={18} />
        </div>
      </div>
    </ItemList>
  )
}

export default memo(ItemDetail)