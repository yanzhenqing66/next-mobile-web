import React from 'react'
import dynamic from 'next/dynamic'
import { ImageViewer } from 'antd-mobile'
import PropTypes from 'prop-types'
import {formatReviewDate} from '@/utils/formatDate'
const LazyLoad = dynamic(import('@/components/common/lazyLoad'), { ssr: false })
import RenderScore from './renderScore'
import style from './reviewList.module.scss'

function ReviewList({ data }) {

  return (
    <>
      {
        data?.map((item, index) => (
          <article className={style.reviewList} key={index}>
            <section className={style.user}>
              <LazyLoad src={item.user.headPicture} />
              <div className={style.info}>
                <h5>
                  <span className={style.name}>{item.user.nick}</span>
                  <RenderScore data={item.score} />
                </h5>
                <p>
                  {formatReviewDate(item.createdAt)}
                  {/* <span>Colour: Blue</span> */}
                  {/* <span>Size: S</span> */}
                </p>
              </div>
            </section>
            <section className={style.view}>
              {item.content}
            </section>
            <section className={style.pic} style={{ overflow: 'hidden' }}>
              {
                item?.images?.map((item, index) => (
                  <LazyLoad
                    src={item}
                    key={index}
                    style={{display: 'inline-block'}}
                    onClick={() => {
                      ImageViewer.show({ image: item })
                    }}
                  />
                ))
              }
            </section>
          </article>
        ))
      }
    </>
  )
}

ReviewList.propTypes = {
  data: PropTypes.array
}

ReviewList.defaultProps = {
  data: []
}

export default ReviewList