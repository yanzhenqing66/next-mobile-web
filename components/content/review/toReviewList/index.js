import IconFont from '@/components/common/IconFont'
import LazyLoad from '@/components/common/lazyLoad'
import { Button } from 'antd-mobile'
import { getToReview } from '../request'
import useLoadMore from '@/hooks/useLoadMore'
import style from './toReview.module.scss'
import LoadPage from '@/components/common/loadPage'

const getKey = (page, preData) => {
  if (preData && !preData.length) return null
  return `order/toBeReviewList?curPage=${page + 1}&pageSize=20`
}

function ToReviewList() {
  const { data, setSize, error, loading } = getToReview(getKey)

  const reviewList = data ? [].concat(...data) : []

  useLoadMore(() => setSize(val => val + 1))

  if(loading) {
    return <LoadPage fixed />
  }else if (error && !reviewList.length) {
    return null
  }

  return (
    <div className={style.wrap}>
      {
        reviewList?.map(item => (
          <div className={style.container} key={item.id}>
            <div className={style.shop}>
              <IconFont type='icon-shop' />
              <h3>{item.storeBrand}</h3>
            </div>
            <div className={style.content}>
              <div className={style.img}>
                <LazyLoad src={item.skuPicUrl} />
              </div>
              <div className={style.title}>
                <p className={style.name}>{item.productName}</p>
                <Button
                  shape='rounded'
                  block={false}
                  size='mini'
                  className={style.writeBtn}
                >Write a Review</Button>
              </div>

            </div>
          </div>
        ))
      }
    </div>
  )
}

export default ToReviewList