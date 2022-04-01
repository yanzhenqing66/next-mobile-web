import { useState, memo, useCallback, useRef } from 'react'
import dynamic from 'next/dynamic'
import { Swiper, ImageViewer } from 'antd-mobile'
import Video from '@/components/common/video'
const LazyLoad = dynamic(import('@/components/common/lazyLoad'), { ssr: false })
import HorSwiper from './horSwiper'
import rem from '@/utils/rem'
import { useDetailState } from '../module'
import style from './swiper.module.scss'

const RenderMedia = memo(({ item, title }) => {
  if (item.mediaType == 'video') {
    return (
      <div className={style.swiperCon}>
        <Video
          src={item.src}
          autoPlay
          muted
          loop
        />
      </div>
    )
  } else if (item.mediaType == 'image') {
    return (
      <div className={style.swiperCon}>
        <LazyLoad
          src={item.thumbnailSrc ?? item.src}
          alt={title}
          fit="contain"
          height={rem(375)}
          width={'100%'}
          onClick={() => {
            ImageViewer.show({ image: item.src })
          }}
        />
      </div>
    )
  } else {
    return null
  }
})

function SwiperComp() {
  const { images, title } = useDetailState()
  const swiperRef = useRef()
  const [swiperIdx, setSwiperIdx] = useState(0)

  const onKey = useCallback((key) => {
    swiperRef?.current?.swipeTo(key)
  }, [])

  return (
    <>
      <Swiper
        // indicator={(total, current) => (
        //   <div className={style.customIndicator}>
        //     {`${current + 1} / ${total}`}
        //   </div>
        // )}
        indicator={() => null}
        loop
        ref={swiperRef}
        onIndexChange={setSwiperIdx}
      >
        {
          images?.map((item, index) => (
            <Swiper.Item key={index}>
              <RenderMedia item={item} title={title} />
            </Swiper.Item>
          ))
        }
      </Swiper>
      <HorSwiper swiperIdx={swiperIdx} onKey={onKey} />
    </>
  )
}

export default memo(SwiperComp)