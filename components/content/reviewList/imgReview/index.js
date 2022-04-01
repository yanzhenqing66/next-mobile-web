import {ImageViewer} from 'antd-mobile'
import dynamic from 'next/dynamic'
const LazyLoad = dynamic(import('@/components/common/lazyLoad'), {ssr: false})
import RenderScore from '../renderScore'
import {formatReviewDate} from '@/utils/formatDate'
import style from './imgReview.module.scss'

function ImgReview({ data }) {
  return (
    <>
      {
        data && data.map((item, index) => (
          <div className={style.img_review} key={index}>
            <section className={style.img_box}>
              <LazyLoad
                src={item.images[0]}
                key={index}
                onClick={() => {
                  ImageViewer.Multi.show({ images: item.images })
                }}
              />
              <div className={style.count}>1 / {item.images.length}</div>
            </section>
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
          </div>
        ))
      }
    </>
  )
}

export default ImgReview