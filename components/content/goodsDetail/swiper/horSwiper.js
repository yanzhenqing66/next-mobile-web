import { useCallback } from 'react'
import { Tabs } from 'antd-mobile'
import dynamic from 'next/dynamic'
const LazyLoad = dynamic(import('@/components/common/lazyLoad'), { ssr: false })
import rem from '@/utils/rem'
import { useDetailState } from '../module'
import SvgIcon from '@/components/common/svgIcon'
import style from './swiper.module.scss'

const RenderMedia = ({ item, featuredImage }) => {
  if (item.mediaType == 'video') {
    return (
      <div className={style.swpVideo}>
        <LazyLoad
          src={featuredImage}
          height={rem(54)}
          width={rem(54)}
        />
        <div className={style.icon}>
          <SvgIcon className={style.icon} src='/images/product/video.svg' />
        </div>
      </div>
    )
  } else if (item.mediaType == 'image') {
    return (
      <LazyLoad
        src={item.thumbnailSrc ?? item.src}
        height={rem(54)}
        width={rem(54)}
      />
    )
  } else {
    return null
  }
}

const Tab = Tabs.Tab

function HorSwiper({ swiperIdx, onKey }) {
  const { images, featuredImage } = useDetailState()

  const tabChange = useCallback((key) => {
    onKey(key)
  }, [])

  return (
    <div className={style.hor_swiper}>
      <Tabs style={{ '--active-line-height': 0 }} onChange={tabChange}>
        {
          images?.map((item, index) => (
            <Tab
              key={index * 1}
              swiperIdx={swiperIdx * 1}
              index={index}
              style={{
                border: swiperIdx * 1 === index ? '1px solid #222' : '',
                opacity: swiperIdx * 1 === index ? '1' : '0.6'
              }}
              className="sel_product_pic"
              title={
                <RenderMedia item={item} featuredImage={featuredImage} />
              }
            />
          ))
        }
      </Tabs>
    </div >
  )
}

export default HorSwiper
