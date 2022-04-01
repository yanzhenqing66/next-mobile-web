import { useState } from 'react'
import { useRouter } from 'next/router'
import { Steps } from 'antd-mobile'
import { CheckCircleFill } from 'antd-mobile-icons'
import produce from 'immer'
import rem from '@/utils/rem'
import useGetParams from '@/hooks/useGetParams'
import { getTrackSwr } from '../request'
import SvgIcon from '@/components/common/svgIcon'
import { formatTrackDate } from '@/utils/formatDate'
import style from './trackInfo.module.scss'

const { Step } = Steps

const renderIcon = (tag) => {
  switch (tag) {
    case 'Ordered':
      return <SvgIcon src='/images/order/ordered.svg' />
    // case 'InTransit':
    //   return <SvgIcon src='/images/order/track.svg' />
    case 'OutForDelivery':
      return <SvgIcon src='/images/order/delivery.svg' />
    case 'Delivered':
      return <CheckCircleFill />
    default:
      return null
  }
}

function TrackInfo() {
  const router = useRouter()
  const { orderNo } = useGetParams(router.asPath)
  const { data } = getTrackSwr(orderNo)
  const [orderInfo] = useState([
    { subtagMessage: 'Ordered', checkpointTime: data.deliveryTime, tag: 'Ordered' },
    { subtagMessage: 'Order paid successfully', checkpointTime: data.payTime },
    { subtagMessage: 'Order submitted', checkpointTime: data.addTime },
  ])

  const checkpoints = data?.checkpoints ?? []

  const list = produce(checkpoints, draft => {
    draft.push(...orderInfo)
  })

  return (
    <div className={style.trackInfo}>
      <Steps
        direction='vertical'
        style={{
          '--title-font-size': rem(13),
          '--description-font-size': rem(11),
          '--indicator-margin-right': '12px',
          '--icon-size': rem(18),
        }}
      >
        {
          list?.map((item, index) => (
            <Step
              key={index}
              title={item?.subtagMessage ?? ''}
              description={
                <div className={style.msg}>
                  <p>
                    {item?.message ?? ''}
                    {item?.location ? ',' : ''}
                    {item?.location ?? ''}
                  </p>
                  <p>{formatTrackDate(item?.checkpointTime)}</p>
                </div>
              }
              icon={renderIcon(item?.tag)}
            />
          ))
        }
      </Steps>

    </div>
  )
}

export default TrackInfo