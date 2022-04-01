import { useRouter } from 'next/router'
import { Toast } from 'antd-mobile'
import { CopyOutlined } from '@ant-design/icons'
import useCopyText from '@/hooks/useCopyText'
import IconFont from '@/components/common/IconFont'
import LazyLoad from '@/components/common/lazyLoad'
import { getTrackSwr } from '../request'
import useGetParams from '@/hooks/useGetParams'
import { formatReviewDate } from '@/utils/formatDate'

import style from './orderInfo.module.scss'

function OrderInfo() {
  const router = useRouter()
  const { orderNo } = useGetParams(router.asPath)
  const { data } = getTrackSwr(orderNo)

  const copyText = () => {
    useCopyText('.track_no').then(() => {
      Toast.show({
        content: 'Tracking number was copied',
        position: 'bottom'
      })
    }).catch(err => {
      Toast.show({
        content: err,
        position: 'bottom'
      })
    })
  }
  return (
    <div className={style.wrap}>
      {
        data?.orderInfoSimpleModels?.map(item => (
          <div className={style.top} key={item.id}>
            <div className={style.shop_title}>
              <IconFont type='icon-shop' />
              <h3>{item?.productName}</h3>
            </div>
            <div className={style.goods}>
              <div className={style.goods_img}>
                <LazyLoad src={item?.skuPicUrl} />
              </div>
            </div>
          </div>
        ))
      }
      <div className={style.line}></div>
      <div className={style.bottom}>
        <p>
          <strong>Tracking No. </strong>
          <span className='track_no'>{data?.trackingNo}</span> <CopyOutlined onClick={copyText} />
        </p>
        {
          data?.estimatedDeliveryTime ?
            <p>
              <strong>Estimated Delivery Time: </strong>
              {formatReviewDate(data?.estimatedDeliveryTime)}
            </p> : null
        }

      </div>
      <div className={style.line}></div>
    </div>
  )
}

export default OrderInfo