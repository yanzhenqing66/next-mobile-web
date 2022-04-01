import { memo } from 'react'
import dynamic from 'next/dynamic'
import { getRelateSwr } from '../request'
import { reportLog } from '@/utils/pixelTrack'
import rem from '@/utils/rem'
import InfiniteScrollContent from '@/components/common/InfiniteScrollContent'
const Waterfall = dynamic(import('@/components/common/waterfall'), { ssr: false })

function RelatedList({ id }) {
  const { data, error, loading } = getRelateSwr(id)

  const goDetail = (id) => {
    // router.push({
    //   pathname: `/productDetail/${id}`,
    //   query: {
    //     action: `/productDetail/${id}`,
    //     source_url: router.pathname
    //   }
    // })
    reportLog({ page: 'detail_related', item_id: id })
  }

  const renderList = () => {
    if (loading) {
      return <InfiniteScrollContent hasMore={true} />
    } else if (error) {
      return <InfiniteScrollContent />
    } else {
      return <Waterfall data={data} goDetail={goDetail} />
    }
  }

  return (
    <div>
      <h2>You may also like</h2>
      <style jsx>
        {`
              h2 {
                padding: ${rem(20)};
                font-size: ${rem(14)}
              }
          `}
      </style>
      {renderList()}
    </div>
  )
}

export default memo(RelatedList)