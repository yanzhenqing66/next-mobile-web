import React, { memo } from 'react'
import Link from 'next/link'
import { RightOutline } from 'antd-mobile-icons'
import ReviewList from '@/components/content/reviewList'
import { useDetailState } from '../module'
import style from './reviews.module.scss'
import { Space } from 'antd-mobile'

function Review() {
  const { reviews, id } = useDetailState()

  return (
    <>
      <ReviewList data={reviews.reviews} />
      {
        reviews.total >= 3
          ?
          <Link href={`/reviews/${id}`}>
            <a className={style.findMoreView}>
              <Space>
                View all reviews <RightOutline fontSize={18} />
              </Space>
            </a>
          </Link>
          :
          <p className='fw500 f13'>No review yet</p>
      }
    </>
  )
}

export default memo(Review)