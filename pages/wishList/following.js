import React, { useEffect, useState } from 'react'
import { InfiniteScroll } from 'antd-mobile'
import { getFollowList } from '@/api/wishList'
import formatParams from '@/utils/formatParams'
import WishLayout from '@/components/content/wishList/wishLayout'
import useFetchState from '@/hooks/useFetchState'
import FollowLayout from '@/components/content/wishList/following/followLayout'
import InfiniteScrollContent from '@/components/common/InfiniteScrollContent'

let curPage = 1
function Following() {
  const [data, setData] = useFetchState([])
  const [hasMore, setHasMore] = useState(true)

  const loadMore = async () => {
    const params = formatParams({
      curPage,
      pageSize: 20
    })
    const res = await getFollowList(params)
    if (res.code === 200) {
      const contents = res.data.contents
      setData(val => [...val, ...contents])
      setHasMore(contents.length >= 20)
      contents.length >= 20 && curPage++
    }
  }

  useEffect(() => {
    return () => {
      curPage = 1
    }
  }, [])

  return (
    <WishLayout>
      <FollowLayout followList={data} />
      {/* <WishDefault title="following" preview={<img src={noFollow} />} /> */}
      <InfiniteScroll loadMore={loadMore} hasMore={hasMore}>
        <InfiniteScrollContent hasMore={hasMore} />
      </InfiniteScroll>
    </WishLayout>
  )
}

export default Following