import React, { useEffect, memo, useRef, useMemo } from 'react'
import Link from 'next/link'
import Masonry from 'masonry-layout'
import { formatUrl } from '@/utils/formatUrl'
import GoodsItem from './goodsItem'
import style from './waterfall.module.scss'

function Waterfall({ data, goDetail, followOpt, updFollowGood }) {
  const waterRef = useRef()

  const advanceWidth = () => {
    new Masonry(waterRef.current, {
      itemSelector: '.fallItem',
      fitWidth: true,
      gutter: 15,
    })
  }

  useEffect(() => {
    advanceWidth()
  }, [data])

  const goDetails = (id) => {
    goDetail && goDetail(id)
  }

  const WateMemo = useMemo(() => {
    return (
      <div className={style.waterfall} ref={waterRef}>
        {
          data?.map((item, key) => (
            <Link
              href={`/productDetail/${formatUrl(item.title)}_q_${item.id}.html`}
              key={key}
            >
              <a className='fallItem' onClick={() => goDetails(item.id)}>
                <GoodsItem item={item} followOpt={followOpt} updFollowGood={updFollowGood} />
              </a>
            </Link>
          ))
        }
      </div>
    )
  }, [data])

  return (
    <>{WateMemo}</>
  )
}

export default memo(Waterfall)