import dynamic from 'next/dynamic'
import { getBrandGoodsSwr } from '../request'
import InfiniteScrollContent from '@/components/common/InfiniteScrollContent'
import { adEvent, reportLog } from '@/utils/pixelTrack'
const Waterfall = dynamic(import('@/components/common/waterfall'), { ssr: false })
import style from './moreGoods.module.scss'

function MoreBrandGoods({ id }) {
  const { data, error, loading } = getBrandGoodsSwr(id)

  const goDetail = (id) => {
    // router.push({
    //   pathname: `/productDetail/${id}`,
    //   query: {
    //     action: `/productDetail/${id}`,
    //     source_url: router.pathname
    //   }
    // })
    adEvent('9ghryj', {
      product_id: id
    })
    reportLog({ page: 'detail_related', item_id: id })
  }

  const renderList = () => {
    if (loading) {
      return <InfiniteScrollContent hasMore={true} />
    } else if (error || !data.length) {
      return <InfiniteScrollContent />
    } else {
      return <Waterfall data={data} goDetail={goDetail} />
    }
  }

  return (
    <div className={style.wrap}>
      <h2 className={style.wrap_title}>More inspirations from this brand</h2>
      {renderList()}
    </div>
  )
}

export default MoreBrandGoods